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
  nuevasInstituciones: [{}]=[{}];

  profileForm = this.fb.group({
    firstName:  [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ],
    ],
    puesto: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(80)],
    ],
    documento: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        Validators.pattern('[0-9]+'),
      ],
    ],
    fecha_nacimiento: ['', Validators.required],
    address: this.fb.group({
      street: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        ],
      ],
      number: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(8)],
      ],
      locality: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      province: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      zip: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      ],
    }),
    telefono: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    email: ['', [Validators.required, Validators.email]],
    instituciones: this.fb.array([]),
  });

  constructor(private fb: FormBuilder, public service: AppService, public serviceG: GooglePlaceService) {
  }

  get f() {
    return this.profileForm.controls;
  }

  instituciones(): FormArray {
    return this.profileForm.get('instituciones') as FormArray;
  }

  newInstitucion(): FormGroup {
    return this.fb.group({
      logo: '',
      institucion: '',
    });
  }

  addInstitucion() {
    this.instituciones().push(this.newInstitucion());
  }

  /*
  removeInstitucion() {
    this.instituciones().removeAt(i));
  }
  */

  setAddress() {
 
    let address= {
    street: this.serviceG.calle, 

    number: this.serviceG.calleNro, 

    locality: this.serviceG.barrio,

    city: this.serviceG.ciudad,

    province: this.serviceG.provincia,

    zip: this.serviceG.codigoPostal,

    };
  
    this.profileForm.get("address")!.setValue(address);
  }


  onSubmit() {
    this.service.postUsers(this.profileForm.value).subscribe((data) => {
      return console.log("POST--> ", data);
    });

    this.service.putUsers(this.profileForm.value).subscribe((data) => {
      return console.log("PUT--> ", data);
    });

    /*
    //ELIMINAR AL IMPLEMENTAR EL BACKEND
    (<HTMLElement>document.getElementById('text-nombre')).textContent =
      this.profileForm.value.firstName + ' ' + this.profileForm.value.lastName;
    (<HTMLElement>document.getElementById('text-titulo')).textContent =
      this.profileForm.value.puesto;
    (<HTMLElement>document.getElementById('text-direccion')).textContent =
      this.profileForm.value.address.street +
      ' Nº' +
      this.profileForm.value.address.number +
      ', ' +
      this.profileForm.value.address.locality +
      ', ' +
      this.profileForm.value.address.city +
      ', ' +
      this.profileForm.value.address.province +
      '. CP: ' +
      this.profileForm.value.address.zip;

    (<HTMLElement>document.getElementById('telefono')).textContent =this.profileForm.value.telefono;

    (<HTMLElement>document.getElementById('email')).textContent =
      this.profileForm.value.email;

    //ELIMINAR AL IMPLEMENTAR EL BACKEND
    //edad
    const convertAge = new Date(this.profileForm.value.fecha_nacimiento);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    const showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);

    (<HTMLElement>document.getElementById('text-date')).textContent =
      'Edad: ' + showAge;

//ELIMINAR AL IMPLEMENTAR EL BACKEND
    //dni
    let dni = this.profileForm.value.documento;
    let dniFormato =
      dni[0] +
      dni[1] +
      '.' +
      dni[2] +
      dni[3] +
      dni[4] +
      '.' +
      dni[5] +
      dni[6] +
      dni[7];

    (<HTMLElement>document.getElementById('text-dni')).textContent =
      'Dni: ' + dniFormato;


//ELIMINAR AL IMPLEMENTAR EL BACKEND
    //Instituciones
    for (let institucion of this.profileForm.value.instituciones) {
      let logo = this.profileForm.value.instituciones[
          this.profileForm.value.instituciones.indexOf(institucion)
        ].logo;
      let nombre =
        this.profileForm.value.instituciones[
          this.profileForm.value.instituciones.indexOf(institucion)
        ].institucion;

        
      let strin =
        'insti' + this.profileForm.value.instituciones.indexOf(institucion);
      let nombreInsti =
        'nombre' + this.profileForm.value.instituciones.indexOf(institucion);

      (<HTMLImageElement>document.getElementById(strin))['src'] = logo;
      (<HTMLElement>document.getElementById(nombreInsti)).textContent = nombre;

      
    }*/
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
