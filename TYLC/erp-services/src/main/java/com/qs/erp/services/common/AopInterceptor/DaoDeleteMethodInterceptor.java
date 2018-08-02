package com.qs.erp.services.common.AopInterceptor;

import com.qs.erp.services.common.CurrentContextFactory;
import com.qs.erp.services.common.MyLogger;
import com.qs.erp.services.common.cache.EntityCacheService;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.beans.factory.annotation.Autowired;

public class DaoDeleteMethodInterceptor implements MethodInterceptor {
    @Autowired
    EntityCacheService entityCatcheService;

    public Object invoke(MethodInvocation arg0) throws Throwable {
        try {
            Object[] args = arg0.getArguments();// 被拦截的参数
            Object result = arg0.proceed();
            // arg0.getMethod().clazz.getSimpleName().replace("Dao","");
            if (!CurrentContextFactory.createInstance().getSystemError()) {
                String genericStr = arg0.getMethod().toGenericString();
                int startIndex = genericStr.lastIndexOf("dao.") + 4;
                int endIndex = genericStr.lastIndexOf("Dao.");
                String className = genericStr.substring(startIndex, endIndex);
                entityCatcheService.delete(args[0].toString() + className + args[1].toString()); //删除缓存
            }
            return result;
        } catch (Exception e) {
            MyLogger.logger.error(e.getMessage());
            throw e;
        }
    }
}