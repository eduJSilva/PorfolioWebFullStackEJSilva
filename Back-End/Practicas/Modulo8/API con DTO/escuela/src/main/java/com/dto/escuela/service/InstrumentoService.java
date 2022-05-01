package com.dto.escuela.service;

import com.dto.escuela.model.Instrumento;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class InstrumentoService implements IInstrumentoService {

    List<Instrumento> listaInstrumentos = new ArrayList();

    @Override
    public void nuevoInstrumento(Instrumento inst) {
        listaInstrumentos.add(inst);
    }

    @Override
    public List<Instrumento> listarInstrumentos() {
        return listaInstrumentos;
    }

    @Override
    public Instrumento traerInstrumento(String inst) {

        Instrumento instrumento = null;
        for (Instrumento uninstrumento : listaInstrumentos) {
            if (uninstrumento.getNombre_instrumento().equals(inst)) {
                instrumento = uninstrumento;
            }

        }
        return instrumento;

    }
}
