package main.servlets;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CheckServlet extends HttpServlet {
    private final String MESSAGE = "{\"success\": true}";

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws
            IOException {
        response.getOutputStream().println(MESSAGE);
    }
}
