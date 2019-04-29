package servlets;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class StaticPageServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            IOException, ServletException {
        if (request.getQueryString() != null) {
            request.getRequestDispatcher("/WEB-INF/page.html").forward(request, response);
        }
    }
}
