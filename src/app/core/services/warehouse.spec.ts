import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { WarehouseService } from './warehouse';

describe('WarehouseService', () => {
  let service: WarehouseService;
  let httpMock: HttpTestingController;
  const api = `${environment.apiUrl}/api/v1/warehouses`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(WarehouseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('normalizes active warehouses when fetching all', () => {
    service.getAll().subscribe((warehouses) => {
      expect(warehouses[0].isActive).toBe(true);
    });

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 1,
        name: 'Main Warehouse',
        location: 'Pune',
        capacity: 1000,
        createdAt: '2026-04-14T00:00:00Z',
        updatedAt: '2026-04-14T00:00:00Z',
        active: true,
      },
    ]);
  });

  it('adds stock to a warehouse', () => {
    service.addStock({
      warehouseId: 1,
      productId: 2,
      quantity: 10,
    }).subscribe((stock) => {
      expect(stock.quantity).toBe(10);
    });

    const req = httpMock.expectOne(`${api}/stock/add`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      warehouseId: 1,
      productId: 2,
      quantity: 10,
    });
    req.flush({
      id: 1,
      warehouseId: 1,
      productId: 2,
      quantity: 10,
      version: 1,
      updatedAt: '2026-04-14T00:00:00Z',
    });
  });
});
