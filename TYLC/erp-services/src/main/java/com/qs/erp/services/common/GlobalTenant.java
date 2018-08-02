package com.qs.erp.services.common;

import org.springframework.stereotype.Service;

/**
 * Created by admin on 2014/12/2.
 */
@Service
public class GlobalTenant {
    String OrderCenterIP;

    public String getOrderCenterIP() {
        return OrderCenterIP;
    }

    public void setOrderCenterIP(String orderCenterIP) {
        OrderCenterIP = orderCenterIP;
    }

    public String getOrderCenterUrl(String url) {
        return getOrderCenterIP() + "/" + url;
    }

    public String getTenantCenterIP() {
        return TenantCenterIP;
    }

    public void setTenantCenterIP(String TenantCenterIP) {
        this.TenantCenterIP = TenantCenterIP;
    }

    String TenantCenterIP;

    public String getTenantCenterUrl(String url) {
        return getTenantCenterIP() + "/" + url;
    }


    public String getDataCenterIP() {
        return DataCenterIP;
    }

    public void setDataCenterIP(String TenantCenterIP) {
        this.DataCenterIP = TenantCenterIP;
    }

    String DataCenterIP;

    public String getDataCenterUrl(String url) {
        return getDataCenterIP() + "/" + url;
    }

    boolean CheckTenant;

    public boolean getCheckTenant() {
        return CheckTenant;
    }

    public void setCheckTenant(boolean checkTenant) {
        CheckTenant = checkTenant;
    }

    String FileRelativePath;

    String FileRealPath;

    public String getFileRelativePath() {
        return FileRelativePath;
    }

    public void setFileRelativePath(String fileRelativePath) {
        FileRelativePath = fileRelativePath;
    }

    public String getFileRealPath() {
        return FileRealPath;
    }

    public void setFileRealPath(String fileRealPath) {
        FileRealPath = fileRealPath;
    }

    private String MsgAccount;

    private String MsgPassword;

    public String getMsgAccount() {
        return MsgAccount;
    }

    public void setMsgAccount(String msgAccount) {
        MsgAccount = msgAccount;
    }

    public String getMsgPassword() {
        return MsgPassword;
    }

    public void setMsgPassword(String msgPassword) {
        MsgPassword = msgPassword;
    }

    public String getJDCloudDingIP() {
        return JDCloudDingIP;
    }

    public void setJDCloudDingIP(String JDCloudDingIP) {
        this.JDCloudDingIP = JDCloudDingIP;
    }

    /*
        * 京东云鼎地址
        * */
    private String JDCloudDingIP;

    /**
     * 版本：QS千胜，WD问道
     */
    private String Version;

    public String getVersion() {
        return Version;
    }

    public void setVersion(String version) {
        Version = version;
    }
}
