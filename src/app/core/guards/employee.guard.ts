import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorgeService } from '../services/storge.service';

export const employeeGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorgeService);
  const router = inject(Router);

  if (storageService.isEmployee()) {
    return true;
  } else {
    router.navigate(['/dashboard']); // Redirect unauthorized users
    return false;
  }
};
