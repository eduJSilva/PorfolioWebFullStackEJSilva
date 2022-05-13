import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/service/app.service';

@Component({
  selector: 'app-proyectos-form',
  templateUrl: './proyectos-form.component.html',
  styleUrls: ['./proyectos-form.component.css'],
})
export class ProyectosFormComponent implements OnInit {
  submit: boolean = false;

  /*CARGAR IMAGENES
   */
  fotito1: any[] = [];

  proyectoList: any[] = [];

  idUltimoProyecto: any;

  nuevasProyectos: [{}] = [{}];

  profileForm = this.fb.group({
    proyectos: this.fb.array([]),
  });

  conta!: number;

  agregarDisable:boolean = false;



  constructor(
    private fb: FormBuilder,
    public service: AppService,
    private ruta: Router
  ) {}

  get f() {
    return this.profileForm.controls;
  }

  /*CARGAR IMAGEN del proyecto
   */
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.fotito1.push(event.target.files[event.target.files.length - 1]);

      this.fotito1.forEach((foto) => {
        const fr = new FileReader();
        fr.readAsDataURL(foto);
      });

      console.log('datos Fotito1:----♠: ', this.fotito1);
    }
  }

  cambiar_imagenProyecto() {
     this.service
      .postImagenProyecto(((this.proyectoList[this.proyectoList.length-1].idProyecto))+1, this.fotito1[this.conta])
      .subscribe((data) => {
        return console.log('PRIMERID-------------', data,  this.idUltimoProyecto + 1);

      });

  }

  proyectos(): FormArray {
    return this.profileForm.get('proyectos') as FormArray;
  }

  newProyecto(): FormGroup {
    return this.fb.group({
      idProyecto: [((this.proyectoList[this.proyectoList.length-1].idProyecto))+1],
      nombreProyecto: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60),
        ],
      ],
      fecha: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      link: ['', [Validators.required]],
      // imagen: ['', [Validators.required]],
      file: ['',[Validators.required]],
      fileSource: '',
      persona: { id: 1 },
    });
  }

  addProyecto() {
    this.proyectos().push(this.newProyecto());
    this.submit = true;
    this.agregarDisable = true;
  }

  onSubmit() {

    for (let i = 0; i < this.profileForm.value.proyectos.length; i++) {
      this.conta = i;
      let contador: any = 0;
     this.service.postProyecto(this.profileForm.value.proyectos[i]).subscribe((data) => {
        return console.log('POST--> ', data);
      });

      this.cambiar_imagenProyecto()

      contador++;
    }

    alert('Registro ingresado y modificado con exito!');
    window.location.reload();
    this.fotito1 = [];

  }

  //resetear formulario
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  resetFormulario() {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
    this.profileForm.reset();
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.proyectoList = data[0].listaDeProyectos;

      let idMax: number[] = [];

      data[0].listaDeProyectos.forEach((proyecto: any) => {
        idMax.push(proyecto.idProyecto);
      });
      this.idUltimoProyecto = idMax.pop();
    });
  }
}
