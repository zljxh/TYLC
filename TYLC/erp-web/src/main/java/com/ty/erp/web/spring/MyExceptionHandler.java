package com.ty.erp.web.spring;

import com.ty.erp.services.common.MyLogger;
import com.ty.erp.utils.util.ExceptionHelp;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by xyyz150 on 2014/11/11.
 */
public class MyExceptionHandler implements HandlerExceptionResolver,Ordered {

    private int order = Ordered.LOWEST_PRECEDENCE;

    public void setOrder(int order) {
        this.order = order;
    }

    @Override
    public int getOrder() {
        return this.order;
    }

    @Override
    public ModelAndView resolveException(HttpServletRequest request,
                                         HttpServletResponse response, Object handler, Exception ex){
        MyLogger.logger.error("Resolving exception from handler [" + handler + "]\n "+ExceptionHelp.getExceptionMsg(ex));
        //如果是json格式的ajax请求
        if (request.getHeader("accept").indexOf("application/json") > -1
                || (request.getHeader("X-Requested-With")!= null && request.getHeader("X-Requested-With").indexOf("XMLHttpRequest") > -1)) {
            response.setStatus(500);
            response.setContentType("application/json;charset=utf-8");
            try {
                MyLogger.logger.error("[租户{}请求{}业务异常:{}]",ControllerContext.getTenantId() , request.getRequestURI(),ExceptionHelp.getExceptionMsg(ex));
                response.getWriter().write("业务异常");
                response.getWriter().flush();
            } catch (Exception e1) {
                // TODO Auto-generated catch block

            }
            return new ModelAndView();
        }
        else{//如果是普通请求
            MyLogger.logger.error("[租户{}请求{}业务异常:{}]",ControllerContext.getTenantId() , request.getRequestURI(),ExceptionHelp.getExceptionMsg(ex));
            request.setAttribute("exceptionMessage", "业务异常");
                return new ModelAndView("error");
        }
    }
}


