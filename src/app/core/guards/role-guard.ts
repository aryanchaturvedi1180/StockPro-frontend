import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  const hasAccess = allowedRoles?.length ? auth.hasAnyRole(allowedRoles) : auth.isAdmin();
  if (hasAccess) return true;
  router.navigate(['/dashboard']);
  return false;
};
