package com.qs.erp.web.interceptor;

import com.qs.erp.services.common.MyLogger;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by xyyz150 on 2014/10/26.
 */
public class DemoInterceptor extends HandlerInterceptorAdapter {
    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        if(MyLogger.logger.isInfoEnabled()) {
            MyLogger.logger.info("请求开始");
        }
//        if(ContextSession.getSystemError()){
//            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return false;
//        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        if(MyLogger.logger.isInfoEnabled()) {
            MyLogger.logger.info("请求control处理完毕");
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        if(MyLogger.logger.isInfoEnabled()) {
            MyLogger.logger.info("请求页面render完毕");
        }
    }
}

