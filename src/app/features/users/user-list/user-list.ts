import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { User } from '../../../core/models/user';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserListComponent implements OnInit {
  readonly displayedColumns = ['fullName', 'email', 'phone', 'role', 'status', 'lastLoginAt', 'actions'];

  loading = true;
  users: User[] = [];

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  toggleStatus(user: User): void {
    const request$ = user.isActive
      ? this.authService.deactivateUser(user.id)
      : this.authService.reactivateUser(user.id);

    request$.subscribe({
      next: () => {
        this.snackBar.open(`User ${user.isActive ? 'deactivated' : 'reactivated'}`, 'Close', { duration: 3000 });
        this.loadUsers();
      },
      error: (error) => this.showError(error.error?.message || 'Unable to update user')
    });
  }

  private loadUsers(): void {
    this.loading = true;
    this.authService.getAllUsers().pipe(finalize(() => this.loading = false)).subscribe({
      next: (users) => this.users = users,
      error: (error) => this.showError(error.error?.message || 'Unable to load users')
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 4000 });
  }
}
