/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modulo6jdbc;

/**
 *
 * @author SilvaEduardo
 */
public class Cliente {

    String nombre;
    String apellido;
    String edad;
    String compartio;
    String comento;

    public Cliente() {
    }

    
    public Cliente(String nombre, String apellido, String edad, String compartio, String comento) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.compartio = compartio;
        this.comento = comento;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getEdad() {
        return edad;
    }

    public String getCompartio() {
        return compartio;
    }

    public String getComento() {
        return comento;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public void setEdad(String edad) {
        this.edad = edad;
    }

    public void setCompartio(String compartio) {
        this.compartio = compartio;
    }

    public void setComento(String comento) {
        this.comento = comento;
    }

  
    @Override
    public String toString() {
        return "Cliente{" + "nombre=" + nombre + ", apellido=" + apellido + ", edad=" + edad + ", compartio=" + compartio + ", comento=" + comento + '}';
    }

    
    

    

    
}
