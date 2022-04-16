class EliminadorItemDeListaExperiencia extends AccionesPrincipalesDeLista {
  private id_formularioValidar: string;

  constructor(
    id_formularioValidar: string,
    id_formulario: string,
    id_lista: string
  ) {
    super((id_formulario = id_formulario), (id_lista = id_lista));
    this.id_formularioValidar = id_formularioValidar;
  }

  //getters and setter
  getIdFormularioV(): string {
    return this.id_formularioValidar;
  }
  setIdFormularioV(idform_v: string) {
    this.id_formularioValidar = idform_v;
  }
  //fin getters and setter

  resetFormularioValidar(): void {
    (<HTMLFormElement>(
      document.getElementById(this.id_formularioValidar)
    )).reset();
  }

  onFormularioValidar() {
    (<HTMLFormElement>(
      document.getElementById(this.id_formularioValidar)
    )).style.display = "block";
  }

  offFormularioValidar() {
    (<HTMLFormElement>(
      document.getElementById(this.id_formularioValidar)
    )).style.display = "none";
  }

  getFormularioValidacionId() {
    this.resetFormularioValidar();
    this.onFormularioValidar();
  }

  validarId(id: number) {
    if (id > 0 && id <= this.getcantLi()) {
      this.eliminarExperiencia();
    } else {
      alert("Ingrese un Id valido");
      this.getFormularioValidacionId();
    }
  }

  getItemEliminar(): HTMLElement {
    return this.getLista().querySelector(`#\\3${this.getIdItem()} `)!;
  }

  eliminarExperiencia() {
    //Trae la lista
    let lista_experiencia = <HTMLElement>(
      document.getElementById(this.getIdLista())
    );

    //elimina el item seleccionado
    lista_experiencia.removeChild(this.getItemEliminar());

    this.offFormularioValidar();

    //envia una alerta de success!
    alert("El registro se eliminó con exito!");
  }
}
