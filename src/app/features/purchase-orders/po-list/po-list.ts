import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { catchError, finalize, forkJoin, of } from 'rxjs';
import { Product } from '../../../core/models/product';
import { ApproveRequest, PoStatus, PurchaseOrder, PurchaseOrderItemRequest, PurchaseOrderRequest, ReceiveGoodsRequest } from '../../../core/models/purchase-order';
import { Supplier } from '../../../core/models/supplier';
import { User } from '../../../core/models/user';
import { Warehouse } from '../../../core/models/warehouse';
import { AuthService } from '../../../core/services/auth';
import { ProductService } from '../../../core/services/product';
import { PurchaseOrderService } from '../../../core/services/purchase-order';
import { SupplierService } from '../../../core/services/supplier';
import { WarehouseService } from '../../../core/services/warehouse';

interface PoDialogData {
  suppliers: Supplier[];
  products: Product[];
  warehouses: Warehouse[];
  currentUserId: number;
}

@Component({
  selector: 'app-po-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="enterprise-dialog">
      <div class="dialog-header">
        <h2>Create Purchase Order</h2>
        <p class="subtitle">Enter the supplier and order details below.</p>
      </div>

      <div class="dialog-body">
        <form [formGroup]="form" class="enterprise-form">
          <div class="form-section">
            <h3 class="section-title">Order Details</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Supplier</label>
                <select formControlName="supplierId" class="input-field">
                  <option [value]="0" disabled>Select a supplier</option>
                  <option *ngFor="let supplier of data.suppliers" [value]="supplier.id">{{ supplier.name }}</option>
                </select>
                <span class="error-text" *ngIf="form.get('supplierId')?.invalid && form.get('supplierId')?.touched">
                  Supplier is required
                </span>
              </div>
              <div class="form-group">
                <label>Expected Date</label>
                <input type="date" formControlName="expectedDate" class="input-field" />
                <span class="error-text" *ngIf="form.get('expectedDate')?.invalid && form.get('expectedDate')?.touched">
                  Expected Date is required
                </span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group" style="grid-column: 1 / -1;">
                <label>Notes</label>
                <textarea formControlName="notes" class="input-field" rows="2" placeholder="Optional notes for this PO..."></textarea>
              </div>
            </div>
          </div>

          <div class="form-section">
            <div class="items-header-row">
              <h3 class="section-title" style="border: none; padding: 0;">Line Items</h3>
              <button type="button" class="btn btn-secondary btn-sm" (click)="addItem()">
                <mat-icon style="font-size: 18px; width: 18px; height: 18px;">add</mat-icon> Add Item
              </button>
            </div>

            <div formArrayName="items" class="items-container">
              <div *ngFor="let item of items.controls; let index = index" [formGroupName]="index" class="item-row-card">
                <div class="item-row-header">
                  <span>Item {{ index + 1 }}</span>
                  <button type="button" class="btn-icon text-danger" (click)="removeItem(index)" [disabled]="items.length === 1">
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
                
                <div class="form-row">
                  <div class="form-group">
                    <label>Product</label>
                    <select formControlName="productId" class="input-field">
                      <option [value]="0" disabled>Select product</option>
                      <option *ngFor="let product of data.products" [value]="product.id">{{ product.name }}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>Warehouse</label>
                    <select formControlName="warehouseId" class="input-field">
                      <option [value]="0" disabled>Select warehouse</option>
                      <option *ngFor="let warehouse of data.warehouses" [value]="warehouse.id">{{ warehouse.name }}</option>
                    </select>
                  </div>
                </div>

                <div class="form-row" style="margin-top: 16px;">
                  <div class="form-group">
                    <label>Quantity</label>
                    <input type="number" min="1" formControlName="quantityOrdered" class="input-field" />
                  </div>
                  <div class="form-group">
                    <label>Unit Price</label>
                    <div class="input-with-icon">
                      <span class="currency-symbol">$</span>
                      <input type="number" min="0" step="0.01" formControlName="unitPrice" class="input-field pl-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="dialog-footer">
        <button type="button" class="btn btn-secondary" (click)="dialogRef.close()">Cancel</button>
        <button type="button" class="btn btn-primary" [disabled]="form.invalid || items.length === 0" (click)="save()">Create PO</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    
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

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
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
      resize: vertical;
    }

    select.input-field {
      appearance: auto;
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

    .pl-8 { padding-left: 28px; }

    .input-field:hover { border-color: var(--text-muted); }
    .input-field:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }
    .input-field.ng-invalid.ng-touched { border-color: var(--danger); }
    .input-field.ng-invalid.ng-touched:focus { box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15); }

    .error-text {
      font-size: 12.5px;
      color: var(--danger);
      margin-top: 2px;
    }

    .items-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding-bottom: var(--spacing-3);
    }

    .items-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .item-row-card {
      background: var(--background);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 24px;
    }

    .item-row-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      font-size: 13px;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
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
      gap: 6px;
    }

    .btn-sm { padding: 6px 12px; font-size: 13px; }
    .btn-icon { background: none; border: none; cursor: pointer; display: flex; align-items: center; padding: 4px; border-radius: 4px; }
    .btn-icon:hover { background: rgba(0,0,0,0.05); }
    .btn-icon:disabled { opacity: 0.5; cursor: not-allowed; }
    .text-danger { color: var(--danger); }

    .btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-secondary { background-color: transparent; border: 1px solid var(--border); color: var(--text-primary); }
    .btn-secondary:hover:not(:disabled) { background-color: var(--background); }
    .btn-primary { background-color: var(--primary); color: white; }
    .btn-primary:hover:not(:disabled) { background-color: var(--primary-hover); }

    @media (max-width: 640px) {
      .form-row { grid-template-columns: 1fr; }
      .dialog-header, .dialog-body, .dialog-footer {
        padding-left: var(--spacing-5);
        padding-right: var(--spacing-5);
      }
    }
  `]
})
export class PoDialogComponent {
  private fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    supplierId: [0, [Validators.required, Validators.min(1)]],
    expectedDate: ['', Validators.required],
    notes: [''],
    items: this.fb.array([this.createItem()])
  });

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  constructor(
    public dialogRef: MatDialogRef<PoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PoDialogData
  ) {}

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  save(): void {
    if (this.form.invalid || this.items.length === 0) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.dialogRef.close({
      supplierId: value.supplierId,
      expectedDate: value.expectedDate,
      notes: value.notes,
      orderedBy: this.data.currentUserId,
      items: value.items as PurchaseOrderItemRequest[]
    } as PurchaseOrderRequest);
  }

  private createItem() {
    return this.fb.nonNullable.group({
      productId: [0, [Validators.required, Validators.min(1)]],
      warehouseId: [0, [Validators.required, Validators.min(1)]],
      quantityOrdered: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]]
    });
  }
}

@Component({
  selector: 'app-po-list',
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
  templateUrl: './po-list.html',
  styleUrl: './po-list.scss'
})
export class PoListComponent implements OnInit {
  displayedColumns = ['id', 'supplier', 'status', 'expectedDate', 'items', 'total'];

  loading = true;
  statusFilter: 'ALL' | PoStatus = 'ALL';
  purchaseOrders: PurchaseOrder[] = [];
  suppliers: Supplier[] = [];
  products: Product[] = [];
  warehouses: Warehouse[] = [];
  currentUserId: number | null = null;
  canWrite = false;

  constructor(
    private poService: PurchaseOrderService,
    private supplierService: SupplierService,
    private productService: ProductService,
    private warehouseService: WarehouseService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.canWrite = this.authService.canWriteInventory();
    if (this.canWrite) {
      this.displayedColumns = [...this.displayedColumns, 'actions'];
    }
    this.loadData();
  }

  get filteredPurchaseOrders(): PurchaseOrder[] {
    return this.purchaseOrders.filter((po) => this.statusFilter === 'ALL' || po.status === this.statusFilter);
  }

  getSupplierName(id: number): string {
    return this.suppliers.find((supplier) => supplier.id === id)?.name ?? `Supplier #${id}`;
  }

  getProductName(id: number): string {
    return this.products.find((product) => product.id === id)?.name ?? `Product #${id}`;
  }

  getWarehouseName(id: number): string {
    return this.warehouses.find((warehouse) => warehouse.id === id)?.name ?? `Warehouse #${id}`;
  }

  getOrderTotal(po: PurchaseOrder): number {
    return po.items.reduce((sum, item) => sum + (item.quantityOrdered * item.unitPrice), 0);
  }

  getVisibleItems(po: PurchaseOrder) {
    return po.items.slice(0, 2);
  }

  openCreateDialog(): void {
    if (!this.canWrite) return;
    if (!this.currentUserId) {
      this.showError('Current user could not be resolved for purchase order actions.');
      return;
    }

    this.dialog.open(PoDialogComponent, {
      width: 'min(92vw, 1200px)',
      data: {
        suppliers: this.suppliers.filter((supplier) => supplier.isActive),
        products: this.products.filter((product) => product.isActive),
        warehouses: this.warehouses.filter((warehouse) => warehouse.isActive),
        currentUserId: this.currentUserId
      }
    }).afterClosed().subscribe((payload?: PurchaseOrderRequest) => {
      if (!payload) return;
      this.poService.create(payload).subscribe({
        next: () => {
          this.snackBar.open('Purchase order created successfully', 'Close', { duration: 3000 });
          this.loadData();
        },
        error: (error) => this.showError(error.error?.message || 'Unable to create purchase order')
      });
    });
  }

  approve(po: PurchaseOrder): void {
    if (!this.canWrite) return;
    if (!this.currentUserId) {
      this.showError('Current user could not be resolved for approval.');
      return;
    }
    const payload: ApproveRequest = { approvedBy: this.currentUserId };
    this.poService.approve(po.id, payload).subscribe({
      next: () => {
        this.snackBar.open(`PO #${po.id} approved`, 'Close', { duration: 3000 });
        this.loadData();
      },
      error: (error) => this.showError(error.error?.message || 'Unable to approve purchase order')
    });
  }

  receive(po: PurchaseOrder): void {
    if (!this.canWrite) return;
    if (!this.currentUserId) {
      this.showError('Current user could not be resolved for receiving goods.');
      return;
    }
    const payload: ReceiveGoodsRequest = { performedBy: this.currentUserId };
    this.poService.receiveGoods(po.id, payload).subscribe({
      next: () => {
        this.snackBar.open(`Goods received for PO #${po.id}`, 'Close', { duration: 3000 });
        this.loadData();
      },
      error: (error) => this.showError(error.error?.message || 'Unable to receive goods')
    });
  }

  cancel(po: PurchaseOrder): void {
    if (!this.canWrite) return;
    this.poService.cancel(po.id).subscribe({
      next: () => {
        this.snackBar.open(`PO #${po.id} cancelled`, 'Close', { duration: 3000 });
        this.loadData();
      },
      error: (error) => this.showError(error.error?.message || 'Unable to cancel purchase order')
    });
  }

  canApprove(po: PurchaseOrder): boolean {
    return this.canWrite && po.status === 'DRAFT';
  }

  canReceive(po: PurchaseOrder): boolean {
    return this.canWrite && (po.status === 'APPROVED' || po.status === 'PARTIALLY_RECEIVED');
  }

  canCancel(po: PurchaseOrder): boolean {
    return this.canWrite && !['RECEIVED', 'CANCELLED'].includes(po.status);
  }

  private loadData(): void {
    this.loading = true;
    forkJoin({
      purchaseOrders: this.poService.getAll(),
      suppliers: this.supplierService.getAll(),
      products: this.productService.getAll(),
      warehouses: this.warehouseService.getAll(),
      users: this.canWrite ? this.authService.getAllUsers().pipe(catchError(() => of([] as User[]))) : of([] as User[])
    }).pipe(finalize(() => this.loading = false)).subscribe({
      next: ({ purchaseOrders, suppliers, products, warehouses, users }) => {
        this.purchaseOrders = purchaseOrders;
        this.suppliers = suppliers;
        this.products = products;
        this.warehouses = warehouses;
        this.currentUserId = this.resolveCurrentUserId(users);
      },
      error: (error) => this.showError(error.error?.message || 'Unable to load purchase orders')
    });
  }

  private resolveCurrentUserId(users: User[]): number | null {
    const storedId = Number(localStorage.getItem('userId'));
    if (Number.isFinite(storedId) && storedId > 0) {
      return storedId;
    }
    const email = localStorage.getItem('email');
    return users.find((user) => user.email === email)?.id ?? null;
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 4000 });
  }
}
