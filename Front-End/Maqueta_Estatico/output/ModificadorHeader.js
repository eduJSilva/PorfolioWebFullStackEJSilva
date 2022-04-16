"use strict";
class ModificadorHeader {
    constructor() {
        this.validator = 0;
        this.fotoPerfil = "";
        this.nombre = "";
        this.titulo = "";
        this.direccion = "";
        this.telefono = "";
        this.correo = "";
        this.institucionNombre = "";
        this.id_formularioValidar = "";
        this.id_formularioInstitucion = "";
        this.id_listaInstitucion = "";
        //Acercade
        this.acercade = "";
        this.acercadeFile = [];
    }
    //setFotosPortada
    setFoto1(value) {
        this.foto1 = value;
    }
    setFoto2(value) {
        this.foto2 = value;
    }
    setFoto3(value) {
        this.foto3 = value;
    }
    //setLogoInstitución
    setLogoInstitucion(value) {
        this.institucionLogo = value;
    }
    //setNombreInstitución
    setNombreInstitucion(value) {
        this.institucionNombre = value;
    }
    /**
     * Getter $fotoPerfil
     * @return {string }
     */
    get $fotoPerfil() {
        return this.fotoPerfil;
    }
    /**
     * Getter $nombre
     * @return {string }
     */
    get $nombre() {
        return this.nombre;
    }
    /**
     * Getter $titulo
     * @return {string }
     */
    get $titulo() {
        return this.titulo;
    }
    /**
     * Getter $direccion
     * @return {string }
     */
    get $direccion() {
        return this.direccion;
    }
    /**
     * Getter $telefono
     * @return {string }
     */
    get $telefono() {
        return this.telefono;
    }
    /**
     * Getter $correo
     * @return {string }
     */
    get $correo() {
        return this.correo;
    }
    /**
     * Getter $acercade
     * @return {string }
     */
    get $acercade() {
        return this.acercade;
    }
    /**
     * Getter $acercadeFile
     * @return {File[] }
     */
    get $acercadeFile() {
        return this.acercadeFile;
    }
    /**
     * Setter $fotoPerfil
     * @param {string } value
     */
    set $fotoPerfil(value) {
        this.fotoPerfil = value;
    }
    /**
     * Setter $nombre
     * @param {string } value
     */
    set $nombre(value) {
        this.nombre = value;
    }
    /**
     * Setter $titulo
     * @param {string } value
     */
    set $titulo(value) {
        this.titulo = value;
    }
    /**
     * Setter $direccion
     * @param {string } value
     */
    set $direccion(value) {
        this.direccion = value;
    }
    /**
     * Setter $telefono
     * @param {string } value
     */
    set $telefono(value) {
        this.telefono = value;
    }
    /**
     * Setter $correo
     * @param {string } value
     */
    set $correo(value) {
        this.correo = value;
    }
    /**
     * Setter $acercade
     * @param {string } value
     */
    set $acercade(value) {
        this.acercade = value;
    }
    /**
     * Setter $acercadeFile
     * @param {File[] } value
     */
    set $acercadeFile(value) {
        this.acercadeFile = value;
    }
    //DATOS PRINCIPALES
    cambiar_datos() {
        //resetear el Formulario de Datos Principales
        document.getElementById("form-datos").reset();
        //muestra el formulario para cargar los datos principales
        document.getElementById("form-datos").style.display =
            "block";
        //oculta el lapiz
        document.getElementById("boton_edicion").style.display =
            "none";
    }
    onClick() {
        document.getElementById("text-nombre").textContent =
            this.$nombre;
        document.getElementById("text-titulo").textContent =
            this.$titulo;
        document.getElementById("text-direccion").textContent =
            this.$direccion;
        //oculta formulario datos principales
        document.getElementById("form-datos").style.display = "none";
        alert("Modificación realizada con exito");
        //mostrar el lapiz edición datos principales
        document.getElementById("boton_edicion").style.display =
            "block";
    }
    //ACERCA DE
    cambiar_parrafo() {
        document.getElementById("edit-acercade").value = "";
        document.getElementById("form-acercade").style.display =
            "block";
    }
    submitAcercaDe() {
        document.getElementById("text-acercade").textContent =
            this.$acercade;
        alert("Modificación realizada con exito");
        document.getElementById("form-acercade").style.display =
            "none";
    }
    //carga el contenido de un archivo de texto
    //y lo muestra en el cambiar_parrafo
    showFile(input) {
        let file = input.files[0];
        alert(`File name: ${file.name}`); //e.g my.png
        alert(`Last modified: ${file.lastModified}`); //e.g 15528345544
        let reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
            let readerResult = reader.result;
            console.log(reader.result);
            document.getElementById("text-acercade").textContent =
                readerResult;
        };
        reader.onerror = function () {
            console.log(reader.error);
        };
        if (`Last modified: ${file.lastModified}`) {
            document.getElementById("form-acercade").style.display =
                "none";
        }
    }
    //Modificar Foto Perfil
    mostrarFormImagenPrincipal() {
        (document.getElementById("formularioFotoPrincipal")).style.display = "block";
    }
    cambiar_imagenPrincipal(input) {
        let file = input.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            let readerResult = reader.result;
            document.getElementById("imagen_principal").src =
                readerResult;
        };
        reader.onerror = function () {
            console.log(reader.error);
        };
        if (`Last modified: ${file.lastModified}`) {
            alert("Foto de perfil modificada con exito!");
            (document.getElementById("formularioFotoPrincipal")).style.display = "none";
        }
    }
    //Modificar Portada
    mostrarFormPortada() {
        this.validator = 0;
        document.getElementById("formularioPortada").reset();
        document.getElementById("formularioPortada").style.display =
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
                let readerResult = reader1.result;
                document.getElementById("foto1").src = readerResult;
            };
            reader2.onload = function () {
                let readerResult = reader2.result;
                document.getElementById("foto2").src = readerResult;
            };
            reader3.onload = function () {
                let readerResult = reader3.result;
                document.getElementById("foto3").src = readerResult;
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
        }
        catch (e) { }
        if (this.validator == 1) {
            alert("Portada modificada con exito!");
            (document.getElementById("formularioPortada")).style.display = "none";
            this.validator = 0;
        }
        else {
            alert("Por favor ingrese 3 fotos");
        }
    }
}
