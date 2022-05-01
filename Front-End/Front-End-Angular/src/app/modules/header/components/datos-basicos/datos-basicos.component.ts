import { formatNumber } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { DatosBasicosFormComponent } from './datos-basicos-form/datos-basicos-form.component';

@Component({
  selector: 'app-datos-basicos',
  templateUrl: './datos-basicos.component.html',
  styleUrls: ['./datos-basicos.component.css'],
})
export class DatosBasicosComponent implements OnInit {
  user!: any;
  userReqres: any[] = [];
  formGroupDirective: any;
  edad: number = 0;
  direccion: string = '';
  dni:string = '';

  @ViewChild(DatosBasicosFormComponent) formulario: any;

  constructor(public service: AppService) {}

  obtenerEdad(nacimiento: any) {
    const convertAge = new Date(nacimiento);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    const showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    return showAge;
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      console.log(data);
      this.user = data;
      let dniString =data[0].documento.toString();
      this.dni = dniString[0]+dniString[1]+"."+dniString[2]+dniString[3]+dniString[4]+"."+dniString[5]+dniString[6]+dniString[7];
      this.direccion = data[0].calle+" Nº"+data[0].numero+", "+data[0].ciudad+". "+data[0].provincia
    } 
    ,
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error){
        console.log('Client-side error');
      }else{
        console.log("Server-side error");
      }
      });
  }
}
