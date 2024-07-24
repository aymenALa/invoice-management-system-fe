import { Routes } from '@angular/router';
import { AuthFormComponent } from './components/auth/auth-form/auth-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvoiceListComponent } from './components/invoices/invoice-list/invoice-list.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthFormComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'invoices', component: InvoiceListComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
];
