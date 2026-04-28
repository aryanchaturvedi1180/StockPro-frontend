import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { StockValueResponse, LowStockResponse } from '../models/report';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private api = `${environment.apiUrl}/api/v1/reports`;
  constructor(private http: HttpClient) {}
  getStockValue(): Observable<StockValueResponse> { return this.http.get<StockValueResponse>(`${this.api}/stock-value`); }
  getLowStock(): Observable<LowStockResponse> { return this.http.get<LowStockResponse>(`${this.api}/low-stock`); }
}