import { Component, OnInit, ViewChild} from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { CarouselFormComponent } from './carousel-form/carousel-form.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  fotosList: any;

@ViewChild(CarouselFormComponent) formulario: any;

  constructor(public service: AppService) {
  }

  

  ngOnInit(): void {
    this.service.getUsers().subscribe((date)=>{
      this.fotosList = date.persona[0].portada;
    })
  }
}
