import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class LoginServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();
        
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        
        // Hardcoded credentials (for demo purposes)
        if(username.equals("admin") && password.equals("admin123")) {
            out.println("<h2>Welcome, " + username + "!</h2>");
        } else {
            out.println("<h2>Invalid username or password!</h2>");
        }
    }
}


request.getParameter() retrieves form data.

PrintWriter generates dynamic HTML response.

Simple POST form submission and validation.
