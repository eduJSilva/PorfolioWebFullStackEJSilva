package com.estudiante.cursos.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

@Getter
@Setter
@Entity
public class Curso implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id_curso;
    String nombre, tipo_curso;
    @Temporal(javax.persistence.TemporalType.DATE)
    //@DateTimeFormat(pattern = "yyyy-MM-dd")
    @DateTimeFormat(iso = ISO.DATE, fallbackPatterns = {"M/d/yy", "dd.MM.yyyy"})
    Date fecha_finalización;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "curso")
    @JsonManagedReference
    private List<Tema> listaDeTemas;

    public Curso() {
    }

    public Curso(Long id_curso, String nombre, String tipo_curso, Date fecha_finalización, List<Tema> listaDeTemas) {
        this.id_curso = id_curso;
        this.nombre = nombre;
        this.tipo_curso = tipo_curso;
        this.fecha_finalización = fecha_finalización;
        this.listaDeTemas = listaDeTemas;
    }

}
