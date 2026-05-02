import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}/api/v1/auth`;
  constructor(private http: HttpClient) {}

  login(r: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, r).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('fullName', res.fullName);
        localStorage.setItem('email', res.email);
        if (res.lastLoginAt) {
          localStorage.setItem('lastLoginAt', res.lastLoginAt);
        }
      })
    );
  }
  register(r: RegisterRequest): Observable<User> { return this.http.post<User>(`${this.api}/register`, r).pipe(map((user) => this.normalizeUser(user))); }
  logout(): Observable<void> { return this.http.post<void>(`${this.api}/logout`, {}).pipe(tap(() => this.clearStorage())); }
  clearStorage(): void { ['token','role','fullName','email'].forEach(k => localStorage.removeItem(k)); }
  getToken(): string | null { return localStorage.getItem('token'); }
  getRole(): string | null { return localStorage.getItem('role'); }
  getFullName(): string | null { return localStorage.getItem('fullName'); }
  isLoggedIn(): boolean { return !!this.getToken(); }
  isAdmin(): boolean { return this.getRole() === 'ADMIN'; }
  isAdminOrManager(): boolean { return ['ADMIN','MANAGER'].includes(this.getRole() || ''); }
  hasAnyRole(roles: string[]): boolean { return roles.includes(this.getRole() || ''); }
  canAccessAlerts(): boolean { return this.hasAnyRole(['ADMIN', 'MANAGER']); }
  canAccessReports(): boolean { return this.hasAnyRole(['ADMIN', 'MANAGER']); }
  canManageUsers(): boolean { return this.isAdmin(); }
  canWriteInventory(): boolean { return this.hasAnyRole(['ADMIN', 'MANAGER']); }
  getAllUsers(): Observable<User[]> { return this.http.get<User[]>(`${this.api}/users`).pipe(map((users) => users.map((user) => this.normalizeUser(user)))); }
  deactivateUser(id: number): Observable<void> { return this.http.put<void>(`${this.api}/users/${id}/deactivate`, {}); }
  reactivateUser(id: number): Observable<void> { return this.http.put<void>(`${this.api}/users/${id}/reactivate`, {}); }

  private normalizeUser(user: User & { active?: boolean }): User {
    return { ...user, isActive: user.isActive ?? user.active ?? false };
  }
}
