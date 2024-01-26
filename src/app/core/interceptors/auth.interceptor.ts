import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const storegeServie = inject(StorageService);
  const router = inject(Router);

  const userToken = storegeServie.getToken();

  const modifedReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${userToken}`),
  });

  return next(modifedReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        storegeServie.removeToken();
        router.navigate(['common', 'authorize']);
      }

      return throwError(() => err);
    })
  );
};
