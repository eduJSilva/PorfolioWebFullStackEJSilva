//Creación de Objetos
let modificadorExperiencia: ModificadorItemDeListaExperiencia =
  new ModificadorItemDeListaExperiencia(
    "form-modificar_experiencia_validacion",
    "form-modificar_experiencia",
    "lista_experiencia"
  );

let creadorExperiencia: CreadorItemDeListaExperiencia =
  new CreadorItemDeListaExperiencia(
    "form-agregar_experiencia",
    "lista_experiencia"
  );

let eliminadorExperiencia: EliminadorItemDeListaExperiencia =
  new EliminadorItemDeListaExperiencia(
    "form-eliminar_experiencia",
    "",
    "lista_experiencia"
  );

  let accionesGenerales: AccionesPrincipalesDeLista = new AccionesPrincipalesDeLista("","");
  
  let modificadorHeader: ModificadorHeader = new ModificadorHeader();
  