package com.dto.escuela.service;

import com.dto.escuela.dto.AlumsxInstruDTO;
import java.util.List;

public interface IDtoService {

    public List<AlumsxInstruDTO> traer_Alumnos_toquen_unInstrumento(String nombre_instrum);
}
