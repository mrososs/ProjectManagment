import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const managerGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.isManager()) {
    return true;
  } else {
    router.navigate(['/auth']); // Redirect unauthorized users
    return false;
  }
};
