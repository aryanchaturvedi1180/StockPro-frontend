import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
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
import { finalize } from 'rxjs';
import { Supplier, SupplierRequest } from '../../../core/models/supplier';
import { AuthService } from '../../../core/services/auth';
import { SupplierService } from '../../../core/services/supplier';

interface SupplierDialogData {
  supplier: Supplier | null;
}

@Component({
  selector: 'app-supplier-dialog',
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
    <div class="enterprise-dialog">
      <div class="dialog-header">
        <h2>{{ data.supplier ? 'Edit Supplier' : 'Add Supplier' }}</h2>
        <p class="subtitle">Please fill in the supplier details below.</p>
      </div>

      <div class="dialog-body">
        <form [formGroup]="form" class="enterprise-form">
          <div class="form-section">
            <h3 class="section-title">General Info</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Supplier Name</label>
                <input type="text" formControlName="name" class="input-field" placeholder="e.g. Acme Corp" />
                <span class="error-text" *ngIf="form.get('name')?.invalid && form.get('name')?.touched">
                  Supplier Name is required
                </span>
              </div>
              <div class="form-group">
                <label>Contact Name</label>
                <input type="text" formControlName="contactName" class="input-field" placeholder="e.g. Jane Doe" />
                <span class="error-text" *ngIf="form.get('contactName')?.invalid && form.get('contactName')?.touched">
                  Contact Name is required
                </span>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label>Email</label>
                <input type="email" formControlName="email" class="input-field" placeholder="e.g. jane@acme.com" />
                <span class="error-text" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
                  Valid email is required
                </span>
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="text" formControlName="phone" class="input-field" placeholder="e.g. +1 555-0100" />
                <span class="error-text" *ngIf="form.get('phone')?.invalid && form.get('phone')?.touched">
                  Phone is required
                </span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group" style="grid-column: 1 / -1;">
                <label>Address</label>
                <textarea formControlName="address" class="input-field" rows="3" placeholder="Full address details..."></textarea>
                <span class="error-text" *ngIf="form.get('address')?.invalid && form.get('address')?.touched">
                  Address is required
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="dialog-footer">
        <button type="button" class="btn btn-secondary" (click)="dialogRef.close()">Cancel</button>
        <button type="button" class="btn btn-primary" [disabled]="form.invalid" (click)="save()">Save Supplier</button>
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
export class SupplierDialogComponent {
  private fb = inject(FormBuilder);

  readonly form;

  constructor(
    public dialogRef: MatDialogRef<SupplierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SupplierDialogData
  ) {
    this.form = this.fb.nonNullable.group({
      name: [this.data.supplier?.name ?? '', Validators.required],
      contactName: [this.data.supplier?.contactName ?? '', Validators.required],
      email: [this.data.supplier?.email ?? '', [Validators.required, Validators.email]],
      phone: [this.data.supplier?.phone ?? '', Validators.required],
      address: [this.data.supplier?.address ?? '', Validators.required]
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue() as SupplierRequest);
  }
}

@Component({
  selector: 'app-supplier-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule
  ],
  templateUrl: './supplier-list.html',
  styleUrl: './supplier-list.scss'
})
export class SupplierListComponent implements OnInit {
  displayedColumns = ['name', 'contact', 'email', 'phone', 'status'];

  loading = true;
  searchTerm = '';
  statusFilter: 'ALL' | 'ACTIVE' | 'INACTIVE' = 'ALL';
  suppliers: Supplier[] = [];
  canWrite = false;

  constructor(
    private supplierService: SupplierService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.canWrite = this.authService.canWriteInventory();
    if (this.canWrite) {
      this.displayedColumns = [...this.displayedColumns, 'actions'];
    }
    this.loadSuppliers();
  }

  get filteredSuppliers(): Supplier[] {
    const term = this.searchTerm.trim().toLowerCase();
    return this.suppliers.filter((supplier) => {
      const matchesSearch = !term || [supplier.name, supplier.contactName, supplier.email, supplier.phone]
        .some((value) => value.toLowerCase().includes(term));
      const matchesStatus =
        this.statusFilter === 'ALL' ||
        (this.statusFilter === 'ACTIVE' && supplier.isActive) ||
        (this.statusFilter === 'INACTIVE' && !supplier.isActive);

      return matchesSearch && matchesStatus;
    });
  }

  openDialog(supplier: Supplier | null = null): void {
    if (!this.canWrite) return;
    this.dialog.open(SupplierDialogComponent, {
      width: 'min(92vw, 980px)',
      data: { supplier }
    }).afterClosed().subscribe((payload?: SupplierRequest) => {
      if (!payload) {
        return;
      }

      const request$ = supplier
        ? this.supplierService.update(supplier.id, payload)
        : this.supplierService.create(payload);

      request$.subscribe({
        next: () => {
          this.snackBar.open(`Supplier ${supplier ? 'updated' : 'created'} successfully`, 'Close', { duration: 3000 });
          this.loadSuppliers();
        },
        error: (error) => this.showError(error.error?.message || 'Unable to save supplier')
      });
    });
  }

  toggleStatus(supplier: Supplier): void {
    if (!this.canWrite) return;
    const request$ = supplier.isActive
      ? this.supplierService.deactivate(supplier.id)
      : this.supplierService.activate(supplier.id);

    request$.subscribe({
      next: () => {
        this.snackBar.open(`Supplier ${supplier.isActive ? 'deactivated' : 'reactivated'}`, 'Close', { duration: 3000 });
        this.loadSuppliers();
      },
      error: (error) => this.showError(error.error?.message || 'Unable to update supplier status')
    });
  }

  private loadSuppliers(): void {
    this.loading = true;
    this.supplierService.getAll().pipe(finalize(() => this.loading = false)).subscribe({
      next: (suppliers) => this.suppliers = suppliers,
      error: (error) => this.showError(error.error?.message || 'Unable to load suppliers')
    });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 4000 });
  }
}
