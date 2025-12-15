import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    // Usuario logueado, permite acceso
    return true;
  }

  // Usuario no logueado, redirige al login
  router.navigate(['/admin/login']);
  return false;
};
