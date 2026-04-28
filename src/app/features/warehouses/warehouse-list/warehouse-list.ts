import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize, forkJoin } from 'rxjs';
import { Product } from '../../../core/models/product';
import { StockLevel, StockTransferRequest, StockUpdateRequest, Warehouse, WarehouseRequest } from '../../../core/models/warehouse';
import { AuthService } from '../../../core/services/auth';
import { ProductService } from '../../../core/services/product';
import { WarehouseService } from '../../../core/services/warehouse';

interface WarehouseDialogData {
  warehouse: Warehouse | null;
}

interface StockDialogData {
  mode: 'ADD' | 'DEDUCT';
  warehouse: Warehouse;
  products: Product[];
}

interface TransferDialogData {
  warehouse: Warehouse;
  products: Product[];
  warehouses: Warehouse[];
}

@Component({
  selector: 'app-warehouse-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.warehouse ? 'Edit Warehouse' : 'Add Warehouse' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Location</mat-label>
          <input matInput formControlName="location" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-span">
          <mat-label>Capacity</mat-label>
          <input matInput type="number" min="0" formControlName="capacity" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      <button mat-flat-button color="primary" type="button" [disabled]="form.invalid" (click)="save()">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      min-width: min(680px, 80vw);
      padding-top: 8px;
    }
    .full-span { grid-column: 1 / -1; }
    @media (max-width: 680px) {
      .dialog-form {
        grid-template-columns: 1fr;
        min-width: auto;
      }
    }
  `]
})
export class WarehouseDialogComponent {
  private fb = inject(FormBuilder);

  readonly form;

  constructor(
    public dialogRef: MatDialogRef<WarehouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WarehouseDialogData
  ) {
    this.form = this.fb.nonNullable.group({
      name: [this.data.warehouse?.name ?? '', Validators.required],
      location: [this.data.warehouse?.location ?? '', Validators.required],
      capacity: [this.data.warehouse?.capacity ?? 0, [Validators.required, Validators.min(0)]]
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.getRawValue() as WarehouseRequest);
  }
}

@Component({
  selector: 'app-warehouse-stock-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.mode === 'ADD' ? 'Add Stock' : 'Deduct Stock' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Product</mat-label>
          <mat-select formControlName="productId">
            <mat-option *ngFor="let product of data.products" [value]="product.id">
              {{ product.name }} ({{ product.sku }})
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Quantity</mat-label>
          <input matInput type="number" min="1" formControlName="quantity" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      <button mat-flat-button color="primary" type="button" [disabled]="form.invalid" (click)="save()">Submit</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      min-width: min(640px, 78vw);
      padding-top: 8px;
    }
    @media (max-width: 640px) {
      .dialog-form {
        grid-template-columns: 1fr;
        min-width: auto;
      }
    }
  `]
})
export class WarehouseStockDialogComponent {
  private fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    productId: [0, [Validators.required, Validators.min(1)]],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });

  constructor(
    public dialogRef: MatDialogRef<WarehouseStockDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StockDialogData
  ) {}

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close({ warehouseId: this.data.warehouse.id, ...this.form.getRawValue() } as StockUpdateRequest);
  }
}

