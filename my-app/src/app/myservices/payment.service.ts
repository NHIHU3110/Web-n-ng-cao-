import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private readonly PAYMENT_URL = 'http://localhost:3003';

    constructor(private http: HttpClient) { }

    processPayment(paymentData: any): Observable<any> {
        return this.http.post(`${this.PAYMENT_URL}/process-payment`, paymentData);
    }
}
