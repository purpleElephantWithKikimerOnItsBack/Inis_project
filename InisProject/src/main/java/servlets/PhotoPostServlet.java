package servlets;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static model.PostCollection.postCollection;

public class PhotoPostServlet extends HttpServlet {
    // DELETE POST
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws
            IOException {
        String[] keyValue = request.getQueryString().split("=");
        if (keyValue[0].equals("id")) {
            response.getOutputStream().println(postCollection.remove(Integer.parseInt(keyValue[1])));
        }

    }

    // GET POST
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String[] keyValue = request.getQueryString().split("=");
        if (keyValue[0].equals("id")) {
            response.getOutputStream().println(
                    postCollection.get(Integer.parseInt(keyValue[1])));
        } else if (keyValue[0].equals("method") && keyValue[1].equals("generateId")) {
            response.getOutputStream().println(postCollection.generateId());
        }
    }

    // EDIT OR ADD POST
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String jsonPost = PhotoPostsServlet.readRequestBody(request);
        String query = request.getQueryString();
        ServletOutputStream out = response.getOutputStream();

        if (query.contains("edit")) {
            String[] params = query.split("&");
            for (String param: params) {
                if (param.contains("id")) {
                    String[] keyValue = param.split("=");
                    out.println(postCollection.edit(Integer.parseInt(keyValue[1]), jsonPost));

                    break;
                }
            }
        } else if (query.contains("add")){
            out.println(postCollection.add(jsonPost));
        }
    }
}
