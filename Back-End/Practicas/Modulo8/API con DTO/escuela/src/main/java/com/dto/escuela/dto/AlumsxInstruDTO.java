package com.dto.escuela.dto;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AlumsxInstruDTO implements Serializable {

    private String nombre_alumno;
    private String apellido_alumno;
    
    private String nombre_instrumento;

    public AlumsxInstruDTO() {
    }

    public AlumsxInstruDTO(String nombre_alumno, String apellido_alumno, String nombre_instrumento) {
        this.nombre_alumno = nombre_alumno;
        this.apellido_alumno = apellido_alumno;
        this.nombre_instrumento = nombre_instrumento;
    }

    
    

}
