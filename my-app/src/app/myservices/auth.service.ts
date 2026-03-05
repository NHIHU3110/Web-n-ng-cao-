import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly AUTH_URL = 'http://localhost:3003';
    private currentUserSubject = new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) {
        const savedUser = localStorage.getItem('USER_AUTH');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.AUTH_URL}/login`, credentials).pipe(
            tap((res: any) => {
                localStorage.setItem('USER_AUTH', JSON.stringify(res.user));
                this.currentUserSubject.next(res.user);
            })
        );
    }

    register(userData: any): Observable<any> {
        return this.http.post(`${this.AUTH_URL}/register`, userData);
    }

    logout() {
        localStorage.removeItem('USER_AUTH');
        this.currentUserSubject.next(null);
    }

    isAuthenticated(): boolean {
        return this.currentUserSubject.value !== null;
    }

    getCurrentUser() {
        return this.currentUserSubject.asObservable();
    }
}
