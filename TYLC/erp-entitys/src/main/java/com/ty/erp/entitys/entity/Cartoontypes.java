package com.ty.erp.entitys.entity;

public class Cartoontypes {
    private long RowId;
    private long CartoonRowId;
    private long CartoonTypeRowId;
    private String TypeName;

    public long getRowId() {
        return RowId;
    }

    public void setRowId(long rowId) {
        RowId = rowId;
    }

    public long getCartoonRowId() {
        return CartoonRowId;
    }

    public void setCartoonRowId(long cartoonRowId) {
        CartoonRowId = cartoonRowId;
    }

    public long getCartoonTypeRowId() {
        return CartoonTypeRowId;
    }

    public void setCartoonTypeRowId(long cartoonTypeRowId) {
        CartoonTypeRowId = cartoonTypeRowId;
    }

    public String getTypeName() {
        return TypeName;
    }

    public void setTypeName(String typeName) {
        TypeName = typeName;
    }
}