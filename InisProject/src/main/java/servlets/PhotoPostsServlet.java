package servlets;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Scanner;

import static model.PostCollection.postCollection;

public class PhotoPostsServlet extends HttpServlet {
    public static String readRequestBody(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        try (Scanner s = new Scanner(request.getReader())) {
            while (s.hasNextLine()) {
                sb.append(s.nextLine()).append('\n');
            }
        }

        return sb.toString();
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws
            IOException {
        String[] parameters = request.getQueryString().split("&");

        int start = 0;
        int count = 10;

        for (String parameter: parameters) {
            String[] keyValue = parameter.split("=");

            if (keyValue[1].equals("filter")) {
                response.getOutputStream()
                        .println(postCollection.filter(readRequestBody(request)).toString());

                return;
            } else {
                if (keyValue[0].equals("start")) {
                    start = Integer.parseInt(keyValue[1]);
                } else {
                    count = Integer.parseInt(keyValue[1]);
                }
            }

        }
        response.getOutputStream().println(
                postCollection.getPage(start, count, readRequestBody(request)).toString());
    }

    // COUNT BY FILTER
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.getOutputStream()
                .println(postCollection.filter(readRequestBody(request)).toString());
    }

}
