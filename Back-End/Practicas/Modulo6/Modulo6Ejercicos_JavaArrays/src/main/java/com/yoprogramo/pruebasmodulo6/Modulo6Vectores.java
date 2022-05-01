/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.yoprogramo.pruebasmodulo6;

import java.util.Arrays;
import java.util.Collections;
import java.util.Scanner;

/**
 *
 * @author eduardosilva
 */
public class Modulo6Vectores {

    public void modulo6Ve1() {
        //MODULO 6, VECTORES EJERCICIO 1
        //Se necesita de un vector que sea capaz de almacenar 10 números enteros entre 1 y 100.  
        //Realizar un programa que permita la carga por teclado de los 10 números solicitados. 
        //
        int vector[] = new int[10];
        Scanner teclado = new Scanner(System.in);

        for (int i = 0; i < 10; i++) {
            System.out.println("Ingrese un numero para el índice: " + i + " entre el 1 al 100: ");
            vector[i] = teclado.nextInt();
            if (vector[i] < 1 || vector[i] > 100) {
                System.out.println("Por favor que el numero esté en el rengo de 1 al 100");
                i--;

            }
        }
        System.out.println("El vector se conformó así: " + Arrays.toString(vector));
    }

    public void modulo6Ve2() {
        //MODULO 6, VECTORES EJERCICIO 2
        //En un vector de 15 posiciones se almacenan las edades de 15 alumnos. 
        //Se desea un programa que sea capaz de determinar cuál es la mayor edad 
        //y cuál es la menor edad que se encuentra entre los estudiantes.

        int vector[] = new int[15];
        Scanner teclado = new Scanner(System.in);

        for (int i = 0; i < 15; i++) {
            System.out.println("Ingrese la edad del alúmno: " + i);
            vector[i] = teclado.nextInt();
            if (vector[i] < 5 || vector[i] > 30) {
                System.out.println("Por favor que el numero esté en el rengo de 5 al 30");
                i--;

            }
        }
        System.out.println("Estas son las edades ingresadas: " + Arrays.toString(vector));
        int mayor = 0;
        int menor = 31;
        for (int i = 0; i < 15; i++) {
            mayor = Math.max(mayor, vector[i]);
            menor = Math.min(menor, vector[i]);
        }
        System.out.println("La mayor edad es: " + mayor + ", y la menor edad es: " + menor);

    }

    public void modulo6Ve3() {
        //MODULO 6, VECTORES EJERCICIO 3
        //Se tienen tres vectores. En el primero de ellos se guarda un número de dni, 
        //en el segundo un nombre y en el tercero un apellido. Se desea un programa que 
        //sea capaz de recorrer los tres vectores AL MISMO TIEMPO y mostrar 
        //cada uno de estos datos por pantalla. 
        //Pista: tener en cuenta que el índice de cada vector es correspondiente 
        //al índice de los demás, es decir, los datos contenidos en el índice cero del vector de dni,
        //se corresponde con el índice cero del vector de nombres y el de apellidos.

        int vectordni[] = new int[3];
        String vectornombre[] = new String[3];
        String vectorapellido[] = new String[3];
        Scanner teclado = new Scanner(System.in);

        int contador;

        for (int i = 0; i < 3; i++) {
            contador = 0;
            System.out.println("Para el indice: " + i + ", por favor ingrese un DNI: ");
            vectordni[i] = teclado.nextInt();
            if (Integer.toString(vectordni[i]).length() != 8) {
                System.out.println("Por favor ingrese un DNI valido (8digitos)");
                contador = 1;
            }

            for (int ii = i; ii < 3;) {
                if (contador == 1) {
                    i--;
                    break;
                }
                System.out.println("Para el indice: " + ii + ", por favor ingrese un Nombre: ");
                vectornombre[ii] = teclado.nextLine();
                System.out.println("Para el indice: " + ii + ", por favor ingrese un Apellido: ");
                vectorapellido[ii] = teclado.nextLine();
                break;
            }
        }

        for (int i = 0; i < 3; i++) {
            System.out.println("Persona: " + i);
            System.out.println("DNI: " + vectordni[i]);
            System.out.println("Nombre y Apellido: " + vectornombre[i] + ", " + vectorapellido[i]);
        }

    }

    public void modulo6Ve4() {
        //MODULO 6, VECTORES EJERCICIO 4
        //En un vector de 23 posiciones se tienen las temperaturas máximas 
        //de las capitales de las 23 provincias argentinas en el último mes. 
        //A partir de esta información, un noticiero desea determinar el top 5 
        //de las temperaturas más altas para poder mostrar en la pantalla de su programa, 
        //para ello se necesita un programa que sea capaz de recorrer el vector de temperaturas, 
        //determinar las 5 más altas y copiarlas en un nuevo vector de 5 posiciones.

        int temperatura[] = new int[23];
        temperatura[0] = 20;
        temperatura[1] = 19;
        temperatura[2] = 30;
        temperatura[3] = 45;
        temperatura[4] = 32;
        temperatura[5] = 24;
        temperatura[6] = 14;
        temperatura[7] = 32;
        temperatura[8] = 20;
        temperatura[9] = 12;
        temperatura[10] = 10;
        temperatura[11] = 8;
        temperatura[12] = 34;
        temperatura[13] = 36;
        temperatura[14] = 40;
        temperatura[15] = 39;
        temperatura[16] = 26;
        temperatura[17] = 32;
        temperatura[18] = 14;
        temperatura[19] = 37;
        temperatura[20] = 21;
        temperatura[21] = 5;
        temperatura[22] = 27;
        //ordenar los numeros de menor a mayor
        Arrays.sort(temperatura);

        //las ultimas 5 temperaturas mas altas
        for (int i = 18; i < 23; i++) {
            System.out.println(temperatura[i]);
        }

        System.out.println("////////////////");
        //copiar de temperatura las ultimas 5 posiciones y pasarlas a un nuevo array -maxTemp[]-
        int[] maxTemp = Arrays.copyOfRange(temperatura, 18, 23);

        //forma de imprimir un array en consola
        System.out.println(Arrays.toString(maxTemp));
        System.out.println("---------------------");

    }

    public void modulo6Ve5() {
        //MODULO 6, VECTORES EJERCICIO 5
        //Se necesita un vector que permita cargar por teclado el nombre de 10 animales. 
        //A partir de esta carga, se desea otro vector que copie los mismos nombres pero
        //en el orden inverso, es decir, si los nombres son: perro, gato, lagartija, 
        //el nuevo vector debe contener: lagartija, gato, perro. Una vez realizado el cambio, 
        //mostrar por pantalla ambos vectores para compararlos.

        String[] vector = new String[10];
        String[] inverso = new String[10];
        Scanner teclado = new Scanner(System.in);

        for (int i = 0; i < 10; i++) {
            System.out.println("Ingrese un animal: ");
            vector[i] = teclado.nextLine();

        }
        //variable auxiliar en for
        for (int i = vector.length - 1, j = 0; i >= 0; i--, j++) {
            inverso[j] = vector[i];
        }
        System.out.println(Arrays.toString(vector));
        System.out.println(Arrays.toString(inverso));
    }
}
