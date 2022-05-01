package com.dto.escuela.controller;

import com.dto.escuela.dto.AlumsxInstruDTO;
import com.dto.escuela.model.Alumno;
import com.dto.escuela.model.Instrumento;
import com.dto.escuela.service.IAlumnoService;
import com.dto.escuela.service.IDtoService;
import com.dto.escuela.service.IInstrumentoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TallerMusicaController {

    @Autowired
    private IAlumnoService alumServ;

    @Autowired
    private IInstrumentoService instServ;

    @Autowired
    private IDtoService dtoServ;

    @PostMapping("/new/alumno")
    public String agregarAlumno(@RequestBody Alumno alum) {
        List<Instrumento> listaInstrumentos = instServ.listarInstrumentos();

        for (Instrumento listaInstrumento : listaInstrumentos) {
            if (alum.getFk_instrumento() == listaInstrumento.getId_instrumento()) {
                alumServ.nuevoAlumno(alum);
                return "El alumno/a " + alum.getNombre_alumno()+ " " + alum.getApellido_alumno()+ ", fué creado correctamente";
            }
        }
        return "Primero ingrese un Instrumento  por favor";
    }

    @PostMapping("/new/instrumento")
    public String agregarInstrumento(@RequestBody Instrumento inst) {
        instServ.nuevoInstrumento(inst);
        return "El instrumento " + inst.getNombre_instrumento() + ", fué creado correctamente";
    }

    //Ver todos los instrumentos con los que cuenta el coro
    @GetMapping("/instrumentos/traer")
    @ResponseBody
    public List<Instrumento> listarInstrumentos() {
        return instServ.listarInstrumentos();
    }

    //Ver todos los alumnos del taller de música
    @GetMapping("/alumnos/traer")
    @ResponseBody
    public List<Alumno> listarAlumnos() {
        return alumServ.listarAlumnos();
    }

    //Traer un instrumento en particular
    @GetMapping("/instrumentos/traer/{nombre}")
    @ResponseBody
    public Instrumento traerInstrumento(@PathVariable String nombre) {
        return instServ.traerInstrumento(nombre);
    }

    //Traer todos los alumnos que toquen un instrumento
    //localhost:8080/alumnos/traer/{nombre_instrumento} 
    //(Para este endpoint tener en cuenta el uso del patrón DTO para generar la respuesta)
    //trae los alumnos del servicioDTO
    @GetMapping("/alumnosdto/traer/{nombre_instrum}")
    @ResponseBody
    public List<AlumsxInstruDTO> traerAlumnos_que_toquen_unInsturmento(@PathVariable String nombre_instrum) {
        return dtoServ.traer_Alumnos_toquen_unInstrumento(nombre_instrum);
    }

}
