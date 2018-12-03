package com.ty.erp.entitys.entity;

/**
 * @author HP
 * @date yyyy/MM/dd
 */
public class LastRead {
    private Long RowId;
    private Long UserRowId;
    private Long BookRowId;
    private Long BookDetailRowId;
    private String Title;

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public Long getRowId() {
        return RowId;
    }

    public void setRowId(Long rowId) {
        RowId = rowId;
    }

    public Long getUserRowId() {
        return UserRowId;
    }

    public void setUserRowId(Long userRowId) {
        UserRowId = userRowId;
    }

    public Long getBookRowId() {
        return BookRowId;
    }

    public void setBookRowId(Long bookRowId) {
        BookRowId = bookRowId;
    }

    public Long getBookDetailRowId() {
        return BookDetailRowId;
    }

    public void setBookDetailRowId(Long bookDetailRowId) {
        BookDetailRowId = bookDetailRowId;
    }
}
