import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { MovementService } from './movement';

describe('MovementService', () => {
  let service: MovementService;
  let httpMock: HttpTestingController;
  const api = `${environment.apiUrl}/api/v1/movements`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(MovementService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('fetches all movements', () => {
    service.getAll().subscribe((movements) => {
      expect(movements.length).toBe(1);
    });

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 1,
        warehouseId: 2,
        productId: 3,
        movementType: 'STOCK_IN',
        quantity: 5,
        referenceId: 10,
        referenceType: 'PO',
        notes: 'Received stock',
        performedBy: 99,
        createdAt: '2026-04-14T00:00:00Z',
      },
    ]);
  });

  it('creates a movement', () => {
    service.create({
      warehouseId: 2,
      productId: 3,
      movementType: 'STOCK_OUT',
      quantity: 2,
      performedBy: 99,
    }).subscribe((movement) => {
      expect(movement.id).toBe(7);
    });

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      warehouseId: 2,
      productId: 3,
      movementType: 'STOCK_OUT',
      quantity: 2,
      performedBy: 99,
    });
    req.flush({
      id: 7,
      warehouseId: 2,
      productId: 3,
      movementType: 'STOCK_OUT',
      quantity: 2,
      referenceId: 0,
      referenceType: '',
      notes: '',
      performedBy: 99,
      createdAt: '2026-04-14T00:00:00Z',
    });
  });
});
