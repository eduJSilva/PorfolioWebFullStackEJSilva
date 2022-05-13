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
  //url: string = 'http://localhost:8080/';

  url: string = 'https://porfolioeduardojsilva.herokuapp.com/';

  github: string = 'https://github.com/eduJSilva';
  linkelid: string =
    'https://www.linkedin.com/in/eduardo-javier-silva-8089a5224';
  twitter: string = 'https://twitter.com/Silvaedujavier';

  inicioOk = false;
  login: boolean = false;
  goPortfolio = false;
  onlyRead: boolean = false;
  sesionexpire: boolean = false;
  error406: boolean = false;

  datosUsuario: any;
  sesionFinalizada!: boolean;
  usuarioNot!: boolean;
  usuarioYaRegistrado!: boolean;

  showFormDatos!: boolean;
  showFormFoto!: boolean;
  showFormImagenProyecto!: boolean;

  showFormCarousel!: boolean;
  showFormAcercaDe!: boolean;
  showFormeducacion!: boolean;
  showFormeducacionModificar!: boolean;
  showFormeducacionModificar1!: boolean;
  showFormeducacionDelete!: boolean;

  showFormexperiencia!: boolean;
  showFormexperienciaModificar!: boolean;
  showFormexperienciaModificar1!: boolean;
  showFormexperienciaDelete!: boolean;

  showFormSkill!: boolean;
  showFormSkillModificar!: boolean;
  showFormSkillModificar1!: boolean;
  showFormSkillDelete!: boolean;

  showFormProyecto!: boolean;
  showFormProyectoModificar!: boolean;
  showFormProyectoModificar1!: boolean;
  showFormProyectoDelete!: boolean;

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

    this.showFormexperiencia = false;
    this.showFormexperienciaModificar = false;
    this.showFormexperienciaModificar1 = false;
    this.showFormexperienciaDelete = false;
  }

  //CRUD

  //Post
  postUsers(persona: any): Observable<any> {
    return this.http.post('https://reqres.in/api/users', persona);
  }

  postEducacion(educacion: any): Observable<any> {
    return this.http.post(this.url + 'new/educacion', educacion);
  }

  postExperiencia(experiencia: any): Observable<any> {
    return this.http.post(this.url + 'new/experiencia', experiencia);
  }

  postSkill(skill: any): Observable<any> {
    return this.http.post(this.url + 'new/skill', skill);
  }

  postProyecto(proyecto: any): Observable<any> {
    return this.http.post(this.url + 'new/proyecto', proyecto);
  }

  //Logout
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

  //Patch
  putUsers(persona: any): Observable<any> {
    return this.http.patch(this.url + 'modificar/persona', persona);
  }

  modificarAcercaDe(acercade: any): Observable<any> {
    return this.http.patch(this.url + 'modificar/acercade/' + 1, acercade);
  }

  putEducacion(id: any, educacion: any): Observable<any> {
    return this.http.patch(this.url + 'modificar/educacion/' + id, educacion);
  }

  putExperiencia(id: any, experiencia: any): Observable<any> {
    return this.http.patch(
      this.url + 'modificar/experiencia/' + id,
      experiencia
    );
  }

  putSkill(id: any, skill: any): Observable<any> {
    return this.http.patch(this.url + 'modificar/skill/' + id, skill);
  }

  putProyecto(id: any, proyecto: any): Observable<any> {
    return this.http.patch(this.url + 'modificar/proyecto/' + id, proyecto);
  }

  //Delete
  deleteUsers(persona: any): Observable<any> {
    return this.http.delete('https://reqres.in/api/users/2', persona);
  }

  deleteEducacion(id: any): Observable<any> {
    return this.http.delete(this.url + 'delete/educacion/' + id);
  }

  deleteExperiencia(id: any): Observable<any> {
    return this.http.delete(this.url + 'delete/experiencia/' + id);
  }

  deleteSkill(id: any): Observable<any> {
    return this.http.delete(this.url + 'delete/skill/' + id);
  }

  deleteProyecto(id: any): Observable<any> {
    return this.http.delete(this.url + 'delete/proyecto/' + id);
  }

  //Imagen Proyecto -->CRUD
  getImagenProyecto(): Observable<any> {
    return this.http.get(this.url + 'list/imagen-proyectos');
  }

  postImagenProyecto(id: any, imagenproyecto: any): Observable<any> {
    console.log('Datosde la imagen', imagenproyecto);
    console.log('ID--------', id);

    const formData = new FormData();
    formData.append('multipartFile', imagenproyecto);
    return this.http.post(this.url + 'upload/imagen-proyecto/' + id, formData);
  }

  putImagenProyecto(id: any, imagenproyecto: any): Observable<any> {
    console.log('Datosde la imagen', imagenproyecto);
    console.log('ID--------', id);

    const formData = new FormData();
    formData.append('multipartFile', imagenproyecto);
    return this.http.put(
      this.url + 'modificar/imagen-proyecto/' + id,
      formData
    );
  }

  public deleteImagenProyecto(id: number): Observable<any> {
    return this.http.delete<any>(this.url + `delete/imagen-proyecto/${id}`);
  }

  //Foto Principal -->RUD
  getFoto(): Observable<any> {
    return this.http.get(this.url + 'list/fotos');
  }

  putFoto(foto: any): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', foto);
    return this.http.post(this.url + 'upload/foto', formData);
  }

  public deleteFoto(id: number): Observable<any> {
    return this.http.delete<any>(this.url + `delete/foto/${id}`);
  }

  //Portada -->-->RUD
  getPortada(): Observable<any> {
    return this.http.get(this.url + 'list/imagen');
  }

  putPortada(portada: any): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile', portada);
    return this.http.post(this.url + 'upload/imagen', formData);
  }

  public deletePortada(id: number): Observable<any> {
    return this.http.delete<any>(this.url + `delete/imagen/${id}`);
  }
}
