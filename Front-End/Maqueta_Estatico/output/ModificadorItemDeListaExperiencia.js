"use strict";
class ModificadorItemDeListaExperiencia extends AccionesPrincipalesDeLista {
    constructor(id_formularioValidar, id_formulario, id_lista) {
        super(id_formulario = id_formulario, id_lista = id_lista);
        this.logo = "";
        this.nombre = "";
        this.puesto = "";
        this.periodo = "";
        this.descripcion = "";
        this.id_formularioValidar = id_formularioValidar;
    }
    //getters and setter
    //getters and setter -->Ids
    getIdFormularioV() {
        return this.id_formularioValidar;
    }
    setIdFormularioV(idform_v) {
        this.id_formularioValidar = idform_v;
    }
    getLogo() {
        return this.logo;
    }
    setLogo(valor) {
        this.logo = valor;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(valor) {
        this.nombre = valor;
    }
    getPuesto() {
        return this.puesto;
    }
    setPuesto(valor) {
        this.puesto = valor;
    }
    getPeriodo() {
        return this.periodo;
    }
    setPeriodo(valor) {
        this.periodo = valor;
    }
    getDescripcion() {
        return this.descripcion;
    }
    setDescripcion(valor) {
        this.descripcion = valor;
    }
    //fin getters and setter
    resetFormularioValidar() {
        document.getElementById(this.id_formularioValidar).reset();
    }
    onFormularioValidar() {
        document.getElementById(this.id_formularioValidar).style.display =
            "block";
    }
    offFormularioValidar() {
        document.getElementById(this.id_formularioValidar).style.display =
            "none";
    }
    getFormularioValidacionId() {
        this.resetFormularioValidar();
        this.onFormularioValidar();
    }
    validarId(id) {
        if (id > 0 && id <= this.getcantLi()) {
            this.setIdItem(id);
            this.mostrar_modificarExperiencia();
        }
        else {
            alert("Ingrese un Id valido");
            this.resetFormularioValidar();
        }
    }
    mostrar_modificarExperiencia() {
        this.offFormularioValidar();
        this.mostrarFormulario();
    }
    getItemModificar() {
        return this.getLista().querySelector(`#\\3${this.getIdItem()} `);
    }
    validarModificaciones() {
        let validation = (document.querySelector(".needs-validation_modificar"));
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
        this.getItemModificar().querySelector("img").src = this.logo;
        this.getItemModificar().querySelector("img").alt = this.logo;
        this.getItemModificar().querySelector("figcaption").textContent =
            this.nombre;
        this.getItemModificar().querySelector("h2").textContent = this.puesto;
        this.getItemModificar().querySelector("h3").textContent = this.periodo;
        this.getItemModificar().querySelector("h4").textContent = this.descripcion;
        alert("Modificación realizada con exito");
        this.offFormulario();
    }
}
