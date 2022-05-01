
package logica;


public class Auto {
    private int id;
    private String placa;
    private String patente;
    private String marca;
    private String modelo;
    private String color;
    private String motor;

    public Auto() {
    }

    public Auto(int id, String placa, String patente, String marca, String modelo, String color, String motor) {
        this.id = id;
        this.placa = placa;
        this.patente = patente;
        this.marca = marca;
        this.modelo = modelo;
        this.color = color;
        this.motor = motor;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getPatente() {
        return patente;
    }

    public void setPatente(String patente) {
        this.patente = patente;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String modelo) {
        this.modelo = modelo;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getMotor() {
        return motor;
    }

    public void setMotor(String motor) {
        this.motor = motor;
    }
    
}
