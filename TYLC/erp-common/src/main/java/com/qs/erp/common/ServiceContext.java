package com.qs.erp.common;

/**
 * Created by yuweiquan on 2016-04-02.
 */
public class ServiceContext {
    public ServiceContext() {
        setUserName("");
    }

    private long OperatorRowId;
    private String UserName;

    public long getTenantRowId() {
        return TenantRowId;
    }

    public void setTenantRowId(long tenantRowId) {
        TenantRowId = tenantRowId;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public long getOperatorRowId() {
        return OperatorRowId;
    }

    public void setOperatorRowId(long operatorRowId) {
        OperatorRowId = operatorRowId;
    }

    private long TenantRowId;


}
