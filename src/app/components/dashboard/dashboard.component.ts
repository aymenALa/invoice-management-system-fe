import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../services/auth.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};
  recentInvoices: any[] = [];
  barChart: any;
  pieChart: any;
  username: string | null = null;

  constructor(private dashboardService: DashboardService,
              private authService: AuthService
    ) { }

  ngOnInit() {
    this.loadDashboardData();
    this.username = this.authService.getUsername();
  }

  loadDashboardData() {
    this.dashboardService.getDashboardData().subscribe(
      data => {
        this.dashboardData = data;
        this.recentInvoices = data.recentInvoices || [];
        this.initCharts();
      },
      error => console.error('Error loading dashboard data:', error)
    );
  }

  initCharts() {
    if (this.recentInvoices.length > 0) {
      this.initBarChart();
      this.initPieChart();
    }
  }

  initBarChart() {
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.recentInvoices.map(invoice => invoice.invoiceNumber),
        datasets: [{
          label: 'Invoice Amounts',
          data: this.recentInvoices.map(invoice => invoice.totalAmount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
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

  initPieChart() {
    const ctx = document.getElementById('statusChart') as HTMLCanvasElement;
    const statusCounts = this.recentInvoices.reduce((acc, invoice) => {
      acc[invoice.status] = (acc[invoice.status] || 0) + 1;
      return acc;
    }, {});

    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(statusCounts),
        datasets: [{
          data: Object.values(statusCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
          ],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Invoice Status Distribution'
          }
        }
      }
    });
  }
}
