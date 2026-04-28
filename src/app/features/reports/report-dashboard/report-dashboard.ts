import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize, forkJoin } from 'rxjs';
import { LowStockResponse, StockValueResponse } from '../../../core/models/report';
import { ReportService } from '../../../core/services/report';

@Component({
  selector: 'app-report-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, MatCardModule, MatProgressSpinnerModule, MatSnackBarModule, MatTableModule, MatTooltipModule],
  templateUrl: './report-dashboard.html',
  styleUrl: './report-dashboard.scss'
})
export class ReportDashboardComponent implements OnInit {
  readonly stockValueColumns = ['productName', 'sku', 'quantity', 'unitPrice', 'totalValue'];
  readonly lowStockColumns = ['productName', 'sku', 'currentQuantity', 'reorderLevel', 'shortage'];

  loading = true;
  stockValue: StockValueResponse | null = null;
  lowStock: LowStockResponse | null = null;

  constructor(private reportService: ReportService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadReports();
  }

  private loadReports(): void {
    this.loading = true;
    forkJoin({
      stockValue: this.reportService.getStockValue(),
      lowStock: this.reportService.getLowStock()
    }).pipe(finalize(() => this.loading = false)).subscribe({
      next: ({ stockValue, lowStock }) => {
        this.stockValue = stockValue;
        this.lowStock = lowStock;
      },
      error: (error) => this.snackBar.open(error.error?.message || 'Unable to load reports', 'Close', { duration: 4000 })
    });
  }
}
