import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fashion } from './fashion';

@Injectable({
  providedIn: 'root'
})
export class FashionService {
  private apiUrl = 'http://localhost:4000/fashions';

  constructor(private http: HttpClient) { }

  getFashions(): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(this.apiUrl);
  }

  getFashionById(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/${id}`);
  }

  createFashion(fashion: Partial<Fashion>): Observable<any> {
    return this.http.post(this.apiUrl, fashion);
  }

  updateFashion(id: string, fashion: Partial<Fashion>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, fashion);
  }

  deleteFashion(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
