package com.estudiante.cursos.service;

import com.estudiante.cursos.model.Curso;
import com.estudiante.cursos.model.Tema;
import java.util.List;

public interface ITemaService {

    public void crearTema(Tema tem);

    public List<Tema> traerTemas();

    public void modificarTema(Long id_tema, String nombre, String descripcion);
        public void modificarTema1(Tema tem);
        
        public void borrarTema(Long id_tema);
        public Tema traerunTema(Long id);

}
