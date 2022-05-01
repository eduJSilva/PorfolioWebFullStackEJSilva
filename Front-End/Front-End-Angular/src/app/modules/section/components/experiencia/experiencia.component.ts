import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { ExperienciaFormComponent } from './experiencia-form/experiencia-form.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['../../section.component.css','./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  formGroupDirective: any;
  experienciaList: any[] = [];
  nombreModificar: any;
  idModificar: any;
  idBorrar:any;

  borrar: boolean =false;
  experienciaSeleccionado: boolean=false;


  form = this.fb.group({
    puesto: [
      '',
      [
        Validators.required,
      ],
    ],
    idSeleccion: 0,
  });


  experienciaForm = this.fb.group({
    puesto:'',
    descripcion: '',
    empresa: '',
    imagen: '',
    inicio: '',
    fin:'',
    persona:{id:1}
  })

  constructor(public service: AppService, private fb:FormBuilder) { }

  getIds() {
    return this.experienciaList[0].idExperiencia;
  }


  getId() {
    this.idModificar = this.form.value.idSeleccion;
    return console.log(this.idBorrar);
  }

  getNombre() {
    for(let element of this.experienciaList) {
       if(element.puesto == this.form.value.puesto) {
         this.nombreModificar = element.puesto
         this.idModificar = element.idExperiencia
         this.idBorrar = element.idExperiencia
         console.log(element.idExperiencia)
       }
     };
 
   }
 

  getIdBorrar() {
    this.idBorrar = this.form.value.idSeleccion;
    return console.log(this.idModificar);
  }

  modificarExp(){
    this.service.putExperiencia(this.idModificar, this.experienciaForm.value).subscribe((data) => {
      alert('Registro modificado con exito!');
      window.location.reload();      
    });
  }

  deleteExp(){
    this.service.deleteExperiencia(this.idBorrar).subscribe((data)=>{
      alert('Registro borrado con exito!');
      window.location.reload(); 
    })
  }

  @ViewChild(ExperienciaFormComponent) formulario: any;


  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      data[0].listaDeExperiencias.forEach((element: any) => {
        if (!element.fin) {
          element.fin = "presente"
        }
        this.experienciaList = data[0].listaDeExperiencias;
      });
    
    });
  }

}
