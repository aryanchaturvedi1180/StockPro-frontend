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
    <h2 mat-dialog-title>Create Purchase Order</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Supplier</mat-label>
          <mat-select formControlName="supplierId">
            <mat-option *ngFor="let supplier of data.suppliers" [value]="supplier.id">{{ supplier.name }}</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Expected Date</mat-label>
          <input matInput type="date" formControlName="expectedDate" />
        </mat-form-field>
        <mat-form-field appearance="outline" class="full-span">
          <mat-label>Notes</mat-label>
          <textarea matInput rows="3" formControlName="notes"></textarea>
        </mat-form-field>

        <div class="items-section full-span">
          <div class="items-header">
            <h3>Items</h3>
            <button mat-stroked-button type="button" (click)="addItem()">
              <mat-icon>add</mat-icon>
              Add Item
            </button>
          </div>

          <div formArrayName="items">
            <div *ngFor="let item of items.controls; let index = index" [formGroupName]="index" class="item-row">
              <mat-form-field appearance="outline">
                <mat-label>Product</mat-label>
                <mat-select formControlName="productId">
                  <mat-option *ngFor="let product of data.products" [value]="product.id">{{ product.name }}</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Warehouse</mat-label>
                <mat-select formControlName="warehouseId">
                  <mat-option *ngFor="let warehouse of data.warehouses" [value]="warehouse.id">{{ warehouse.name }}</mat-option>
                </mat-select>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Quantity</mat-label>
                <input matInput type="number" min="1" formControlName="quantityOrdered" />
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Unit Price</mat-label>
                <input matInput type="number" min="0" formControlName="unitPrice" />
              </mat-form-field>
              <button mat-icon-button color="warn" type="button" (click)="removeItem(index)" [disabled]="items.length === 1">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
          </div>
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      <button mat-flat-button color="primary" type="button" [disabled]="form.invalid || items.length === 0" (click)="save()">
        Create PO
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
      min-width: min(980px, 92vw);
      padding-top: 8px;
    }
    .full-span { grid-column: 1 / -1; }
    .items-header,
    .item-row {
      display: grid;
      gap: 12px;
      align-items: center;
    }
    .items-header {
      grid-template-columns: 1fr auto;
      margin-bottom: 12px;
    }
    .item-row {
      grid-template-columns: 1.5fr 1.2fr 0.8fr 0.8fr auto;
      margin-bottom: 12px;
    }
    .items-header h3 { margin: 0; }
    @media (max-width: 960px) {
      .dialog-form,
      .item-row {
        grid-template-columns: 1fr;
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
      width: '980px',
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
