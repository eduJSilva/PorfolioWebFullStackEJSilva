import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../header.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {

  fotosList: any;

  constructor(public service: HeaderService) {
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe((date)=>{
      this.fotosList = date.portada;
    })
  }
}
