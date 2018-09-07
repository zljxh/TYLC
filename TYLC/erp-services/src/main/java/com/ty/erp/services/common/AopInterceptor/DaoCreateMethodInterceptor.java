package com.ty.erp.services.common.AopInterceptor;

import com.ty.erp.entitys.common.BaseEntity;
import com.ty.erp.services.common.CurrentContextFactory;
import com.ty.erp.services.common.MyLogger;
import com.ty.erp.services.common.cache.EntityCacheService;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.beans.factory.annotation.Autowired;

public class DaoCreateMethodInterceptor implements MethodInterceptor {
    @Autowired
    EntityCacheService entityCatcheService;

    public Object invoke(MethodInvocation arg0) throws Throwable {
        try {
            Object result = arg0.proceed();//
            if (!CurrentContextFactory.createInstance().getSystemError()) {
                Object[] args = arg0.getArguments();// 被拦截的参数
                BaseEntity entity = (BaseEntity) args[0];
                entityCatcheService.set(Long.toString(entity.getTenantRowId()) + entity.getClass().getSimpleName() + Long.toString(entity.getRowId()), args[0]);//加入缓存
            }
            return result;
        } catch (Exception e) {
            MyLogger.logger.error(e.getMessage());
            throw e;
        }
    }
}