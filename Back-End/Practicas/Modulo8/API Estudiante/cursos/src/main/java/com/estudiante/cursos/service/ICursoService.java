package com.estudiante.cursos.service;

import com.estudiante.cursos.model.Curso;
import com.estudiante.cursos.model.Tema;
import java.util.Date;
import java.util.List;

public interface ICursoService {

    public void crearCurso(Curso cur);

    public List<Curso> traerCursos();

    public List<Tema> traerTemas_curso(Long curso_id_curso);

    public List<Curso> traerCursosJava();

    public void modificarCurso(Curso cur);

    public void modificarCurso1(Long id_curso, String nombre, String tipo_curso, Date fecha_finalización);
}
