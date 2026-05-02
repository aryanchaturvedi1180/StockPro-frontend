import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { catchError, forkJoin, of } from 'rxjs';
import { ProductService } from '../../core/services/product';
import { WarehouseService } from '../../core/services/warehouse';
import { AlertService } from '../../core/services/alert';
import { PurchaseOrderService } from '../../core/services/purchase-order';
import { AuthService } from '../../core/services/auth';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatProgressSpinnerModule, MatIconModule, MatTooltipModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  loading = true;
  fullName = '';
  totalProducts = 0; activeProducts = 0;
  totalWarehouses = 0; unreadAlerts = 0; pendingPOs = 0;
  recentAlerts: any[] = []; draftPOs: any[] = [];

  constructor(
    private productService: ProductService,
    private warehouseService: WarehouseService,
    private alertService: AlertService,
    private poService: PurchaseOrderService,
    private authService: AuthService
  ) {
    this.fullName = this.authService.getFullName() || '';
  }

  ngOnInit(): void {
    const canViewAlerts = this.authService.canAccessAlerts();

    forkJoin({
      products: this.productService.getAll().pipe(catchError(() => of([]))),
      warehouses: this.warehouseService.getActive().pipe(catchError(() => of([]))),
      alerts: canViewAlerts ? this.alertService.getAll().pipe(catchError(() => of([]))) : of([]),
      unread: canViewAlerts ? this.alertService.getUnread().pipe(catchError(() => of([]))) : of([]),
      pos: this.poService.getAll().pipe(catchError(() => of([])))
    }).subscribe({
      next: (data) => {
        this.totalProducts = data.products.length;
        this.activeProducts = data.products.filter(p => p.isActive).length;
        this.totalWarehouses = data.warehouses.length;
        
        // Filter unread alerts that are not acknowledged
        const activeAlerts = data.alerts.filter(a => !a.isRead && !a.isAcknowledged);
        this.unreadAlerts = activeAlerts.length;
        this.recentAlerts = activeAlerts.slice(0, 5);
        
        this.pendingPOs = data.pos.filter(p => p.status === 'DRAFT').length;
        this.draftPOs = data.pos.filter(p => p.status === 'DRAFT').slice(0, 5);
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}
