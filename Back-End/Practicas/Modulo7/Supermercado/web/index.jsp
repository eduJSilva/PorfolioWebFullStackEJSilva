
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="./supercss.css" type="text/css" media="all" />
        <title>Super Pagina</title>
    </head>
    <body>
        <h1>Datos del Producto</h1>
        <form action="SvProductos" method="POST">
            <p><label>Producto: </label><input type="text" name="producto"></p>
            <p><label>Nombre: </label><input type="text" name="nombre"></p>
            <p><label>Precio de costo: </label><input type="text" name="precioc"></p>
            <p><label>Precio de venta: </label><input type="text" name="preciov"></p>
            <p><label>Stock: </label><input type="text" name="stock"></p>
            <p><label>Categoria: </label><input type="text" name="categoria"></p>
            <button type="submit">Cargar producto</button>         
        </form>
        <h1>Mostrar todos los productos</h1>    
        <form action="SvProductos" method="GET">
            <button type="submit">Mostrar Productos</button>        
        </form>

    </form>
    <h1>Eliminar producto</h1>  
     <p>Ingrese el Id del producto a eliminar</p>
     <form action="SvEliminar" method="POST">
        <p><label>Id: </label><input type="text" name="id_eliminar"></p>
        <button type="submit">Eliminar</button>        
    </form>
    
</body>
</html>
