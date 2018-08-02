package com.qs.erp.entitys.businessmodel;

import com.qs.erp.entitys.common.BaseEntity;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by Administrator on 2016/11/28.
 */
public class TenantPerformance implements BaseEntity, Serializable {
    private long RowId;
    private long TenantRowId;
    private String Url;
    private int Second;
    private Date AccessDate;
    private Date CreateDate;

    public long getRowId() {
        return RowId;
    }

    public void setRowId(long rowId) {
        RowId = rowId;
    }

    public long getTenantRowId() {
        return TenantRowId;
    }

    public void setTenantRowId(long tenantRowId) {
        TenantRowId = tenantRowId;
    }

    public String getUrl() {
        return Url;
    }

    public void setUrl(String url) {
        Url = url;
    }

    public int getSecond() {
        return Second;
    }

    public void setSecond(int second) {
        Second = second;
    }

    public Date getAccessDate() {
        return AccessDate;
    }

    public void setAccessDate(Date accessDate) {
        AccessDate = accessDate;
    }

    public Date getCreateDate() {
        return CreateDate;
    }

    public void setCreateDate(Date createDate) {
        CreateDate = createDate;
    }
}
