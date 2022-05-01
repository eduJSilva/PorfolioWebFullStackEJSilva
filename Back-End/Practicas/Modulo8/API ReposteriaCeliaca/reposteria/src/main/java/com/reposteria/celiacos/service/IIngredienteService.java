
package com.reposteria.celiacos.service;

import com.reposteria.celiacos.model.Ingrediente;
import java.util.List;

public interface IIngredienteService {
     public void agregarIngrediente(Ingrediente ingrediente);
     public List<Ingrediente> verIngredientes();
      public List<Ingrediente> verIngredientessGluten();
       public List<Ingrediente> verIngredientescGluten();
}
