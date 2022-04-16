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
    nombre:  [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
      ],
    ],
    apellido: [
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
    fechaNacimiento: ['', Validators.required],

    calle: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80),
      ],
    ],
    numero: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(8)],
    ],
    localidad: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
    ],
    ciudad: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
    ],
    provincia: [
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
    /*
    address: this.fb.group({
      calle: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(80),
        ],
      ],
      numero: [
        '',
        [Validators.required, Validators.minLength(1), Validators.maxLength(8)],
      ],
      localidad: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      ciudad: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      provincia: [
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
    */
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
    calle: this.serviceG.calle, 

    numero: this.serviceG.calleNro, 

    localidad: this.serviceG.barrio,

    ciudad: this.serviceG.ciudad,

    provincia: this.serviceG.provincia,

    zip: this.serviceG.codigoPostal,

    };
  
    //this.profileForm.get("address")!.setValue(address);
    this.profileForm.get("calle")!.setValue(address.calle);
    this.profileForm.get("numero")!.setValue(address.numero);
    this.profileForm.get("localidad")!.setValue(address.localidad);
    this.profileForm.get("ciudad")!.setValue(address.ciudad);
    this.profileForm.get("provincia")!.setValue(address.provincia);
    this.profileForm.get("zip")!.setValue(address.zip);
  }


  onSubmit() {
    /*
    this.service.postUsers(this.profileForm.value).subscribe((data) => {
      return console.log("POST--> ", data);
    });
*/
    console.log("Ver acaaaaaa-03-04-22", this.profileForm.value)
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
