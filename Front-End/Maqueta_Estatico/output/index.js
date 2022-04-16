"use strict";
//DATOS PRINCIPALES
function cambiar_datos() {
    //resetear el Formulario de Datos Principales
    document.getElementById("form-datos").reset();
    //muestra el formulario para cargar los datos principales
    document.getElementById("form-datos").style.display =
        "block";
}
let nombre;
let titulo;
let direccion;
function inputNombre(valor) {
    nombre = valor;
}
function inputTitulo(valor) {
    titulo = valor;
}
function inputDireccion(valor) {
    direccion = valor;
}
function onClick() {
    document.getElementById("text-nombre").textContent = nombre;
    document.getElementById("text-titulo").textContent = titulo;
    document.getElementById("text-direccion").textContent =
        direccion;
    document.getElementById("form-datos").style.display =
        "none";
    alert("Modificación realizada con exito");
}
//ACERCA DE
//función que cambia el estilo del input a visible
//toma el valor del texto del parrafo con id"text-acercade"
//lo muestra en consola
function cambiar_parrafo() {
    document.getElementById("edit-acercade").value = "";
    document.getElementById("edit-acercade").style.display =
        "block";
    document.getElementById("file1").style.display = "block";
    let text = document.getElementById("text-acercade")
        .textContent;
    console.log(text);
}
function inputAcercaDe(valor) {
    document.getElementById("text-acercade").textContent = valor;
    function logMessage(message) {
        console.log(message + "<br>");
    }
    //controla si se presiona un enter
    let textarea = document.getElementById("edit-acercade");
    textarea.addEventListener(`keyup`, (e) => {
        logMessage(`Key "${e.key}" released [event: keyup]`);
        if (e.key == "Enter") {
            document.getElementById("edit-acercade").style.display =
                "none";
            document.getElementById("file1").style.display = "none";
        }
    });
}
//carga el contenido de un archivo de texto
//y lo muestra en el cambiar_parrafo
function showFile(input) {
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
        document.getElementById("edit-acercade").style.display =
            "none";
        document.getElementById("file1").style.display = "none";
    }
}
