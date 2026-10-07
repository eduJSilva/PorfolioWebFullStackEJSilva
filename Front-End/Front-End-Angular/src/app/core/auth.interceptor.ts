import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

/** Agrega el JWT a las llamadas a la API y cierra la sesión si el token deja de ser válido. */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const toast = inject(ToastService);
  const token = req.url.startsWith(environment.apiUrl) ? auth.validToken() : null;
  const request = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      // 406: token inválido / vencido / deslogueado. 401: sin autenticación.
      if (token && (error.status === 401 || error.status === 406)) {
        auth.clear();
        toast.show('Tu sesión expiró. Volvé a ingresar para seguir editando.', 'error');
      }
      return throwError(() => error);
    }),
  );
};
