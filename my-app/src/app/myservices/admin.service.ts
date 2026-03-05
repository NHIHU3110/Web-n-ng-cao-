import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private readonly API_URL = 'http://localhost:3003/admin';

    constructor(private http: HttpClient) { }

    getStats(): Observable<any> {
        return this.http.get(`${this.API_URL}/stats`);
    }

    getChartStats(): Observable<any[]> {
        return this.http.get<any[]>(`${this.API_URL}/chart-stats`);
    }

    getOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.API_URL}/orders`);
    }

    getCustomers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.API_URL}/customers`);
    }

    updateOrderStatus(transactionId: string, status: string): Observable<any> {
        return this.http.patch(`${this.API_URL}/orders/${transactionId}/status`, { status });
    }

    isAdminLoggedIn(): boolean {
        // Simple check for demo purposes
        return localStorage.getItem('ADMIN_AUTH') === 'true';
    }

    adminLogin(credentials: any): boolean {
        // Hardcoded admin for demo
        if (credentials.email === 'admin@fashion.com' && credentials.password === 'admin123') {
            localStorage.setItem('ADMIN_AUTH', 'true');
            return true;
        }
        return false;
    }

    adminLogout() {
        localStorage.removeItem('ADMIN_AUTH');
    }
}
