package com.estudiante.cursos.dto;

import com.estudiante.cursos.model.Tema;
import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ClassDto {

    Long id_curso;
    String nombre, tipo_curso;
    Date fecha_finalización;
    List<Tema> listaDeTemas;
    Long id_tema;
    String nombre_tema, descripcion;

    public ClassDto() {
    }

    public ClassDto(Long id_curso, String nombre, String tipo_curso, Date fecha_finalización, List<Tema> listaDeTemas, Long id_tema, String nombre_tema, String descripcion) {
        this.id_curso = id_curso;
        this.nombre = nombre;
        this.tipo_curso = tipo_curso;
        this.fecha_finalización = fecha_finalización;
        this.listaDeTemas = listaDeTemas;
        this.id_tema = id_tema;
        this.nombre_tema = nombre_tema;
        this.descripcion = descripcion;
    }
    
}
