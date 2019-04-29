package servlets;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GetParametersServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            IOException {
        String query = request.getQueryString();

        Pattern p = Pattern.compile("(\\w+)=(\\w+)");
        Matcher m = p.matcher(query);

        ServletOutputStream out = response.getOutputStream();
        if (m.find()) {
            if (m.group(2).length() <= 100) {
                out.println(String.format("%s is %s", m.group(1), m.group(2)));
            } else {
                out.println("Your parameter value is longer than 100 characters. " +
                        "Please, try again.");
            }
        } else {
            out.println("No parameters.");
        }
    }
}
