import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(public service: AppService) {
   if(service.sesionFinalizada == true)
    location.reload();
   }
  
  ngOnInit(): void {
   
  }

}
