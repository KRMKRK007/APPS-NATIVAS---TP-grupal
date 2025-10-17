import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

export const authGuard: CanMatchFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);
  try {
    const session = await supabase.getSession();
    return !!session || router.createUrlTree(['/login']);
  } catch {
    return router.createUrlTree(['/login']);
  }
};