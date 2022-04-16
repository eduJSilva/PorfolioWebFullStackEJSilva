import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
 
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required]),
  });

 
  constructor() {}

  get f() {
    return this.myForm.controls;
  }

  onFileChange1(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fotito1 = file;
      this.myForm.patchValue({
        fileSource: file,
      });
    }
  }

  onFileChange2(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fotito2 = file;
      this.myForm.patchValue({
        fileSource: file,
      });
    }
  }

  onFileChange3(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.fotito3 = file;
      this.myForm.patchValue({
        fileSource: file,
      });
    }
  }

  cambiarPortada() {
    try {
      let reader1 = new FileReader();
      reader1.readAsDataURL(this.fotito1);

      let reader2 = new FileReader();
      reader2.readAsDataURL(this.fotito2);

      let reader3 = new FileReader();
      reader3.readAsDataURL(this.fotito3);

      reader1.onload = function () {
        let readerResult: any = reader1.result;
        (<HTMLImageElement>document.getElementById('foto1')).src = readerResult;
      };
      reader2.onload = function () {
        let readerResult: any = reader2.result;
        (<HTMLImageElement>document.getElementById('foto2')).src = readerResult;
      };
      reader3.onload = function () {
        let readerResult: any = reader3.result;
        (<HTMLImageElement>document.getElementById('foto3')).src = readerResult;
      };

      reader1.onerror = function () {
        console.log(reader1.error);
      };
      reader2.onerror = function () {
        console.log(reader2.error);
      };

      reader3.onerror = function () {
        console.log(reader3.error);
      };

      this.validator = 1;
    } catch (e) {}

    if (this.validator == 1) {
      alert('Portada modificada con exito!');
      (<HTMLElement>(
        document.getElementById('formularioPortada')
      )).style.display = 'none';
      this.validator = 0;
    } else {
      alert('Por favor ingrese 3 fotos');
    }
  }

  exitFormulario() {
    (<HTMLElement>document.getElementById('formularioPortada')).style.display =
      'none';
  }

  ngOnInit(): void {}
}
