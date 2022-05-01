
package logica;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import persistencia.ControladoraPersistencia;
import persistencia.exceptions.NonexistentEntityException;

public class Controladora {
    ControladoraPersistencia controlPersis = new ControladoraPersistencia();
    
     public void crearProducto(Producto prod) {
        controlPersis.crearProducto(prod);
    }
    
    public void eliminarProducto(int id) {
       controlPersis.eliminarProducto(id);
    }
    
    public void eliminarProducto(Producto prod) {
        controlPersis.eliminarProducto(prod);
    }
    
    public List<Producto> traerProductos() {
        return controlPersis.traerProductos();
    }
}
