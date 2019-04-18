package servlets;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class StatusServlet extends HttpServlet {
    private final String APPLICATION_IS_RUNNING = "<p style='color: red'>Application is running</p>";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            IOException {
        response.getOutputStream().println(APPLICATION_IS_RUNNING);
    }
}
