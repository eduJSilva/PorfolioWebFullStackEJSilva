/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package modulo6jdbc;

//1.Una despensa de un barrio desea realizar el alta de sus diferentes productos a una base de datos. 
//Para ello, tiene una tabla creada en su base de datos, llamada productos. 
//A partir de esto desea poder solicitar por teclado cada uno de los elementos de un producto: 
//código, nombre, marca, precio, cantidad_stock y guardarlos en la correspondiente tabla. 
//Utilizar para ello la tecnología JDBC y la correspondiente consulta SQL.
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Scanner;

/**
 *
 * @author SilvaEduardo
 */
public class Modulo6_Jdbc_Ejercicio1 {

    private Connection con;
    private Statement st;
    private ResultSet rs;
    private Scanner teclado;

    //Constructor    
    public Modulo6_Jdbc_Ejercicio1() {
        this.teclado = new Scanner(System.in);

        //cuando se crea el objeto, lo primero que hace es conectarse con la base de datos
        try {

            //Tecnología JDBC
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Servidor XAMPP                  servidor base de datos                usuario contraseña
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/despensa", "root", "root");
            st = con.createStatement();

        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    //Metodo para ingresar datos a la tabla de la base de datos
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

    //Metodo para obtener los datos de la base de datos
    public void getDatos() {
        try {
            String query = "SELECT * FROM productos";
            rs = st.executeQuery(query);

            while (rs.next()) {
                String codigo = rs.getString("codigo");
                String nombre = rs.getString("nombre");
                String marca = rs.getString("marca");
                String precio = rs.getString("precio");
                String cantidad_stock = rs.getString("cantidad_stock");
                System.out.println("----------------------\nCodigo: " + codigo + "\nNombre: " + nombre + "\nMarca: " + marca + "\nPrecio: " + precio + "\nCantidad_stock: " + cantidad_stock);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        } finally {
            try {
                con.close();
            } catch (Exception ex) {
                ex.printStackTrace();
            }

        }
    }

}
