import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { GooglePlaceService } from 'src/app/service/google-place.service';

@Component({
  selector: 'app-datos-basicos-form',
  templateUrl: './datos-basicos-form.component.html',
  styleUrls: ['./datos-basicos-form.component.css'],
})
export class DatosBasicosFormComponent implements OnInit {
  edad: any;

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
    fechaNacimiento: [''],

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
      [Validators.minLength(3), Validators.maxLength(10)],
    ],
  
    telefono: ['', [Validators.pattern('[- +()0-9]+')]],
    email: ['', [Validators.email]],
    institucionUno:  [
      '',
      [
        Validators.minLength(3),
      ],
    ],
    logoInstitucionUno:  [
      '',
      [
        Validators.minLength(3),
      ],
    ],
    linkInstitucionUno:  [
      '',
      [
        Validators.minLength(3),
      ],
    ],
    institucionDos:  [
      '',
      [
        Validators.minLength(3),
      ],
    ],
    logoInstitucionDos:  [
      '',
      [
        Validators.minLength(3),
      ],
    ],
    linkInstitucionDos:  [
      '',
      [
        Validators.minLength(3),
      ],
    ],
   
  });

  constructor(private fb: FormBuilder, public service: AppService, public serviceG: GooglePlaceService) {
  }

  get f() {
    return this.profileForm.controls;
  }

  setAddress() {
    let address= {
    calle: this.serviceG.calle, 
    numero: this.serviceG.calleNro, 
    localidad: this.serviceG.barrio,
    ciudad: this.serviceG.ciudad,
    provincia: this.serviceG.provincia,
    zip: this.serviceG.codigoPostal,
    };
  
    this.profileForm.get("calle")!.setValue(address.calle);
    this.profileForm.get("numero")!.setValue(address.numero);
    this.profileForm.get("localidad")!.setValue(address.localidad);
    this.profileForm.get("ciudad")!.setValue(address.ciudad);
    this.profileForm.get("provincia")!.setValue(address.provincia);
    this.profileForm.get("zip")!.setValue(address.zip);
  }


  onSubmit() {
    console.log("Ver acaaaaaa-03-04-22", this.profileForm.value)
    this.service.putUsers(this.profileForm.value).subscribe((data) => {
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
