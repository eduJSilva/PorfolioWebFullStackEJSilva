import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-experiencia-form',
  templateUrl: './experiencia-form.component.html',
  styleUrls: ['./experiencia-form.component.css']
})
export class ExperienciaFormComponent implements OnInit {
  nuevasExperiencias: [{}]=[{}];

  profileForm = this.fb.group({
  experiencias: this.fb.array([]),
  
  });
  submit!: boolean;

  constructor(private fb: FormBuilder, public service: AppService) {
  }

  get f() {
    return this.profileForm.controls;
  }

  experiencias(): FormArray{
    return this.profileForm.get('experiencias') as FormArray;
  }

  newExperiencia(): FormGroup {
    return this.fb.group({
      puesto:['',[Validators.required]],
      descripcion: '',
      empresa: '',
      imagen: '',
      inicio: '',
      fin:'',
      persona:{id:1}
    })
  }

  addExperiencia() {
    this.experiencias().push(this.newExperiencia());
    this.submit = true;
  }

  onSubmit() {

this.profileForm.value.experiencias.forEach((element: any)=>{
    this.service.postExperiencia(element).subscribe((data) => {
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
  ngOnInit(): void {
  }

}
