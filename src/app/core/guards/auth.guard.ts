import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorgeService } from '../services/storge.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorgeService);
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/auth']); // Redirect to login page if not authenticated
    return false;
  }
};
