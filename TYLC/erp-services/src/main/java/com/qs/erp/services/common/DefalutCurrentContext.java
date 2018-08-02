package com.qs.erp.services.common;

import com.qs.erp.entitys.entity.Operator;
import com.qs.erp.entitys.entity.OperatorConfigRole;

/**
 * Created by xyyz150 on 2015/9/7.
 */
public class DefalutCurrentContext implements CurrentContext {
    static Long TenantId = 0L;
    static String TenantCode = "";
    static boolean SystemError;
    static String CompanyCode;

    public long getOperatorRowId() {
        return 111L;
    }

    public String getUserName() {
        return "自动用户";
    }

    public boolean getSystemError() {
        return SystemError;
    }

    public String getTenantCode() {
        return TenantCode;
    }

    public long getTenantId() {
        return TenantId;
    }

    public Operator getOperator() {
        return null;
    }

    public void setTenantId(Long tenantId) {
        TenantId = tenantId;
    }

    public void setTenantCode(String tenantCode) {
        TenantCode = tenantCode;
    }

    public void setSystemError(boolean systemError) {
        SystemError = systemError;
    }

    public OperatorConfigRole getOperatorConfig() {
        return null;
    }

    public  void setCompanyCode(String CompanyCode){this.CompanyCode=CompanyCode;}

    public String getCompanyCode(){return CompanyCode;}
}
