import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { IBook } from '../myclass/ibook';

@Injectable({
  providedIn: 'root',
})
export class BookAPIservice {
  constructor(private _http: HttpClient) { }
  getBooks(): Observable<any> {
    return this._http.get<any>("/books").pipe(
      retry(3),
      catchError(this.handleError))
  }

  postBook(aBook: any): Observable<any> {
    return this._http.post<any>("/books", aBook).pipe(
      retry(3),
      catchError(this.handleError))
  }

  putBook(aBook: any): Observable<any> {
    return this._http.put<any>("/books", aBook).pipe(
      retry(3),
      catchError(this.handleError))
  }

  deleteBook(bookId: string): Observable<any> {
    return this._http.delete<any>("/books/" + bookId).pipe(
      retry(3),
      catchError(this.handleError))
  }

  getBookDetails(bookId: string): Observable<any> {
    return this._http.get<any>("/books/" + bookId).pipe(
      retry(3),
      catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage += `\nServer Details: ${error.error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}