import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth';

type UserRole = 'ADMIN' | 'MANAGER' | 'STAFF';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  fullName = '';
  email = '';
  phone = '';
  password = '';
  adminSecret = '';

  role: UserRole = 'STAFF';

  loading = false;
  error = '';
  success = false;

  validationErrors: Record<string, string> = {};

  constructor(private authService: AuthService) {}

  onRoleChange(role: UserRole): void {
    this.role = role;

    if (role !== 'ADMIN') {
      this.adminSecret = '';
      delete this.validationErrors['adminSecret'];
    }
  }

  requiresAdminSecret(): boolean {
    return this.role === 'ADMIN';
  }

  fieldError(fieldName: string): string {
    return this.validationErrors[fieldName] || '';
  }

  onSubmit(form: NgForm): void {
    this.clearErrors();

    if (form.invalid) {
      form.control.markAllAsTouched();
      this.error = 'Please fix the highlighted errors.';
      return;
    }

    if (this.requiresAdminSecret() && !this.adminSecret.trim()) {
      this.validationErrors['adminSecret'] = 'Admin secret is required for admin registration';
      this.error = 'Please fix the highlighted errors.';
      return;
    }

    this.loading = true;

    this.authService.register({
      fullName: this.fullName.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password,
      phone: this.phone.trim(),
      role: this.role,
      adminSecret: this.role === 'ADMIN' ? this.adminSecret.trim() : undefined
    }).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.handleBackendError(err);
      }
    });
  }

  private handleBackendError(err: any): void {
    const backendError = err?.error;

    this.validationErrors = {};
    this.error = '';

    if (!backendError) {
      this.error = 'Something went wrong. Please try again.';
      return;
    }

    if (typeof backendError === 'string') {
      this.error = backendError;
      return;
    }

    if (this.isValidationErrorMap(backendError)) {
      this.validationErrors = backendError;
      this.error = 'Please fix the highlighted errors.';
      return;
    }

    if (backendError.message) {
      this.error = backendError.message;
      return;
    }

    this.error = 'Registration failed. Please try again.';
  }

  private isValidationErrorMap(value: unknown): value is Record<string, string> {
    return !!value
      && typeof value === 'object'
      && !Array.isArray(value)
      && Object.values(value).every((item) => typeof item === 'string');
  }

  private clearErrors(): void {
    this.error = '';
    this.success = false;
    this.validationErrors = {};
  }
}
