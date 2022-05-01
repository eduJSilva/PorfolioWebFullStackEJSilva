import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { SkillsFormComponent } from './skills-form/skills-form.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['../../section.component.css', './skills.component.css'],
})
export class SkillsComponent implements OnInit {
  formGroupDirective: any;
  skillList: any[] = [];
  nombreModificar: any;
  idModificar: any;
  
  idBorrar: any;

  borrar: boolean =false;
  skillSeleccionado: boolean=false;

  dominio: number = 0;
  



  form = this.fb.group({
    nombreSkill: [
      '',
      [
        Validators.required,
      ],
    ],
    idSeleccion: 0,
  });

  skillForm = this.fb.group({
    dominio:[
      this.dominio,
      [
        Validators.min(0),
        Validators.max(100),
      ],
    ],
    nombreSkill: '',
    tipoSkill: '',
    persona: { id: 1 },
  });

  getId() {
    this.idModificar = this.form.value.idSeleccion;
    return console.log(this.idBorrar);
  }

  getNombre() {
   for(let element of this.skillList) {
      if(element.nombreSkill == this.form.value.nombreSkill) {
        this.nombreModificar = element.nombreSkill
        this.idModificar = element.idSkill
        this.idBorrar = element.idSkill
      }
    };

  }

  getIdBorrar() {
    this.idBorrar = this.form.value.idSeleccion;
    return console.log(this.idModificar);
  }

  modificarSkill() {
    this.service
      .putSkill(this.idModificar, this.skillForm.value)
      .subscribe((data) => {
        alert('Registro modificado con exito!');
        window.location.reload();
      });
  }

  deleteSkill() {
    this.service.deleteSkill(this.idBorrar).subscribe((data) => {
      alert('Registro borrado con exito!');
      window.location.reload();
    });
  }

  @ViewChild(SkillsFormComponent) formulario: any;

  constructor(public service: AppService, private fb: FormBuilder) {}

  ngOnInit(): void {
console.log(this.dominio)
    this.service.getUsers().subscribe((data) => {
      this.skillList = data[0].listaDeSkills;
    });
  }
}
