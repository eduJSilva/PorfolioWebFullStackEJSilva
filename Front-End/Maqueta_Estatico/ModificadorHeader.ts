class ModificadorHeader {
  //fotos de portada
  private foto1!: { files: any[] };
  private foto2!: { files: any[] };
  private foto3!: { files: any[] };

  private validator = 0;

  private fotoPerfil: string = "";
  private nombre: string = "";
  private titulo: string = "";
  private direccion: string = "";

  private telefono: string = "";
  private correo: string = "";

  //Instituciones
  private institucionLogo!: { files: any[] };
  private institucionNombre: string = "";
  private id_formularioValidar: string = "";
  private id_formularioInstitucion: string = "";
  private id_listaInstitucion: string = "";

  //Acercade
  private acercade: string = "";
  private acercadeFile: File[] = [];

  constructor() {}

  //setFotosPortada
  setFoto1(value: any) {
    this.foto1 = value;
  }

  setFoto2(value: any) {
    this.foto2 = value;
  }

  setFoto3(value: any) {
    this.foto3 = value;
  }

  //setLogoInstitución
  setLogoInstitucion(value: any) {
    this.institucionLogo = value;
  }

  //setNombreInstitución
  setNombreInstitucion(value: string) {
    this.institucionNombre = value;
  }

  /**
   * Getter $fotoPerfil
   * @return {string }
   */
  public get $fotoPerfil(): string {
    return this.fotoPerfil;
  }

  /**
   * Getter $nombre
   * @return {string }
   */
  public get $nombre(): string {
    return this.nombre;
  }

  /**
   * Getter $titulo
   * @return {string }
   */
  public get $titulo(): string {
    return this.titulo;
  }

  /**
   * Getter $direccion
   * @return {string }
   */
  public get $direccion(): string {
    return this.direccion;
  }

  /**
   * Getter $telefono
   * @return {string }
   */
  public get $telefono(): string {
    return this.telefono;
  }

  /**
   * Getter $correo
   * @return {string }
   */
  public get $correo(): string {
    return this.correo;
  }

  /**
   * Getter $acercade
   * @return {string }
   */
  public get $acercade(): string {
    return this.acercade;
  }

  /**
   * Getter $acercadeFile
   * @return {File[] }
   */
  public get $acercadeFile(): File[] {
    return this.acercadeFile;
  }

  /**
   * Setter $fotoPerfil
   * @param {string } value
   */
  public set $fotoPerfil(value: string) {
    this.fotoPerfil = value;
  }

  /**
   * Setter $nombre
   * @param {string } value
   */
  public set $nombre(value: string) {
    this.nombre = value;
  }

  /**
   * Setter $titulo
   * @param {string } value
   */
  public set $titulo(value: string) {
    this.titulo = value;
  }

  /**
   * Setter $direccion
   * @param {string } value
   */
  public set $direccion(value: string) {
    this.direccion = value;
  }

  /**
   * Setter $telefono
   * @param {string } value
   */
  public set $telefono(value: string) {
    this.telefono = value;
  }

  /**
   * Setter $correo
   * @param {string } value
   */
  public set $correo(value: string) {
    this.correo = value;
  }

  /**
   * Setter $acercade
   * @param {string } value
   */
  public set $acercade(value: string) {
    this.acercade = value;
  }

  /**
   * Setter $acercadeFile
   * @param {File[] } value
   */
  public set $acercadeFile(value: File[]) {
    this.acercadeFile = value;
  }

  //DATOS PRINCIPALES
  cambiar_datos() {
    //resetear el Formulario de Datos Principales
    (<HTMLFormElement>document.getElementById("form-datos")).reset();

    //muestra el formulario para cargar los datos principales
    (<HTMLElement>document.getElementById("form-datos")).style.display =
      "block";

    //oculta el lapiz
    (<HTMLElement>document.getElementById("boton_edicion")).style.display =
      "none";
  }

  onClick(this: any) {
    (<HTMLElement>document.getElementById("text-nombre")).textContent =
      this.$nombre;
    (<HTMLElement>document.getElementById("text-titulo")).textContent =
      this.$titulo;
    (<HTMLElement>document.getElementById("text-direccion")).textContent =
      this.$direccion;

    //oculta formulario datos principales
    (<HTMLElement>document.getElementById("form-datos")).style.display = "none";
    alert("Modificación realizada con exito");

    //mostrar el lapiz edición datos principales
    (<HTMLElement>document.getElementById("boton_edicion")).style.display =
      "block";
  }

  //ACERCA DE
  cambiar_parrafo() {
    (<HTMLInputElement>document.getElementById("edit-acercade")).value = "";

    (<HTMLElement>document.getElementById("form-acercade")).style.display =
      "block";
  }

  submitAcercaDe() {
    (<HTMLElement>document.getElementById("text-acercade")).textContent =
      this.$acercade;

    alert("Modificación realizada con exito");
    (<HTMLElement>document.getElementById("form-acercade")).style.display =
      "none";
  }

  //carga el contenido de un archivo de texto
  //y lo muestra en el cambiar_parrafo
  showFile(input: { files: any[] }) {
    let file = input.files[0];
    alert(`File name: ${file.name}`); //e.g my.png
    alert(`Last modified: ${file.lastModified}`); //e.g 15528345544
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function () {
      let readerResult: any = reader.result;
      console.log(reader.result);
      (<HTMLElement>document.getElementById("text-acercade")).textContent =
        readerResult;
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
    if (`Last modified: ${file.lastModified}`) {
      (<HTMLElement>document.getElementById("form-acercade")).style.display =
        "none";
    }
  }

  //Modificar Foto Perfil
  mostrarFormImagenPrincipal() {
    (<HTMLElement>(
      document.getElementById("formularioFotoPrincipal")
    )).style.display = "block";
  }
  cambiar_imagenPrincipal(input: { files: any[] }) {
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      let readerResult: any = reader.result;
      (<HTMLImageElement>document.getElementById("imagen_principal")).src =
        readerResult;
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
    if (`Last modified: ${file.lastModified}`) {
      alert("Foto de perfil modificada con exito!");
      (<HTMLElement>(
        document.getElementById("formularioFotoPrincipal")
      )).style.display = "none";
    }
  }

  //Modificar Portada
  mostrarFormPortada() {
    this.validator = 0;
    (<HTMLFormElement>document.getElementById("formularioPortada")).reset();

    (<HTMLElement>document.getElementById("formularioPortada")).style.display =
      "block";
  }

  cambiarPortada() {
    try {
      let reader1 = new FileReader();
      reader1.readAsDataURL(this.foto1.files[0]);

      let reader2 = new FileReader();
      reader2.readAsDataURL(this.foto2.files[0]);

      let reader3 = new FileReader();
      reader3.readAsDataURL(this.foto3.files[0]);

      reader1.onload = function () {
        let readerResult: any = reader1.result;
        (<HTMLImageElement>document.getElementById("foto1")).src = readerResult;
      };
      reader2.onload = function () {
        let readerResult: any = reader2.result;
        (<HTMLImageElement>document.getElementById("foto2")).src = readerResult;
      };
      reader3.onload = function () {
        let readerResult: any = reader3.result;
        (<HTMLImageElement>document.getElementById("foto3")).src = readerResult;
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
      alert("Portada modificada con exito!");
      (<HTMLElement>(
        document.getElementById("formularioPortada")
      )).style.display = "none";
      this.validator = 0;
    } else {
      alert("Por favor ingrese 3 fotos");
    }
  }
}
