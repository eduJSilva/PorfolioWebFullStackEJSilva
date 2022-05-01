import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-carousel-form',
  templateUrl: './carousel-form.component.html',
  styleUrls: ['./carousel-form.component.css'],
})
export class CarouselFormComponent implements OnInit {
  fotito1: any;
  fotito2: any;
  fotito3: any;
  validator: number = 0;

  listaFotos: [] = [];
 
    myForm = new FormGroup({
   // name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required]),
  });

  constructor(public service: AppService, private fb:FormBuilder) {}

  get f() {
    return this.myForm.controls;
  }

  onFileChange1(event: any) {
    if (event.target.files.length > 0) {
      this.fotito1 = event.target.files[0];
      this.myForm.patchValue({
        fileSource: this.fotito1,
      });
      const fr = new FileReader();
      fr.readAsDataURL(this.fotito1);
    }
  }

  onFileChange2(event: any) {
    if (event.target.files.length > 0) {
      this.fotito2 = event.target.files[0];
      this.myForm.patchValue({
        fileSource: this.fotito2,
      });
      const fr = new FileReader();
      fr.readAsDataURL(this.fotito2);
    }
  }

  onFileChange3(event: any) {
    if (event.target.files.length > 0) {
      this.fotito3 = event.target.files[0];
      this.myForm.patchValue({
        fileSource: this.fotito3,
      });
      const fr = new FileReader();
      fr.readAsDataURL(this.fotito3);
    }
  }

  
  cambiarPortada(): void {
    console.log("Listado de fotos-->>>",this.listaFotos)
    this.service.putPortada(this.fotito1).subscribe(
      data => {
       return console.log(data)
      },
      err => {
        console.log("");
      }
    );

    this.service.putPortada(this.fotito2).subscribe(
      data => {
       return console.log(data)
      },
      err => {
        console.log("");
      }
    );

    this.service.putPortada(this.fotito3).subscribe(
      data => {
       return console.log(data)
      },
      err => {
        console.log("");
      }
    );
    alert('Portada modificada con exito!');
    window.location.reload();
  }

  
 
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;

  //resetear formulario
  resetFormulario(){
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.myForm.reset()
  }

  ngOnInit(): void {
    this.service.getPortada().subscribe((data) => {
      this.listaFotos = data;
    });
  }
}
