
package com.yoprogramo.pruebasmodulo6;


 //1.Una despensa de un barrio desea realizar el alta de sus diferentes productos a una base de datos. 
    //Para ello, tiene una tabla creada en su base de datos, llamada productos. 
    //A partir de esto desea poder solicitar por teclado cada uno de los elementos de un producto: 
    //código, nombre, marca, precio, cantidad_stock y guardarlos en la correspondiente tabla. 
    //Utilizar para ello la tecnología JDBC y la correspondiente consulta SQL.

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

             
public class JdbcCollections {
    private Connection con; 
    private Statement st;
    private ResultSet rs;
   
   //Constructor    
    public JdbcCollections () {
        try{
            Class.forName("com.mysql.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/despensa", "root" , "root");
            st = con.createStatement();
            
            String query = "INSERT INTO productos (codigo, nombre, marca, precio, cantidad_stock) VALUES(3, Yerba, Playadito, 200, 30)";
            st.executeUpdate(query);
            System.out.println("Un nuevo producto fue ingresado");
            
        }catch(Exception ex) {
            System.out.println("Error");
                ex.printStackTrace();
            }
    }  
}


//2.Un youtuber posee almacenados en una tabla llamada videos dentro de una base de datos, todos sus videos que ya fueron subidos a Youtube. Desea un programa que sea capaz de traer todos esos videos, almacenarlos en una lista y mostrarlos luego por pantalla. Utilizar para ello la tecnología JDBC.

//3.Una fabricadora de bijouterie desea realizar un sorteo para su página de Instagram. Para ello, había almacenado manualmente en una base de datos todas sus clientes que habían comentado la publicación. Sin embargo, se dio cuenta que varios no habían cumplido con las condiciones del sorteo, por lo cual desea eliminarlos. Cada cliente tiene los datos: nombre, apellido, edad, compartió y comento. Donde los atributos compartió y comento pueden contener los valores si o no.

//Realizar un programa que sea capaz de eliminar de la base de datos todos los clientes cuyos campos compartió y/o comento contengan un no. Luego de hacer la eliminación, traer todos los clientes en una lista y mostrarlos por pantalla. Utilizar para esto la tecnología JDBC.

//4.Una contadora encargada de la liquidación de sueldos de una empresa desea realizar la actualización de sueldos de los empleados en base a una suba de salario planificada para el nuevo mes. Para almacenar cada empleado se tiene una tabla en una base de datos que contiene: nombre, apellido, cargo y sueldo.

//Realizar un programa que sea capaz de actualizar a $80.000 los sueldos de todos los empleados que tengan el cargo de “programador”.

