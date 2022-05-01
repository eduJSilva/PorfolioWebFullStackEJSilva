package com.restaurant.platos.service;

import com.restaurant.platos.model.Plato;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PlatoService implements IPlatoService {

     List <Plato> listadoPlatos = new ArrayList();
    
    @Override
    public void agregarPlato(Plato plato) {      
        listadoPlatos.add(plato);
    }

    @Override
    public Plato mostrarPlato(int  id_plato) {
              return listadoPlatos.get(id_plato -1);
    }
}
