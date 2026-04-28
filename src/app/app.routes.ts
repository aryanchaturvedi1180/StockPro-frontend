import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent)
  },
  {
    path: '',
    loadComponent: () => import('./shared/components/layout/layout').then(m => m.LayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent) },
      { path: 'products', loadComponent: () => import('./features/products/product-list/product-list').then(m => m.ProductListComponent) },
      { path: 'suppliers', loadComponent: () => import('./features/suppliers/supplier-list/supplier-list').then(m => m.SupplierListComponent) },
      { path: 'warehouses', loadComponent: () => import('./features/warehouses/warehouse-list/warehouse-list').then(m => m.WarehouseListComponent) },
      { path: 'purchase-orders', loadComponent: () => import('./features/purchase-orders/po-list/po-list').then(m => m.PoListComponent) },
      { path: 'movements', loadComponent: () => import('./features/movements/movement-list/movement-list').then(m => m.MovementListComponent) },
      { path: 'alerts', canActivate: [roleGuard], data: { roles: ['ADMIN', 'MANAGER'] }, loadComponent: () => import('./features/alerts/alert-list/alert-list').then(m => m.AlertListComponent) },
      { path: 'reports', canActivate: [roleGuard], data: { roles: ['ADMIN', 'MANAGER'] }, loadComponent: () => import('./features/reports/report-dashboard/report-dashboard').then(m => m.ReportDashboardComponent) },
      { path: 'users', canActivate: [roleGuard], data: { roles: ['ADMIN'] }, loadComponent: () => import('./features/users/user-list/user-list').then(m => m.UserListComponent) }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];
