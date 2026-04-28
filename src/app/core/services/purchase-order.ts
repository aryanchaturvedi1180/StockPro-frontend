import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PurchaseOrder, PurchaseOrderRequest, ApproveRequest, ReceiveGoodsRequest, PoStatus } from '../models/purchase-order';

@Injectable({ providedIn: 'root' })
export class PurchaseOrderService {
  private api = `${environment.apiUrl}/api/v1/purchase-orders`;
  constructor(private http: HttpClient) {}
  getAll(): Observable<PurchaseOrder[]> { return this.http.get<PurchaseOrder[]>(this.api); }
  getById(id: number): Observable<PurchaseOrder> { return this.http.get<PurchaseOrder>(`${this.api}/${id}`); }
  create(r: PurchaseOrderRequest): Observable<PurchaseOrder> { return this.http.post<PurchaseOrder>(this.api, r); }
  approve(id: number, r: ApproveRequest): Observable<PurchaseOrder> { return this.http.put<PurchaseOrder>(`${this.api}/${id}/approve`, r); }
  cancel(id: number): Observable<PurchaseOrder> { return this.http.put<PurchaseOrder>(`${this.api}/${id}/cancel`, {}); }
  receiveGoods(id: number, r: ReceiveGoodsRequest): Observable<PurchaseOrder> { return this.http.put<PurchaseOrder>(`${this.api}/${id}/receive`, r); }
}