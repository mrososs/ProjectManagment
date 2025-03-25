import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorgeService } from '../services/storge.service';

export const managerGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorgeService);
  const router = inject(Router);

  if (storageService.isManager()) {
    return true;
  } else {
    router.navigate(['/auth']); // Redirect unauthorized users
    return false;
  }
};
