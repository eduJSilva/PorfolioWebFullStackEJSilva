
package com.estudiante.cursos.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;


@Getter @Setter
@Entity
public class Tema implements Serializable {

    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    Long id_tema;
    String nombre, descripcion;
    
    @ManyToOne
    @JoinColumn(name = "FK_CURSO", nullable = false, updatable = false)
    @JsonBackReference
    private Curso curso;

    public Tema() {
    }

    public Tema(Long id_tema, String nombre, String descripcion, Curso curso) {
        this.id_tema = id_tema;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.curso = curso;
    }

    
}
