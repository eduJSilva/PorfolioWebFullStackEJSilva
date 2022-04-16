import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { EducacionFormComponent } from './educacion-form/educacion-form.component';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['../../section.component.css', './educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  formGroupDirective: any;
  educacionList: any[] = [];

  @ViewChild(EducacionFormComponent) formulario: any;

  constructor(public service: AppService) {}
  
  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.educacionList = data.persona[0].education;
    });
  }
}
