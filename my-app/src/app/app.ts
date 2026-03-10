import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './myservices/auth.service';
import { CartService } from './myservices/cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');
  cartCount$: Observable<number>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {
    this.cartCount$ = this.cartService.cartCount$;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/ex21-login']);
  }
}
