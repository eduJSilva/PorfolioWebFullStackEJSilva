
package com.bazar.productos.controller;

import com.bazar.productos.model.ProductoModel;
import com.bazar.productos.service.IProductosService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductosController {
    @Autowired
    IProductosService prodServ;
    
    //Crear un nuevo producto
    @PostMapping("productos/crear")
    public String nuevoProducto(@RequestBody ProductoModel prod){
        prodServ.crearProducto(prod);
        return "El producto se cargó correctamente";
    }
    
    //Traer todos los productos
    @GetMapping("productos/traer")
    @ResponseBody
    public List<ProductoModel> traerProductos() {
        return prodServ.traerProductos();
    }
    
    //Traer un producto en particular
    @GetMapping("productos/traer/{id_producto}")
    @ResponseBody
    public ProductoModel traerUnProducto(@PathVariable Long id_producto) {
        return prodServ.traerUnProducto(id_producto);  
    }
    
    //Traer el producto mas barato
    @GetMapping("productos/traer/masbarato")
    @ResponseBody
    public ProductoModel  traerElProductoMasBarato() {
        return prodServ.traerProductoMasBarato();
    }
    
     //Traer el producto mas caro
    @GetMapping("productos/traer/mascaro")
    @ResponseBody
    public ProductoModel  traerElProductoMasCaro() {
        return prodServ.traerProductoMasCaro();
    }
    
    @GetMapping("productos/traer/ordenadosbaratoacaro")
    @ResponseBody
    public List<ProductoModel> traerOrdenadosBaratoCaro(){
        return prodServ.traerProductosOrdenadosBaratoCaro();
    }
    
       @GetMapping("productos/traer/ordenadoscaroabarato")
    @ResponseBody
    public List<ProductoModel> traerOrdenadosCaroBarato(){
        return prodServ.traerProductosOrdenadosCaroBarato();
    }
    
    
    //Borrar un producto
    @DeleteMapping("productos/eliminar/{id_producto}")
    public String eliminarProducto(@PathVariable Long id_producto){
        prodServ.eliminarProducto(id_producto);
        return "El producto se elimino correctamente";
    }
    
    //Editar un Producto
    
    //Mediante RequestParam
    @PutMapping("productos/editar/{id_producto}")
     public String editarProducto(@PathVariable Long id_producto, @RequestParam String nombre, @RequestParam double precio) {
        prodServ.editarProductoxParam(id_producto, nombre, precio);
        return "El producto con el id:"+ id_producto+", se editó correctamente";
    }
    
     //Mediante RequestBody
    @PutMapping("productos/editar")
     public String editarProductoxBody(@RequestBody ProductoModel prod) {             
        prodServ.editarProductoxBody(prod);
        return "El producto con el id:"+ prod.getId_producto()+", se editó correctamente";
    }
    
}
