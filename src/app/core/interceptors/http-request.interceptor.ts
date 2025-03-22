import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const BASE_URL = 'https://upskilling-egypt.com:3003/api/v1';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Inject Router for navigation
  const token = localStorage.getItem('userToken') ;

  if (!req.url.startsWith('http')) {
    req = req.clone({ url: `${BASE_URL}/${req.url}` ,
      setHeaders:{Authorization: `Bearer ${token}` }  });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 400:
          console.error('Bad Request:', error.error);
          alert('Bad request! Please check your input.');
          break;
        case 401:
          console.error('Unauthorized:', error.error);
          alert('Unauthorized! Please log in again.');
          router.navigate(['/auth/login']); // Redirect to login
          break;
        case 403:
          console.error('Forbidden:', error.error);
          alert('Access Denied! You do not have permission.');
          break;
        case 404:
          console.error('Not Found:', error.error);
          alert('Resource not found!');
          break;
        case 500:
          console.error('Internal Server Error:', error.error);
          alert('Server error! Please try again later.');
          break;
        default:
          console.error('Unknown Error:', error.error);
          alert('An unexpected error occurred.');
      }

      return throwError(() => error);
    })
  );
};
