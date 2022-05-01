import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { AcercaDeFormComponent } from './acerca-de-form/acerca-de-form.component';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['../../section.component.css','./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
acercaDe: string ="nada";
formGroupDirective: any;

  @ViewChild(AcercaDeFormComponent) formulario: any;

  constructor(public service: AppService) { }

  ngOnInit(): void {
    
    this.service.getUsers().subscribe((data) => {
      this.acercaDe = data[0].acercaDe;
  });
  
  }
  
}
