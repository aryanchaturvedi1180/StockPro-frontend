import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { ReportService } from './report';

describe('ReportService', () => {
  let service: ReportService;
  let httpMock: HttpTestingController;
  const api = `${environment.apiUrl}/api/v1/reports`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(ReportService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('gets stock value summary', () => {
    service.getStockValue().subscribe((report) => {
      expect(report.totalStockValue).toBe(250);
    });

    const req = httpMock.expectOne(`${api}/stock-value`);
    expect(req.request.method).toBe('GET');
    req.flush({
      totalStockValue: 250,
      totalProducts: 2,
      totalUnits: 25,
      breakdown: [],
    });
  });

  it('gets low stock summary', () => {
    service.getLowStock().subscribe((report) => {
      expect(report.totalLowStockProducts).toBe(1);
    });

    const req = httpMock.expectOne(`${api}/low-stock`);
    expect(req.request.method).toBe('GET');
    req.flush({
      totalLowStockProducts: 1,
      items: [],
    });
  });
});
