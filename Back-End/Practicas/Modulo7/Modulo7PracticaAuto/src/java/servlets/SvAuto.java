
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
import logica.Auto;


@WebServlet(name = "SvAuto", urlPatterns = {"/SvAuto"})
public class SvAuto extends HttpServlet {
    
 //esta ArrayList va aca para que la use tanto el medoto doGet como el doPost   
 List<Auto> listaAutos = new ArrayList <>();
    
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        
        HttpSession miSession = request.getSession();
        miSession.setAttribute("listaAutos", listaAutos);
        
        //redirección a otro JSP
        response.sendRedirect("verAutos.jsp");
    }

   
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        
        String placa = request.getParameter("placa");
        String patente = request.getParameter("patente");
        String marca = request.getParameter("marca");
        String modelo = request.getParameter("modelo");
        String color = request.getParameter("color");
        String motor = request.getParameter("motor");
        
        Auto auto1 = new Auto(1, placa, patente, marca, modelo, color, motor);
      
       listaAutos.add(auto1);
        
        response.sendRedirect("index.jsp");
    }

   
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
