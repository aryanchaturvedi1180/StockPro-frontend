import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { PurchaseOrderService } from './purchase-order';

describe('PurchaseOrderService', () => {
  let service: PurchaseOrderService;
  let httpMock: HttpTestingController;
  const api = `${environment.apiUrl}/api/v1/purchase-orders`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(PurchaseOrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('fetches purchase orders', () => {
    service.getAll().subscribe((orders) => {
      expect(orders.length).toBe(1);
    });

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 1,
        supplierId: 2,
        status: 'DRAFT',
        orderedBy: 3,
        approvedBy: 0,
        receivedBy: 0,
        notes: 'First order',
        expectedDate: '2026-04-20',
        receivedDate: '',
        createdAt: '2026-04-14T00:00:00Z',
        updatedAt: '2026-04-14T00:00:00Z',
        items: [],
      },
    ]);
  });

  it('approves a purchase order', () => {
    service.approve(1, { approvedBy: 99 }).subscribe((order) => {
      expect(order.status).toBe('APPROVED');
    });

    const req = httpMock.expectOne(`${api}/1/approve`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ approvedBy: 99 });
    req.flush({
      id: 1,
      supplierId: 2,
      status: 'APPROVED',
      orderedBy: 3,
      approvedBy: 99,
      receivedBy: 0,
      notes: 'First order',
      expectedDate: '2026-04-20',
      receivedDate: '',
      createdAt: '2026-04-14T00:00:00Z',
      updatedAt: '2026-04-14T00:00:00Z',
      items: [],
    });
  });
});
