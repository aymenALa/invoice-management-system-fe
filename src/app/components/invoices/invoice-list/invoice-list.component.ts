import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
  imports: [DatePipe, NgFor],
  standalone: true
})
export class InvoiceListComponent implements OnInit {
  invoices: any[] = [];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getInvoices().subscribe(
      data => this.invoices = data,
      error => console.error('Error loading invoices', error)
    );
  }

  createInvoice() {
    // This is a placeholder. In a real application, you'd open a modal or navigate to a create invoice page
    const newInvoice = {
      clientName: 'New Client',
      amount: 0,
      date: new Date(),
      status: 'PENDING'
    };

    this.invoiceService.createInvoice(newInvoice).subscribe(
      createdInvoice => {
        console.log('Invoice created successfully', createdInvoice);
        this.loadInvoices(); // Refresh the list
      },
      error => console.error('Error creating invoice', error)
    );
  }

  updateInvoice(id: number) {
    // This is a placeholder. In a real application, you'd open a modal or navigate to an update invoice page
    const updatedInvoice = {
      clientName: 'Updated Client',
      amount: 100,
      date: new Date(),
      status: 'PAID'
    };

    this.invoiceService.updateInvoice(id, updatedInvoice).subscribe(
      updated => {
        console.log('Invoice updated successfully', updated);
        this.loadInvoices(); // Refresh the list
      },
      error => console.error('Error updating invoice', error)
    );
  }

  deleteInvoice(id: number) {
    this.invoiceService.deleteInvoice(id).subscribe(
      () => {
        console.log('Invoice deleted successfully');
        this.loadInvoices(); // Refresh the list
      },
      error => console.error('Error deleting invoice', error)
    );
  }

  downloadInvoicePdf(id: number) {
    this.invoiceService.getInvoicePdf(id).subscribe(
      (pdfBlob: Blob) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => console.error('Error downloading PDF', error)
    );
  }

  downloadClientInvoicesPdf(clientId: number) {
    this.invoiceService.getClientInvoicesPdf(clientId).subscribe(
      (pdfBlob: Blob) => {
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      error => console.error('Error downloading client invoices PDF', error)
    );
  }
}
