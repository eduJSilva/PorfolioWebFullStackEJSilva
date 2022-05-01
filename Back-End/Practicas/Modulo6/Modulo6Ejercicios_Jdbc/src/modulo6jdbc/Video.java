/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modulo6jdbc;

/**
 *
 * @author Tenga
 */
public class Video {

    String id;
    String nombre;
    String link;
    String fecha;

    Video(String id, String nombre, String link, String fecha) {
        this.id = id;
        this.nombre = nombre;
        this.link = link;
        this.fecha = fecha;
    }

    String getId() {
        return this.id;
    }

    String getNombre() {
        return this.nombre;
    }

    String getLink() {
        return this.link;
    }

    String getFecha() {
        return this.fecha;
    }

    void setId(String id) {
        this.id = id;
    }

    void setNombre(String nombre) {
        this.id = nombre;
    }

    void setLink(String link) {
        this.id = link;
    }

    void setFecha(String fecha) {
        this.id = fecha;
    }

}
