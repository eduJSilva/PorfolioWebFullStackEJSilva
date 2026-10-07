package com.portfolio.EduSilva.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Proyecto implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long idProyecto;
    private String nombreProyecto;
    private String fecha;
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    private String link;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "proyecto")
    @JsonManagedReference
    private List<ImagenProyecto> listaDeImagenProyectos;
    
    @ManyToOne
    @JoinColumn(name = "FK_Persona", nullable = false, updatable = false)
    @JsonBackReference
    private Persona persona;

    public Proyecto(Long idProyecto, String nombreProyecto, String fecha, String descripcion, String link, List<ImagenProyecto> listaDeImagenProyectos, Persona persona) {
        this.idProyecto = idProyecto;
        this.nombreProyecto = nombreProyecto;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.link = link;
        this.listaDeImagenProyectos = listaDeImagenProyectos;
        this.persona = persona;
    }

    

    public Proyecto() {
    }
}
