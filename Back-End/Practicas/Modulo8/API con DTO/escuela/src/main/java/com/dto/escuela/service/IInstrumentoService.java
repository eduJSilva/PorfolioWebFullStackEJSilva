
package com.dto.escuela.service;

import com.dto.escuela.model.Instrumento;
import java.util.List;

public interface IInstrumentoService {
     public void nuevoInstrumento(Instrumento inst);
     public List <Instrumento> listarInstrumentos();
     public Instrumento traerInstrumento(String inst);
}
