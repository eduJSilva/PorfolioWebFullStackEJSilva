package com.estudiante.cursos.controller;

import com.estudiante.cursos.model.Curso;
import com.estudiante.cursos.model.Tema;
import com.estudiante.cursos.service.ICursoService;
import com.estudiante.cursos.service.ITemaService;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {
    
    @Autowired
    private ICursoService curSer;
    
    @Autowired
    private ITemaService temServ;

    //1	Crear un nuevo tema
    @PostMapping("/tema/new")
    public String crearTema(@RequestBody Tema tem) {
        temServ.crearTema(tem);
        return "El tema se creo correctamente";
    }

    //2	Crear un nuevo curso
    @PostMapping("/curso/new")
    public String crearCurso(@RequestBody Curso cur) {
        curSer.crearCurso(cur);
        return "El curso se creo correctamente";
    }

    //3	Obtener todos los cursos
    @GetMapping("/cursos/traertodos")
    @ResponseBody
    public List<Curso> traerCursos() {
        return curSer.traerCursos();
    }

    //4	Obtener todos los temas de un determinado curso
    @GetMapping("/cursos/traertemasdeuncurso/{id}")
    @ResponseBody
    public List<Tema> traerTemasdeCurso(@PathVariable Long id) {
        return curSer.traerTemas_curso(id);
    }

    //5	Obtener todos los cursos que contengan como nombre la palabra “Java”
    @GetMapping("/cursos/traercursosjava")
    @ResponseBody
    public List<Curso> traerCursosJava() {
        return curSer.traerCursosJava();
    }

    //6	Modificar los datos de un curso
    //Por RequestBody
    @PutMapping("/curso/modificar")
    public void modificarCurso(@RequestBody Curso cur) {
        curSer.modificarCurso(cur);
    }

    //Por RequestParam
    @PutMapping("/curso/modificar/{id}")
    public void modificarCurso1(@PathVariable Long id,
            @RequestParam String nombre,
            @RequestParam String tipo_curso,
            @RequestParam Date fecha_finalización) {
        curSer.modificarCurso1(id, nombre, tipo_curso, fecha_finalización);
    }

    //7         Modificar los datos de un determinado tema
    @PutMapping("/tema/modificar/{id_tema}")
    public void modificarTema(@PathVariable Long id_tema,
            @RequestParam String nombre,
            @RequestParam String descripcion
    ) {
        temServ.modificarTema(id_tema, nombre, descripcion);
    }
    
    @PutMapping("/tema/modificar")
    public void modificarTema1(@RequestBody Tema tem){
        temServ.modificarTema1(tem);
    }
    
    
    //MoverTema
    @PostMapping("/tema/mover/tema/{id_tema}/acurso/{id_curso}")
    public String moverTema(@PathVariable Long id_tema, @PathVariable Curso id_curso) {
       Tema tem =  temServ.traerunTema(id_tema);
        temServ.borrarTema(id_tema);
        tem.setCurso(id_curso);
        temServ.crearTema(tem);
        return "El tema "+ tem.getNombre() + ", se movio correctamente al Curso: "+id_curso.getNombre();
    }
}
