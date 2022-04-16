import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  //HABILITAR Y MODIFICAR CON LA URL DE LA API CUANDO SE IMPLEMENTE EL BACKEND
  //url:string="http://npinti.dnns.net:9008/api/"
  url:string="https://aaa164e8-8475-49ce-be43-906818021ef8.mock.pstmn.io/"

  inicioOk = false;
  login: boolean = false;
  onlyRead: boolean = false;
  showFormDatos!: boolean;
  showFormFoto!: boolean;
  showFormCarousel!: boolean;
  showFormAcercaDe!: boolean;
  showFormeducacion!: boolean;

  formGroupDirective!: FormGroupDirective;

  constructor(private http: HttpClient) { }


  //resetear todos los formularios
  resetFormulario(formulario: FormGroup) {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    formulario.reset();
  }

  //ocultar todos los formularios al hacer logOut
  logOutForm() {
    this.showFormDatos = false;
    this.showFormFoto = false;
    this.showFormCarousel = false;
    this.showFormAcercaDe = false;
    this.showFormeducacion = false;
  }

  //CRUD

  //Post
  postUsers(persona: any): Observable<any> {
    return this.http.post('https://reqres.in/api/users', persona);
  }

  //Get

     /*
  //DATOS DESDE EL JSON
  getUsers(): Observable<any> {
    console.log("QUE PASA ACAOBSERVABLE-->", '../assets/Json_Achivos/JSON_Persona.json');
  return this.http.get('../assets/Json_Achivos/JSON_Persona.json');
  }
 */

   
  //HABILITAR CUANDO SE IMPLEMENTE EL BACKEND
  getUsers(): Observable<any> {
    console.log("QUE PASA ACAOBSERVABLE-->", this.url+"persona");
    return this.http.get(this.url+"persona");
  }

  //Put
  putUsers(persona: any): Observable<any> {
    return this.http.put('https://reqres.in/api/users/2', persona);
  }

  //Delete
  deleteUsers(persona: any): Observable<any> {
    return this.http.delete('https://reqres.in/api/users/2', persona);
  }

}
