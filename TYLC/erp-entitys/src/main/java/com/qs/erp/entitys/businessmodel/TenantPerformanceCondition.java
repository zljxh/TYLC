package com.qs.erp.entitys.businessmodel;

import com.qs.erp.utils.util.DateHelp;

import java.util.Date;

/**
 * Created by Administrator on 2016/11/28.
 */
public class TenantPerformanceCondition {
    public TenantPerformanceCondition(){
        setGetDate(DateHelp.getDefaultDate());
    }
    private int Second;
    private boolean IsEnable;
    private Date GetDate;

    public int getSecond() {
        return Second;
    }

    public void setSecond(int second) {
        Second = second;
    }

    public boolean getIsEnable() {
        return IsEnable;
    }

    public void setIsEnable(boolean isEnable) {
        IsEnable = isEnable;
    }

    public Date getGetDate() {
        return GetDate;
    }

    public void setGetDate(Date getDate) {
        GetDate = getDate;
    }
}
