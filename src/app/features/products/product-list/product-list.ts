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
    MatDialogModule
  ],
  template: `
    <div class="enterprise-dialog">
      <div class="dialog-header">
        <h2>{{ data.product ? 'Edit Product' : 'Add Product' }}</h2>
        <p class="subtitle">Please fill in the product details below.</p>
      </div>

      <div class="dialog-body">
        <form [formGroup]="form" class="enterprise-form">
          
          <div class="form-section">
            <h3 class="section-title">Product Info</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Name</label>
                <input type="text" formControlName="name" class="input-field" placeholder="e.g. Premium Widget" />
                <span class="error-text" *ngIf="form.get('name')?.invalid && form.get('name')?.touched">
                  Name is required
                </span>
              </div>
              <div class="form-group">
                <label>SKU</label>
                <input type="text" formControlName="sku" class="input-field" placeholder="e.g. WID-001" />
                <span class="error-text" *ngIf="form.get('sku')?.invalid && form.get('sku')?.touched">
                  SKU is required
                </span>
              </div>
            </div>
            <div class="form-row single-col">
              <div class="form-group">
                <label>Barcode</label>
                <input type="text" formControlName="barcode" class="input-field" placeholder="Scan or enter barcode" />
                <span class="error-text" *ngIf="form.get('barcode')?.invalid && form.get('barcode')?.touched">
                  Barcode is required
                </span>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-section flex-1">
              <h3 class="section-title">Pricing</h3>
              <div class="form-group">
                <label>Price</label>
                <div class="input-with-icon">
                  <span class="currency-symbol">$</span>
                  <input type="number" min="0" step="0.01" formControlName="price" class="input-field pl-8" placeholder="0.00" />
                </div>
                <span class="error-text" *ngIf="form.get('price')?.invalid && form.get('price')?.touched">
                  Valid price is required
                </span>
              </div>
            </div>

            <div class="form-section flex-1">
              <h3 class="section-title">Inventory</h3>
              <div class="form-group">
                <label>Reorder Level</label>
                <input type="number" min="0" formControlName="reorderLevel" class="input-field" placeholder="e.g. 10" />
                <span class="error-text" *ngIf="form.get('reorderLevel')?.invalid && form.get('reorderLevel')?.touched">
                  Valid reorder level is required
                </span>
              </div>
            </div>
          </div>

        </form>
      </div>

      <div class="dialog-footer">
        <button type="button" class="btn btn-secondary" (click)="dialogRef.close()">Cancel</button>
        <button type="button" class="btn btn-primary" [disabled]="form.invalid" (click)="save()">Save Product</button>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .enterprise-dialog {
      display: flex;
      flex-direction: column;
      max-height: 88vh;
      background: var(--surface);
      margin: -24px; 
    }

    .dialog-header {
      padding: 24px 32px;
      border-bottom: 1px solid var(--border);
      background: var(--surface);
      border-top-left-radius: var(--radius-md);
      border-top-right-radius: var(--radius-md);
      flex-shrink: 0;
    }

    .dialog-header h2 {
      margin: 0 0 8px 0;
      font-size: 20px;
      font-weight: 600;
      color: var(--text-primary);
    }

    .subtitle {
      margin: 0;
      font-size: 14px;
      color: var(--text-secondary);
    }

    .dialog-body {
      padding: 32px;
      overflow-y: auto;
      background: var(--background);
      flex-grow: 1;
    }

    .enterprise-form {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .form-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
      background: var(--surface);
      padding: 24px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
    }

    .section-title {
      margin: 0;
      font-size: 15px;
      font-weight: 600;
      color: var(--text-primary);
      padding-bottom: var(--spacing-3);
      border-bottom: 1px solid var(--border);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .form-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 24px;
    }

    .form-row.single-col {
      grid-template-columns: 1fr;
    }

    .flex-1 {
      flex: 1;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-row > .form-group:only-child {
      grid-column: 1 / -1;
    }

    label {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
    }

    .input-field {
      width: 100%;
      padding: 10px var(--spacing-3);
      font-size: 14px;
      font-family: inherit;
      color: var(--text-primary);
      background-color: var(--surface);
      border: 1px solid var(--border);
      border-radius: 6px;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .input-with-icon {
      position: relative;
      display: flex;
      align-items: center;
    }

    .currency-symbol {
      position: absolute;
      left: 12px;
      color: var(--text-muted);
      font-size: 14px;
    }

    .pl-8 {
      padding-left: 28px;
    }

    .input-field:hover {
      border-color: var(--text-muted);
    }

    .input-field:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }

    .input-field.ng-invalid.ng-touched {
      border-color: var(--danger);
    }

    .input-field.ng-invalid.ng-touched:focus {
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
    }

    .error-text {
      font-size: 12.5px;
      color: var(--danger);
      margin-top: 2px;
    }

    .dialog-footer {
      padding: 24px 32px;
      border-top: 1px solid var(--border);
      background: var(--surface);
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      border-bottom-left-radius: var(--radius-md);
      border-bottom-right-radius: var(--radius-md);
      flex-shrink: 0;
    }

    .btn {
      padding: 10px var(--spacing-6);
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: inherit;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: transparent;
      border: 1px solid var(--border);
      color: var(--text-primary);
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: var(--background);
    }

    .btn-primary {
      background-color: var(--primary);
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: var(--primary-hover);
    }

    @media (max-width: 640px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .dialog-header, .dialog-body, .dialog-footer {
        padding-left: var(--spacing-5);
        padding-right: var(--spacing-5);
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
      price: [this.data.product?.price ?? null, [Validators.required, Validators.min(0)]],
      reorderLevel: [this.data.product?.reorderLevel ?? null, [Validators.required, Validators.min(0)]]
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
  displayedColumns = ['id', 'name', 'sku', 'barcode', 'price', 'reorderLevel', 'status', 'createdAt'];

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
      width: 'min(92vw, 1100px)',
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

  deleteProduct(product: Product): void {
    if (!this.canWrite) return;
    if (confirm(`Are you sure you want to delete product "${product.name}"?`)) {
      this.productService.delete(product.id).subscribe({
        next: () => {
          this.snackBar.open('Product deleted successfully', 'Close', { duration: 3000 });
          this.loadProducts();
        },
        error: (error) => this.showError(error.error?.message || 'Unable to delete product')
      });
    }
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
