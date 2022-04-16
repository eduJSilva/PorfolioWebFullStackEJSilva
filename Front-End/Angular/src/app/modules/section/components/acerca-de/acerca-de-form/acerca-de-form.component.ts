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

  constructor(private fb: FormBuilder, public service: AppService) {
  }

  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    this.service.postUsers(this.profileForm.value).subscribe((data) => {
      return console.log("POST--> ", data);
    });

    this.service.putUsers(this.profileForm.value).subscribe((data) => {
      return console.log("PUT--> ", data);
    });

    //ELIMINAR AL IMPLEMENTAR EL BACKEND
    (<HTMLElement>document.getElementById('text-acercade')).textContent =
      this.profileForm.value.acercaDe
     
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
