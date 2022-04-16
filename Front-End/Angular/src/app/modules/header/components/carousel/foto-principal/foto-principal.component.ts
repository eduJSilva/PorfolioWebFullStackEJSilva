import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
//import { data } from 'jquery';
import { FotoPrincipalFormComponent } from './foto-principal-form/foto-principal-form.component';

@Component({
  selector: 'app-foto-principal',
  templateUrl: './foto-principal.component.html',
  styleUrls: ['./foto-principal.component.css'],
})
export class FotoPrincipalComponent implements OnInit {
  userFoto: any;
  userAvatar: any;

  //fotoPerfil: string = "assets/Foto_2021.png";

  constructor(public service: AppService) {}

  @ViewChild(FotoPrincipalFormComponent) formulario: any;

  ngOnInit(): void {
    /*
    this.service.getUsers().subscribe((data) => {
      this.userFoto = data[0].fotoPerfil;
    });
    */
    
    this.service.getFoto().subscribe((date)=>{
      this.userFoto = date[date.length-1].imagenUrl;
     });
  
  }
}
