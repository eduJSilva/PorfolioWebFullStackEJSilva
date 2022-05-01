package com.temperatura.conversor.Controller;

import com.temperatura.conversor.Service.IConversorServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Tempcontroller {

    @Autowired
    IConversorServicio conServ;
    
    @GetMapping("/fahrenheit/{temp}")
    @ResponseBody
    public String mostrarCelsius(@PathVariable Double temp){
                                                                            //Redondea a 2 decimales
        return temp + " Grado Fahrenheit = " + String.format("%.2f", conServ.convertirTemp(temp))+ " Grado Celsius";             
    }
    
}
