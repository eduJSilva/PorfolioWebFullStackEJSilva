class ModificadorItemDeListaExperiencia extends AccionesPrincipalesDeLista {
  
  private id_formularioValidar: string;

  private logo: string = "";
  private nombre: string = "";
  private puesto: string = "";
  private periodo: string = "";
  private descripcion: string = "";

  constructor(
    id_formularioValidar: string,
    id_formulario: string,
    id_lista: string
  ) {
   
    super(id_formulario = id_formulario, id_lista = id_lista);
    this.id_formularioValidar = id_formularioValidar;
  }
  //getters and setter
  //getters and setter -->Ids
  getIdFormularioV(): string {
    return this.id_formularioValidar;
  }
  setIdFormularioV(idform_v: string) {
    this.id_formularioValidar = idform_v;
  }

  getLogo(): string {
    return this.logo;
  }

  setLogo(valor: string) {
    this.logo = valor;
  }

  getNombre(): string {
    return this.nombre;
  }

  setNombre(valor: string) {
    this.nombre = valor;
  }

  getPuesto(): string {
    return this.puesto;
  }
  setPuesto(valor: string) {
    this.puesto = valor;
  }

  getPeriodo(): string {
    return this.periodo;
  }
  setPeriodo(valor: string) {
    this.periodo = valor;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

  setDescripcion(valor: string) {
    this.descripcion = valor;
  }
  //fin getters and setter

  resetFormularioValidar(): void {
    (<HTMLFormElement>document.getElementById(this.id_formularioValidar)).reset();
    }
  
  
    onFormularioValidar() {
      (<HTMLFormElement>document.getElementById(this.id_formularioValidar)).style.display =
        "block";
    }
  
    offFormularioValidar() {
      (<HTMLFormElement>document.getElementById(this.id_formularioValidar)).style.display =
        "none";
    }
  
    getFormularioValidacionId() {
      this.resetFormularioValidar();
      this.onFormularioValidar();
    
    }
  
  validarId(id: number) {
    if (id > 0 && id <= this.getcantLi()) {
      this.setIdItem(id);
      this.mostrar_modificarExperiencia();
    } else {
      alert("Ingrese un Id valido");
      this.resetFormularioValidar();
    }
  }

  mostrar_modificarExperiencia() {
    this.offFormularioValidar();

    this.mostrarFormulario()
  }

  getItemModificar(): HTMLElement {
    return this.getLista().querySelector(`#\\3${this.getIdItem()} `)!;
  }

  validarModificaciones() {
    let validation = <HTMLFormElement>(
      document.querySelector(".needs-validation_modificar")
    );
    if (!validation.checkValidity()) {
      validation.classList.add("was-validated");
    }
    if (validation.checkValidity()) {
      validation.classList.remove("was-validated");
      //si esta todo bien modifica con lo ingresado por input en el formulario.
      modificadorExperiencia.modificarExperiencia();
    }
  }

  modificarExperiencia() {
    this.getItemModificar().querySelector("img")!.src = this.logo;
    this.getItemModificar().querySelector("img")!.alt = this.logo;
    this.getItemModificar().querySelector("figcaption")!.textContent =
      this.nombre;
    this.getItemModificar().querySelector("h2")!.textContent = this.puesto;
    this.getItemModificar().querySelector("h3")!.textContent = this.periodo;
    this.getItemModificar().querySelector("h4")!.textContent = this.descripcion;

    alert("Modificación realizada con exito");
    this.offFormulario();
  }
}
