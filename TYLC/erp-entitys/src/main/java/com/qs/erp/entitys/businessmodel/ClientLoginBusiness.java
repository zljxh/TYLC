package com.qs.erp.entitys.businessmodel;

/**
 * Created by Administrator on 2016/12/9.
 */
public class ClientLoginBusiness {
    public ClientLoginBusiness(){
        setGROUPCODE("-1");
        setTENANTID(-1);
    }
    private String GROUPCODE;
    private String JSESSIONID;
    private long TENANTID;
    private String sid;
    private String success;
    private String message;

    public boolean isPurchaseCodePurchaseEd() {
        return PurchaseCodePurchaseEd;
    }

    public void setPurchaseCodePurchaseEd(boolean purchaseCodePurchaseEd) {
        PurchaseCodePurchaseEd = purchaseCodePurchaseEd;
    }

    private boolean PurchaseCodePurchaseEd;

    public String getGROUPCODE() {
        return GROUPCODE;
    }

    public void setGROUPCODE(String GROUPCODE) {
        this.GROUPCODE = GROUPCODE;
    }

    public String getJSESSIONID() {
        return JSESSIONID;
    }

    public void setJSESSIONID(String JSESSIONID) {
        this.JSESSIONID = JSESSIONID;
    }

    public long getTENANTID() {
        return TENANTID;
    }

    public void setTENANTID(long TENANTID) {
        this.TENANTID = TENANTID;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getSuccess() {
        return success;
    }

    public void setSuccess(String success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
