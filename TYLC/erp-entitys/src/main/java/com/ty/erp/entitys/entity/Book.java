package com.ty.erp.entitys.entity;

import java.util.Date;
import java.util.List;

/**
 * @author HP
 * @date yyyy/MM/dd
 */
public class Book {
    private long RowId;
    private String Author;
    private String Title;
    private String Des;
    private String Pic;
    private List<Long> TypeRowId;
    private String VisitCount;
    private Date CreateDate;
    private int FreeStatus;//-1 表示全免费，否则就是免费到章节
    private int Enable;
    //总章节数
    private int AllCount;
    private int Sex;//性别 1 男 2 女 3 不限
    private String Type;

    public int getSex() {
        return Sex;
    }

    public void setSex(int sex) {
        Sex = sex;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    private int LastChapterSort;

    public int getEnable() {
        return Enable;
    }

    public void setEnable(int enable) {
        Enable = enable;
    }

    public int getFreeStatus() {
        return FreeStatus;
    }

    public void setFreeStatus(int freeStatus) {
        FreeStatus = freeStatus;
    }

    public long getRowId() {
        return RowId;
    }

    public void setRowId(long rowId) {
        RowId = rowId;
    }

    public String getAuthor() {
        return Author;
    }

    public void setAuthor(String author) {
        Author = author;
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

    public String getPic() {
        return Pic;
    }

    public void setPic(String pic) {
        Pic = pic;
    }

    public List<Long> getTypeRowId() {
        return TypeRowId;
    }

    public void setTypeRowId(List<Long> typeRowId) {
        TypeRowId = typeRowId;
    }

    public String getVisitCount() {
        return VisitCount;
    }

    public void setVisitCount(String visitCount) {
        VisitCount = visitCount;
    }

    public Date getCreateDate() {
        return CreateDate;
    }

    public void setCreateDate(Date createDate) {
        CreateDate = createDate;
    }

    public int getAllCount() {
        return AllCount;
    }

    public void setAllCount(int allCount) {
        AllCount = allCount;
    }

    public int getLastChapterSort() {
        return LastChapterSort;
    }

    public void setLastChapterSort(int lastChapterSort) {
        LastChapterSort = lastChapterSort;
    }
}
