package com.ty.erp.entitys.entity;

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
    private long VisitCount;
    private String Pic1;
    private Long FreeStatus; //-1 表示全免费，否则就是免费到章节
    private int Total;//总章节数

    //用seo优化的
    private String KeyWords;
    private String Description;

    public Long getFreeStatus() {
        return FreeStatus;
    }

    public void setFreeStatus(Long freeStatus) {
        FreeStatus = freeStatus;
    }

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

    public long getVisitCount() {
        return VisitCount;
    }

    public void setVisitCount(long visitCount) {
        VisitCount = visitCount;
    }

    public String getPic1() {
        return Pic1;
    }

    public void setPic1(String pic1) {
        Pic1 = pic1;
    }

    public String getKeyWords() {
        return KeyWords;
    }

    public void setKeyWords(String keyWords) {
        KeyWords = keyWords;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }
}
