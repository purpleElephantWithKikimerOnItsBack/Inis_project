import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class InfoFilter implements Filter {
    private FilterConfig filterConfig = null;

    @Override
    public void init(FilterConfig filterConfig) {
        this.filterConfig = filterConfig;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
        throws IOException, ServletException {
        HttpServletRequest hReq = (HttpServletRequest)request;
        HttpServletResponse hRes = (HttpServletResponse)response;

        long start = System.nanoTime();
        filterChain.doFilter(request, response);
        long end = System.nanoTime();

        /*
            Я пытался вписать атрибуты в URL, чтобы строка выглядела таким образом:
                localhost:8080/status?methodType=get&time=nms
            Но я совершенно не понял, работает ли этот фильтр в принципе.
            У меня не получилось ни вывести на экран из него, ни изменить как-то URL,
            ни перенаправить на другой URL.
            Поэтому я отчаялся и решил написать этот комментарий, чтобы завтра придти на пару
            и, посмотрев сюда, спросить эти тупорылые вопросы. Потому что, вроде бы, в хмл
            все подключено нормально, но я не могу никак отследить работу этого класса, потому что
            у меня не вышло даже вывести ничего. Поэтому я расстроен. А это значит, что я пойду пить
            чай и плакать в одиночестве.
         */
    }

    @Override
    public void destroy() {
        filterConfig = null;
    }
}
