import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../myservices/auth.service';

@Component({
    selector: 'app-register',
    standalone: false,
    templateUrl: './register.html',
    styleUrl: './register.css'
})
export class RegisterComponent {
    registerForm: any;
    errorMsg: string = '';
    successMsg: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(5)]],
            confirmPassword: ['', [Validators.required]]
        }, { validator: this.passwordMatchValidator });
    }

    passwordMatchValidator(g: any) {
        return g.get('password').value === g.get('confirmPassword').value
            ? null : { 'mismatch': true };
    }

    onRegister() {
        this.errorMsg = '';
        this.successMsg = '';

        if (this.registerForm.invalid) {
            this.errorMsg = 'Please fill in all fields correctly.';
            return;
        }

        this.authService.register(this.registerForm.value).subscribe({
            next: (res) => {
                this.successMsg = 'Registration successful! Redirecting to login...';
                setTimeout(() => {
                    this.router.navigate(['/ex21-login']);
                }, 2000);
            },
            error: (err) => {
                this.errorMsg = err.error.message || 'Registration failed.';
            }
        });
    }

    get f() {
        return this.registerForm.controls;
    }
}
