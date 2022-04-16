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
  institucionList: any[] = [];
  edad: number = 0;
  formGroupDirective: any;
  direccion: string = '';

  @ViewChild(DatosBasicosFormComponent) formulario: any;

  constructor(public service: AppService) {}

  obtenerEdad(nacimiento: any) {
    const convertAge = new Date(nacimiento);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    const showAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    return showAge;
  }

  dni(dni: any) {
    return (
      dni[0] +
      dni[1] +
      '.' +
      dni[2] +
      dni[3] +
      dni[4] +
      '.' +
      dni[5] +
      dni[6] +
      dni[7]
    );
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.user = data.persona;
      this.institucionList = data.persona[0].instituciones;
      this.direccion =
        this.user[0].address.street +
        ' Nº' +
        this.user[0].address.number +
        ', ' +
        this.user[0].address.city +
        '-' +
        this.user[0].address.province;
    },
    (err: HttpErrorResponse) => {
      if (err.error instanceof Error){
        console.log('Client-side error');
      }else{
        console.log("Server-side error");
      }
      });
  }
}
