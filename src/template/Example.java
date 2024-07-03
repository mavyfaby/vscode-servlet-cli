package {package};

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/example")
public class Example extends HttpServlet {
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        // Your code here
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        // Your code here
    }
}
