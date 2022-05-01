
package com.bazar.productos.service;

import com.bazar.productos.model.ProductoModel;
import java.util.List;

public interface IProductosService {
    public void crearProducto(ProductoModel prod);
    public List <ProductoModel> traerProductos();
    public void eliminarProducto(Long id_producto);
    public void editarProductoxParam(Long id_producto, String nombre, double precio);
    public void editarProductoxBody(ProductoModel prod);
    public ProductoModel traerUnProducto(Long id_producto);
    public ProductoModel  traerProductoMasBarato();
    public ProductoModel traerProductoMasCaro();
    public  List <ProductoModel> traerProductosOrdenadosBaratoCaro();
    public  List <ProductoModel> traerProductosOrdenadosCaroBarato();

}
