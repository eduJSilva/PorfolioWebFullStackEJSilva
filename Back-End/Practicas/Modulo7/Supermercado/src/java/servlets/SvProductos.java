package servlets;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import logica.Controladora;
import logica.Producto;

@WebServlet(name = "SvProductos", urlPatterns = {"/SvProductos"})
public class SvProductos extends HttpServlet {
    Controladora control = new Controladora();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        
        List<Producto> listaProductos = control.traerProductos();
        
        HttpSession miSession = request.getSession();
        miSession.setAttribute("listaProductos", listaProductos);
        
        response.sendRedirect("verProductos.jsp");
        
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
        String producto = request.getParameter("producto");
        String nombre = request.getParameter("nombre");
        String precioc = request.getParameter("precioc");
        String preciov = request.getParameter("preciov");
        String stock = request.getParameter("stock");
        String categoria = request.getParameter("categoria");
        
        Producto prod = new Producto(0, producto, nombre, precioc, preciov,  stock, categoria);
        control.crearProducto(prod);
        
        response.sendRedirect("index.jsp");
        
    }

    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
