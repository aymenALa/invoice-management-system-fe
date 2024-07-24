import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex justify-between items-center">
        <a routerLink="/dashboard" class="text-white font-bold">Invoice App</a>
        <ul class="flex space-x-4">
          <li><a routerLink="/dashboard" class="text-white">Dashboard</a></li>
          <li><a routerLink="/invoices" class="text-white">Invoices</a></li>
          <li><button (click)="logout()" class="text-white">Logout</button></li>
        </ul>
      </div>
    </nav>
  `,
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
