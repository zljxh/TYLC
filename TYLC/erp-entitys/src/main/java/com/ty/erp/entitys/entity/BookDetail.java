package com.ty.erp.entitys.entity;

import java.util.Date;
import java.util.List;

/**
 * @author HP
 * @date yyyy/MM/dd
 */
public class BookDetail {
    private long RowId;
    private String Title;
    private String Content;
    private Date CreateDate;
    private int Enable;
    private int Cost;
    private int Sort;
    private long BookRowId;

    public long getBookRowId() {
        return BookRowId;
    }

    public void setBookRowId(long bookRowId) {
        BookRowId = bookRowId;
    }

    public int getSort() {
        return Sort;
    }

    public void setSort(int sort) {
        Sort = sort;
    }

    public long getRowId() {
        return RowId;
    }

    public void setRowId(long rowId) {
        RowId = rowId;
    }

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }

    public Date getCreateDate() {
        return CreateDate;
    }

    public void setCreateDate(Date createDate) {
        CreateDate = createDate;
    }

    public int getEnable() {
        return Enable;
    }

    public void setEnable(int enable) {
        Enable = enable;
    }

    public int getCost() {
        return Cost;
    }

    public void setCost(int cost) {
        Cost = cost;
    }
}
