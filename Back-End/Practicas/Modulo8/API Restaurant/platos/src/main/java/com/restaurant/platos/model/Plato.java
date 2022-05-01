
package com.restaurant.platos.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Plato {
    private int id_plato;
    private String nombre;
    private double precio;
    private String descripcion;

    public Plato() {
    }

    public Plato(int id_plato, String nombre, double precio, String descripcion) {
        this.id_plato = id_plato;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
    
}
