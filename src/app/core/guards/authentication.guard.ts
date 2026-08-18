import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TOKEN_KEY } from '../constants/global.constant';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    if (!route.url.length) {
      router.navigate(['/home']);
    }
    return true;
  }
  return router.createUrlTree(['']);
};
