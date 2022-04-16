import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HeaderService } from '../../../header.service';

@Component({
  selector: 'app-datos-basicos-form',
  templateUrl: './datos-basicos-form.component.html',
  styleUrls: ['./datos-basicos-form.component.css'],
})
export class DatosBasicosFormComponent implements OnInit {
  edad: any;
  
  profileForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    puesto:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]], 
    documento: ['', Validators.required],
    fecha_nacimiento: ['', Validators.required],
    address: this.fb.group({
      street: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      number: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(8)]],
      city: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      zip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    }),
    telefono: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
    email: ['', [Validators.required, Validators.email]],
    instituciones: this.fb.array([]),
  });

/*
  profileForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    puesto: [''],
    documento: ['', [Validators.required, Validators.pattern('^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$')]],
    fecha_nacimiento: [''],
    address: this.fb.group({
      street: [''],
      number: [''],
      city: [''],
      zip: [''],
    }),
    telefono: [''],
    email: [''],
    instituciones: this.fb.array([]),
  });
  */

  constructor(private fb: FormBuilder, private service: HeaderService) {}

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


  onSubmit() {
  
    this.service.postUsers(this.profileForm.value).subscribe((data) => {
      return console.log(data);
    });

    (<HTMLElement>document.getElementById('text-nombre')).textContent =
      this.profileForm.value.firstName + ' ' + this.profileForm.value.lastName;
    (<HTMLElement>document.getElementById('text-titulo')).textContent =
      this.profileForm.value.puesto;
    (<HTMLElement>document.getElementById('text-direccion')).textContent =
      this.profileForm.value.address.street + ' Nº' + this.profileForm.value.address.number + ', ' + this.profileForm.value.address.city + '. CP: ' + this.profileForm.value.address.zip;

    (<HTMLElement>document.getElementById('telefono')).textContent =
      this.profileForm.value.telefono;

      (<HTMLElement>document.getElementById('email')).textContent =
      this.profileForm.value.email;

      //edad
      const convertAge = new Date(this.profileForm.value.fecha_nacimiento);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      const showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

    (<HTMLElement>document.getElementById('text-date')).textContent =
    "Edad: " +showAge;

    //dni
    
    let dni= this.profileForm.value.documento;
    let dniFormato=  dni[0]+dni[1]+ "." + dni[2]+ dni[3]+ dni[4] + "." + dni[5] + dni[6]+ dni[7];
    
    (<HTMLElement>document.getElementById('text-dni')).textContent =
      "Dni: " + dniFormato;

      for (let institucion of this.profileForm.value.instituciones) {       
       let logo= this.profileForm.value.instituciones[this.profileForm.value.instituciones.indexOf(institucion)].logo;
       let nombre= this.profileForm.value.instituciones[this.profileForm.value.instituciones.indexOf(institucion)].institucion;
        
       let strin="insti" + this.profileForm.value.instituciones.indexOf(institucion);
       let nombreInsti="nombre" + this.profileForm.value.instituciones.indexOf(institucion);

     
       console.log(logo);
       console.log(nombre);

        (<HTMLImageElement>document.getElementById(strin))['src']=logo;
        (<HTMLElement>document.getElementById(nombreInsti)).textContent = nombre;
      }

    //oculta formulario datos principales
    (<HTMLElement>document.getElementById('form-datos')).style.display = 'none';

    alert('Registro ingresado y modificado con exito!');
  
  };

  exitFormulario() {
    (<HTMLElement>document.getElementById('form-datos')).style.display = 'none';
  }

  ngOnInit(): void {
  }
}
