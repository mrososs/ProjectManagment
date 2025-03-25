import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const BASE_URL = 'https://upskilling-egypt.com:3003/api/v1';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Inject Router for navigation
  const toaster = inject(ToastrService); // Inject ToastrService for notifications
  const token = localStorage.getItem('token');

  if (!req.url.startsWith('http')) {
    req = req.clone({
      url: `${BASE_URL}/${req.url}`,
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
          toaster.error('Bad request! Please check your input.');
          break;
        case 401:
          toaster.error('Unauthorized! Please log in again.');
          router.navigate(['/auth/login']); // Redirect to login
          break;
        case 403:
          toaster.error('Access Denied! You do not have permission.');
          break;
        case 404:
          toaster.error('Resource not found!', error.error.message);
          break;
        case 500:
          toaster.error('Server error! Please try again later.');
          break;
        default:
          toaster.error('An unexpected error occurred.', error.error);
      }

      return throwError(() => error);
    })
  );
};
