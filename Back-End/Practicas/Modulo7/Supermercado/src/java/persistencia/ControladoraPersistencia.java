
package persistencia;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import logica.Producto;
import persistencia.exceptions.NonexistentEntityException;


public class ControladoraPersistencia {
    ProductoJpaController productoJpa = new ProductoJpaController(); 
    
    public void crearProducto(Producto prod) {
        productoJpa.create(prod);
    }
    
    public void eliminarProducto(int id) {
        try {
            productoJpa.destroy(id);
        } catch (NonexistentEntityException ex) {
            Logger.getLogger(ControladoraPersistencia.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public void eliminarProducto(Producto prod) {
        try {
            productoJpa.destroy(prod.getId());
        } catch (NonexistentEntityException ex) {
            Logger.getLogger(ControladoraPersistencia.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    public List<Producto> traerProductos() {
        return productoJpa.findProductoEntities();
    }
    
    
}
