import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Alert } from '../models/alert';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private api = `${environment.apiUrl}/api/v1/alerts`;
  private unreadCountSubject = new BehaviorSubject<number>(0);
  readonly unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) {}
  getAll(): Observable<Alert[]> { return this.http.get<Alert[]>(this.api); }
  getUnread(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.api}/unread`).pipe(
      tap((alerts) => this.unreadCountSubject.next(alerts.length))
    );
  }
  markAsRead(id: number): Observable<Alert> {
    return this.http.put<Alert>(`${this.api}/${id}/read`, {}).pipe(
      tap(() => this.refreshUnreadCount().subscribe())
    );
  }
  markAllAsRead(): Observable<void> {
    return this.http.put<void>(`${this.api}/read-all`, {}).pipe(
      tap(() => this.unreadCountSubject.next(0))
    );
  }

  refreshUnreadCount(): Observable<Alert[]> {
    return this.getUnread();
  }
}
