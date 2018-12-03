package com.ty.erp.entitys.businessmodel;

import com.ty.erp.entitys.entity.Book;
import com.ty.erp.entitys.entity.BookDetail;

import java.util.List;

/**
 * @author HP
 * @date yyyy/MM/dd
 */
public class BookSaveModel {
    private Book Book;
    private List<BookDetail> DetailList;
    private List<Long> DeleteList;


    public com.ty.erp.entitys.entity.Book getBook() {
        return Book;
    }

    public void setBook(com.ty.erp.entitys.entity.Book book) {
        Book = book;
    }

    public List<BookDetail> getDetailList() {
        return DetailList;
    }

    public void setDetailList(List<BookDetail> detailList) {
        DetailList = detailList;
    }

    public List<Long> getDeleteList() {
        return DeleteList;
    }

    public void setDeleteList(List<Long> deleteList) {
        DeleteList = deleteList;
    }
}
