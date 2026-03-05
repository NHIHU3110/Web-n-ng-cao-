import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Fashion } from '../models/Fashion';

@Injectable({
    providedIn: 'root'
})
export class FashionApiService {
    constructor(private _http: HttpClient) { }

    getFashions(): Observable<any> {
        return this._http.get<any>("/fashions").pipe(
            retry(3),
            catchError(this.handleError)
        )
    }

    getFashion(id: string): Observable<any> {
        return this._http.get<any>("/fashions/" + id).pipe(
            retry(3),
            catchError(this.handleError)
        )
    }

    handleError(error: HttpErrorResponse) {
        return throwError(() => new Error(error.message))
    }
}
