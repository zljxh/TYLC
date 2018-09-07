package com.ty.erp.services.common.shiro;

import org.apache.shiro.authc.UsernamePasswordToken;


public class MyTenantToken extends UsernamePasswordToken
{

    long tenantRowId;

    public long getTenantRowId() {
        return tenantRowId;
    }

    public void setTenantRowId(long tenantRowId) {
        this.tenantRowId = tenantRowId;
    }

    long timestamp;




    public MyTenantToken(String username, String password) {
        super(username,password);
        timestamp=System.currentTimeMillis();
    }



    public Object getPrincipal() {
        return this.getTenantRowId()+":"+ this.getUsername()+":"+timestamp;
    }

    public Object getCredentials() {
        return this.getPassword();
    }



    public void clear() {
        this.tenantRowId=0;
        super.clear();



    }

    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(this.getClass().getName());
        sb.append(" - ");
        sb.append(this.getUsername());
        sb.append(" - ");
        sb.append(this.tenantRowId);
        sb.append(", rememberMe=").append(super.isRememberMe());
        if(this.getHost() != null) {
            sb.append(" (").append(this.getHost()).append(")");
        }

        return sb.toString();
    }
}
