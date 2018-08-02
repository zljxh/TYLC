package com.qs.erp.utils.util;

/**
 * Created by xyyz150 on 2016/7/23.
 */
public class BooleanWarp {
    private boolean IsSuccess;

    public BooleanWarp() {
    }

    public BooleanWarp(boolean isSuccess) {
        IsSuccess = isSuccess;
    }

    public boolean getIsSuccess() {
        return IsSuccess;
    }

    public void setIsSuccess(boolean isSuccess) {
        IsSuccess = isSuccess;
    }
}
