class CreadorItemDeListaExperiencia extends AccionesPrincipalesDeLista {
  private logo: string = "";
  private nombre: string = "";
  private puesto: string = "";
  private periodo: string = "";
  private descripcion: string = "";

  constructor(id_formulario: string, id_lista: string) {
    super((id_formulario = id_formulario), (id_lista = id_lista));
  }

  //getters and setter

  getLogo(): string {
    return this.logo;
  }

  setLogo(logo: string): void {
    this.logo = logo;
  }

  getNombre(): string {
    return this.nombre;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  getPuesto(): string {
    return this.puesto;
  }

  setPuesto(puesto: string): void {
    this.puesto = puesto;
  }

  getPeriodo(): string {
    return this.periodo;
  }

  setPeriodo(periodo: string): void {
    this.periodo = periodo;
  }

  getDescripcion(): string {
    return this.descripcion;
  }

  setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }

  //Fin getters and setter

  validarCreacion() {
    let validation = <HTMLFormElement>(
      document.querySelector(".needs-validation")
    );
    if (!validation.checkValidity()) {
      validation.classList.add("was-validated");
    }
    if (validation.checkValidity()) {
      validation.classList.remove("was-validated");
      //si esta todo bien crea lo ingresado por input en el formulario.
      creadorExperiencia.agregarExperiencia();
    }
  }

  agregarExperiencia() {
    //trae la lista
    let lista_experiencia = <HTMLUListElement>(
      document.getElementById(this.getIdLista())
    );

    //guarda el numero siguiente al ultimo item de la lista
    let nuevo_id =
      parseInt((<HTMLUListElement>lista_experiencia.lastElementChild).id) + 1;

    //crea un nuevo item de lista
    let li = <HTMLElement>document.createElement("li");

    //crear los elementos necesarios y los carga al item con lo ingresado por formulario
    li.id = nuevo_id.toString(); //en este caso se asigna el siguiente id de la lista

    let h6 = <HTMLElement>document.createElement("h6");
    h6.id = nuevo_id + "experiencia";
    //h6.setAttribute("style", "display:none;");
    h6.textContent = nuevo_id.toString();
    li.appendChild(h6);

    let figure = <HTMLElement>document.createElement("figure");
    figure.className = "figure";
    li.appendChild(figure);

    let img = <HTMLImageElement>document.createElement("img");
    img.src = this.logo;
    img.className = "figure-img position-sticky rounded";
    img.alt = "Logo" + this.logo;

    figure.appendChild(img);

    let figcaption = <HTMLElement>document.createElement("figcaption");
    figcaption.setAttribute("style", "margin-top: 10px;");
    figcaption.className = "figure-caption float-end";
    figcaption.textContent = this.nombre;

    figure.appendChild(figcaption);
    li.appendChild(figure);

    let h2 = <HTMLElement>document.createElement("h2");
    h2.textContent = this.puesto;
    li.appendChild(h2);

    let h3 = <HTMLElement>document.createElement("h3");
    h3.textContent = this.periodo;
    li.appendChild(h3);

    let h4 = <HTMLElement>document.createElement("h4");
    h4.textContent = this.descripcion;
    li.appendChild(h4);

    //carga a lista el item creado
    lista_experiencia.appendChild(li);

    //oculta el formulario
    this.offFormulario();

    //envia una alerta de success!
    alert("El registro se agregó con exito!");
  }
}
