import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { EducacionFormComponent } from './educacion-form/educacion-form.component';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['../../section.component.css', './educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  formGroupDirective: any;
  educacionList: any[] = [];
  nombreModificar: any;
  idModificar: any;
  idBorrar:any;

  borrar: boolean =false;
  educacionSeleccionado: boolean=false;

  form = this.fb.group({
    titulo: [
      '',
      [
        Validators.required,
      ],
    ],
    idSeleccion: 0,
  });

  educacionForm = this.fb.group({
    escuela:'',
    titulo: '',
    estado: false,
    nivel: '',
    imagen: '',
    carrera: '',
    puntaje: [0,[ Validators.min(0),
      Validators.max(10),]],
    inicio: '',
    fin:'',
    persona:{id:1}
  })

  constructor(public service: AppService, private fb:FormBuilder) {}

  getIds() {
    return this.educacionList[0].idEducacion;
  }

  
  getId() {
    this.idModificar = this.form.value.idSeleccion;
    return console.log(this.idBorrar);
  }

  getNombre() {
    for(let element of this.educacionList) {
       if(element.titulo == this.form.value.titulo) {
         this.nombreModificar = element.titulo
         this.idModificar = element.idEducacion
         this.idBorrar = element.idEducacion
         console.log(element.idEducacion)
       }
     };
 
   }

  getIdBorrar() {
    this.idBorrar = this.form.value.idSeleccion;
    return console.log(this.idModificar);
  }

  modificarEdu(){
    if(this.educacionForm.value.estado == null) {
      this.educacionForm.value.estado = false;
    }
    this.service.putEducacion(this.idModificar, this.educacionForm.value).subscribe((data) => {
      alert('Registro modificado con exito!');
      window.location.reload();      
    });
  }

  deleteEdu(){
    this.service.deleteEducacion(this.idBorrar).subscribe((data)=>{
      alert('Registro borrado con exito!');
      window.location.reload(); 
    })
  }

  @ViewChild(EducacionFormComponent) formulario: any;


 
  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      data[0].listaDeEducacion.forEach((element: any) => {
        if (!element.fin) {
          element.fin = "presente"
        }
        this.educacionList = data[0].listaDeEducacion;
      });
    
    });

  }
}
