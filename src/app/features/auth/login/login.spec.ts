import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AuthService } from '../../../core/services/auth';
import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authSpy: { login: ReturnType<typeof vi.fn> };
  let router: Router;

  beforeEach(async () => {
    authSpy = { login: vi.fn() };
    authSpy.login.mockReturnValue(of({
      token: 'token-123',
      email: 'admin@stockpro.com',
      role: 'ADMIN',
      fullName: 'Admin User',
    }));

    await TestBed.configureTestingModule({
      imports: [LoginComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    vi.spyOn(router, 'navigate').mockResolvedValue(true);
  });

  it('does not submit without credentials', () => {
    component.onSubmit();

    expect(authSpy.login).not.toHaveBeenCalled();
  });

  it('submits credentials and navigates to the dashboard', () => {
    component.email = 'admin@stockpro.com';
    component.password = 'secret';

    component.onSubmit();

    expect(authSpy.login).toHaveBeenCalledWith({
      email: 'admin@stockpro.com',
      password: 'secret',
    });
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
