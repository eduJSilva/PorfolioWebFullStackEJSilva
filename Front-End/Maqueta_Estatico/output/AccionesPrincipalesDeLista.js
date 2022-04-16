"use strict";
class AccionesPrincipalesDeLista {
    constructor(id_formulario, id_lista) {
        this.id_item = 0;
        this.formularios = Array.from(document.querySelectorAll("form"));
        //controla si se presiona el Esc en todo el Body
        this.textarea = document.body.addEventListener(`keyup`, (e) => {
            if (e.key == "Escape") {
                //Acciones sobre Datos Principales
                //Oculta el formulario para cambiar la foto principal
                (document.getElementById("formularioFotoPrincipal")).style.display = "none";
                //Oculta el formulario para cambiar la Portada2
                (document.getElementById("formularioPortada")).style.display = "none";
                //oculta el formulario de Datos Principales
                document.getElementById("form-datos").style.display =
                    "none";
                //Acciones sobre Acerca de
                document.getElementById("form-acercade").style.display =
                    "none";
                //Acciones sobre Experiencia
                //oculta el formulario Experiencia-eliminar
                (document.getElementById("form-eliminar_experiencia")).style.display = "none";
                //ocultar el formulario para modificar_validacion
                (document.getElementById("form-modificar_experiencia_validacion")).style.display = "none";
                //mostrar el lapiz edición datos principales
                document.getElementById("boton_edicion").style.display =
                    "block";
            }
        });
        this.id_formulario = id_formulario;
        this.id_lista = id_lista;
    }
    getIdFormulario() {
        return this.id_formulario;
    }
    setIdFormulario(idform) {
        this.id_formulario = idform;
    }
    getIdLista() {
        return this.id_lista;
    }
    setIdLista(idlista) {
        this.id_lista = idlista;
    }
    getIdItem() {
        return this.id_item;
    }
    setIdItem(iditem) {
        this.id_item = iditem;
    }
    //fin getters and setter
    getLista() {
        return document.getElementById(this.id_lista);
    }
    getcantLi() {
        return this.getLista().getElementsByTagName("li").length;
    }
    resetFormulario() {
        document.getElementById(this.id_formulario).reset();
    }
    onFormulario() {
        (document.getElementById(this.id_formulario)).style.display = "block";
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
        (document.getElementById(this.id_formulario)).style.display = "none";
    }
    mostrarFormulario() {
        this.resetFormulario();
        this.onFormulario();
        this.limpiarValidaciones();
    }
    exitFormularios() {
        this.formularios.forEach((form) => {
            document.getElementById(form.id).style.display = "none";
        });
    }
}
