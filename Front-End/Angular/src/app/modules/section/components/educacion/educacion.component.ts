import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { EducacionFormComponent } from './educacion-form/educacion-form.component';
import {FormBuilder, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['../../section.component.css', './educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  formGroupDirective: any;
  educacionList: any[] = [];
  idModificar: any;
  idBorrar:any;

  form = this.fb.group({
    idSeleccion: 0
  })

  educacionForm = this.fb.group({
    escuela:'',
    titulo: '',
    estado: false,
    nivel: '',
    imagen: '',
    carrera: '',
    puntaje: 0,
    inicio: '',
    fin:'',
    persona:{id:1}
  })
  
  getId() {
    this.idModificar = this.form.value.idSeleccion;
    return console.log(this.idBorrar);
  }

  getIdBorrar() {
    this.idBorrar = this.form.value.idSeleccion;
    return console.log(this.idModificar);
  }

  modificarEdu(){
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

  constructor(public service: AppService, private fb:FormBuilder) {}

 
  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.educacionList = data[0].listaDeEducacion;
    });
  }
}
