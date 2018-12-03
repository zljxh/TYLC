package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.Book;
import com.ty.erp.entitys.entity.BookDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface BookDetailDao {
    public void Create(BookDetail book);

    public void Update(BookDetail book);

    public List<BookDetail> getList();

    public long getcount();

    public void changeEnable(@Param("RowId") long rowid);

    public BookDetail Get(@Param("RowId") long RowId);

    public void deleteByRowIds(@Param("Rowids") List<Long> RowId);

    public List<BookDetail> getByBookRowId(@Param("BookRowId") Long BookRowid);

    public Integer getLastChapterSort(@Param("BookRowId") long BookDetailRowid);

    public void saveCost(@Param("Rowids") List<Long> RowId,@Param("Cost")int Cost);
}
