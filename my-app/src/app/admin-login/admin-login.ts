import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../myservices/admin.service';

@Component({
    selector: 'app-admin-login',
    standalone: false,
    templateUrl: './admin-login.html',
    styleUrl: './admin-login.css'
})
export class AdminLoginComponent {
    email: string = '';
    pass: string = '';
    error: string = '';

    constructor(private adminService: AdminService, private router: Router) { }

    onLogin() {
        if (this.adminService.adminLogin({ email: this.email, password: this.pass })) {
            this.router.navigate(['/admin-dashboard']);
        } else {
            this.error = 'Sai email hoặc mật khẩu quản trị!';
        }
    }
}
