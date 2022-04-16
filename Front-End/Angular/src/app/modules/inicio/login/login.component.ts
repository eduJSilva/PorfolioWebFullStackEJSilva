import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
form: FormGroup;
  constructor(public service: AppService, private formBuilder: FormBuilder, private autenticacionService:AutenticacionService, private ruta:Router) {
    this.form=this.formBuilder.group(
      {
        email:['', [Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength((8))]],
        deviceId: ["17867868768"],
        deviceType:["DEVICE-TYPE_ANDROID"],
        notificationToken:["67657575eececc34"]

      }
    );
   }

  ngOnInit(): void {
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
    this.autenticacionService.iniciarSesion(this.form.value).subscribe(data=>{
      console.log("DATA:" + JSON.stringify(data));
      this.ruta.navigate(['portfolio']);
    })
  }

}
