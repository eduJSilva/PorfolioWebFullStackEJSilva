"use strict";
//Creación de Objetos
let modificadorExperiencia = new ModificadorItemDeListaExperiencia("form-modificar_experiencia_validacion", "form-modificar_experiencia", "lista_experiencia");
let creadorExperiencia = new CreadorItemDeListaExperiencia("form-agregar_experiencia", "lista_experiencia");
let eliminadorExperiencia = new EliminadorItemDeListaExperiencia("form-eliminar_experiencia", "", "lista_experiencia");
let accionesGenerales = new AccionesPrincipalesDeLista("", "");
let modificadorHeader = new ModificadorHeader();
