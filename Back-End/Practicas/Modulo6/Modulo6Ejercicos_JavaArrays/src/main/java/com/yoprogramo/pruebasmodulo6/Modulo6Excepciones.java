/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.yoprogramo.pruebasmodulo6;

import java.util.Scanner;
/**
 *
 * @author eduardosilva
 */
public class Modulo6Excepciones {

//1.Realizar un programa donde se provoque una excepción de tipo “error por desbordamiento”. 
    //Tratar la excepción mediante los bloques try y catch y mostrar un mensaje indicando la situación.
    //Por ejemplo: “Se produjo un error por desbordamiento”.  
    public void modulo6Ex1() {
        try {
            int numeros[] = {2, 4, 5, 6};
            //intentamos provocar un error por desbordamiento
            System.out.println("el nr. de la posición 10 es: " + numeros[4]);
        } catch (Exception e) {
            System.out.println("Error por desbordamiento!!");
        }
    }

//2.Realizar un programa que permita el ingreso de dos números por teclado 
    //para ser divididos entre sí. Tomar como precaución la utilización del try y el catch 
    //por si el segundo número ingresado para dividir se trata de un cero. 
    //Mostrar un mensaje adecuado en caso de que se produzca la excepción.
    public void modulo6Ex2() {

        Scanner teclado = new Scanner(System.in);

        try {
            System.out.println("Ingrese el dividendo: ");
            int num1 = teclado.nextInt();
            System.out.println("");
            System.out.println("Ingrese el divisor: ");
            int num2 = teclado.nextInt();

            int resultado = num1 / num2;
            System.out.println("");
            System.out.println("El resultado es: " + resultado);
        } catch (Exception e) {
            System.out.println("");
            System.out.println("No se puede dividir por 0!!! ");
        }
    }

//3.Realizar una clase de Excepciones Personalizada que extienda de la clase Exception. 
    //Implementar los diferentes métodos que sean necesarios teniendo en cuenta 
    //cada uno de los mensajes personalizados que podrían arrojar. 
    //Provocar la ejecución de la excepción personalizada mediante la sentencia throw 
    //para probar la ejecución de la excepción y responder… 
    //¿Se ejecuta correctamente? ¿Qué método de la excepción se ejecutó?
    public void modulo6Ex3() {
        Scanner teclado = new Scanner(System.in);
        MiHelper h = new MiHelper();

        for (int i = 0; i < 1;) {      
            try {
                
                System.out.println("Ingrese el dividendo: ");
                int num1 = teclado.nextInt();
                System.out.println("");

                System.out.println("Ingrese el divisor: ");
                int num2 = teclado.nextInt();

                double resultado = num1 / num2;
                System.out.println("");
                System.out.println("El resultado es: " + resultado);
                i = 1;
                h.validarDivision(num1, num2, resultado);
                
            } 
             
            catch (CustomExceptions e) {
                System.out.println("");
                System.out.println(e.getMessage());
                i = 0;
            } catch (ArithmeticException e) {
                System.out.println("");
                System.out.println("No se puede dividir por 0!!! ");
                i = 0;
            }  
            catch (Exception e) {
                System.out.println("");
                System.out.println("Por favor ingrese un valor valido!!! ");
                i = 0;
                teclado.next();// Move to next other wise exception
            }
            
            finally {
                if (i == 0) {
                    System.out.println("Intentelo de nuevo!");
                    
                } else {
                    System.out.println("Fin del Programa!");
                }
            }
        }
    }
}
