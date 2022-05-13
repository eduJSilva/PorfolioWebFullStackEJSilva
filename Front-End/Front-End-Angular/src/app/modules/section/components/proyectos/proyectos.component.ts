import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/service/app.service';
import { ProyectosFormComponent } from './proyectos-form/proyectos-form.component';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['../../section.component.css', './proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  fotito1:any;


  userFoto: any;
  userAvatar: any;

  proyectoList: any[] = [
    //'https://mdbcdn.b-cdn.net/img/new/standard/nature/172.webp',
    //'https://mdbcdn.b-cdn.net/img/new/standard/nature/173.webp',
    //'https://mdbcdn.b-cdn.net/img/new/standard/nature/174.webp',
   // 'https://mdbcdn.b-cdn.net/img/new/standard/nature/175.webp',
    //'https://mdbcdn.b-cdn.net/img/new/standard/nature/176.webp',
   // 'https://mdbcdn.b-cdn.net/img/new/standard/nature/177.webp',
   // 'https://mdbcdn.b-cdn.net/img/new/standard/nature/178.webp',
   // 'https://mdbcdn.b-cdn.net/img/new/standard/nature/179.webp',
    //'https://mdbcdn.b-cdn.net/img/new/standard/nature/180.webp',
    //'https://mdbcdn.b-cdn.net/img/new/standard/nature/181.webp',
    //'https://mdbcdn.b-cdn.net/img/new/standard/nature/182.webp',
   // 'https://mdbcdn.b-cdn.net/img/new/standard/nature/001.webp',
  ];

  formGroupDirective: any;
  nombreModificar: any;
  idModificar: any;
  idBorrar: any;

  borrar: boolean =false;
  proyectoSeleccionado: boolean=false;

  form = this.fb.group({
    nombreProyecto: [
      '',
      [
        Validators.required,
      ],
    ],
    idSeleccion: 0,
  });

  proyectoForm = this.fb.group({
    nombreProyecto: '',
    fecha: '',
    descripcion: '',
    link: '',
   // imagen: '',
    file: '',
    fileSource: '',
    persona: { id: 1 },
  });

  constructor(public service: AppService, private fb: FormBuilder) {

  }

  /*CARGAR IMAGEN del proyecto
   */
  onFileChange(event: any) {
    if (event.target.files.length > 0) {

      this.fotito1 = event.target.files[0];
      this.form.patchValue({
       fileSource: this.fotito1,
      });
        const fr = new FileReader();
        fr.readAsDataURL(this.fotito1);


      console.log('datos Fotito1:----♠: ', this.fotito1);
    }
  }

  cambiar_imagenProyecto() {
     this.service
      .putImagenProyecto(this.idModificar, this.fotito1)
      .subscribe((data) => {
        return console.log('PRIMERID-------------', data,  this.idModificar);

      });
    }

  getIds() {
    return this.proyectoList[0].idProyecto;
  }

  getId() {
    this.idModificar = this.form.value.idSeleccion;
    return console.log(this.idBorrar);
  }

  getNombre() {
   for(let element of this.proyectoList) {
      if(element.nombreProyecto == this.form.value.nombreProyecto) {
        this.nombreModificar = element.nombreProyecto
        this.idModificar = element.idProyecto
        this.idBorrar = element.idProyecto
        console.log(element.idProyecto)
      }
    };

  }

  getIdBorrar() {
    this.idBorrar = this.form.value.idSeleccion;
    return console.log(this.idModificar);
  }

  modificarProyecto() {
    this.service
      .putProyecto(this.idModificar, this.proyectoForm.value)
      .subscribe((data) => {
      });
      this.cambiar_imagenProyecto()

      alert('Registro modificado con exito!');
      window.location.reload();
  }

  deleteProyecto() {
    this.service.deleteProyecto(this.idBorrar).subscribe((data) => {
      alert('Registro borrado con exito!');
      window.location.reload();
    });
  }

  @ViewChild(ProyectosFormComponent) formulario: any;



  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.proyectoList = data[0].listaDeProyectos;
    });

  }
}
