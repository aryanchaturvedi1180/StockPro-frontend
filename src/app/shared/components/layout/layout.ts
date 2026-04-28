import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { catchError, interval, of, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth';
import { AlertService } from '../../../core/services/alert';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  fullName = '';
  role = '';
  isAdmin = false;
  canViewAlerts = false;
  canViewReports = false;
  unreadCount = 0;

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fullName = this.authService.getFullName() || '';
    this.role = this.authService.getRole() || '';
    this.isAdmin = this.authService.canManageUsers();
    this.canViewAlerts = this.authService.canAccessAlerts();
    this.canViewReports = this.authService.canAccessReports();

    if (this.canViewAlerts) {
      this.alertService.unreadCount$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
        next: (count) => this.unreadCount = count,
        error: () => {}
      });

      interval(15000).pipe(
        startWith(0),
        switchMap(() =>
          this.alertService.refreshUnreadCount().pipe(
            catchError(() => of([]))
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe();
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => { this.authService.clearStorage(); this.router.navigate(['/login']); }
    });
  }
}
