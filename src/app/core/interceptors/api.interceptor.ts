import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const apiUrl = 'http://localhost:3000';

  const modifedReq = req.clone({
    url: apiUrl + req.url,
  });

  return next(modifedReq);
};
