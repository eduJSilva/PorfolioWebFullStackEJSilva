import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
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

  constructor(public service: AppService) {}

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fotito1 = file;
      this.myForm.patchValue({
        fileSource: file,
      });
    }
  }

  cambiar_imagenPrincipal() {
    this.service.postUsers(this.myForm.value).subscribe((data) => {
      return console.log("POST--> ", data);
    });

    this.service.putUsers(this.myForm.value).subscribe((data) => {
      return console.log("PUT--> ", data);
    });

    try {
      let reader1 = new FileReader();
      reader1.readAsDataURL(this.fotito1);

      reader1.onload = function () {
        let readerResult: any = reader1.result;
        (<HTMLImageElement>document.getElementById('imagen-principal')).src =
          readerResult;
      };

      reader1.onerror = function () {
        console.log(reader1.error);
      };

      this.validator = 1;
    } catch (e) {}

    if (this.validator == 1) {
      alert('Foto de Perfil modificada con exito!');
      (<HTMLElement>(
        document.getElementById('formularioFotoPrincipal')
      )).style.display = 'none';
      this.validator = 0;
    } else {
      alert('Por favor ingrese 1 foto');
    }
  }


  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  //resetear formulario
  resetFormulario(){
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.myForm.reset()
  }

  ngOnInit(): void {}
}
