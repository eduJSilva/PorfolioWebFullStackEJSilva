
package com.yoprogramo.pruebasmodulo6;

import java.util.Arrays;
import java.util.Scanner;
import java.util.Collections;

public class Modulo6Matrices {

    public void modulo6Ma1() {
        /*
        Una matriz de 5 filas x 3 columnas almacena el total de goles de 5 jugadores de futbol 
        en los últimos 3 partidos que jugaron, donde cada fila representa a un jugador 
        y cada columna a la cantidad de goles que hizo. Se necesita un programa que sea capaz de permitir 
        la carga de los goles, calcular el promedio de goles realizado por cada jugador 
        y almacenar el resultado en un vector de 5 posiciones, donde cada posición representará a un jugador. 
        Tener en cuenta el siguiente diagrama para llevar a cabo el planteo:
        Nota: tener en cuenta que el promedio de goles puede dar como resultado un número que NO SEA ENTERO.
         */

        int[][] goles = new int[5][3];

        Scanner teclado = new Scanner(System.in);

        String[] jugador = new String[5];
        jugador[0] = "Pacheco";
        jugador[1] = "Messi";
        jugador[2] = "Barco";
        jugador[3] = "Bustos";
        jugador[4] = "Aguero";

        double sumaGoles = 0.0;
        double[] promGoles = new double[5];

        for (int f = 0; f < 5; f++) {
            for (int c = 0; c < 3; c++) {
                System.out.println("Por favor ingrese los goles del partido " + (c + 1) + ", de " + jugador[f] + ": ");
                goles[f][c] = teclado.nextInt();
                sumaGoles += (goles[f][c]);

            }
            promGoles[f] = sumaGoles / 3;
            sumaGoles = 0.0;

        }
        System.out.println("////////////////////////////////////////////");
        for (int f = 0; f < 5; f++) {
            for (int c = 0; c < 3; c++) {
                System.out.println(jugador[f] + ", metió " + goles[f][c] + ((goles[f][c] == 1) ? " gol" : " goles") + " en el partido Nº " + (c + 1));
            }
            System.out.printf("Promedio: %.2f", promGoles[f]);
            System.out.println("");
            System.out.println("");
        }

    }

    public void modulo6Ma2() {
        /*
        Una escuela primaria utiliza una matriz para calcular los promedios de sus alumnos. 
        Para ello tienen una matriz de 10 filas, donde cada fila representa a un alumno y 4 columnas. 
        Las primeras 3 columnas representan las notas de cada uno de los alumnos, 
        mientras que la 4 es el promedio de las mismas. Se desea un programa que sea capaz de 
        permitir la carga por teclado de las 3 notas de cada alumno, de realizar el cálculo automático del promedio, 
        de guardar el mismo en la 4 columna y luego mostrar por pantalla cada una de las notas 
        y el promedio obtenido. Por ejemplo.
        Nota: tener en cuenta que generalmente las calificaciones y los promedios 
        no suelen ser números enteros, sino que pueden tener decimales.
         */

        // double [][] matriz = new double[10][4];
        double[][] matriz = new double[10][4];
        double sumar = 0.0;
        Scanner teclado = new Scanner(System.in);

        for (int f = 0; f < 10; f++) {
            for (int c = 0; c < 3; c++) {
                System.out.println("Ingrese la " + (c + 1) + " nota del alúmno " + (f + 1));
                matriz[f][c] = teclado.nextDouble();
                sumar += matriz[f][c];

            }
            matriz[f][3] = sumar / 3;
            sumar = 0.0;
        }
        System.out.println("////////////////////////////////////////////");
        for (int f = 0; f < 10; f++) {
            for (int c = 0; c < 3; c++) {
                System.out.println("La nota Nº" + (c + 1) + " del alumno Nº" + (f + 1) + " es: " + matriz[f][c]);
            }
            System.out.printf("Promedio: %.2f", matriz[f][3]);
            System.out.println("");
            System.out.println("");
        }

    }

    public void modulo6Ma3() {
        /*
        Se desea un programa que sea capaz de rellenar completamente con números 1 una matriz de 4 x 4 
        a excepción de su diagonal principal, la cual debe ser rellenada con números 0. 
        Una vez realizada la carga, se desea mostrar la matriz de forma ordenada por pantalla. 
        Tener como ejemplo la matriz que se presenta a continuación. 
         */

        int[][] matriz = new int[4][4];

        for (int f = 0; f < 4; f++) {
            for (int c = f; c < 4; c++) {
                matriz[f][c] = 1;
                break;
            }
        }

        for (int f = 0; f < 4; f++) {
            System.out.println("Fila:" + f + " " + Arrays.toString(matriz[f]));
        }

    }

