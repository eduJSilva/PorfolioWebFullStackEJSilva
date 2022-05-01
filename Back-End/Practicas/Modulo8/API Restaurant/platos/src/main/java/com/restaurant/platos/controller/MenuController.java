
package com.restaurant.platos.controller;

import com.restaurant.platos.model.Plato;
import com.restaurant.platos.service.IPlatoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MenuController  {
    @Autowired
    private IPlatoService platoServ;
    
   @PostMapping("/new/plato")
    public String cargarPlato( @RequestBody Plato plato) {
        platoServ.agregarPlato(plato);
        return "El plato fue cargado al menú correctamente";
    }
    
    @GetMapping("/plato/{id_plato}")
    @ResponseBody
    public Plato mostrarPlato(@PathVariable int id_plato){   
        return platoServ.mostrarPlato(id_plato);
        
    }
}
