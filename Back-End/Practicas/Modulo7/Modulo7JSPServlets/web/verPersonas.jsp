
<%@page import="java.util.List"%>
<%@page import="logica.Persona"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Ver Personas</title>
    </head>
    <body>
        <h1>Lista de Personas</h1>
        <%-->Utilizamos código Java para traer y recorrer la lista<--%>
        <% 
            List<Persona> listaPersonas = (List) request.getSession().getAttribute("listaPersonas");
            int cont=1;
        for (Persona per : listaPersonas) {        
            
        %>
        <p><b>Persona N°<%=cont%></b></p>
        <p><b>Dni: </b> <%=per.getDni()%></p>
        <p><b>Apellido: </b> <%=per.getApellido() %></p>
        <p><b>Nombre: </b> <%=per.getNombre()%></p>
        <p><b>Telefono: </b> <%=per.getTelefono()%></p>
        <p>----------------------------------------</p>
        <%-- Incremento el contador, para mostrar correctamente cada num de persona--%>
        <% cont++;%>
        <%}%>
        
    </body>
</html>
