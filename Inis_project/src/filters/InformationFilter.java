package filters;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class InformationFilter implements Filter {
    private final String QUESTION_MARK = "?";
    private final String AMPERSAND = "&";

    @Override
    public void init(FilterConfig config) {}

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws
            IOException, ServletException {
        HttpServletRequest hreq = (HttpServletRequest)request;
        HttpServletResponse hres = (HttpServletResponse)response;

        String query = hreq.getQueryString();
        if (query == null || !query.contains("methodType")) {
            long start = System.nanoTime();
            chain.doFilter(request, response);
            long end = System.nanoTime();

            StringBuilder newURL = new StringBuilder(hreq.getRequestURL());
            newURL.append(QUESTION_MARK);
            if (query != null && !query.isEmpty()) {
                newURL.append(query);
                newURL.append(AMPERSAND);
            }
            newURL.append(String.format("methodType=%s&time=%s", hreq.getMethod(),
                    Long.toString(end - start)));

            hres.sendRedirect(newURL.toString());
        } else {
            chain.doFilter(request, response);
        }
    }

    @Override
    public void destroy() {}
}
