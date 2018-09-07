package com.ty.erp.web.spring;


import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by admin on 2015/4/16.
 */
public class EncodingFilter implements Filter {

    private String charset;
    @Override
    public void destroy() {
        // TODO Auto-generated method stub
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {
        //用init方法取得的charset覆盖被拦截下来的request对象的charset
        request.setCharacterEncoding(this.charset);

        //将请求移交给下一下过滤器，如果还有的情况下。
        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig config) throws ServletException {
        //从web.xml中的filter的配制信息中取得字符集
        this.charset = config.getInitParameter("charset");
    }
}