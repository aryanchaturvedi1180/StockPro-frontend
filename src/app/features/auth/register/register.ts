import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatSelectModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  fullName = ''; email = ''; phone = ''; password = ''; adminSecret = '';
  role: 'ADMIN' | 'MANAGER' | 'STAFF' = 'STAFF';
  loading = false; error = ''; success = false;

  constructor(private authService: AuthService) {}

  onRoleChange(role: 'ADMIN' | 'MANAGER' | 'STAFF'): void {
    this.role = role;
    if (role !== 'ADMIN') {
      this.adminSecret = '';
    }
  }

  requiresAdminSecret(): boolean {
    return this.role === 'ADMIN';
  }

  onSubmit(): void {
    if (this.requiresAdminSecret() && !this.adminSecret.trim()) {
      this.error = 'Admin secret is required for admin registration';
      return;
    }

    this.loading = true; this.error = '';
    this.authService.register({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phone: this.phone,
      role: this.role,
      adminSecret: this.role === 'ADMIN' ? this.adminSecret : undefined
    }).subscribe({
      next: () => { this.success = true; this.loading = false; },
      error: (err) => { this.error = err.error?.message || 'Registration failed'; this.loading = false; }
    });
  }
}
