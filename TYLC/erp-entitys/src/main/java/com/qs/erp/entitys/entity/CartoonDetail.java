package com.qs.erp.entitys.entity;

import java.util.Date;

public class CartoonDetail {
    private long RowId;
    private long CartoonRowId;
    private String Pic;
    private Date CreateTime;
    private String Title;
    private int Cost;
    private int Sort;
    private String Describe;

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

    public String getPic() {
        return Pic;
    }

    public void setPic(String pic) {
        Pic = pic;
    }

    public Date getCreateTime() {
        return CreateTime;
    }

    public void setCreateTime(Date createTime) {
        CreateTime = createTime;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public int getCost() {
        return Cost;
    }

    public void setCost(int cost) {
        Cost = cost;
    }

    public int getSort() {
        return Sort;
    }

    public void setSort(int sort) {
        Sort = sort;
    }

    public String getDescribe() {
        return Describe;
    }

    public void setDescribe(String describe) {
        Describe = describe;
    }
}
