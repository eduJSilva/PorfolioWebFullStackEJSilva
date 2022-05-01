package com.dto.escuela.service;

import com.dto.escuela.model.Alumno;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AlumnoService implements IAlumnoService {

    //creo una lista de objetos Alumno
    public List<Alumno> listaAlumnos = new ArrayList();

    @Override
    public void nuevoAlumno(Alumno alum) {
        //ingresa un nuevo alumno a la lista Alumno(b)
        listaAlumnos.add(alum);
    }

    @Override
    public List<Alumno> listarAlumnos() {
        return listaAlumnos;
    }

}
