package com.fechas.manejo.Service;

import java.time.LocalDate;
import java.time.Period;
import org.springframework.stereotype.Service;

@Service
public class FechasServicio implements IFechasServicio {

    @Override
    public int calcularEdad(int dia, int mes, int anio) {
        Period edad = Period.between(LocalDate.of(anio, mes, dia), LocalDate.now());
        return edad.getYears();
    }

}
