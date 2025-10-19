import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthSimService } from '../services/auth-sim.service';

export const simAuthGuard: CanMatchFn = () => {
  const auth = inject(AuthSimService);
  const router = inject(Router);
  return auth.estaAutenticado() || router.createUrlTree(['/login']);
};