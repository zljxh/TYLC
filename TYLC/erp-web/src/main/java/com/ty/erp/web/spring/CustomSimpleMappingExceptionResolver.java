package com.ty.erp.web.spring;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ty.erp.services.common.MyLogger;
import com.ty.erp.utils.util.ExceptionHelp;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
public class CustomSimpleMappingExceptionResolver extends  SimpleMappingExceptionResolver {
    @Override
    protected ModelAndView doResolveException(HttpServletRequest request,
                                              HttpServletResponse response, Object handler, Exception ex) {
        WriteException(ex);
        String viewName = determineViewName(ex, request);
        if (viewName != null) {// JSP格式返回
            if (!(request.getHeader("accept").indexOf("application/json") > -1 || (request
                    .getHeader("X-Requested-With")!= null && request
                    .getHeader("X-Requested-With").indexOf("XMLHttpRequest") > -1))) {
                // 如果不是异步请求
                // Apply HTTP status code for error views, if specified.
                // Only apply it if we're processing a top-level request.
                Integer statusCode = determineStatusCode(request, viewName);
                if (statusCode != null) {
                    applyStatusCodeIfPossible(request, response, statusCode);
                }
                return getModelAndView(viewName, ex, request);
            } else {// JSON格式返回
                try {
                    PrintWriter writer = response.getWriter();
                    writer.write(ex.getMessage());
                    writer.flush();

                } catch (IOException e) {
                    e.printStackTrace();
                }
                return null;
            }
        } else {
            return null;
        }
    }

    protected void  WriteException(Exception ex) {
        if (ex instanceof org.springframework.jdbc.BadSqlGrammarException) {
            WriteBadSqlGrammarException((BadSqlGrammarException) ex);
        } else {
            MyLogger.logger.error("错误拦截：{}", ExceptionHelp.getExceptionMsg(ex));
        }
    }
    protected void WriteBadSqlGrammarException(BadSqlGrammarException ex)
    {
        MyLogger.logger.error("\n\r 错误信息{};\n\r sql语句:{};",ex.getMessage(),ex.getSql());
    }
}
// View
