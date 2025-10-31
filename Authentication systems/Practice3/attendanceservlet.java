(AttendanceServlet.java)
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class AttendanceServlet extends HttpServlet {

    private final String JDBC_URL = "jdbc:mysql://localhost:3306/yourDB";
    private final String DB_USER = "root";
    private final String DB_PASS = "password";

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String studentId = request.getParameter("studentId");
        String date = request.getParameter("date");
        String status = request.getParameter("status");

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(JDBC_URL, DB_USER, DB_PASS);
            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO Attendance(StudentID, Date, Status) VALUES (?, ?, ?)"
            );
            ps.setString(1, studentId);
            ps.setString(2, date);
            ps.setString(3, status);
            int result = ps.executeUpdate();

            if(result > 0) {
                out.println("<h3>Attendance Recorded Successfully!</h3>");
            } else {
                out.println("<h3>Error Recording Attendance!</h3>");
            }
            con.close();
        } catch(Exception e) {
            out.println("Error: " + e.getMessage());
        }
    }
}
