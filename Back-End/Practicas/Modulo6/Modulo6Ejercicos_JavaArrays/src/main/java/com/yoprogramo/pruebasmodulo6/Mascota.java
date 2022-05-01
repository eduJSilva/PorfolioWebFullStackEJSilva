/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.yoprogramo.pruebasmodulo6;

/**
 *
 * @author eduardosilva
 */
public class Mascota {

    private String nombre;
    private String especie;
    private char sexo;
    private String color;
    private String pelaje;
    private String raza;

    Mascota(String n, String e, char s, String c, String p, String r) {
        this.nombre = n;
        this.especie = e;
        this.sexo = s;
        this.color = c;
        this.pelaje = p;
        this.raza = r;
    }

    //Getters
    
    public String getNombre() {
        return this.nombre;
    }

    public String getEspecie() {
        return this.especie;
    }

    public char getSexo() {
        return this.sexo;
    }

    public String getColor() {
        return this.color;
    }

    public String getPelaje() {
        return this.pelaje;
    }

    public String getRaza() {
        return this.raza;
    }
    
    //Setters
    
    public void setNombre(String n) {
        this.nombre = n;
    }
    
     public void setEspecie(String e) {
        this.especie = e;
    }
     
      public void setSexo(char s) {
        this.sexo = s;
    }
      
       public void setColor(String c) {
        this.color = c;
    }
       
        public void setPelaje(String p) {
        this.pelaje = p;
    }
        
         public void setRaza(String r) {
        this.raza= r;
    }

}
