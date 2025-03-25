import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const employeeGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.isEmployee()) {
    return true;
  } else {
    router.navigate(['/dashboard']); // Redirect unauthorized users
    return false;
  }
};
