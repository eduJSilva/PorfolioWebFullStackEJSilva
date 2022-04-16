import { Component, OnInit } from '@angular/core';
//import { data } from 'jquery';
import { HeaderService } from '../../../header.service';

@Component({
  selector: 'app-foto-principal',
  templateUrl: './foto-principal.component.html',
  styleUrls: ['./foto-principal.component.css'],
})
export class FotoPrincipalComponent implements OnInit {
  user: any;
  userAvatar: any;

  //fotoPerfil: string = "assets/Foto_2021.png";

  constructor(public service: HeaderService) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.user = data.persona;
      console.log(data);
    });

    this.service.getUsersReqres().subscribe((data) => {
      this.userAvatar = data.data[1].avatar;
    });
  }
}
