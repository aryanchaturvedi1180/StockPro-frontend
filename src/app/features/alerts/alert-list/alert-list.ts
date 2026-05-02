import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { Alert } from '../../../core/models/alert';
import { AlertService } from '../../../core/services/alert';

@Component({
  selector: 'app-alert-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './alert-list.html',
  styleUrl: './alert-list.scss'
})
export class AlertListComponent implements OnInit {
  loading = true;
  alerts: Alert[] = [];
  activeFilter: 'ALL' | 'UNREAD' | 'READ' | 'ACKNOWLEDGED' = 'ALL';

  constructor(private alertService: AlertService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadAlerts();
  }

  get unreadCount(): number {
    return this.alerts.filter((alert) => !alert.isRead).length;
  }

  get filteredAlerts(): Alert[] {
    switch (this.activeFilter) {
      case 'UNREAD':
        return this.alerts.filter(a => !a.isRead);
      case 'READ':
        return this.alerts.filter(a => a.isRead);
      case 'ACKNOWLEDGED':
        return this.alerts.filter(a => a.isAcknowledged);
      default:
        return this.alerts;
    }
  }

  setFilter(filter: 'ALL' | 'UNREAD' | 'READ' | 'ACKNOWLEDGED'): void {
    this.activeFilter = filter;
  }

  markAsRead(alert: Alert): void {
    this.alertService.markAsRead(alert.id).subscribe({
      next: () => {
        this.snackBar.open('Alert marked as read', 'Close', { duration: 2500 });
        this.loadAlerts();
      },
      error: (error) => this.showError(error.error?.message || 'Unable to mark alert as read')
    });
  }

  acknowledge(alert: Alert): void {
    this.alertService.acknowledge(alert.id).subscribe({
      next: () => {
        this.snackBar.open('Alert acknowledged', 'Close', { duration: 2500 });
        this.loadAlerts();
      },
      error: () => this.showError('Unable to acknowledge alert')
    });
  }

  markAllAsRead(): void {
    this.alertService.markAllAsRead().subscribe({
      next: () => {
        this.snackBar.open('All alerts marked as read', 'Close', { duration: 2500 });
        this.loadAlerts();
      },
      error: (error) => this.showError(error.error?.message || 'Unable to update alerts')
    });
  }

  private loadAlerts(): void {
    this.loading = true;
    this.alertService.getAll().pipe(finalize(() => this.loading = false)).subscribe({
      next: (alerts) => this.alerts = alerts,
      error: (error) => this.showError(error.error?.message || 'Unable to load alerts')
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 4000 });
  }
}
