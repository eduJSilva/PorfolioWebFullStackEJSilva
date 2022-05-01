
package com.reposteria.celiacos.controller;

import com.reposteria.celiacos.model.Ingrediente;
import com.reposteria.celiacos.service.IIngredienteService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MenuController  {
    @Autowired
    private IIngredienteService ingreServ;
    
   @PostMapping("/new/ingrediente")
    public String cargarIngrediente( @RequestBody Ingrediente ingrediente) {
        ingreServ.agregarIngrediente(ingrediente);
        return "El ingrediente fue cargado a  la lista correctamente";
    }
    
        //GetMapping
    @GetMapping("/ver/ingredientes")
    @ResponseBody
    public List<Ingrediente> verIngredientes() {
        return ingreServ.verIngredientes();
    }
    
      //GetMapping
    @GetMapping("/ver/ingredientessgluten")
    @ResponseBody
    public List<Ingrediente> verIngredientessGluten() {
        return ingreServ.verIngredientessGluten();
    }
    
      //GetMapping
    @GetMapping("/ver/ingredientescgluten")
    @ResponseBody
    public List<Ingrediente> verIngredientescGluten() {
        return ingreServ.verIngredientescGluten();
    }
    
}
