import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
formEmail: FormGroup;
mensajeIncorrecto: string = "Este usuario no se encuentra registrado!"

  constructor(public service: AppService, private autenticacionService: AutenticacionService, private formBuilder: FormBuilder, private ruta: Router,) {
    this.formEmail=this.formBuilder.group(
      {
        email:['', [Validators.required,Validators.email]],
      }
    );
  }

  resetPassword(event:Event){
    console.log(this.formEmail.value);
    event.preventDefault;
    this.autenticacionService.resetPassword(this.formEmail.value).subscribe(data=>{
      alert('Se le ha enviado un link a su correo para reestablecer la contraseña.');
      this.service.resetpassword = false;
      this.service.usuarioNot = false;
      this.service.error417 = false;
      this.ruta.navigate(['inicio']);

    })
  }

  get Email(){
    return this.formEmail.get('email')
  }

  ngOnInit() {
  }

}
