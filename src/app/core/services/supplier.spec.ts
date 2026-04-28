import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { SupplierService } from './supplier';

describe('SupplierService', () => {
  let service: SupplierService;
  let httpMock: HttpTestingController;
  const api = `${environment.apiUrl}/api/v1/suppliers`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(SupplierService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('normalizes active suppliers when fetching all', () => {
    service.getAll().subscribe((suppliers) => {
      expect(suppliers[0].isActive).toBe(true);
    });

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: 1,
        name: 'Acme Supplies',
        contactName: 'Jane Doe',
        email: 'jane@acme.com',
        phone: '1234567890',
        address: 'Main Street',
        createdAt: '2026-04-14T00:00:00Z',
        updatedAt: '2026-04-14T00:00:00Z',
        active: true,
      },
    ]);
  });

  it('creates a supplier and normalizes the response', () => {
    service.create({
      name: 'Acme Supplies',
      contactName: 'Jane Doe',
      email: 'jane@acme.com',
      phone: '1234567890',
      address: 'Main Street',
    }).subscribe((supplier) => {
      expect(supplier.isActive).toBe(true);
    });

    const req = httpMock.expectOne(api);
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 1,
      name: 'Acme Supplies',
      contactName: 'Jane Doe',
      email: 'jane@acme.com',
      phone: '1234567890',
      address: 'Main Street',
      createdAt: '2026-04-14T00:00:00Z',
      updatedAt: '2026-04-14T00:00:00Z',
      active: true,
    });
  });
});
