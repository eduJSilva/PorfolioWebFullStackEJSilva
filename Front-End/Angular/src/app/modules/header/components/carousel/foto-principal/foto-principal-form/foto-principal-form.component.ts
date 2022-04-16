import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-foto-principal-form',
  templateUrl: './foto-principal-form.component.html',
  styleUrls: ['./foto-principal-form.component.css'],
})
export class FotoPrincipalFormComponent implements OnInit {
  fotito1: any;
  validator: number = 0;

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(public service: AppService, private ruta: Router) {}

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.fotito1 = event.target.files[0];
      this.myForm.patchValue({
        fileSource:  this.fotito1,
      });
      const fr = new FileReader();
      fr.readAsDataURL(this.fotito1);
    }
  }

  cambiar_imagenPrincipal() {
    this.service.putFoto(this.fotito1).subscribe(
      data => {
       return console.log(data)
      },
      err => {
        console.log("");
      }
    );
  
    alert('Foto modificada con exito!');
    alert('En el caso de no ver el cambio por favor volver a cargar la pagina en unos segundos, gracias!');
    this.ruta.navigate(['portfolio']);
    location.reload();
    
  }


  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  //resetear formulario
  resetFormulario(){
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.myForm.reset()
  }

  ngOnInit(): void {}
}
