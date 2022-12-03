import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  //Pruebas con reqres y mock de postman...
  //url="https://reqres.in/api/login";
  //url="https://aaa164e8-8475-49ce-be43-906818021ef8.mock.pstmn.io/login";

  local = false;

  url: string = '';
  urlRegistro: string = '';
  urlResetPassword: string = '';
  urlPasswordResetDatos: string = '';
  urlNewPassword: string = '';

  switchLocal() {
    if (this.local == true) {
      this.url = 'http://localhost:8080/api/auth/login';
      this.urlRegistro = 'http://localhost:8080/api/auth/register';
      this.urlResetPassword =
        'http://localhost:8080/api/auth/password/resetlink';
      this.urlPasswordResetDatos =
        'http://localhost:8080/api/user/password/list/token';
      this.urlNewPassword = 'http://localhost:8080/api/auth/password/reset';

      this.service.url= 'http://localhost:8080/';

      console.log('Entorno de Desarrollo')
    } else {
/*
      this.url = 'https://porfolioeduardojsilva.herokuapp.com/api/auth/login';
      this.urlRegistro =
        'https://porfolioeduardojsilva.herokuapp.com/api/auth/register';
      this.urlResetPassword =
        'https://porfolioeduardojsilva.herokuapp.com/api/auth/password/resetlink';
      this.urlPasswordResetDatos =
        'https://porfolioeduardojsilva.herokuapp.com/api/user/password/list/token';
      this.urlNewPassword =
        'https://porfolioeduardojsilva.herokuapp.com/api/auth/password/reset';

      this.service.url= 'https://porfolioeduardojsilva.herokuapp.com/';
*/

      this.url = 'https://portfolio-edujsilva.koyeb.app/api/auth/login';
      this.urlRegistro =
        'https://portfolio-edujsilva.koyeb.app/api/auth/register';
      this.urlResetPassword =
        'https://portfolio-edujsilva.koyeb.app/api/auth/password/resetlink';
      this.urlPasswordResetDatos =
        'https://portfolio-edujsilva.koyeb.app/api/user/password/list/token';
      this.urlNewPassword =
        'https://portfolio-edujsilva.koyeb.app/api/auth/password/reset';

      this.service.url= 'https://portfolio-edujsilva.koyeb.app/';


        console.log('Entorno de Producción')
    }
  }

  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private service: AppService) {
    console.log('El servicio de autenticación está corriendo');
    this.switchLocal();
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
  }

  registrarUsuario(credenciales: any): Observable<any> {
    return this.http.post(this.urlRegistro, credenciales).pipe(
      map((data) => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        this.service.datosUsuario = credenciales;
        return data;
      })
    );
  }

  iniciarSesion(credenciales: any): Observable<any> {
    return this.http.post(this.url, credenciales).pipe(
      map((data) => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        return data;
      })
    );
  }

  resetPassword(email: any): Observable<any> {
    return this.http.post(this.urlResetPassword, email);
  }

  newPassword(password: any): Observable<any> {
    return this.http.post(this.urlNewPassword, password);
  }

  getPasswordResetDatos(): Observable<any> {
    return this.http.get(this.urlPasswordResetDatos);
  }

  get UsuarioAutenticado() {
    return this.currentUserSubject.value;
  }
}
