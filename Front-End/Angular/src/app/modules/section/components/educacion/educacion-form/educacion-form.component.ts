import { Component, OnInit, ViewChild } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-educacion-form',
  templateUrl: './educacion-form.component.html',
  styleUrls: ['./educacion-form.component.css']
})
export class EducacionFormComponent implements OnInit {
  nuevasEducaciones: [{}]=[{}];
  puntaje = 0;

  profileForm = this.fb.group({
  educaciones: this.fb.array([]),
  
  });

  constructor(private fb: FormBuilder, public service: AppService) {
  }

  get f() {
    return this.profileForm.controls;
  }

  educaciones(): FormArray{
    return this.profileForm.get('educaciones') as FormArray;
  }

  newEducacion(): FormGroup {
    return this.fb.group({
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
  }

  addEducacion() {
    this.educaciones().push(this.newEducacion());
  }


  /*removeEducacion(){
    this.educaciones().removeAt(i));}
  */

  onSubmit() {

this.profileForm.value.educaciones.forEach((element: any)=>{
    this.service.postEducacion(element).subscribe((data) => {
      return console.log("POST--> ", data);
    });
  });

    alert('Registro ingresado y modificado con exito!');
    window.location.reload();
  }

    //resetear formulario
    @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
    resetFormulario(){
      setTimeout(() => this.formGroupDirective.resetForm(), 200);
      this.profileForm.reset()
    }
  ngOnInit(): void {
  }
}
