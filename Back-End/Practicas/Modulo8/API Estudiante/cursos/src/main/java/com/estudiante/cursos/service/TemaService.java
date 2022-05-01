
package com.estudiante.cursos.service;

import com.estudiante.cursos.model.Tema;
import com.estudiante.cursos.repository.ITemaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TemaService implements ITemaService {
    @Autowired
    ITemaRepository temRep;

    @Override
    public void crearTema(Tema tem) {
        temRep.save(tem);
    }

    @Override
    public List<Tema> traerTemas() {
        return temRep.findAll();
    }

    @Override
    public void modificarTema(Long id_tema, String nombre, String descripcion) {
              Tema tema_editado = temRep.findById(id_tema).orElse(null);
       tema_editado.setNombre(nombre);
       tema_editado.setDescripcion(descripcion);
       temRep.save(tema_editado);
    }

    @Override
    public void modificarTema1(Tema tem) {
        temRep.save(tem);
    }

    @Override
    public void borrarTema(Long id) {
        temRep.deleteById(id);
    }

    @Override
    public Tema traerunTema(Long id) {    
     return temRep.findById(id).orElse(null);
 
    }
}
