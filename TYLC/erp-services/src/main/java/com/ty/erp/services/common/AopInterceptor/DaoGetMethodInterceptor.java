package com.ty.erp.services.common.AopInterceptor;

import com.ty.erp.entitys.common.BaseEntity;
import com.ty.erp.services.common.CurrentContextFactory;
import com.ty.erp.services.common.MyLogger;
import com.ty.erp.services.common.cache.EntityCacheService;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.springframework.beans.factory.annotation.Autowired;

public class DaoGetMethodInterceptor implements MethodInterceptor {
    @Autowired
    EntityCacheService entityCatcheService;
    public Object invoke(MethodInvocation arg0) throws Throwable {
        try {
            Object[] args = arg0.getArguments();// 被拦截的参数
            String className=arg0.getMethod().getReturnType().getSimpleName();
            //MyLogger.error("aop:"+System.identityHashCode(ContextSession.getTenantCode()));
            if(!CurrentContextFactory.createInstance().getSystemError()) {
                Object result = entityCatcheService.get(args[0].toString() + className + args[1].toString());//获取缓存
                if (result == null) {
                    result = arg0.proceed();
                    if (result != null) {
                        BaseEntity entity = (BaseEntity) result;
//                    if(entity.getRowId()==-2500L) {
//                        MyLogger.error(className + "新增缓存:" + args[0]+",信息"+((SystemConfig)entity).getKeyValue());
//                    }
                        entityCatcheService.set(Long.toString(entity.getTenantRowId()) + className + Long.toString(entity.getRowId()), result);//加入缓存
                    } else {
                        MyLogger.error(className + "[记录未查到]TenantRowId:" + args[0]+"RowId:"+args[1]);
                    }
                }
//            else {
//                BaseEntity entity = (BaseEntity) result;
//                if (entity.getRowId() == -2500L) {
//                    MyLogger.error(className + "获取缓存:" + args[0] + ",信息" + ((SystemConfig) entity).getKeyValue()+"--名称："+((SystemConfig) entity).getKeyName());
//                }
//            }
                return result;
            }else {
                return arg0.proceed();
            }
        } catch (Exception e) {
            MyLogger.logger.error("aop异常："+e.getMessage());
            throw e;
        }
    }
}