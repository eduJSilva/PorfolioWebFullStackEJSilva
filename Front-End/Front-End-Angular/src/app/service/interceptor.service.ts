import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  error: number = 0;

  constructor(
    private autenticacionServicio: AutenticacionService,
    private route: Router,
    private service: AppService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var currentUser = this.autenticacionServicio.UsuarioAutenticado;
    if (currentUser && currentUser.accessToken) {
      this.service.loading = true;
      console.log('todo ok!');
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.accessToken}`,
        },
      });
    }

    console.log('Interceptor está corriendo ' + JSON.stringify(currentUser));
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status == 406) {
          this.error = error.status;
          this.service.error406 = true;
          this.service.sesionexpire = true;
          this.route.navigate(['inicio/sesionexpired']);
          return throwError(error);
        }
        if (error.status == 417) {
          this.service.loading = false;
          this.service.usuarioNot = true;
        }

        if (error.status == 409) {
          this.service.usuarioYaRegistrado = true;
        }

        return throwError(error.status);
      })
    );
  }
}
