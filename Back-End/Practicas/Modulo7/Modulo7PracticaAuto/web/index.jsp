
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Practica Auto</title>
    </head>
    <body>
        <h1>Formulario Auto</h1>
        <form action="SvAuto" method="POST">
            <p><label>Placa: </label> <input type="text" name="placa"></p>
            <p><label>Patente: </label><input type="text" name="patente"></p>
            <p><label>Marca: </label><input type="text" name="marca"></p>
            <p><label>Modelo: </label> <input type="text" name="modelo"></p>
            <p><label>Color: </label><input type="text" name="color"></p>
            <p><label>Motor: </label><input type="text" name="motor"></p>
            <button type="submit">Enviar</button>   
        </form>
        
         <h1>Listado de Autos</h1>
         <form action="SvAuto" method="GET">
             <button type="submit">Ver Autos</button>
             
         </form>
    </body>
</html>
