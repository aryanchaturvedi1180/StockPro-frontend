import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { ProductService } from './product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const api = `${environment.apiUrl}/api/v1/products`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('normalizes active state when fetching products', () => {
    service.getAll().subscribe((products) => {
      expect(products[0].isActive).toBe(true);
    });

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 1,
        name: 'Widget',
        sku: 'W-001',
        price: 10,
        reorderLevel: 5,
        barcode: '123456789',
        createdAt: '2026-04-14T00:00:00Z',
        updatedAt: '2026-04-14T00:00:00Z',
        active: true,
      },
    ]);
  });

  it('creates a product and normalizes the response', () => {
    service.create({
      name: 'Widget',
      sku: 'W-001',
      price: 10,
      reorderLevel: 5,
      barcode: '123456789',
    }).subscribe((product) => {
      expect(product.isActive).toBe(true);
    });

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 1,
      name: 'Widget',
      sku: 'W-001',
      price: 10,
      reorderLevel: 5,
      barcode: '123456789',
      createdAt: '2026-04-14T00:00:00Z',
      updatedAt: '2026-04-14T00:00:00Z',
      active: true,
    });
  });
});
