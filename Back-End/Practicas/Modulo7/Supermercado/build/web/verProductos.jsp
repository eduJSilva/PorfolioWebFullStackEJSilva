
<%@page import="java.util.List"%>
<%@page import="logica.Producto"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Ver Productos</title>
    </head>
    <body>
        <h1>Lista de Productos</h1>
        <%-->Utilizamos código Java para traer y recorrer la lista<--%>
        <%
            List<Producto> listaProductos = (List) request.getSession().getAttribute("listaProductos");
            int cont = 1;
            for (Producto pro : listaProductos) {

        %>
        <p><b>Producto N°<%=cont%></b></p>
        <p><b>Id N°<%=pro.getId()%></b></p>
        <p><b>Producto: </b> <%=pro.getProducto()%></p>
        <p><b>Nombre: </b> <%=pro.getNombre()%></p>
        <p><b>Precio de Costo: </b> <%=pro.getPrecioc()%></p>
        <p><b>Precio de Venta: </b> <%=pro.getPreciov()%></p>
        <p><b>Stock: </b> <%=pro.getStock()%></p>
        <p><b>Categoria: </b> <%=pro.getCategoria()%></p>
        <p>----------------------------------------</p>
        <%-- Incremento el contador, para mostrar correctamente cada num de persona--%>
        <% cont++;%>
        <%}%>

    </body>
</html>
