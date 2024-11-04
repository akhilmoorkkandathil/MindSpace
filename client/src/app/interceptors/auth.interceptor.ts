import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Check if window and localStorage are available (browser environment)
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  
  let accessToken: string | null = null;
  let refreshToken: string | null = null;

  if (isBrowser) {
    accessToken = localStorage.getItem('accessToken');
    refreshToken = localStorage.getItem('refreshToken');
  }

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
        'X-Refresh-Token': refreshToken || ''
      }
    });
  }

  return next(req);
};
