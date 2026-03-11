import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../myservices/payment.service';
import { AuthService } from '../myservices/auth.service';
import { CartService } from '../myservices/cart';

@Component({
    selector: 'app-checkout',
    standalone: false,
    templateUrl: './checkout.html',
    styleUrl: './checkout.css'
})
export class CheckoutComponent implements OnInit {
    cartItems: any[] = [];
    totalAmount: number = 0;
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
        private cartService: CartService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.cartService.getCart().subscribe(items => {
            this.cartItems = items || [];
            if (this.cartItems.length === 0) {
                this.router.navigate(['/fashions']);
                return;
            }
            this.calculateTotal();
        });

        this.authService.getCurrentUser().subscribe(user => {
            this.currentUser = user;
            if (user) {
                this.customerInfo.fullName = user.name || '';
            }
        });
    }

    calculateTotal() {
        this.totalAmount = this.cartItems.reduce((acc, item) => {
            let price = item.fashion_price || item.price || 100;
            return acc + (item.quantity * price);
        }, 0);
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
            amount: this.totalAmount,
            items: this.cartItems.map(item => ({
                id: item._id,
                name: item.fashion_subject,
                quantity: item.quantity,
                price: item.fashion_price || item.price || 100
            })),
            customerInfo: this.customerInfo,
            paymentMethod: 'COD',
            status: 'PENDING_COD'
        };

        this.paymentService.processPayment(paymentPayload).subscribe({
            next: (res) => {
                if (res && res.transactionId) {
                    this.transactionId = res.transactionId;
                    this.isProcessing = false;
                    this.cartService.clearCart().subscribe();
                } else {
                    this.transactionId = 'TRX-' + Date.now();
                    this.isProcessing = false;
                }
                this.cdr.detectChanges();
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
        this.router.navigate(['/cart']);
    }
}
