import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../header.service';


@Component({
  selector: 'app-datos-basicos',
  templateUrl: './datos-basicos.component.html',
  styleUrls: ['./datos-basicos.component.css'],
})
export class DatosBasicosComponent implements OnInit {
  
  user: any;
  userReqres: any[] = [];
  institucionList: any;
  edad: number = 0;

  constructor(public service: HeaderService) {
  }
  
  obtenerEdad(nacimiento: any) {
    const convertAge = new Date(nacimiento);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    const showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    return  showAge;
  }

  dni(dni:any) {
    return dni[0]+dni[1]+ "." + dni[2]+ dni[3]+ dni[4] + "." + dni[5] + dni[6]+ dni[7];
  }

  ngOnInit(): void {
    
    this.service.getUsers().subscribe((data) => {
      this.user = data.persona
      this.institucionList = data.institucion    
    });

    this.service.getUsersReqres().subscribe((data)=>{
      this.userReqres = data.data;
    })  
  }
}
