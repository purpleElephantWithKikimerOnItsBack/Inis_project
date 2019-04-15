import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.File;
import java.io.IOException;

import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class MainServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException,
            ServletException {
        String requestURI = request.getRequestURI();
        ServletOutputStream out = response.getOutputStream();

        if (requestURI.equals("/status")) {
            out.println("<p style='color: red'>Application is running</p>");
        } else if (requestURI.equals("/get")) {
            String query = request.getQueryString();

            Pattern p = Pattern.compile("(\\w*)=(\\w*)");
            Matcher m = p.matcher(query);

            if (m.find()) {
                if (m.group(2).length() <= 100) {
                    out.println(String.format("%s is %s", m.group(1), m.group(2)));
                } else {
                    out.println("Your value is longer than 100 characters. Please, shorten it and try again");
                }
            } else {
                out.println("Something went wrong, please, check your request");
            }
        } else if (requestURI.equals("/page")) {
            Scanner s = new Scanner(
                    new File("D:\\Programming\\Projects\\Java\\Inis_project\\web\\WEB-INF\\page.html"));
            StringBuilder sb = new StringBuilder();
            while (s.hasNextLine()) {
                sb.append(s.nextLine());
            }
            s.close();

            out.println(sb.toString());
        } else if (requestURI.equals("/test1")){
            request.getRequestDispatcher("/status").forward(request, response);
        } else if (requestURI.equals("/test2")) {
            response.sendRedirect("/page");
        } else {
            out.println("da fuck");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String requestURI = request.getRequestURI();
        ServletOutputStream out = response.getOutputStream();

        if (requestURI.equals("/check")) {
            out.println("{\"success\": true}");
        } else {
            out.println("Invalid URL");
        }
    }
}