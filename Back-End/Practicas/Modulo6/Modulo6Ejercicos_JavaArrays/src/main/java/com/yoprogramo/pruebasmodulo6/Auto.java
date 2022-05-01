
package com.yoprogramo.pruebasmodulo6;

public class Auto {
    //num_patente, marca, modelo, color, chasis.

    private int num_patente;
    private String marca;
    private String modelo;
    private String color;
    private int chasis;

    Auto(int patente, String marca, String modelo, String color, int chasis) {
        this.num_patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.chasis = chasis;
    }

    //Getters
    public int getPatente() {
        return this.num_patente;
    }

    public String getMarca() {
        return this.marca;
    }

    public String getModelo() {
        return this.modelo;
    }

    public String getColor() {
        return this.color;
    }

    public int getChasis() {
        return this.chasis;
    }

    //Setters
    public void setPatente(int patente) {
        this.num_patente = patente;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setChasis(int chasis) {
        this.chasis = chasis;
    }

}
