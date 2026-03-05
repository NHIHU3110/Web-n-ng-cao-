import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../myservices/payment.service';
import { AuthService } from '../myservices/auth.service';

@Component({
    selector: 'app-checkout',
    standalone: false,
    templateUrl: './checkout.html',
    styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {
    order: any = null;
    currentUser: any = null;
    isProcessing: boolean = false;
    transactionId: string = '';

    customerInfo: any = {
        fullName: '',
        phoneNumber: '',
        address: '',
        notes: ''
    };

    constructor(
        private router: Router,
        private paymentService: PaymentService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        const orderData = localStorage.getItem('PENDING_ORDER');
        if (orderData) {
            this.order = JSON.parse(orderData);
        } else {
            this.router.navigate(['/fashions']);
        }

        this.authService.getCurrentUser().subscribe(user => {
            this.currentUser = user;
            if (user) {
                this.customerInfo.fullName = user.name || '';
            }
        });
    }

    onConfirmPayment(): void {
        if (!this.customerInfo.fullName || !this.customerInfo.phoneNumber || !this.customerInfo.address) {
            alert('Vui lòng điền đầy đủ thông tin giao hàng!');
            return;
        }

        this.isProcessing = true;

        const paymentPayload = {
            userEmail: this.currentUser?.email,
            userName: this.currentUser?.name,
            amount: 150000, // Fixed price for demo
            productId: this.order?._id,
            productName: this.order?.fashion_subject,
            customerInfo: this.customerInfo,
            paymentMethod: 'COD',
            status: 'PENDING_COD'
        };

        this.paymentService.processPayment(paymentPayload).subscribe({
            next: (res) => {
                console.log('Payment Response:', res);
                if (res && res.transactionId) {
                    this.transactionId = res.transactionId;
                    this.isProcessing = false;
                    localStorage.removeItem('PENDING_ORDER');
                    this.cdr.detectChanges(); // Force UI update
                } else {
                    console.error('Response missing transactionId', res);
                    this.transactionId = 'TRX-' + Date.now();
                    this.isProcessing = false;
                    this.cdr.detectChanges();
                }
            },
            error: (err) => {
                console.error('Payment Error:', err);
                alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
                this.isProcessing = false;
                this.cdr.detectChanges();
            }
        });
    }

    cancelCheckout(): void {
        localStorage.removeItem('PENDING_ORDER');
        this.router.navigate(['/fashions']);
    }
}
