import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroupDirective, Validators } from '@angular/forms';

import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-acerca-de-form',
  templateUrl: './acerca-de-form.component.html',
  styleUrls: ['./acerca-de-form.component.css']
})
export class AcercaDeFormComponent implements OnInit {

  profileForm = this.fb.group({
    acercaDe:  [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1000),
      ],
    ]
  });


/*
  profileForm = this.fb.group({
    nombre:  [
      '',
      [
      
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ],
    ],
    apellido: [
      '',
      [
       
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ],
    ],
    acercaDe:  [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(1000),
      ],
    ],
    puesto: [
      '',
      [Validators.minLength(3), Validators.maxLength(80)],
    ],
    documento: [
      '',
      [
       
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[0-9]+'),
      ],
    ],
    fechaNacimiento: ['', ],

    calle: [
      '',
      [
       
        Validators.minLength(3),
        Validators.maxLength(80),
      ],
    ],
    numero: [
      '',
      [Validators.minLength(1), Validators.maxLength(8)],
    ],
    localidad: [
      '',
      [
       
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
    ],
    ciudad: [
      '',
      [
      
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
    ],
    provincia: [
      '',
      [
       
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
    ],
    zip: [
      '',
      [ Validators.minLength(3), Validators.maxLength(10)],
    ],

    telefono: ['', [Validators.pattern('[- +()0-9]+')]],
    email: ['', [Validators.email]],
  });

*/
  constructor(private fb: FormBuilder, public service: AppService) {
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    alert(this.profileForm.value.acercaDe)
  
    this.service.modificarAcercaDe(this.profileForm.value).subscribe((data) => {
      return console.log("PUT--> ", data);
    });     
    alert('Registro ingresado y modificado con exito!');
    location.reload();
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
