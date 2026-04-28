import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Supplier, SupplierRequest } from '../models/supplier';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private api = `${environment.apiUrl}/api/v1/suppliers`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Supplier[]> { return this.http.get<Supplier[]>(this.api).pipe(map((suppliers) => suppliers.map((supplier) => this.normalizeSupplier(supplier)))); }
  getActive(): Observable<Supplier[]> { return this.http.get<Supplier[]>(`${this.api}/active`).pipe(map((suppliers) => suppliers.map((supplier) => this.normalizeSupplier(supplier)))); }
  create(r: SupplierRequest): Observable<Supplier> { return this.http.post<Supplier>(this.api, r).pipe(map((supplier) => this.normalizeSupplier(supplier))); }
  update(id: number, r: SupplierRequest): Observable<Supplier> { return this.http.put<Supplier>(`${this.api}/${id}`, r).pipe(map((supplier) => this.normalizeSupplier(supplier))); }
  activate(id: number): Observable<Supplier> { return this.http.put<Supplier>(`${this.api}/${id}/activate`, {}).pipe(map((supplier) => this.normalizeSupplier(supplier))); }
  deactivate(id: number): Observable<Supplier> { return this.http.put<Supplier>(`${this.api}/${id}/deactivate`, {}).pipe(map((supplier) => this.normalizeSupplier(supplier))); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.api}/${id}`); }

  private normalizeSupplier(supplier: Supplier & { active?: boolean }): Supplier {
    return { ...supplier, isActive: supplier.isActive ?? supplier.active ?? false };
  }
}