    @SuppressWarnings("StringEquality")
    public void modulo6Ma4() {
        /*
        Una casa de comida rápida utiliza una matriz de 20 filas y 5 columnas para determinar cada plato del menú 
        y sus correspondientes ingredientes que contiene. Para ello, cada fila representa un plato principal 
        en donde en la primera columna se especifica su nombre (por ejemplo: Milanesa), 
        y en las demás los posibles acompañamientos que puede tener el plato 
        (por ejemplo, puré, ensalada rusa, papas fritas, ensalada de lechuga y tomate, ensalada de zanahoria, etc). 
        En caso de que tenga el plato menos de 4 tipos de acompañamiento, 
        en la matriz se cargará la palabra Ninguno en las posiciones que queden vacías.
        Se desea un programa que sea capaz de permitir la carga de la matriz, de buscar un plato en particular 
        que un cliente ingrese por teclado y mostrarle de forma automática los posibles acompañamientos del mismo. 
         */
        String[][] matriz = new String[20][5];
        Scanner teclado = new Scanner(System.in);

        // Carga de los platos principales y sus acompañamientos
        for (int f = 0; f < 20; f++) {
            for (int c = 0; c < 5; c++) {
                if (matriz[f][0] != null) {
                    System.out.println("Cargue el acompañamiento Nº" + c + " para " + matriz[f][0]);
                    matriz[f][c] = teclado.nextLine();
                    if (matriz[f][c] == "") {
                        matriz[f][c] = "Ninguno";
                    }
                    continue;
                }
                System.out.println("Cargue el plato principal Nº" + (f + 1));
                matriz[f][c] = teclado.nextLine();
            }
        }

        // Muestra los platos principales
        System.out.println("");
        System.out.println("#########################");
        System.out.println("#Menú del día: ");
        for (int p = 0; p < 20; p++) {
            if (matriz[p][0] != "") {
                System.out.println("*" + matriz[p][0]);
            }
        }
        System.out.println("#########################");
        System.out.println("");

//---------------------------------------------------------------------------------------
        //deja consultar 5 platos del menú
        for (int i = 0; i < 5; i++) {

            //El usuario ingresa el plato a consultar
            System.out.println("Ingrese el plato a consultar: ");
            String plato = teclado.nextLine();

            //Busca en el primer valor ingresado en cada una de las filas(plato) y trae sus acompañamiento, si
            //coincide con el plato ingresado arriba por el usuario.
            for (int f = 0; f < 20; f++) {
                for (int c = 1; c < 5; c++) {

                    if (matriz[f][0].equals(plato)) {
                        System.out.println(matriz[f][c]);
                    }
                }
            }
        }
    }

    public void modulo6Ma5() {
        /*
        Una empresa constructora desea llevar a cabo un premio para sus obreros que hayan realizado horas extras 
        en los últimos 6 meses. Para ello, lleva una matriz de control de 15 filas x 6 columnas, 
        donde cada fila corresponde a un empleado distinto y donde cada columna representa 
        el total de horas trabajadas por mes. El monto de horas normal trabajado x mes es de 8 horas diarias, 
        5 días a la semana, 4 semanas por mes, es decir: 160 horas. Todo monto superior a este es considerado 
        como horas extras.
        Se desea un programa que permita la carga de horas trabajadas por cada obrero y que sea capaz de 
        determinar aquellos que hayan realizado horas extras. Para registrar las horas extras realizadas 
        se utilizará un vector de 15 posiciones en donde se deberá calcular y almacenar 
        la cantidad de horas extras de cada obrero. En caso de que no haya realizado horas extras, 
        deberá incluirse un número 0. Tomar como ejemplo la siguiente imagen:
         */
        int[][] matriz = new int[15][6];
        int[] vector = new int[15];

        Scanner teclado = new Scanner(System.in);

        for (int f = 0; f < 15; f++) {
            for (int c = 0; c < 6; c++) {
                System.out.println("Por favor ingrese las horas trabajadas del obrero Nro." + (f + 1) + ", correspondiente al mes: " + (c + 1));
                matriz[f][c] = teclado.nextInt();
            }
        }

        //cargar horas extras al vector
        for (int f = 0; f < 15; f++) {
            for (int c = 0; c < 6; c++) {
                if (matriz[f][c] > 160) {
                    vector[f] += (matriz[f][c] - 160);
                };
                if (matriz[f][c] <=160) {
                    vector[f] += 0;
                };
            }
        }
         for (int i = 0; i < 15; i++) {
             System.out.println("El trabajador Nro." + (i+1)+ ", realizó "+ vector[i]+" horas extras en los ultimos 6 meses.");
        }
    }
}
