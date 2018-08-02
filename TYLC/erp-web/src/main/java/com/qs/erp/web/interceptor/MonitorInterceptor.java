package com.qs.erp.web.interceptor;

import com.qs.erp.entitys.businessmodel.TenantPerformance;
import com.qs.erp.entitys.businessmodel.TenantPerformanceCondition;
import com.qs.erp.services.common.GlobalParameter;
import com.qs.erp.services.common.MyLogger;
import com.qs.erp.utils.util.ConvertHelp;
import com.qs.erp.utils.util.RandomHelp;
import com.qs.erp.web.spring.ControllerContext;
import org.slf4j.MDC;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

/**
 * Created by xyyz150 on 2016/11/24.
 * //WebRequestHandlerInterceptorAdapter
 * //WebRequestInterceptor
 */
public class MonitorInterceptor extends HandlerInterceptorAdapter {
    private ThreadLocal<Long> startThreadLocal = new ThreadLocal<Long>();

    @Override
    public boolean preHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o) throws Exception {
        MDC.put("requestId", RandomHelp.generateShortUuid());
        startThreadLocal.set(System.currentTimeMillis());
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        long start = startThreadLocal.get();
        long end = System.currentTimeMillis();
        TenantPerformanceCondition tpCondition=GlobalParameter.GetTenantPerformanceCondition();
        if (tpCondition.getIsEnable()&&(end - start > tpCondition.getSecond())) {
            //时间超过秒数记录日志
            StringBuffer requestParameter=new StringBuffer();
           /* Map<String,Object> parameterMap= httpServletRequest.getParameterMap();
            if(parameterMap!=null&&parameterMap.size()>0){
                for (Map.Entry<String, Object> entry : parameterMap.entrySet()) {
                    requestParameter.append(entry.getKey()).append("=").append(entry.getValue()).append(";");
                }
            }*/

            MyLogger.logger.error("超过" + ConvertHelp.ToInt(tpCondition.getSecond() / 1000) + "s的请求{},requestParameter:{}", httpServletRequest.getRequestURI(),requestParameter.toString());
            String key=ControllerContext.getTenantId() + httpServletRequest.getRequestURI();
            TenantPerformance LatelyTenantPerformanceInfo=GlobalParameter.getLatelyTenantPerformanceInfo(key);
            if(LatelyTenantPerformanceInfo!=null) {
                Date latelyDate = LatelyTenantPerformanceInfo.getAccessDate();
                long millis = new Date().getTime() - latelyDate.getTime();
                if (millis > 300000) {
                    TenantPerformance tenantPerformance = new TenantPerformance();
                    tenantPerformance.setAccessDate(new Date());
                    tenantPerformance.setTenantRowId(ControllerContext.getTenantId());
                    tenantPerformance.setUrl(httpServletRequest.getRequestURI());
                    tenantPerformance.setSecond(ConvertHelp.ToInt((end - start) / 1000));
                    GlobalParameter.TenantPerformanceInfoMap.get(key).add(tenantPerformance);
                }
            }else{
                TenantPerformance tenantPerformance = new TenantPerformance();
                tenantPerformance.setAccessDate(new Date());
                tenantPerformance.setTenantRowId(ControllerContext.getTenantId());
                tenantPerformance.setUrl(httpServletRequest.getRequestURI());
                tenantPerformance.setSecond(ConvertHelp.ToInt((end - start) / 1000));
                List<TenantPerformance> list = new ArrayList<TenantPerformance>();
                list.add(tenantPerformance);
                GlobalParameter.TenantPerformanceInfoMap.put(key, list);
            }
        }
    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
