import { Component, OnInit } from '@angular/core';
import { CartService } from '../myservices/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private _cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this._cartService.getCart().subscribe({
      next: (data) => {
        this.cartItems = data || [];
        this.calculateTotal();
      },
      error: (err) => console.error("Error loading cart:", err)
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((acc, item) => {
      // If price is missing for Fashion items, assume 100 as default
      let price = item.price || 100;
      return acc + (item.quantity * price);
    }, 0);
  }

  updateQuantity(id: string, event: Event) {
    const quantity = parseInt((event.target as HTMLSelectElement).value);
    this._cartService.updateCart(id, quantity).subscribe({
      next: (data) => {
         this.cartItems = data || [];
         this.calculateTotal();
      },
      error: (err) => console.error(err)
    });
  }

  removeItem(id: string) {
    this._cartService.removeFromCart(id).subscribe({
      next: (data) => {
         this.cartItems = data || [];
         this.calculateTotal();
      },
      error: (err) => console.error(err)
    });
  }

  continueShopping() {
    this.router.navigate(['/fashions']);
  }
}
