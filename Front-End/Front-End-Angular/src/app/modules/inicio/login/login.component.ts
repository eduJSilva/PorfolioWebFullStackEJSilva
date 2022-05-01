import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AppService } from 'src/app/service/app.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  token: any;
  form: FormGroup;
  private errorMessage: number = 0;
  mensajeIncorrecto: any = "Usuario/Contraseña-->Incorrecto";


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

  onEnviar(event: Event) {
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