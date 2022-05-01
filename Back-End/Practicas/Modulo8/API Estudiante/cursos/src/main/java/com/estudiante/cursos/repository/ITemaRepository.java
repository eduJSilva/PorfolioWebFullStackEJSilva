
package com.estudiante.cursos.repository;

import com.estudiante.cursos.model.Tema;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITemaRepository extends JpaRepository<Tema, Long> {
    
}
