package com.dto.escuela.service;

import com.dto.escuela.dto.AlumsxInstruDTO;
import com.dto.escuela.model.Alumno;
import com.dto.escuela.model.Instrumento;
import java.util.ArrayList;
import java.util.List;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DtoService implements IDtoService {

    //Creo una lista de tipo DTO
    List<AlumsxInstruDTO> listaDto = new ArrayList();

    //traigo los servicios de Alumno e Instrumento
    @Autowired
    IAlumnoService alumServ;

    @Autowired
    IInstrumentoService instServ;

    @Override
    public List<AlumsxInstruDTO> traer_Alumnos_toquen_unInstrumento(String nombre_instrum) {
//La mejor práctica (menos codigo y mas ordenado)
        //Traigo todos los Alumnos e Instrumentos
        List<Alumno> listaAlumnos = alumServ.listarAlumnos();
        List<Instrumento> listaInstrumentos = instServ.listarInstrumentos();

        //Creo una lista de tipo DTO
        List<AlumsxInstruDTO> listaalumnos_intrumentoDTO = new ArrayList();
// Mapeando utilizando ModelMapper
        for (Instrumento instrumento : listaInstrumentos) {
            for (Alumno alumno : listaAlumnos) {
                //si coincide la clave foranea del alumno con el id del instrumento Y coincide el argumento pasado(@PathVariable) con el nombre del instrumento
                if ((alumno.getFk_instrumento() == instrumento.getId_instrumento()) && instrumento.getNombre_instrumento().equalsIgnoreCase(nombre_instrum)) {
                    //Mapeo con modelMapper
                    ModelMapper modelMapper = new ModelMapper();
                    AlumsxInstruDTO mapeo = modelMapper.map(alumno, AlumsxInstruDTO.class);
                    modelMapper.map(instrumento, mapeo);
                    //Agrego el objeto DTO a la lista DTO             
                    listaalumnos_intrumentoDTO.add(mapeo);
                }
            }
        }
        //Retorno la lista DTO creada
        return listaalumnos_intrumentoDTO;
    }
}
