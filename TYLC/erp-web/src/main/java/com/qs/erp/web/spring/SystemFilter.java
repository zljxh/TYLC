package com.qs.erp.web.spring;

import com.qs.erp.webservices.common.ContextSession;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by xyyz150 on 2015/8/22.
 */
public class SystemFilter implements Filter {
    @Override
    public void destroy() {
        // TODO Auto-generated method stub
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = WebUtils.toHttp(request);
        if (!req.getRequestURI().startsWith("/TenantLogin")
                && !req.getRequestURI().startsWith("/ViewJSModels")
                && !req.getRequestURI().startsWith("/Content")
                && !req.getRequestURI().startsWith("/QSContent")
                && !req.getRequestURI().startsWith("/MyReport")
                && !req.getRequestURI().endsWith(".ico")) {
            if (!req.getMethod().equals("HEAD")) {
                if (ControllerContext.getSystemError()) {
                    WebUtils.toHttp(response).sendRedirect("/TenantLogin");
                    //WebUtils.toHttp(response).sendError(HttpServletResponse.SC_UNAUTHORIZED);
                    return;
                }
            }
        }
        // 将请求移交给下一下过滤器，如果还有的情况下。
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig config) throws ServletException {
    }
}
