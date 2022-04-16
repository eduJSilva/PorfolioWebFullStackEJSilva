class AccionesPrincipalesDeLista {
  private id_formulario: string;
  private id_lista: string;
  private id_item: number = 0;
  private formularios = Array.from(document.querySelectorAll("form"));

  constructor(id_formulario: string, id_lista: string) {
    this.id_formulario = id_formulario;
    this.id_lista = id_lista;
  }

  getIdFormulario(): string {
    return this.id_formulario;
  }
  setIdFormulario(idform: string) {
    this.id_formulario = idform;
  }

  getIdLista(): string {
    return this.id_lista;
  }
  setIdLista(idlista: string) {
    this.id_lista = idlista;
  }

  getIdItem(): number {
    return this.id_item;
  }

  setIdItem(iditem: number) {
    this.id_item = iditem;
  }

  //fin getters and setter

  getLista(): HTMLElement {
    return document.getElementById(this.id_lista)!;
  }

  getcantLi(): number {
    return this.getLista().getElementsByTagName("li").length;
  }

  resetFormulario() {
    (<HTMLFormElement>document.getElementById(this.id_formulario)).reset();
  }

  onFormulario() {
    (<HTMLFormElement>(
      document.getElementById(this.id_formulario)
    )).style.display = "block";
  }

  limpiarValidaciones() {
    Array.prototype.slice
      .call(document.querySelectorAll(".needs-validation"))
      .forEach(function (form) {
        form.classList.remove("was-validated");
      });

    Array.prototype.slice
      .call(document.querySelectorAll(".needs-validation_modificar"))
      .forEach(function (form) {
        form.classList.remove("was-validated");
      });
  }

  offFormulario() {
    (<HTMLFormElement>(
      document.getElementById(this.id_formulario)
    )).style.display = "none";
  }

  mostrarFormulario() {
    this.resetFormulario();
    this.onFormulario();
    this.limpiarValidaciones();
  }

  exitFormularios() {
    this.formularios.forEach((form: any) => {
      (<HTMLElement>document.getElementById(form.id)).style.display = "none";
    });
  }

  //controla si se presiona el Esc en todo el Body
  textarea = document.body.addEventListener(`keyup`, (e) => {
    if (e.key == "Escape") {
      //Acciones sobre Datos Principales
      //Oculta el formulario para cambiar la foto principal
      (<HTMLElement>(
        document.getElementById("formularioFotoPrincipal")
      )).style.display = "none";

       //Oculta el formulario para cambiar la Portada2
       (<HTMLElement>(
        document.getElementById("formularioPortada")
      )).style.display = "none";


      //oculta el formulario de Datos Principales
      (<HTMLElement>document.getElementById("form-datos")).style.display =
        "none";

      //Acciones sobre Acerca de
      (<HTMLElement>document.getElementById("form-acercade")).style.display =
        "none";

      //Acciones sobre Experiencia
      //oculta el formulario Experiencia-eliminar
      (<HTMLElement>(
        document.getElementById("form-eliminar_experiencia")
      )).style.display = "none";

      //ocultar el formulario para modificar_validacion
      (<HTMLElement>(
        document.getElementById("form-modificar_experiencia_validacion")
      )).style.display = "none";

      //mostrar el lapiz edición datos principales
      (<HTMLElement>document.getElementById("boton_edicion")).style.display =
        "block";
    }
  });
}
