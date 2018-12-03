package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.Book;
import com.ty.erp.entitys.entity.Cartoon;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface BookDao {
    public void Create(Book book);

    public void Update(Book book);

    public List<Book> getList();

    public long getcount();

    public void changeEnable(@Param("RowId") long rowid);

    public Book Get(@Param("RowId") long RowId);

    public void setAllFree(@Param("BookRowIds")List<Long> Rowids);

    public void setPartFree(@Param("BookRowIds")List<Long> Rowids,@Param("part") int part);

    public void setAllCount(@Param("RowId") long RowId,@Param("Count") int count);
}
