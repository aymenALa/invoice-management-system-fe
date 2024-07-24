import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8080/api/invoices';

  constructor(private http: HttpClient) { }

  getInvoices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createInvoice(invoice: any): Observable<any> {
    return this.http.post(this.apiUrl, invoice);
  }

  updateInvoice(id: number, invoice: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, invoice);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getInvoicePdf(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/pdf`, {
      responseType: 'blob'
    });
  }

  getClientInvoicesPdf(clientId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/client/${clientId}/pdf`, {
      responseType: 'blob'
    });
  }
}
