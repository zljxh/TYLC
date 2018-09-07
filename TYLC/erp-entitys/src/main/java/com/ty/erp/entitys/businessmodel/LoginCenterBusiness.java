package com.ty.erp.entitys.businessmodel;

public class LoginCenterBusiness {

    private long TenantRowId;
    private String Tenantcode;
    private String Ip;
    private String Port;
    private String GroupCode;

    public long getTenantRowId() {
        return TenantRowId;
    }

    public void setTenantRowId(long tenantRowId) {
        TenantRowId = tenantRowId;
    }

    public String getTenantcode() {
        return Tenantcode;
    }

    public void setTenantcode(String tenantcode) {
        Tenantcode = tenantcode;
    }

    public String getIp() {
        return Ip;
    }

    public void setIp(String ip) {
        Ip = ip;
    }

    public String getPort() {
        return Port;
    }

    public void setPort(String port) {
        Port = port;
    }

    public String getGroupCode() {
        return GroupCode;
    }

    public void setGroupCode(String groupCode) {
        GroupCode = groupCode;
    }
}
