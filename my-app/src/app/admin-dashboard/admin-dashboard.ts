import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from '../myservices/admin.service';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
    selector: 'app-admin-dashboard',
    standalone: false,
    templateUrl: './admin-dashboard.html',
    styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
    stats: any = {
        totalOrders: 0,
        totalCustomers: 0,
        totalRevenue: 0
    };
    orders: any[] = [];
    customers: any[] = [];
    activeTab: string = 'stats'; // stats, orders, customers

    constructor(private adminService: AdminService, private router: Router, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        if (!this.adminService.isAdminLoggedIn()) {
            this.router.navigate(['/admin-login']);
            return;
        }
        this.loadStats();
        this.loadOrders();
        this.loadCustomers();
    }

    loadStats() {
        this.adminService.getStats().subscribe(data => this.stats = data);
        this.loadChartData();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                label: 'Doanh thu (VNĐ)',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: '#3b82f6',
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#fff',
                fill: 'origin',
                tension: 0.4
            }
        ],
        labels: []
    };

    public lineChartOptions: ChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: { color: '#64748b' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#64748b' }
            }
        }
    };

    public lineChartType: ChartType = 'line';

    loadChartData() {
        this.adminService.getChartStats().subscribe(data => {
            this.lineChartData = {
                labels: data.map((d: any) => d.label),
                datasets: [{
                    data: data.map((d: any) => d.revenue),
                    label: 'Doanh thu (VNĐ)',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: '#3b82f6',
                    pointBackgroundColor: '#2563eb',
                    pointBorderColor: '#fff',
                    fill: 'origin',
                    tension: 0.4
                }]
            };
            this.cdr.detectChanges(); // Force chart to re-render
        });
    }

    loadOrders() {
        this.adminService.getOrders().subscribe(data => this.orders = data);
    }

    loadCustomers() {
        this.adminService.getCustomers().subscribe(data => this.customers = data);
    }

    setTab(tab: string) {
        this.activeTab = tab;
    }

    changeStatus(order: any, newStatus: string) {
        if (confirm(`Xác nhận đổi trạng thái đơn hàng ${order.transactionId} sang ${newStatus}?`)) {
            this.adminService.updateOrderStatus(order.transactionId, newStatus).subscribe(() => {
                this.loadOrders();
                this.loadStats();
                alert('Cập nhật trạng thái thành công!');
            });
        }
    }

    logout() {
        this.adminService.adminLogout();
        this.router.navigate(['/admin-login']);
    }
}
