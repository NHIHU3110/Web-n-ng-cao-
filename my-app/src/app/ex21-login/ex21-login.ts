import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../myservices/auth.service';

@Component({
  selector: 'app-ex21-login',
  standalone: false,
  templateUrl: './ex21-login.html',
  styleUrl: './ex21-login.css',
})
export class Ex21Login implements OnInit {

  messageJson: string = '';
  errorMsg: string = '';
  loginForm: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      remember: [false]
    });
  }

  // Ex61: Helper to read a cookie by name
  private getCookie(name: string): string {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) return decodeURIComponent(value || '');
    }
    return '';
  }

  // Ex61: Helper to set a cookie
  private setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  }

  // Ex61: Helper to delete a cookie
  private deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  }

  ngOnInit(): void {
    // Ex61: Read saved login info from Cookie
    const savedEmail = this.getCookie('saved_email');
    const savedPassword = this.getCookie('saved_password');
    if (savedEmail) {
      this.loginForm.patchValue({
        email: savedEmail,
        password: savedPassword,
        remember: true
      });
    }
  }

  onLogin(): void {
    this.errorMsg = '';
    this.messageJson = '';
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      this.errorMsg = 'Invalid email or password.';
      return;
    }

    const data = this.loginForm.value;

    this.authService.login(data).subscribe({
      next: (res) => {
        // Ex61: Save or clear login cookie based on checkbox
        if (data.remember) {
          this.setCookie('saved_email', data.email, 7);
          this.setCookie('saved_password', data.password, 7);
        } else {
          this.deleteCookie('saved_email');
          this.deleteCookie('saved_password');
        }

        this.messageJson = JSON.stringify(res.user);
        this.router.navigateByUrl('/fashions');
      },
      error: (err) => {
        this.errorMsg = err.error.message || 'Login failed.';
      }
    });
  }

  get f() {
    return this.loginForm.controls;
  }
}