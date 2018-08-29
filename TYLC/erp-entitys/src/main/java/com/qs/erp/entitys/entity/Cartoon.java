package com.qs.erp.entitys.entity;

import java.util.Date;
import java.util.List;

public class Cartoon {
    private long RowId;
    private String Title;
    private String Des;
    private Date CreateTime;
    private Date UpdateTime;
    private String Creater;
    private String Pic;
    private String Author;
    private List<Long> TypeRowId;
    private int Enable;

    public int getEnable() {
        return Enable;
    }

    public void setEnable(int enable) {
        Enable = enable;
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

    public String getDes() {
        return Des;
    }

    public void setDes(String des) {
        Des = des;
    }

    public Date getCreateTime() {
        return CreateTime;
    }

    public void setCreateTime(Date createTime) {
        CreateTime = createTime;
    }

    public Date getUpdateTime() {
        return UpdateTime;
    }

    public void setUpdateTime(Date updateTime) {
        UpdateTime = updateTime;
    }

    public String getCreater() {
        return Creater;
    }

    public void setCreater(String creater) {
        Creater = creater;
    }

    public String getPic() {
        return Pic;
    }

    public void setPic(String pic) {
        Pic = pic;
    }

    public String getAuthor() {
        return Author;
    }

    public void setAuthor(String author) {
        Author = author;
    }

    public List<Long> getTypeRowId() {
        return TypeRowId;
    }

    public void setTypeRowId(List<Long> typeRowId) {
        TypeRowId = typeRowId;
    }
}
