package com.reposteria.celiacos.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Ingrediente {

    private String nombre;
    private boolean gluten;

    public Ingrediente() {
    }

    public Ingrediente(String nombre, boolean gluten) {
        this.nombre = nombre;
        this.gluten = gluten;
    }

}
