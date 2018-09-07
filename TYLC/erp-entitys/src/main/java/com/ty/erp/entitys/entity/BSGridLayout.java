package com.ty.erp.entitys.entity;

/**
 * Created by xyyz150 on 2015/11/18.
 */
public class BSGridLayout {

    public BSGridLayout(){
        setComColumn("");
        setFormName("");
        setFrozenColumn("");
    }
    private long TenantRowId;
    public long getTenantRowId() {
        return TenantRowId;
    }

    public void setTenantRowId(long tenantRowId) {
        TenantRowId = tenantRowId;
    }
    private Long RowId;

    private Long OpeaterRowId;

    private String FormName;

    private String FrozenColumn;

    private String ComColumn;

    public Long getRowId() {
        return RowId;
    }

    public void setRowId(Long rowId) {
        RowId = rowId;
    }

    public Long getOpeaterRowId() {
        return OpeaterRowId;
    }

    public void setOpeaterRowId(Long opeaterRowId) {
        OpeaterRowId = opeaterRowId;
    }

    public String getFormName() {
        return FormName;
    }

    public void setFormName(String formName) {
        FormName = formName;
    }

    public String getFrozenColumn() {
        return FrozenColumn;
    }

    public void setFrozenColumn(String frozenColumn) {
        this.FrozenColumn = frozenColumn;
    }

    public String getComColumn() {
        return ComColumn;
    }

    public void setComColumn(String column) {
        this.ComColumn = column;
    }
}
