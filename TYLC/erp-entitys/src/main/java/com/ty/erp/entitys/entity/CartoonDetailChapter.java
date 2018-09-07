package com.ty.erp.entitys.entity;

public class CartoonDetailChapter {
    private long RowId;
    private long CartoondetailRowId;
    private String Sort;
    private String Pic;
    private String Des;

    public long getRowId() {
        return RowId;
    }

    public void setRowId(long rowId) {
        RowId = rowId;
    }

    public long getCartoondetailRowId() {
        return CartoondetailRowId;
    }

    public void setCartoondetailRowId(long cartoondetailRowId) {
        CartoondetailRowId = cartoondetailRowId;
    }

    public String getSort() {
        return Sort;
    }

    public void setSort(String sort) {
        Sort = sort;
    }

    public String getPic() {
        return Pic;
    }

    public void setPic(String pic) {
        Pic = pic;
    }

    public String getDes() {
        return Des;
    }

    public void setDes(String des) {
        Des = des;
    }
}
