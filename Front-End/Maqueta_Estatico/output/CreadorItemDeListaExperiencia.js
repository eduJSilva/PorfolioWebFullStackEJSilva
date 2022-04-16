"use strict";
class CreadorItemDeListaExperiencia extends AccionesPrincipalesDeLista {
    constructor(id_formulario, id_lista) {
        super((id_formulario = id_formulario), (id_lista = id_lista));
        this.logo = "";
        this.nombre = "";
        this.puesto = "";
        this.periodo = "";
        this.descripcion = "";
    }
    //getters and setter
    getLogo() {
        return this.logo;
    }
    setLogo(logo) {
        this.logo = logo;
    }
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    getPuesto() {
        return this.puesto;
    }
    setPuesto(puesto) {
        this.puesto = puesto;
    }
    getPeriodo() {
        return this.periodo;
    }
    setPeriodo(periodo) {
        this.periodo = periodo;
    }
    getDescripcion() {
        return this.descripcion;
    }
    setDescripcion(descripcion) {
        this.descripcion = descripcion;
    }
    //Fin getters and setter
    validarCreacion() {
        let validation = (document.querySelector(".needs-validation"));
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
        let lista_experiencia = (document.getElementById(this.getIdLista()));
        //guarda el numero siguiente al ultimo item de la lista
        let nuevo_id = parseInt(lista_experiencia.lastElementChild.id) + 1;
        //crea un nuevo item de lista
        let li = document.createElement("li");
        //crear los elementos necesarios y los carga al item con lo ingresado por formulario
        li.id = nuevo_id.toString(); //en este caso se asigna el siguiente id de la lista
        let h6 = document.createElement("h6");
        h6.id = nuevo_id + "experiencia";
        //h6.setAttribute("style", "display:none;");
        h6.textContent = nuevo_id.toString();
        li.appendChild(h6);
        let figure = document.createElement("figure");
        figure.className = "figure";
        li.appendChild(figure);
        let img = document.createElement("img");
        img.src = this.logo;
        img.className = "figure-img position-sticky rounded";
        img.alt = "Logo" + this.logo;
        figure.appendChild(img);
        let figcaption = document.createElement("figcaption");
        figcaption.setAttribute("style", "margin-top: 10px;");
        figcaption.className = "figure-caption float-end";
        figcaption.textContent = this.nombre;
        figure.appendChild(figcaption);
        li.appendChild(figure);
        let h2 = document.createElement("h2");
        h2.textContent = this.puesto;
        li.appendChild(h2);
        let h3 = document.createElement("h3");
        h3.textContent = this.periodo;
        li.appendChild(h3);
        let h4 = document.createElement("h4");
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
