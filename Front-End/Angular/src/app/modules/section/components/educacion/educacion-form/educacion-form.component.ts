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
      fin:''
    })
  }

  addEducacion() {
    this.educaciones().push(this.newEducacion());
  }


  /*removeEducacion(){
    this.educaciones().removeAt(i));}
  */

  onSubmit() {
    this.service.postUsers(this.profileForm.value).subscribe((data) => {
      return console.log("POST--> ", data);
    });

    this.service.putUsers(this.profileForm.value).subscribe((data) => {
      return console.log("PUT--> ", data);
    });

    alert('Registro ingresado y modificado con exito!');
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
