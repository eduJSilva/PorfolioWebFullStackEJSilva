
package com.dto.escuela.model;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Instrumento {
    private int id_instrumento;
    private String nombre_instrumento;
    private String tipo;
    private String material;

    public Instrumento() {
    }

    public Instrumento(int id_instrumento, String nombre_instrumento, String tipo, String material) {
        this.id_instrumento = id_instrumento;
        this.nombre_instrumento = nombre_instrumento;
        this.tipo = tipo;
        this.material = material;
    }
    
    
}
