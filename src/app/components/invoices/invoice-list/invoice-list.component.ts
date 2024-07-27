import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe]
})
export class InvoiceListComponent implements OnInit {
  invoices: any[] = [];

  constructor(private invoiceService: InvoiceService, public router: Router) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe(
      response => {
        console.log('Raw response:', response); // Log the raw response
        if (Array.isArray(response)) {
          this.invoices = response;
        } else if (response && response.content && Array.isArray(response.content)) {
          this.invoices = response.content;
        } else {
          console.error('Unexpected response format:', response);
          this.invoices = [];
        }
        console.log('Processed invoices:', this.invoices);
      },
      error => {
        console.error('Error loading invoices', error);
        if (error.error instanceof ErrorEvent) {
          // Client-side or network error occurred
          console.error('An error occurred:', error.error.message);
        } else {
          // Backend returned an unsuccessful response code
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
      }
    );
  }

  deleteInvoice(id: number): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe(
        () => {
          console.log('Invoice deleted successfully');
          this.loadInvoices();
        },
        error => console.error('Error deleting invoice', error)
      );
    }
  }

  downloadInvoicePdf(id: number): void {
    this.invoiceService.downloadInvoicePdf(id).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => console.error('Error downloading PDF', error)
    );
  }
}
