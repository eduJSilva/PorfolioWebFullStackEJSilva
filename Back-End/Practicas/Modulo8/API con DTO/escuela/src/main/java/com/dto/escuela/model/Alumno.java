
package com.dto.escuela.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Alumno {
    private int id_alumno;
    private String nombre_alumno;
    private String apellido_alumno;
    private String curso; 
    private int fk_instrumento;
    
    public Alumno() {
    }

    public Alumno(int id_alumno, String nombre_alumno, String apellido_alumno, String curso, int fk_instrumento) {
        this.id_alumno = id_alumno;
        this.nombre_alumno = nombre_alumno;
        this.apellido_alumno = apellido_alumno;
        this.curso = curso;
        this.fk_instrumento = fk_instrumento;
    } 
}
