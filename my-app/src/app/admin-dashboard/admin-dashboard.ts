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
        this.adminService.getStats().subscribe(data => {
            this.stats = data;
            this.cdr.detectChanges();
        });
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
            legend: { display: true, position: 'top' }
        },
        scales: {
            y: { // Axis for Revenue
                type: 'linear',
                display: true,
                position: 'left',
                beginAtZero: true,
                grid: { color: '#f1f5f9' },
                ticks: { color: '#64748b' },
                title: { display: true, text: 'Doanh thu (VNĐ)', color: '#3b82f6' }
            },
            y1: { // Axis for Order Count
                type: 'linear',
                display: true,
                position: 'right',
                beginAtZero: true,
                grid: { drawOnChartArea: false },
                ticks: { color: '#ef4444', stepSize: 1 },
                title: { display: true, text: 'Số đơn hàng', color: '#ef4444' }
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
                datasets: [
                    {
                        data: data.map((d: any) => d.revenue),
                        label: 'Doanh thu (VNĐ)',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        borderColor: '#3b82f6',
                        pointBackgroundColor: '#2563eb',
                        pointBorderColor: '#fff',
                        fill: 'origin',
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        data: data.map((d: any) => d.orderCount),
                        label: 'Số đơn hàng',
                        backgroundColor: 'transparent',
                        borderColor: '#ef4444',
                        pointBackgroundColor: '#ef4444',
                        pointBorderColor: '#fff',
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            };
            this.cdr.detectChanges(); // Force chart to re-render
        });
    }

    loadOrders() {
        this.adminService.getOrders().subscribe(data => {
            this.orders = data;
            this.cdr.detectChanges();
        });
    }

    loadCustomers() {
        this.adminService.getCustomers().subscribe(data => {
            this.customers = data;
            this.cdr.detectChanges();
        });
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
