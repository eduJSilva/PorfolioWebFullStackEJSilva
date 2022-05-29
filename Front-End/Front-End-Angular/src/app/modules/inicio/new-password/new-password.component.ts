import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  correo:string = '';
  token:string = '';
  form = this.formBuilder.group({
    email: ['',[Validators.required]],
    password: ['',[Validators.required, Validators.minLength(8)]],
    confirmPassword: ['',[Validators.required, Validators.minLength(8)]],
    token: ['',[Validators.required]],
  });

  @ViewChild('vercontrasenia') vercontrasenia!: ElementRef;
  @ViewChild('vercontrasenia1') vercontrasenia1!: ElementRef;

  constructor(public service: AppService, private autenticacionService: AutenticacionService, private formBuilder: FormBuilder, private ruta: Router,) {
    this.obtenerDatosPasswordReset();

  }

  get Password() {
    return this.form.get('password');
  }

  get ConfirmPassword() {
    return this.form.get('confirmPassword');
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

  mostrarConfirmarPassword(){
		if(this.vercontrasenia1.nativeElement.type == "password"){
			this.vercontrasenia1.nativeElement.type = "text";
			$('.icon1').removeClass('fa fa-eye-slash').addClass('fa fa-eye');
		}else{
			this.vercontrasenia1.nativeElement.type = "password";
			$('.icon1').removeClass('fa fa-eye').addClass('fa fa-eye-slash');
		}
	}

  onEnviarContrasenia(event: Event) {
    console.log(this.form.value);
    event.preventDefault;
    this.autenticacionService
      .newPassword(this.form.value)
      .subscribe((data) => {
        console.log('se cambió la contraseña-->' + JSON.stringify(data));
        alert("Contraseña modificada con exito!")
        this.ruta.navigate(['inicio']);
      });
  }


  obtenerDatosPasswordReset() {
    this.autenticacionService.getPasswordResetDatos().subscribe((data) => {
     this.correo = data[data.length - 1].user.email;
     this.token = data[data.length - 1].token;
     console.log('CORREO: ', this.correo,'TOKEN: ', this.token)
    });

  }



  ngOnInit() {
  }

}
