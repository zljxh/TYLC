package com.qs.erp.entitys.businessmodel;

/**
 * Created by yuweiquan on 2016-02-05.
 */
public class BaseMultiHandleDetailResult {
    public Long getRowId() {
        return RowId;
    }

    public void setRowId(Long rowId) {
        RowId = rowId;
    }

    private Long RowId;
    private boolean IsSuccess;

    public boolean getIsSuccess() {
        return this.IsSuccess;
    }

    public void setIsSuccess(boolean isSuccess) {
        this.IsSuccess = isSuccess;
    }
}
