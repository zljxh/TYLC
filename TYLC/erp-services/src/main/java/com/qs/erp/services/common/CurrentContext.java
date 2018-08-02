package com.qs.erp.services.common;

import com.qs.erp.entitys.entity.Operator;
import com.qs.erp.entitys.entity.OperatorConfigRole;

/**
 * Created by xyyz150 on 2015/9/6.
 */
public interface CurrentContext {

    public long getOperatorRowId();

    public String getUserName();

    public boolean getSystemError();

    public String getTenantCode();

    public long getTenantId() ;

    public Operator getOperator();

    public void setTenantId(Long tenantId);

    public void setTenantCode(String tenantCode);

    public void setSystemError(boolean systemError);

    public OperatorConfigRole getOperatorConfig();

    public  void setCompanyCode(String CompanyCode);

    public String getCompanyCode();
}
