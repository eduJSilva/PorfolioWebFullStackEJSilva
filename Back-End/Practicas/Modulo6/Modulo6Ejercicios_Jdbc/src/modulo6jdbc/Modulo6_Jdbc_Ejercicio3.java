/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modulo6jdbc;
//3.Una fabricadora de bijouterie desea realizar un sorteo para su página de Instagram. 
//Para ello, había almacenado manualmente en una base de datos todas sus clientes que habían comentado la publicación. 
//Sin embargo, se dio cuenta que varios no habían cumplido con las condiciones del sorteo, por lo cual desea eliminarlos. 
//Cada cliente tiene los datos: nombre, apellido, edad, compartió y comento. 
//Donde los atributos compartió y comento pueden contener los valores si o no.
//Realizar un programa que sea capaz de eliminar de la base de datos todos los clientes cuyos campos 
//compartió y/o comento contengan un no. Luego de hacer la eliminación, traer todos los clientes en una lista 
//y mostrarlos por pantalla. Utilizar para esto la tecnología JDBC.

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
 * @author SilvaEduardo
 */
public class Modulo6_Jdbc_Ejercicio3 {
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
    public Modulo6_Jdbc_Ejercicio3() {
        this.teclado = new Scanner(System.in);

        //cuando se crea el objeto, lo primero que hace es conectarse con la base de datos
        try {

            //Tecnología JDBC
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Servidor XAMPP                  servidor base de datos                usuario contraseña
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/bijouterie", "root", "root");
            st = con.createStatement();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    //Metodo para ingresar datos a la tabla de la base de datos
    public void setDatos() {

        try {
            System.out.println("¿Cuantos clientes desea ingresar?");
            int clienteIngresar = teclado.nextInt();

            for (int i = 0; i < clienteIngresar; i++) {
                System.out.println("Por favor ingrese el nombre del cliente Nro." + (i + 1));
                String nombre = teclado.next();
                System.out.println("Por favor ingrese el apellido del cliente Nro." + (i + 1));
                String apellido = teclado.next();
                System.out.println("Por favor ingrese la edad del cliente Nro." + (i + 1));
                int edad = teclado.nextInt();
                System.out.println("Por favor ingrese si compartió(si/no) el cliente Nro." + (i + 1));
                String compartio = teclado.next();
                System.out.println("Por favor ingrese si comento(si/no) el cliente Nro." + (i + 1));
                String comento = teclado.next();

                String query = "INSERT INTO clientes (nombre, apellido, edad, compartio, comento) VALUES('" + nombre + "' , '" + apellido + "', " + edad + " , '" + compartio + "' , '" + comento + "')";

                st.executeUpdate(query);
                System.out.println("Un nuevo cliente fue ingresado");
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    //Metodo para eliminar datos de la base de datos
    public void deleteDatos() {
        try {
            String query = "DELETE FROM clientes WHERE compartio = 'no' OR comento = 'no'";
            st.executeUpdate(query);

            System.out.println("Fueron eliminados los usuarios que no compartieron o que no comentaron");

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    //Metodo para obtener los datos de la base de datos
    public void getDatos() {
        try {
            //Declaración e inicialización de la ArrayList-->listaClientes
            List<Cliente> listaClientes = new ArrayList<Cliente>();

            //Traer los datos de la tabla clientes
            String query = "SELECT * FROM clientes";
            rs = st.executeQuery(query);
            while (rs.next()) {
                String nombre = rs.getString("nombre");
                String apellido = rs.getString("apellido");
                String edad = rs.getString("edad");
                String compartio = rs.getString("compartio");
                String comento = rs.getString("comento");

                //Instanciación de los objetos de la clase Cliente(con los datos de la tabla clientes de la base de datos bijouterie),
                //y adición de los mismos a la ArrayList -->listaClientes
                listaClientes.add(new Cliente(nombre, apellido, edad, compartio, comento));
            }

            //Mostras los datos contenidos en la lista por pantalla
            //Para recorrer
            System.out.println(ANSI_GREEN_BACKGROUND + ANSI_BLUE + "Recorriendo la lista y mostrando el nombre, el apellido, la edad, si compartio o si comento*************" + ANSI_RESET);
            for (Cliente cli : listaClientes) {
                System.out.println("--------------\nNombre: " + cli.getNombre());
                System.out.println("Apellido: " + cli.getApellido());
                System.out.println("Edad: " + cli.getEdad());
                System.out.println("Compartio: " + cli.getCompartio());
                System.out.println("Comento: " + cli.getComento());
            }

            System.out.println("\n" + ANSI_BLUE_BACKGROUND + ANSI_WHITE + "Recorriendo la lista y mostrando objetos contenidos en la listaClientes********************" + ANSI_RESET);
            for (int i = 0; i < listaClientes.size(); i++) {
                System.out.println("Video: " + listaClientes.get(i));
            }

            //Cuantos Videos hay?
            System.out.println("\nEn la lista hay: " + listaClientes.size() + ", clientes.");
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
