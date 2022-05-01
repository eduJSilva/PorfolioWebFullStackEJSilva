
package com.temperatura.conversor.Service;

import org.springframework.stereotype.Service;

@Service
public class ConversorServicio implements IConversorServicio {

    @Override
    public double convertirTemp(double fahrenheit) {     
       return (fahrenheit - 32) * 5/9;
    }
    
}
