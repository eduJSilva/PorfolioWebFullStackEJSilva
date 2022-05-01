package com.dto.escuela.service;

import com.dto.escuela.model.Alumno;
import java.util.List;

public interface IAlumnoService {

    public void nuevoAlumno(Alumno alum);

    public List<Alumno> listarAlumnos();
}
