package com.estudiante.cursos.service;

import com.estudiante.cursos.model.Curso;
import com.estudiante.cursos.model.Tema;
import com.estudiante.cursos.repository.ICursoRepository;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CursoService implements ICursoService {

    @Autowired
    private ICursoRepository curRep;

    @Autowired
    private TemaService temRep;

    @Override
    public void crearCurso(Curso cur) {
        curRep.save(cur);
    }

    @Override
    public List<Curso> traerCursos() {
        return curRep.findAll();
    }

    @Override
    public List<Tema> traerTemas_curso(Long curso_id_curso) {
        Curso curso1 = new Curso();
        List<Curso> listaCursos = curRep.findAll();
        for (Curso unCurso : listaCursos) {
            if (unCurso.getId_curso().equals(curso_id_curso)) {
                curso1 = unCurso;
            }
        }
        return curso1.getListaDeTemas();
    }

    @Override
    public List<Curso> traerCursosJava() {
        List<Curso> listaCursos = curRep.findAll();
        List<Curso> listaJava = new ArrayList();
        for (Curso unCurso : listaCursos) {
            if (unCurso.getNombre().contains("Java")) {
                listaJava.add(unCurso);
            }
        }
        return listaJava;
    }

    @Override
    public void modificarCurso(Curso cur) {
        curRep.save(cur);
    }

    @Override
    public void modificarCurso1(Long id_curso, String nombre, String tipo_curso, Date fecha_finalización) {
       Curso curso_editado = curRep.findById(id_curso).orElse(null);
       curso_editado.setNombre(nombre);
       curso_editado.setTipo_curso(tipo_curso);
       curso_editado.setFecha_finalización(fecha_finalización);
       curRep.save(curso_editado);
    }

}
