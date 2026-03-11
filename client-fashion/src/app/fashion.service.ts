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

  getStyles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/styles`);
  }

  getFashionsByStyle(style: string): Observable<Fashion[]> {
    return this.http.get<Fashion[]>(`${this.apiUrl}/style/${style}`);
  }

  getFashionById(id: string): Observable<Fashion> {
    return this.http.get<Fashion>(`${this.apiUrl}/${id}`);
  }
}
