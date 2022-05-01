import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormGroupDirective, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.css']
})
export class SkillsFormComponent implements OnInit {

  nuevasSkills: [{}]=[{}];
  puntaje = 0;
  
  profileForm = this.fb.group({
  skills: this.fb.array([]),
  
  });
  submit!: boolean;

  constructor(private fb: FormBuilder, public service: AppService) {
  }

  get f() {
    return this.profileForm.controls;
  }

  skills(): FormArray{
    return this.profileForm.get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      dominio: [
        ,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
        ],
      ],
      nombreSkill: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ],
      ],
      tipoSkill: [
        '',
        [
          Validators.required,
        ],
      ],
      persona:{id:1}
    })
  }

  addSkill() {
    this.skills().push(this.newSkill());
    this.submit = true;
  }

  onSubmit() {

this.profileForm.value.skills.forEach((element: any)=>{
    this.service.postSkill(element).subscribe((data) => {
      return console.log("POST--> ", data);
    });
  });
    alert('Registro ingresado y modificado con exito!');
    window.location.reload();
  }

    //resetear formulario
    @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
    resetFormulario(){
      setTimeout(() => this.formGroupDirective.resetForm(), 200);
      this.profileForm.reset()
    }
  ngOnInit(): void {}

}
