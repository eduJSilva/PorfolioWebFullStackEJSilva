import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AppService } from 'src/app/service/app.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import * as $ from 'jquery/dist/jquery.slim';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css'],
})
export class LoginUserComponent implements OnInit {
  email: string= 'edusilvaubp@gmail.com';
  password: string='portfolio1234';
  token: any;
  form: FormGroup;
  private errorMessage: number = 0;
  mensajeIncorrecto: any = "Usuario/Contraseña-->Incorrecto";

   @ViewChild('vercontrasenia') vercontrasenia!: ElementRef;



  constructor(
    public service: AppService,
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private ruta: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      // username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      deviceInfo: this.formBuilder.group({
        deviceId: ['D1'],
        deviceType: ['DEVICE_TYPE_ANDROID'],
        notificationToken: ['N1'],
      }),
    });

    if(service.sesionFinalizada == true){
    location.reload()};

  }

  ngOnInit(): void {}

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }

  get Username() {
    return this.form.get('username');
  }

  mostrarPassword(){
		if(this.vercontrasenia.nativeElement.type == "password"){
			this.vercontrasenia.nativeElement.type = "text";
			$('.icon').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
		}else{
			this.vercontrasenia.nativeElement.type = "password";
			$('.icon').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
		}
	}

  onEnviar(event: Event) {
    this.service.loading = true;
    console.log(this.form.value);
    this.service.datosUsuario = this.form.value;
    event.preventDefault;
    this.autenticacionService
      .iniciarSesion(this.form.value)
      .subscribe((data) => {
        console.log('Datos del Token-->' + JSON.stringify(data));
        this.token = 'Bearer ' + data;
        this.ruta.navigate(['portfolio']);
      });
  }
}
