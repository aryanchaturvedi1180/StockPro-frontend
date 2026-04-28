import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StockMovement, MovementRequest, MovementType } from '../models/movement';

@Injectable({ providedIn: 'root' })
export class MovementService {
  private api = `${environment.apiUrl}/api/v1/movements`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<StockMovement[]> { return this.http.get<StockMovement[]>(this.api); }
  getByWarehouse(wId: number): Observable<StockMovement[]> { return this.http.get<StockMovement[]>(`${this.api}/warehouse/${wId}`); }
  getByProduct(pId: number): Observable<StockMovement[]> { return this.http.get<StockMovement[]>(`${this.api}/product/${pId}`); }
  getByType(type: MovementType): Observable<StockMovement[]> { return this.http.get<StockMovement[]>(`${this.api}/type/${type}`); }
  create(r: MovementRequest): Observable<StockMovement> { return this.http.post<StockMovement>(this.api, r); }
}