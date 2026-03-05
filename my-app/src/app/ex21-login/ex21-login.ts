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

  messageJson: string = '';   // hiển thị JSON dưới nút Login (màu đỏ)
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

  ngOnInit(): void {
    // load login đã lưu
    const saved = localStorage.getItem('LOGIN_INFO');
    if (saved) {
      try {
        const obj = JSON.parse(saved);
        this.loginForm.patchValue({
          email: obj.email || '',
          password: obj.password || '',
          remember: true
        });
      } catch { }
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
        // Remember me (LocalStorage)
        if (data.remember) {
          localStorage.setItem('LOGIN_INFO', JSON.stringify({ email: data.email, password: data.password }));
        } else {
          localStorage.removeItem('LOGIN_INFO');
        }

        this.messageJson = JSON.stringify(res.user);
        this.router.navigateByUrl('/fashions'); // Navigate to a main page after login
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