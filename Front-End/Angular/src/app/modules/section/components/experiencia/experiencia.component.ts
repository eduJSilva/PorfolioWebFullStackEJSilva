import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ExperienciaFormComponent } from './experiencia-form/experiencia-form.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['../../section.component.css','./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  //formGroupDirective: any;
  experienciaList: any[] = [];

  @ViewChild(ExperienciaFormComponent) formulario: any;

  constructor(public service: AppService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.experienciaList = data.persona[0].experiencia;
    });
  }

}
