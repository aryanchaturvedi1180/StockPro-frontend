import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Warehouse, WarehouseRequest, StockLevel, StockUpdateRequest, StockTransferRequest } from '../models/warehouse';

@Injectable({ providedIn: 'root' })
export class WarehouseService {
  private api = `${environment.apiUrl}/api/v1/warehouses`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<Warehouse[]> { return this.http.get<Warehouse[]>(this.api).pipe(map((warehouses) => warehouses.map((warehouse) => this.normalizeWarehouse(warehouse)))); }
  getActive(): Observable<Warehouse[]> { return this.http.get<Warehouse[]>(`${this.api}/active`).pipe(map((warehouses) => warehouses.map((warehouse) => this.normalizeWarehouse(warehouse)))); }
  create(r: WarehouseRequest): Observable<Warehouse> { return this.http.post<Warehouse>(this.api, r).pipe(map((warehouse) => this.normalizeWarehouse(warehouse))); }
  update(id: number, r: WarehouseRequest): Observable<Warehouse> { return this.http.put<Warehouse>(`${this.api}/${id}`, r).pipe(map((warehouse) => this.normalizeWarehouse(warehouse))); }
  activate(id: number): Observable<Warehouse> { return this.http.put<Warehouse>(`${this.api}/${id}/activate`, {}).pipe(map((warehouse) => this.normalizeWarehouse(warehouse))); }
  deactivate(id: number): Observable<Warehouse> { return this.http.put<Warehouse>(`${this.api}/${id}/deactivate`, {}).pipe(map((warehouse) => this.normalizeWarehouse(warehouse))); }
  getStockByWarehouse(wId: number): Observable<StockLevel[]> { return this.http.get<StockLevel[]>(`${this.api}/${wId}/stock`); }
  getAllStock(): Observable<StockLevel[]> { return this.http.get<StockLevel[]>(`${this.api}/stock`); }
  addStock(r: StockUpdateRequest): Observable<StockLevel> { return this.http.post<StockLevel>(`${this.api}/stock/add`, r); }
  deductStock(r: StockUpdateRequest): Observable<StockLevel> { return this.http.post<StockLevel>(`${this.api}/stock/deduct`, r); }
  transferStock(r: StockTransferRequest): Observable<void> { return this.http.post<void>(`${this.api}/stock/transfer`, r); }

  private normalizeWarehouse(warehouse: Warehouse & { active?: boolean }): Warehouse {
    return { ...warehouse, isActive: warehouse.isActive ?? warehouse.active ?? false };
  }
}
