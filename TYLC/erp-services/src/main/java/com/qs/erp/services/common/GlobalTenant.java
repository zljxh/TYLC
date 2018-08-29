package com.qs.erp.services.common;

import org.springframework.stereotype.Service;

/**
 * Created by admin on 2014/12/2.
 */
@Service
public class GlobalTenant {


    private String TenantCenterIP;

    public String getTenantCenterUrl(String url) {
        return getTenantCenterIP() + "/" + url;
    }


    private String FileUrl;

    public String getFileUrl() {
        return FileUrl;
    }
    public String getFileUrl(String path) {
        return "http://"+FileUrl+"/"+path;
    }

    public void setFileUrl(String fileUrl) {
        FileUrl = fileUrl;
    }


    public String getTenantCenterIP() {
        return TenantCenterIP;
    }

    public void setTenantCenterIP(String tenantCenterIP) {
        TenantCenterIP = tenantCenterIP;
    }
}
