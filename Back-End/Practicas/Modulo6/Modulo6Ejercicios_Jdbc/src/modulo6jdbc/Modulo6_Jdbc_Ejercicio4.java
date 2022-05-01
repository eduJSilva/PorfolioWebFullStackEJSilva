/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modulo6jdbc;

//4.Una contadora encargada de la liquidación de sueldos de una empresa desea realizar la actualización de sueldos 
//de los empleados en base a una suba de salario planificada para el nuevo mes. 
//Para almacenar cada empleado se tiene una tabla en una base de datos que contiene: nombre, apellido, cargo y sueldo.
//Realizar un programa que sea capaz de actualizar a $80.000 los sueldos de todos los empleados que tengan el cargo de “programador”.


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
public class Modulo6_Jdbc_Ejercicio4 {
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
    public Modulo6_Jdbc_Ejercicio4() {
        this.teclado = new Scanner(System.in);

        //cuando se crea el objeto, lo primero que hace es conectarse con la base de datos
        try {

            //Tecnología JDBC
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Servidor XAMPP                  servidor                    base de datos/usuario/contraseña
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/empresa", "root", "root");
            st = con.createStatement();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    //Metodo para ingresar datos a la tabla de la base de datos
    public void setDatos() {

        try {
            System.out.println("¿Cuantos empleados desea ingresar?");
            int empleadoIngresar = teclado.nextInt();

            for (int i = 0; i < empleadoIngresar; i++) {
                System.out.println("Por favor ingrese el nombre del empleado Nro." + (i + 1));
                String nombre = teclado.next();
                System.out.println("Por favor ingrese el apellido del empleado Nro." + (i + 1));
                String apellido = teclado.next();
                System.out.println("Por favor ingrese el cargo del empleado Nro." + (i + 1));
                String cargo = teclado.next();
                System.out.println("Por favor ingrese el sueldo del empleado Nro." + (i + 1));
                int sueldo = teclado.nextInt();

                String query = "INSERT INTO empleados (nombre, apellido, cargo, sueldo) VALUES('" + nombre + "' , '" + apellido + "', '" + cargo + "' , " + sueldo + ")";

                st.executeUpdate(query);
                System.out.println("Un nuevo empleado fue ingresado");
            }

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    //Metodo para actualizar datos de la base de datos
    public void updateDatos() {
        try {
            String query = "UPDATE empleados SET sueldo = 80000 WHERE cargo = 'programador'";
            st.executeUpdate(query);

            System.out.println("Fueron actualizados los sueldos de los programadores");

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    //Metodo para eliminar datos de la base de datos
    public void deleteDatos() {
        try {
            //String query = "DELETE FROM empleados WHERE apellido = 'no' OR comento = 'no'";
            //st.executeUpdate(query);

            //System.out.println("Fueron eliminados los empleados que no");

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    //Metodo para obtener los datos de la base de datos
    public void getDatos() {
        try {
            //Declaración e inicialización de la ArrayList-->listaEmpleados
            List<Empleado> listaEmpleados = new ArrayList<Empleado>();

            //Traer los datos de la tabla empleados
            String query = "SELECT * FROM empleados";
            rs = st.executeQuery(query);
            while (rs.next()) {
                String nombre = rs.getString("nombre");
                String apellido = rs.getString("apellido");
                String cargo = rs.getString("cargo");
                String sueldo = rs.getString("sueldo");

                //Instanciación de los objetos de la clase Empleado(con los datos de la tabla empleados de la base de datos empresa),
                //y adición de los mismos a la ArrayList -->listaEmpleados
                listaEmpleados.add(new Empleado(nombre, apellido, cargo, sueldo));
            }

            //Mostras los datos contenidos en la lista por pantalla
            //Para recorrer
            System.out.println(ANSI_GREEN_BACKGROUND + ANSI_BLUE + "Recorriendo la lista y mostrando el nombre, el apellido, el cargo y el sueldo*************" + ANSI_RESET);
            for (Empleado emp : listaEmpleados) {
                System.out.println("--------------\nNombre: " + emp.getNombre());
                System.out.println("Apellido: " + emp.getApellido());
                System.out.println("Cargo: " + emp.getCargo());
                System.out.println("Sueldo: " + emp.getSueldo());
            }

            System.out.println("\n" + ANSI_BLUE_BACKGROUND + ANSI_WHITE + "Recorriendo la lista y mostrando objetos contenidos en la listaEmpleados********************" + ANSI_RESET);
            for (int i = 0; i < listaEmpleados.size(); i++) {
                System.out.println("Empleado: " + listaEmpleados.get(i));
            }

            //Cuantos Empleados hay?
            System.out.println("\nEn la lista hay: " + listaEmpleados.size() + ", empleados.");
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
