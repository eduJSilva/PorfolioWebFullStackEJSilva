/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modulo6jdbc;

//2.Un youtuber posee almacenados en una tabla llamada videos dentro de una base de datos, 
//todos sus videos que ya fueron subidos a Youtube. Desea un programa que sea capaz de traer todos esos videos, 
//almacenarlos en una lista y mostrarlos luego por pantalla. Utilizar para ello la tecnología JDBC.
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

/**
 *
 * @author Silva Eduardo
 */
public class Modulo6_Jdbc_Ejercicio2 {
    //Reset
    public static final String ANSI_RESET = "\u001B[0m";
    //Colores de letra
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";
    //Colores de fondo
    public static final String ANSI_BLACK_BACKGROUND = "\u001B[40m";
    public static final String ANSI_RED_BACKGROUND = "\u001B[41m";
    public static final String ANSI_GREEN_BACKGROUND = "\u001B[42m";
    public static final String ANSI_YELLOW_BACKGROUND = "\u001B[43m";
    public static final String ANSI_BLUE_BACKGROUND = "\u001B[44m";
    public static final String ANSI_PURPLE_BACKGROUND = "\u001B[45m";
    public static final String ANSI_CYAN_BACKGROUND = "\u001B[46m";
    public static final String ANSI_WHITE_BACKGROUND = "\u001B[47m";

    private Connection con;
    private Statement st;
    private ResultSet rs;
    private Scanner teclado;

    //Constructor    
    public Modulo6_Jdbc_Ejercicio2() {
        this.teclado = new Scanner(System.in);

        //cuando se crea el objeto, lo primero que hace es conectarse con la base de datos
        try {

            //Tecnología JDBC
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Servidor XAMPP                  servidor base de datos                usuario contraseña
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/youtuber", "root", "root");
            st = con.createStatement();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    //Metodo para ingresar datos a la tabla de la base de datos
    /*
    public void setDatos() {

        try {
            System.out.println("¿Cuantos productos desea ingresar?");
            int prodIngresar = teclado.nextInt();

            for (int i = 0; i < prodIngresar; i++) {
                System.out.println("Por favor ingrese el nombre del producto Nro." + (i + 1));
                String nombre = teclado.next();
                System.out.println("Por favor ingrese la marca del producto Nro." + (i + 1));
                String marca = teclado.next();
                System.out.println("Por favor ingrese el precio del producto Nro." + (i + 1));
                int precio = teclado.nextInt();
                System.out.println("Por favor ingrese el stock del producto Nro." + (i + 1));
                int cantidad_stock = teclado.nextInt();

                String query = "INSERT INTO productos (nombre, marca, precio, cantidad_stock) VALUES('" + nombre + "' , '" + marca + "', " + precio + " , " + cantidad_stock + ")";

                st.executeUpdate(query);
                System.out.println("Un nuevo producto fue ingresado");
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
     */
    //Metodo para obtener los datos de la base de datos
    public void getDatos() {
        try {
            //Declaración e inicialización de la ArrayList-->listaVideos
            List<Video> listaVideos = new ArrayList<Video>();

            //Traer los datos de la tabla videos
            String query = "SELECT * FROM videos";
            rs = st.executeQuery(query);
            while (rs.next()) {
                String id = rs.getString("id");
                String nombre = rs.getString("nombre");
                String link = rs.getString("link");
                String fecha = rs.getString("fecha_publicacion");
                
                //Instanciación de los objetos de la clase Video(con los datos de la tabla videos de la base de datos youtuber),
                //y adición de los mismos a la ArrayList -->listaVideos
                listaVideos.add(new Video(id, nombre, link, fecha));
            }

            //Mostras los datos contenidos en la lista por pantalla
            //Para recorrer
            System.out.println(ANSI_GREEN_BACKGROUND + ANSI_BLUE + "Recorriendo la lista y mostrando el id, el nombre, el link y la fecha*************" + ANSI_RESET);
            for (Video vid : listaVideos) {
                System.out.println("--------------\nId: " + vid.getId());
                System.out.println("Nombre: " + vid.getNombre());
                System.out.println("Link: " + vid.getLink());
                System.out.println("Fecha: " + vid.getFecha());
            }

            System.out.println("\n" + ANSI_BLUE_BACKGROUND + ANSI_WHITE +"Recorriendo la lista y mostrando objetos contenidos en la listaVideos********************");
            for (int i = 0; i < listaVideos.size(); i++) {
                System.out.println("Video: " + listaVideos.get(i));
            }

            //Cuantos Videos hay?
            System.out.println("\nEn la lista hay: " + listaVideos.size() + ", videos.");
            System.out.println("Fin**************************************************************");

        } catch (SQLException ex) {
        } finally {
            try {
                //cerrar la base de datos
                con.close();
            } catch (SQLException ex) {
            }

        }
    }
}
