package com.fechas.manejo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.fechas.manejo.Service.IFechasServicio;

@RestController
public class Fechascontroller {

    @Autowired
    IFechasServicio calcEdad;

    @GetMapping("/calcularedad/{dia}/{mes}/{anio}")
    @ResponseBody
    public String calcularEdad(@PathVariable int dia, @PathVariable int mes, @PathVariable int anio) {
        return "Si naciste el: "+ dia+"/"+mes+"/"+anio+", hoy tienes "+ calcEdad.calcularEdad(dia, mes, anio)+" años.";
    }

}
