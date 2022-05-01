package com.reposteria.celiacos.service;

import com.reposteria.celiacos.model.Ingrediente;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class IngredienteService implements IIngredienteService {

    List<Ingrediente> listadoIngredientes = new ArrayList();
    List<Ingrediente> sinGluten = new ArrayList();
    List<Ingrediente> conGluten = new ArrayList();

    @Override
    public void agregarIngrediente(Ingrediente ingrediente) {
        listadoIngredientes.add(ingrediente);
    }

    @Override
    public List<Ingrediente> verIngredientes() {
        return listadoIngredientes;
    }

    @Override
    public List<Ingrediente> verIngredientessGluten() {
        for (Ingrediente unIngrediente : listadoIngredientes) {
            if (!unIngrediente.isGluten()) {
                sinGluten.add(unIngrediente);

            }
        }
        return sinGluten;
    }

    @Override
    public List<Ingrediente> verIngredientescGluten() {
        for (Ingrediente unIngrediente : listadoIngredientes) {
            if (unIngrediente.isGluten()) {
                conGluten.add(unIngrediente);

            }
        }
        return conGluten;
    }

}
