import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { AlertService } from './alert';

describe('AlertService', () => {
  let service: AlertService;
  let httpMock: HttpTestingController;
  const api = `${environment.apiUrl}/api/v1/alerts`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AlertService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('fetches unread alerts and updates the unread count', () => {
    let unreadCount = -1;
    service.unreadCount$.subscribe((count) => {
      unreadCount = count;
    });

    service.getUnread().subscribe((alerts) => {
      expect(alerts.length).toBe(2);
    });

    const req = httpMock.expectOne(`${api}/unread`);
    expect(req.request.method).toBe('GET');
    req.flush([
      { id: 1, alertType: 'LOW_STOCK', referenceId: 10, referenceType: 'PRODUCT', message: 'Low stock', isRead: false, createdAt: '2026-04-14T00:00:00Z' },
      { id: 2, alertType: 'MANUAL', referenceId: 20, referenceType: 'SYSTEM', message: 'Manual alert', isRead: false, createdAt: '2026-04-14T00:00:00Z' },
    ]);

    expect(unreadCount).toBe(2);
  });

  it('marks all alerts as read and resets the count', () => {
    let unreadCount = -1;
    service.unreadCount$.subscribe((count) => {
      unreadCount = count;
    });

    service.markAllAsRead().subscribe();

    const req = httpMock.expectOne(`${api}/read-all`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({});
    req.flush(null);

    expect(unreadCount).toBe(0);
  });
});