@Component({
  selector: 'app-warehouse-transfer-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Transfer Stock</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Product</mat-label>
          <mat-select formControlName="productId">
            <mat-option *ngFor="let product of data.products" [value]="product.id">
              {{ product.name }} ({{ product.sku }})
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Destination Warehouse</mat-label>
          <mat-select formControlName="toWarehouseId">
            <mat-option *ngFor="let warehouse of destinationWarehouses" [value]="warehouse.id">
              {{ warehouse.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Quantity</mat-label>
          <input matInput type="number" min="1" formControlName="quantity" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      <button mat-flat-button color="primary" type="button" [disabled]="form.invalid" (click)="save()">Transfer</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      min-width: min(700px, 80vw);
      padding-top: 8px;
    }
    @media (max-width: 680px) {
      .dialog-form {
        grid-template-columns: 1fr;
        min-width: auto;
      }
    }
  `]
})
export class WarehouseTransferDialogComponent {
  private fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    productId: [0, [Validators.required, Validators.min(1)]],
    toWarehouseId: [0, [Validators.required, Validators.min(1)]],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });

  get destinationWarehouses(): Warehouse[] {
    return this.data.warehouses.filter((warehouse) => warehouse.id !== this.data.warehouse.id);
  }

  constructor(
    public dialogRef: MatDialogRef<WarehouseTransferDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransferDialogData
  ) {}

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close({ fromWarehouseId: this.data.warehouse.id, ...this.form.getRawValue() } as StockTransferRequest);
  }
}

@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './warehouse-list.html',
  styleUrl: './warehouse-list.scss'
})
export class WarehouseListComponent implements OnInit {
  loading = true;
  warehouses: Warehouse[] = [];
  stockLevels: StockLevel[] = [];
  products: Product[] = [];
  productNameMap = new Map<number, string>();
  canWrite = false;

  constructor(
    private warehouseService: WarehouseService,
    private productService: ProductService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.canWrite = this.authService.canWriteInventory();
    this.loadData();
  }

  getWarehouseStock(warehouseId: number): Array<StockLevel & { productName: string }> {
    return this.stockLevels
      .filter((stock) => stock.warehouseId === warehouseId)
      .map((stock) => ({ ...stock, productName: this.productNameMap.get(stock.productId) ?? `Product #${stock.productId}` }))
      .sort((first, second) => second.quantity - first.quantity);
  }

  getWarehouseUnits(warehouseId: number): number {
    return this.getWarehouseStock(warehouseId).reduce((sum, stock) => sum + stock.quantity, 0);
  }

  openWarehouseDialog(warehouse: Warehouse | null = null): void {
    if (!this.canWrite) return;
    this.dialog.open(WarehouseDialogComponent, { width: '700px', data: { warehouse } })
      .afterClosed()
      .subscribe((payload?: WarehouseRequest) => {
        if (!payload) return;
        const request$ = warehouse
          ? this.warehouseService.update(warehouse.id, payload)
          : this.warehouseService.create(payload);
        request$.subscribe({
          next: () => {
            this.snackBar.open(`Warehouse ${warehouse ? 'updated' : 'created'} successfully`, 'Close', { duration: 3000 });
            this.loadData();
          },
          error: (error) => this.showError(error.error?.message || 'Unable to save warehouse')
        });
      });
  }

  toggleStatus(warehouse: Warehouse): void {
    if (!this.canWrite) return;
    const request$ = warehouse.isActive
      ? this.warehouseService.deactivate(warehouse.id)
      : this.warehouseService.activate(warehouse.id);
    request$.subscribe({
      next: () => {
        this.snackBar.open(`Warehouse ${warehouse.isActive ? 'deactivated' : 'reactivated'}`, 'Close', { duration: 3000 });
        this.loadData();
      },
      error: (error) => this.showError(error.error?.message || 'Unable to update warehouse status')
    });
  }

  openStockDialog(mode: 'ADD' | 'DEDUCT', warehouse: Warehouse): void {
    if (!this.canWrite) return;
    this.dialog.open(WarehouseStockDialogComponent, { width: '640px', data: { mode, warehouse, products: this.products } })
      .afterClosed()
      .subscribe((payload?: StockUpdateRequest) => {
        if (!payload) return;
        const request$ = mode === 'ADD'
          ? this.warehouseService.addStock(payload)
          : this.warehouseService.deductStock(payload);
        request$.subscribe({
          next: () => {
            this.snackBar.open(`Stock ${mode === 'ADD' ? 'added' : 'deducted'} successfully`, 'Close', { duration: 3000 });
            this.loadData();
          },
          error: (error) => this.showError(error.error?.message || 'Unable to update stock')
        });
      });
  }

  openTransferDialog(warehouse: Warehouse): void {
    if (!this.canWrite) return;
    this.dialog.open(WarehouseTransferDialogComponent, {
      width: '700px',
      data: { warehouse, products: this.products, warehouses: this.warehouses }
    }).afterClosed().subscribe((payload?: StockTransferRequest) => {
      if (!payload) return;
      this.warehouseService.transferStock(payload).subscribe({
        next: () => {
          this.snackBar.open('Stock transferred successfully', 'Close', { duration: 3000 });
          this.loadData();
        },
        error: (error) => this.showError(error.error?.message || 'Unable to transfer stock')
      });
    });
  }

  private loadData(): void {
    this.loading = true;
    forkJoin({
      warehouses: this.warehouseService.getAll(),
      stockLevels: this.warehouseService.getAllStock(),
      products: this.productService.getAll()
    }).pipe(finalize(() => this.loading = false)).subscribe({
      next: ({ warehouses, stockLevels, products }) => {
        this.warehouses = warehouses;
        this.stockLevels = stockLevels;
        this.products = products;
        this.productNameMap = new Map(products.map((product) => [product.id, product.name]));
      },
      error: (error) => this.showError(error.error?.message || 'Unable to load warehouse data')
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 4000 });
  }
}
