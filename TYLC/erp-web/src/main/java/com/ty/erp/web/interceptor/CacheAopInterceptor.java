package com.ty.erp.web.interceptor;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;

/**
 * Created by xyyz150 on 2015/3/17.
 */
@Aspect
public class CacheAopInterceptor {
    private final String  GetPointcut="@annotation(com.springapp.interceptor.GetFromCache)";

    @Around(GetPointcut)
    public Object Get(ProceedingJoinPoint point) throws Throwable{
        MethodSignature signature= (MethodSignature)point.getSignature();
        GetFromCache anno = signature.getMethod().getAnnotation(GetFromCache.class);
                String key = anno.Key();
               int timeSocpe = anno.timeOut();
        return point.proceed();
    }
}
