import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  mensajeIncorrecto: string = "Este usuario ya se encuentra registrado!"
  form: FormGroup;
  constructor(public service: AppService, private formBuilder: FormBuilder, private autenticacionService:AutenticacionService, private ruta:Router) {
    this.form=this.formBuilder.group(
      {
       // first_name:['',[Validators.required,Validators.minLength((5))]],
       // last_name:['',[Validators.required,Validators.minLength((5))]],
       // username:['',[Validators.required,Validators.minLength((5))]],
        email:['', [Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength((8))]],
        registerAsAdmin: [false]
      }
    );
   }

  ngOnInit(): void {
  }

  get Nombre() {
    return this.form.get('first_name')
  }

  get Apellido() {
    return this.form.get('last_name')
  }

  get Username() {
    return this.form.get('username')
  }

  get Email(){
    return this.form.get('email')
  }

  get Password() {
    return this.form.get('password')
  }

  onEnviar(event:Event)
  {
    console.log(this.form.value)
    event.preventDefault;
    this.autenticacionService.registrarUsuario(this.form.value).subscribe(data=>{
      console.log("DATA:" + JSON.stringify(data));
      alert("Usuario registrado correctamente!!!. Revisa tu correo electrónico para la verificación.")
      this.ruta.navigate(['inicio']);
    })
  }

}
