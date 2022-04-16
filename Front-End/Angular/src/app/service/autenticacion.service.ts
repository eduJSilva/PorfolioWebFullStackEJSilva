import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
//url="https://reqres.in/api/login";
url="https://aaa164e8-8475-49ce-be43-906818021ef8.mock.pstmn.io/login";
//url="http://npinti.ddns.net:9008/api/auth/login";
currentUserSubject: BehaviorSubject<any>;
  constructor(private http: HttpClient) {
    console.log("El servicio de autenticación está corriendo");
    this.currentUserSubject=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')|| '{}'))
   }
   iniciarSesion(credenciales:any): Observable<any> {
     return this.http.post(this.url, credenciales).pipe(map(data=>{
      sessionStorage.setItem('currentUser', JSON.stringify(data)); 
      this.currentUserSubject.next(data);
      return data;
     }))
   }

   get UsuarioAutenticado(){
     return this.currentUserSubject.value;
   }
}
