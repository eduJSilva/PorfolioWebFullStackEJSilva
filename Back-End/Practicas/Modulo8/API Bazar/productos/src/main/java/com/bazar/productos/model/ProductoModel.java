
package com.bazar.productos.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Entity
public class ProductoModel {
    @Id
    @GeneratedValue (strategy = GenerationType.AUTO)
    private Long id_producto;
    private String nombre;
    private double precio;

    public ProductoModel() {
    }

    public ProductoModel(Long id_producto, String nombre, double precio) {
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.precio = precio;
    }
    
}
