import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  //MOCK DE POSTMAN
  //url:string="https://aaa164e8-8475-49ce-be43-906818021ef8.mock.pstmn.io/"

  //Servidor TomCat de Sprintboot
  url: string = 'http://localhost:8080/';

  inicioOk = false;
  login: boolean = false;
  goPortfolio = false;
  onlyRead: boolean = false;
  sesionexpire: boolean = false;
  error406: boolean = false;

  datosUsuario: any;
  sesionFinalizada!: boolean;
  usuarioNot!:boolean;

  showFormDatos!: boolean;
  showFormFoto!: boolean;
  showFormCarousel!: boolean;
  showFormAcercaDe!: boolean;
  showFormeducacion!: boolean;
  showFormeducacionModificar!: boolean;
  showFormeducacionModificar1!: boolean;
  showFormeducacionDelete!: boolean;

  formGroupDirective!: FormGroupDirective;

  constructor(private http: HttpClient) {}

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
    this.showFormeducacionModificar = false;
    this.showFormeducacionModificar1 = false;
    this.showFormeducacionDelete = false;
  }

  //CRUD

  //Post
  postUsers(persona: any): Observable<any> {
    return this.http.post('https://reqres.in/api/users', persona);
  }

  postEducacion(educacion: any): Observable<any> {
    return this.http.post(this.url + 'new/educacion', educacion);
  }

  logout(): Observable<any> {
    return this.http.post(this.url + 'api/user/logout', this.datosUsuario);
  }

  //Get

  /*
  //DATOS DESDE EL JSON
  getUsers(): Observable<any> {
    console.log("QUE PASA ACAOBSERVABLE-->", '../assets/Json_Achivos/JSON_Persona.json');
  return this.http.get('../assets/Json_Achivos/JSON_Persona.json');
  }
 */

  getUsers(): Observable<any> {
    console.log('endpoint GET-->', this.url + 'ver/personas');
    return this.http.get(this.url + 'ver/personas');
  }

  getUsuario(): Observable<any> {
    return this.http.get(this.url + 'api/user/admins', {
      responseType: 'text',
    });
  }

  //Foto Principal
  putFoto(foto: any): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', foto);
    return this.http.post(this.url + 'upload/foto', formData);
  }

  getFoto(): Observable<any> {
    return this.http.get(this.url + 'list/fotos');
  }


  public deleteFoto(id: number): Observable<any> {
    return this.http.delete<any>(this.url + `delete/foto/${id}`);
  }

  //Portada
  putPortada(portada: any): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', portada);
    return this.http.post(this.url + 'upload/imagen', formData);
  }

  getPortada(): Observable<any> {
    return this.http.get(this.url + 'list/imagen');
  }


  public deletePortada(id: number): Observable<any> {
    return this.http.delete<any>(this.url + `delete/imagen/${id}`);
  }



  //Put
  putUsers(persona: any): Observable<any> {
    return this.http.patch(this.url + 'modificar/persona', persona);
  }

  putEducacion(id: any, educacion: any): Observable<any> {
    return this.http.put(this.url + 'modificar/educacion/' + id, educacion);
  }

  //Delete
  deleteUsers(persona: any): Observable<any> {
    return this.http.delete('https://reqres.in/api/users/2', persona);
  }

  deleteEducacion(id: any): Observable<any> {
    return this.http.delete(this.url + 'delete/educacion/' + id);
  }
}
