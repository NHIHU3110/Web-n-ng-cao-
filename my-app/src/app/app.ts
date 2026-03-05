import { Component, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './myservices/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-app');

  constructor(private authService: AuthService, private router: Router) { }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/ex21-login']);
  }
}
