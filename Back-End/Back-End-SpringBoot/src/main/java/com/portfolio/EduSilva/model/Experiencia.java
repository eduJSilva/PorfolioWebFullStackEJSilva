
package com.portfolio.EduSilva.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.DynamicUpdate;

@Getter
@Setter
@Entity
@DynamicUpdate
public class Experiencia implements Serializable {
      @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idExperiencia;
    @Column
    private String empresa;
    @Column
    private String puesto;
    @Column
    private String imagen;
    
   @Column(columnDefinition = "TEXT")
    private String descripcion;
   
   @Column
    private String inicio;
   @Column
    private String fin;
    
    @ManyToOne
    @JoinColumn(name = "FK_Persona", nullable = false, updatable = false)
    @JsonBackReference
    private Persona persona;

    public Experiencia() {
    }

    public Experiencia(Long idExperiencia, String empresa, String puesto, String imagen, String descripcion, String anioInicio, String anioFin, Persona persona) {
        this.idExperiencia = idExperiencia;
        this.empresa = empresa;
        this.puesto = puesto;
        this.imagen = imagen;
        this.descripcion = descripcion;
        this.inicio = anioInicio;
        this.fin = anioFin;
        this.persona = persona;
    }

    
}
