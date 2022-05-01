OK1.Crear un archivo JSP llamado “autos.jsp”. En él incluir un formulario html que permite la carga de los datos 
    de un auto: placa/patente, marca, modelo, color y tipo de motor. 
    Incluir en el formulario un botón de submit que redireccione a un servlet llamado “SvAutos” 
    y pase los datos mediante el método POST.

OK2.A partir del ejercicio 1, crear el servlet “SvAutos”. 
    Luego, configurar el método doPost() para que reciba los parámetros necesarios. 
    A partir de esto, crear un nuevo objeto de tipo Auto 
    y agregarlo a una Lista de tipo Collection a elección.

OK3.Una vez realizados los ejercicios 1 y 2, agregar a “autos.jsp” un nuevo apartado que permita 
  la visualización de todos los autos que hayan sido cargados anteriormente en una lista. 
  En este nuevo apartado, incluir un botón “Ver Autos” a partir del cual se haga llamado 
  mediante el método GET al servlet “SvAutos”.

OK4.Una vez finalizado el ejercicio 3, configurar en “SvAutos” el método doGet() para recibir la petición desde el JSP. 
  Organizar en el la lista con todos los autos cargados anteriormente, setear la misma en la sesión 
  y redireccionar hacia un nuevo JSP llamado “mostrarAutos.jsp”.

OKCrear un JSP “mostrarAutos.jsp” que reciba, a partir de la redirección de “SvAutos” 
una lista de autos y la muestre por pantalla. Organizar la información a mostrar 
de la mejor manera que se considere para el usuario. Por ejemplo: tablas, listas, etc
