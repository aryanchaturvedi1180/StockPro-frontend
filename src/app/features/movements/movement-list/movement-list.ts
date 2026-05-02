import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { finalize, forkJoin } from 'rxjs';
import { MovementType, StockMovement } from '../../../core/models/movement';
import { Product } from '../../../core/models/product';
import { Warehouse } from '../../../core/models/warehouse';
import { MovementService } from '../../../core/services/movement';
import { ProductService } from '../../../core/services/product';
import { WarehouseService } from '../../../core/services/warehouse';

@Component({
  selector: 'app-movement-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatIconModule, MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule, MatTableModule],
  templateUrl: './movement-list.html',
  styleUrl: './movement-list.scss'
})
export class MovementListComponent implements OnInit {
  readonly displayedColumns = ['createdAt', 'type', 'product', 'warehouse', 'quantity', 'reference', 'performedBy', 'notes'];

  loading = true;
  movements: StockMovement[] = [];
  products: Product[] = [];
  warehouses: Warehouse[] = [];
  typeFilter: 'ALL' | MovementType = 'ALL';
  productFilter = 0;
  warehouseFilter = 0;

  constructor(
    private movementService: MovementService,
    private productService: ProductService,
    private warehouseService: WarehouseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  get filteredMovements(): StockMovement[] {
    return this.movements.filter((movement) =>
      (this.typeFilter === 'ALL' || movement.movementType === this.typeFilter) &&
      (!this.productFilter || movement.productId === this.productFilter) &&
      (!this.warehouseFilter || movement.warehouseId === this.warehouseFilter)
    );
  }

  getProductName(id: number): string {
    return this.products.find((product) => product.id === id)?.name ?? `Product #${id}`;
  }

  getWarehouseName(id: number): string {
    return this.warehouses.find((warehouse) => warehouse.id === id)?.name ?? `Warehouse #${id}`;
  }

  private loadData(): void {
    this.loading = true;
    forkJoin({
      movements: this.movementService.getAll(),
      products: this.productService.getAll(),
      warehouses: this.warehouseService.getAll()
    }).pipe(finalize(() => this.loading = false)).subscribe({
      next: ({ movements, products, warehouses }) => {
        this.movements = movements;
        this.products = products;
        this.warehouses = warehouses;
      },
      error: (error) => this.snackBar.open(error.error?.message || 'Unable to load movements', 'Close', { duration: 4000 })
    });
  }
}
