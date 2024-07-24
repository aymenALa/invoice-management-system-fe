import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string = '';
  totalInvoices: number = 0;
  totalAmount: number = 0;
  pendingInvoices: number = 0;
  recentInvoices: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.fetchDashboardData();
    this.initCharts();
  }

  fetchDashboardData() {
    // Simulate API call
    this.username = 'John Doe';
    this.totalInvoices = 150;
    this.totalAmount = 15000;
    this.pendingInvoices = 30;
    this.recentInvoices = [
      { id: 1, client: 'ABC Corp', amount: 1500, date: '2024-07-20', status: 'Paid' },
      { id: 2, client: 'XYZ Ltd', amount: 2000, date: '2024-07-22', status: 'Pending' },
      { id: 3, client: '123 Industries', amount: 1000, date: '2024-07-23', status: 'Overdue' },
    ];
  }

  initCharts() {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Revenue',
          data: [1200, 1900, 3000, 5000, 4000, 6000],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
