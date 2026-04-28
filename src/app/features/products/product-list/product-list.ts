import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { finalize } from 'rxjs';
import { Product, ProductRequest } from '../../../core/models/product';
import { AuthService } from '../../../core/services/auth';
import { ProductService } from '../../../core/services/product';

interface ProductDialogData {
  product: Product | null;
}

@Component({
  selector: 'app-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.product ? 'Edit Product' : 'Add Product' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>SKU</mat-label>
          <input matInput formControlName="sku" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Barcode</mat-label>
          <input matInput formControlName="barcode" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Price</mat-label>
          <input matInput type="number" min="0" formControlName="price" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Reorder Level</mat-label>
          <input matInput type="number" min="0" formControlName="reorderLevel" />
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      <button mat-flat-button color="primary" type="button" [disabled]="form.invalid" (click)="save()">
        Save
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      min-width: min(720px, 80vw);
      padding-top: 8px;
    }

    @media (max-width: 720px) {
      .dialog-form {
        grid-template-columns: 1fr;
        min-width: auto;
      }
    }
  `]
})
export class ProductDialogComponent {
  private fb = inject(FormBuilder);

  readonly form;

  constructor(
    public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData
  ) {
    this.form = this.fb.nonNullable.group({
      name: [this.data.product?.name ?? '', Validators.required],
      sku: [this.data.product?.sku ?? '', Validators.required],
      barcode: [this.data.product?.barcode ?? '', Validators.required],
      price: [this.data.product?.price ?? 0, [Validators.required, Validators.min(0)]],
      reorderLevel: [this.data.product?.reorderLevel ?? 0, [Validators.required, Validators.min(0)]]
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue() as ProductRequest);
  }
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatTooltipModule
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss'
})
export class ProductListComponent implements OnInit {
  displayedColumns = ['name', 'sku', 'price', 'reorderLevel', 'barcode', 'status'];

  loading = true;
  searchTerm = '';
  statusFilter: 'ALL' | 'ACTIVE' | 'INACTIVE' = 'ALL';
  products: Product[] = [];
  canWrite = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.canWrite = this.authService.canWriteInventory();
    if (this.canWrite) {
      this.displayedColumns = [...this.displayedColumns, 'actions'];
    }
    this.loadProducts();
  }

  get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.products.filter((product) => {
      const matchesSearch = !term || [product.name, product.sku, product.barcode].some((value) =>
        value.toLowerCase().includes(term)
      );
      const matchesStatus =
        this.statusFilter === 'ALL' ||
        (this.statusFilter === 'ACTIVE' && product.isActive) ||
        (this.statusFilter === 'INACTIVE' && !product.isActive);

      return matchesSearch && matchesStatus;
    });
  }

  openDialog(product: Product | null = null): void {
    if (!this.canWrite) return;
    this.dialog.open(ProductDialogComponent, {
      width: '720px',
      data: { product }
    }).afterClosed().subscribe((payload?: ProductRequest) => {
      if (!payload) {
        return;
      }

      const request$ = product
        ? this.productService.update(product.id, payload)
        : this.productService.create(payload);

      request$.subscribe({
        next: () => {
          this.snackBar.open(`Product ${product ? 'updated' : 'created'} successfully`, 'Close', { duration: 3000 });
          this.loadProducts();
        },
        error: (error) => this.showError(error.error?.message || 'Unable to save product')
      });
    });
  }

  toggleStatus(product: Product): void {
    if (!this.canWrite) return;
    const request$ = product.isActive
      ? this.productService.deactivate(product.id)
      : this.productService.activate(product.id);

    request$.subscribe({
      next: () => {
        this.snackBar.open(`Product ${product.isActive ? 'deactivated' : 'reactivated'}`, 'Close', { duration: 3000 });
        this.loadProducts();
      },
      error: (error) => this.showError(error.error?.message || 'Unable to update product status')
    });
  }

  private loadProducts(): void {
    this.loading = true;
    this.productService.getAll().pipe(finalize(() => this.loading = false)).subscribe({
      next: (products) => this.products = products,
      error: (error) => this.showError(error.error?.message || 'Unable to load products')
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 4000 });
  }
}
