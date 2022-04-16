import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { AcercaDeFormComponent } from './acerca-de-form/acerca-de-form.component';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['../../section.component.css','./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
acercaDe: string = "Martillero Público, Corredor Público y Corredor Inmobiliario. Mi experiencia se basa en más de 20 años de trabajo en importantes empresas de Argentina como Arlei S.A. Considero que mi fortaleza se basa en la confianza y el vínculo humano. Siempre dispuesto a acompañar proyectos creativos que permitan el crecimiento tanto en lo personal como en lo grupal. Estudio programación de forma autodidacta desde hace mas de 5 años, y ahora pude lograr la certificación en Full Stack Developer Jr. Gracias a Argentina Programa. Tengo un proyecto en Github desarrollado en lenguaje Python con el framework Django, este es el link: https://github.com/Freston2021/dfconfecciones";
formGroupDirective: any;

  @ViewChild(AcercaDeFormComponent) formulario: any;

  constructor(public service: AppService) { }

  ngOnInit(): void {
    /*
    this.service.getUsers().subscribe((data) => {
      this.acercaDe = data[0].acercaDe;
  });
  */
  }
}
