import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = '/cart';
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private _http: HttpClient) {
    this.refreshCartCount();
  }

  refreshCartCount() {
    this.getCart().subscribe();
  }

  getCart(): Observable<any[]> {
    return this._http.get<any[]>(this.apiUrl, { withCredentials: true }).pipe(
      tap((cart) => {
        const count = (cart || []).reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
        this.cartCountSubject.next(count);
      })
    );
  }

  addToCart(product: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, product, { withCredentials: true }).pipe(
      tap((cart) => {
        const count = (cart || []).reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
        this.cartCountSubject.next(count);
      })
    );
  }

  updateCart(id: string, quantity: number): Observable<any> {
    return this._http.put<any>(`${this.apiUrl}/${id}`, { quantity }, { withCredentials: true }).pipe(
      tap((cart) => {
        const count = (cart || []).reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
        this.cartCountSubject.next(count);
      })
    );
  }

  removeFromCart(id: string): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/${id}`, { withCredentials: true }).pipe(
      tap((cart) => {
        const count = (cart || []).reduce((acc: number, item: any) => acc + (item.quantity || 0), 0);
        this.cartCountSubject.next(count);
      })
    );
  }

  clearCart(): Observable<any> {
    return this._http.delete<any>(this.apiUrl, { withCredentials: true }).pipe(
      tap(() => {
        this.cartCountSubject.next(0);
      })
    );
  }
}
