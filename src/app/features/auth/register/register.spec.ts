import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthService } from '../../../core/services/auth';
import { RegisterComponent } from './register';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authSpy: { register: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authSpy = { register: vi.fn() };
    authSpy.register.mockReturnValue(of({
      id: 1,
      fullName: 'Staff User',
      email: 'staff@stockpro.com',
      phone: '1234567890',
      role: 'STAFF',
      isActive: true,
      createdAt: '2026-04-14T00:00:00Z',
      lastLoginAt: '',
    }));

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('clears admin secret when leaving the admin role', () => {
    component.adminSecret = 'secret';
    component.onRoleChange('MANAGER');

    expect(component.role).toBe('MANAGER');
    expect(component.adminSecret).toBe('');
  });

  it('requires an admin secret for admin registration', () => {
    component.role = 'ADMIN';
    component.adminSecret = '';

    component.onSubmit();

    expect(authSpy.register).not.toHaveBeenCalled();
    expect(component.error).toBe('Admin secret is required for admin registration');
  });

  it('submits the registration payload', () => {
    component.fullName = 'Staff User';
    component.email = 'staff@stockpro.com';
    component.phone = '1234567890';
    component.password = 'secret';
    component.role = 'STAFF';

    component.onSubmit();

    expect(authSpy.register).toHaveBeenCalledWith({
      fullName: 'Staff User',
      email: 'staff@stockpro.com',
      password: 'secret',
      phone: '1234567890',
      role: 'STAFF',
      adminSecret: undefined,
    });
    expect(component.success).toBe(true);
    expect(component.loading).toBe(false);
  });
});
