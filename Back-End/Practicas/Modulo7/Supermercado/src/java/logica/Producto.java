package logica;

import javax.persistence.Basic;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Producto implements Serializable {

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    @Basic
    private String producto;
    private String nombre;
    private String precioc;
    private String preciov;
    private String stock;
    private String categoria;

    public Producto() {
    }

    public Producto(int id, String producto, String nombre, String precioc, String preciov, String stock, String categoria) {
        this.id = id;
        this.producto = producto;
        this.nombre = nombre;
        this.precioc = precioc;
        this.preciov = preciov;
        this.stock = stock;
        this.categoria = categoria;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProducto() {
        return producto;
    }

    public void setProducto(String producto) {
        this.producto = producto;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getPrecioc() {
        return precioc;
    }

    public void setPrecioc(String precioc) {
        this.precioc = precioc;
    }

    public String getPreciov() {
        return preciov;
    }

    public void setPreciov(String preciov) {
        this.preciov = preciov;
    }

    public String getStock() {
        return stock;
    }

    public void setStock(String stock) {
        this.stock = stock;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

}
