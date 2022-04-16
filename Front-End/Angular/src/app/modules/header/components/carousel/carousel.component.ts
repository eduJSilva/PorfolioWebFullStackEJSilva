import { Component, OnInit, ViewChild} from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { CarouselFormComponent } from './carousel-form/carousel-form.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  portadaUno: any;
  portadaDos: any;
  portadaTres: any;

@ViewChild(CarouselFormComponent) formulario: any;

  constructor(public service: AppService) {
  }

  

  ngOnInit(): void {
   /*
    this.service.getUsers().subscribe((date)=>{
      this.portadaUno = date[0].portadaOne;
      this.portadaDos = date[0].portadaTwo;
      this.portadaTres = date[0].portadaThree;
    })
     */
    
   this.service.getPortada().subscribe((date)=>{
    this.portadaUno = date[date.length-3].imagenUrl;
    this.portadaDos = date[date.length-2].imagenUrl;
    this.portadaTres = date[date.length-1].imagenUrl;
   });
  
  }
  
}
