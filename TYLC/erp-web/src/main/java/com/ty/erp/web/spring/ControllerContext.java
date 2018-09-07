package com.ty.erp.web.spring;

import com.ty.erp.common.ServiceContext;
import com.ty.erp.entitys.entity.Operator;
import com.ty.erp.entitys.entity.OperatorConfigRole;
import com.ty.erp.services.common.CacheBlockingQueued;
import com.ty.erp.services.common.CurrentContextFactory;
import com.ty.erp.services.common.GlobalParameter;
import com.ty.erp.services.common.cache.SystemCache;
import com.ty.erp.services.common.spring.SpringContextUtil;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

/**
 * Created by yuweiquan on 2016-04-02.
 */
public class ControllerContext {
    static CacheBlockingQueued<String> queued;

    public static ServiceContext getCurrentContext() {
        Operator user = CurrentContextFactory.createInstance().getOperator();
        if (user == null) {
            return new ServiceContext();
        }
        ServiceContext context = new ServiceContext();
        context.setTenantRowId(user.getTenantRowId());
        context.setOperatorRowId(user.getRowId());
        context.setUserName(user.getAccount());
        return context;
    }

    public static boolean getSystemError() {
        return CurrentContextFactory.createInstance().getSystemError();
    }

    public static long getOperatorRowId() {
        return CurrentContextFactory.createInstance().getOperatorRowId();
    }

    public static String getUserName() {
        return CurrentContextFactory.createInstance().getUserName();
    }

    public static String getTenantCode() {
        return CurrentContextFactory.createInstance().getTenantCode();
    }

    public static long getTenantId() {
        return CurrentContextFactory.createInstance().getTenantId();
    }

    public static Operator getOperator() {
        return CurrentContextFactory.createInstance().getOperator();
    }

    public static void setTenantId(long tenantId) {
        CurrentContextFactory.createInstance().setTenantId(tenantId);
    }

    public static void setTenantCode(String tenantCode) {
        CurrentContextFactory.createInstance().setTenantCode(tenantCode);
    }

    public static void setSystemError(boolean systemError) {
        CurrentContextFactory.createInstance().setSystemError(systemError);
    }

    public static String getCompanyCode() {
        return CurrentContextFactory.createInstance().getCompanyCode();
    }

    public static void setCompanyCode(String CompanyCode) {
        CurrentContextFactory.createInstance().setCompanyCode(CompanyCode);
    }

    public static OperatorConfigRole getOperatorConfig() {
        return CurrentContextFactory.createInstance().getOperatorConfig();
    }

    public static boolean isPermitted(String permission) {
        Subject subject = SecurityUtils.getSubject();
        return subject.isPermitted(permission);
    }

    public static CacheBlockingQueued<String> getQueued() {
        if (queued == null) {
            queued = new CacheBlockingQueued<String>("测试队列", 100, true);
            queued.setCache(SpringContextUtil.getBean(SystemCache.class));
        }
        return queued;
    }

    public static boolean isPermittedAndPDA(String permission) {
        boolean pdaEnabled = GlobalParameter.pdaEnabled(CurrentContextFactory.createInstance().getTenantId());
        Subject subject = SecurityUtils.getSubject();
        return pdaEnabled && subject.isPermitted(permission);
    }
}
