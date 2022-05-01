
package com.yoprogramo.pruebasmodulo6;

public class Persona1 {

    private int dni;
    private String nombre;
    private String apellido;
    private String direccion;
    private int celular;
    private int edad;

    Persona1(int dni, String nombre, String apellido, String direccion, int celular, int edad) {
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.celular = celular;
        this.edad = edad;
    }

    public int getDni() {
        return this.dni;
    }

    public String getNombre() {
        return this.nombre;
    }

    public String getApellido() {
        return this.apellido;
    }

    public String getDireccion() {
        return this.direccion;
    }

    public int getCelular() {
        return this.celular;
    }

    public int getEdad() {
        return this.edad;
    }

    public void setId(int dni) {
        this.dni = dni;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public void setCelular(int celular) {
        this.celular = celular;
    }

    public void setEdad(int edad) {
        this.edad = edad;
    }

}
