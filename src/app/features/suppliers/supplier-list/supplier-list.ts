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
    <h2 mat-dialog-title>{{ data.supplier ? 'Edit Supplier' : 'Add Supplier' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Supplier Name</mat-label>
          <input matInput formControlName="name" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Contact Name</mat-label>
          <input matInput formControlName="contactName" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" />
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone" />
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-span">
          <mat-label>Address</mat-label>
          <textarea matInput rows="3" formControlName="address"></textarea>
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
      min-width: min(760px, 82vw);
      padding-top: 8px;
    }

    .full-span {
      grid-column: 1 / -1;
    }

    @media (max-width: 720px) {
      .dialog-form {
        grid-template-columns: 1fr;
        min-width: auto;
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
      width: '760px',
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
