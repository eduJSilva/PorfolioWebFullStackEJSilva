/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.yoprogramo.pruebasmodulo6;

/**
 *
 * @author Tenga
 */
public class MiHelper {

    MiHelper() {

    }

    public void validarDivision(int num1, int num2, double resultado) throws CustomExceptions {
        if (num1 == num2) {
            throw new CustomExceptions("si divides por el mismo numero te da siempre 1!!!");
        }

        if (num2 > num1) {
            throw new CustomExceptions("El divisor es mayor que el dividendo!!!");
        }
       
    }
}
