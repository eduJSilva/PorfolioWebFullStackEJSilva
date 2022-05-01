/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modulo6jdbc;

/**
 *
 * @author SilvaEduardo
 */
public class Empleado {
    String nombre;
    String apellido;
    String cargo;
    String sueldo;

    Empleado(String nombre, String apellido, String cargo, String sueldo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cargo = cargo;
        this.sueldo = sueldo;
    }

    String getNombre() {
        return this.nombre;
    }

    String getApellido() {
        return this.apellido;
    }

    String getCargo() {
        return this.cargo;
    }

    String getSueldo() {
        return this.sueldo;
    }

    void setNombre(String nombre) {
        this.nombre = nombre;
    }

    void setApellido(String apellido) {
        this.apellido = apellido;
    }

    void setCargo(String cargo) {
        this.cargo = cargo;
    }

    void setSueldo(String sueldo) {
        this.sueldo = sueldo;
    }

}
