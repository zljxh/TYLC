package com.qs.erp.entitys.entity;

import com.qs.erp.entitys.common.BaseEntity;

import java.io.Serializable;

public class CartoonType {
    private long RowId;
    private String Name;
    private boolean IsEnabled;

    public long getRowId() {
        return RowId;
    }

    public void setRowId(long rowId) {
        RowId = rowId;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public boolean isEnabled() {
        return IsEnabled;
    }

    public void setEnabled(boolean enabled) {
        IsEnabled = enabled;
    }
}
