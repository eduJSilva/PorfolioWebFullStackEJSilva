package com.bazar.productos.service;

import com.bazar.productos.model.ProductoModel;
import com.bazar.productos.repository.ProductoRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductosService implements IProductosService {


    @Autowired
    ProductoRepository prodRep;

    @Override
    public void crearProducto(ProductoModel prod) {
        prodRep.save(prod);
    }

    @Override
    public List<ProductoModel> traerProductos() {
        return prodRep.findAll();
    }

    @Override
    public ProductoModel traerUnProducto(Long id_producto) {
        ProductoModel producto = prodRep.findById(id_producto).orElse(null);
        return producto;
    }

    @Override
    public ProductoModel traerProductoMasBarato() {
        ProductoModel prodBarato = new ProductoModel();
        prodBarato.setPrecio(10000000);
        List<ProductoModel> listaProductos = prodRep.findAll();
        for (ProductoModel unProducto : listaProductos) {
            double precioBarato = Math.min(prodBarato.getPrecio(), unProducto.getPrecio());
            if (unProducto.getPrecio() == precioBarato) {
                prodBarato = unProducto;
            }
        }
        return prodBarato;
    }

    @Override
    public ProductoModel traerProductoMasCaro() {
        ProductoModel prodCaro = new ProductoModel();
        List<ProductoModel> listaProductos = prodRep.findAll();
        for (ProductoModel unProducto : listaProductos) {
            double precioCaro = Math.max(prodCaro.getPrecio(), unProducto.getPrecio());
            if (unProducto.getPrecio() == precioCaro) {
                prodCaro = unProducto;
            }
        }
        return prodCaro;
    }

    @Override
    public List<ProductoModel> traerProductosOrdenadosBaratoCaro() {
         List<ProductoModel> listaProductos = prodRep.findAll(Sort.by(Sort.Direction.ASC, "precio"));
        return listaProductos;
    }

    @Override
    public List<ProductoModel> traerProductosOrdenadosCaroBarato() {
         List<ProductoModel> listaProductos = prodRep.findAll(Sort.by(Sort.Direction.DESC, "precio"));
        return listaProductos;
    }

    @Override
    public void eliminarProducto(Long id_producto) {
        prodRep.deleteById(id_producto);
    }

    @Override
    public void editarProductoxParam(Long id_producto, String nombre, double precio) {
        ProductoModel producto_editar = traerUnProducto(id_producto);
        producto_editar.setNombre(nombre);
        producto_editar.setPrecio(precio);
        prodRep.save(producto_editar);
    }

    @Override
    public void editarProductoxBody(ProductoModel prod) {
        prodRep.save(prod);
    }

}
