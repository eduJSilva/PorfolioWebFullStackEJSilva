import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['../../section.component.css','./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  constructor(public service: AppService) { }

  ngOnInit(): void {
  }

}
