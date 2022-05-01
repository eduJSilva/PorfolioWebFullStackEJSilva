package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import logica.Controladora;
import logica.Persona;

@WebServlet(name = "SvPersona", urlPatterns = {"/SvPersona"})
public class SvPersona extends HttpServlet {

    Controladora control = new Controladora();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
//---------------------------------------------------------------------------------------
        //Podemos simular una lista de Personas
        List<Persona> listaPersonas1 = new ArrayList<>();
        listaPersonas1.add(new Persona(1, "12545650", "Carlos", "Perez", "45654654"));
        listaPersonas1.add(new Persona(2, "14545659", "Hector", "Rojas", "44565491"));
        listaPersonas1.add(new Persona(3, "87875658", "Cintia", "Fernandez", "7846548"));
        
        //o traer los datos de la base de datos
        List<Persona> listaPersonas = control.traerPersonas();
//-----------------------------------------------------------------------------------------
        
        //seteamos la lista de personas como un parámetro
        //para poder utilizar en cualquier JSP
        //para eso traemos la sesión de la request
        HttpSession miSession = request.getSession();
        miSession.setAttribute("listaPersonas", listaPersonas);
        //miSession.setAttribute("listaPersonas", listaPersonas1);

        //redirección a otro JSP
        response.sendRedirect("verPersonas.jsp");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //Traemos los datos enviados en la request
        //y los guardamos en variables auxiliares.
        //El nombre en getParameter debe ser el mismo que en el input del form de la JSP
        String dni = request.getParameter("dni");
        String nombre = request.getParameter("nombre");
        String apellido = request.getParameter("apellido");
        String telefono = request.getParameter("telefono");

        Persona pers = new Persona(0, dni, nombre, apellido, telefono);
        control.crearPersona(pers);

        response.sendRedirect("index.jsp");
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
