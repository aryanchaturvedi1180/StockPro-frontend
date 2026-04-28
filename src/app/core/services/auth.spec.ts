import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../../environments/environment';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const api = `${environment.apiUrl}/api/v1/auth`;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('logs in and stores token details', () => {
    const response = {
      token: 'token-123',
      email: 'admin@stockpro.com',
      role: 'ADMIN',
      fullName: 'Admin User',
    };

    service.login({ email: 'admin@stockpro.com', password: 'secret' }).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${api}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email: 'admin@stockpro.com', password: 'secret' });
    req.flush(response);

    expect(localStorage.getItem('token')).toBe('token-123');
    expect(localStorage.getItem('role')).toBe('ADMIN');
    expect(localStorage.getItem('fullName')).toBe('Admin User');
    expect(localStorage.getItem('email')).toBe('admin@stockpro.com');
  });

  it('normalizes registered users', () => {
    service.register({
      fullName: 'Staff User',
      email: 'staff@stockpro.com',
      password: 'secret',
      phone: '1234567890',
      role: 'STAFF',
    }).subscribe((user) => {
      expect(user.isActive).toBe(true);
    });

    const req = httpMock.expectOne(`${api}/register`);
    expect(req.request.method).toBe('POST');
    req.flush({
      id: 1,
      fullName: 'Staff User',
      email: 'staff@stockpro.com',
      phone: '1234567890',
      role: 'STAFF',
      createdAt: '2026-04-14T00:00:00Z',
      lastLoginAt: '',
      active: true,
    });
  });

  it('logs out and clears storage', () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('role', 'ADMIN');
    localStorage.setItem('fullName', 'Admin User');
    localStorage.setItem('email', 'admin@stockpro.com');

    service.logout().subscribe(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('role')).toBeNull();
      expect(localStorage.getItem('fullName')).toBeNull();
      expect(localStorage.getItem('email')).toBeNull();
    });

    const req = httpMock.expectOne(`${api}/logout`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush(null);
  });

  it('exposes role-based helpers', () => {
    localStorage.setItem('token', 'token-123');
    localStorage.setItem('role', 'MANAGER');
    localStorage.setItem('fullName', 'Manager User');

    expect(service.isLoggedIn()).toBe(true);
    expect(service.isAdmin()).toBe(false);
    expect(service.isAdminOrManager()).toBe(true);
    expect(service.canAccessAlerts()).toBe(true);
    expect(service.canAccessReports()).toBe(true);
    expect(service.canManageUsers()).toBe(false);
    expect(service.canWriteInventory()).toBe(true);
    expect(service.getFullName()).toBe('Manager User');
  });
});
