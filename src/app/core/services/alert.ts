import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Alert } from '../models/alert';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private api = `${environment.apiUrl}/api/v1/alerts`;
  private unreadCountSubject = new BehaviorSubject<number>(0);
  readonly unreadCount$ = this.unreadCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getAcknowledgedIds(): Set<number> {
    const ids = localStorage.getItem('acknowledgedAlerts');
    return ids ? new Set(JSON.parse(ids)) : new Set<number>();
  }

  private saveAcknowledgedId(id: number): void {
    const ids = this.getAcknowledgedIds();
    ids.add(id);
    localStorage.setItem('acknowledgedAlerts', JSON.stringify(Array.from(ids)));
  }

  private mapAlerts = (alerts: Alert[]): Alert[] => {
    const ackIds = this.getAcknowledgedIds();
    return alerts.map(a => ({ ...a, isAcknowledged: ackIds.has(a.id) }));
  };

  getAll(): Observable<Alert[]> { 
    return this.http.get<Alert[]>(this.api).pipe(map(this.mapAlerts)); 
  }
  getUnread(): Observable<Alert[]> {
    return this.http.get<Alert[]>(`${this.api}/unread`).pipe(
      map(this.mapAlerts),
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

  acknowledge(id: number): Observable<void> {
    this.saveAcknowledgedId(id);
    return new Observable<void>((observer) => {
      observer.next();
      observer.complete();
    });
  }
}
