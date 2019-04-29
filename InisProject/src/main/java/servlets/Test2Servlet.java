package servlets;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Test2Servlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            IOException {
        String query = request.getQueryString();
        if (query != null) {
            response.sendRedirect(String.format("/page?%s", query));
        }
    }
}
