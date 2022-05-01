
<%@page import="java.util.List"%>
<%@page import="logica.Auto"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Lista de Autos</title>
    </head>
    <body>
        <h1>Lista de Autos</h1>
        <%-->Utilizamos código Java para traer y recorrer la lista<--%>
        <% 
            List<Auto> listaAutos = (List) request.getSession().getAttribute("listaAutos");
            int cont=1;
        for (Auto aut : listaAutos) {        
            
        %>
         <p><b>Auto N°<%=cont%></b></p>
         <p><b>Placa: </b> <%=aut.getPlaca()%></p>
        <p><b>Patente: </b> <%=aut.getPatente()%></p>
        <p><b>Marca: </b> <%=aut.getMarca() %></p>
        <p><b>Modelo: </b> <%=aut.getModelo()%></p>
        <p><b>Color: </b> <%=aut.getColor()%></p>
         <p><b>Motor: </b> <%=aut.getMotor()%></p>
        <p>----------------------------------------</p>
        <%-- Incremento el contador, para mostrar correctamente cada num de autos--%>
        <% cont++;%>
        <%}%>
        
    </body>
  
</html>
