"use strict";
class EliminadorItemDeListaExperiencia extends AccionesPrincipalesDeLista {
    constructor(id_formularioValidar, id_formulario, id_lista) {
        super((id_formulario = id_formulario), (id_lista = id_lista));
        this.id_formularioValidar = id_formularioValidar;
    }
    //getters and setter
    getIdFormularioV() {
        return this.id_formularioValidar;
    }
    setIdFormularioV(idform_v) {
        this.id_formularioValidar = idform_v;
    }
    //fin getters and setter
    resetFormularioValidar() {
        (document.getElementById(this.id_formularioValidar)).reset();
    }
    onFormularioValidar() {
        (document.getElementById(this.id_formularioValidar)).style.display = "block";
    }
    offFormularioValidar() {
        (document.getElementById(this.id_formularioValidar)).style.display = "none";
    }
    getFormularioValidacionId() {
        this.resetFormularioValidar();
        this.onFormularioValidar();
    }
    validarId(id) {
        if (id > 0 && id <= this.getcantLi()) {
            this.eliminarExperiencia();
        }
        else {
            alert("Ingrese un Id valido");
            this.getFormularioValidacionId();
        }
    }
    getItemEliminar() {
        return this.getLista().querySelector(`#\\3${this.getIdItem()} `);
    }
    eliminarExperiencia() {
        //Trae la lista
        let lista_experiencia = (document.getElementById(this.getIdLista()));
        //elimina el item seleccionado
        lista_experiencia.removeChild(this.getItemEliminar());
        this.offFormularioValidar();
        //envia una alerta de success!
        alert("El registro se eliminó con exito!");
    }
}
