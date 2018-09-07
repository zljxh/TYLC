package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.CartoonDetailChapter;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface CartoonDetailChapterDao {
    public List<CartoonDetailChapter> getByCartoonRowId(@Param("CartoondetailRowId") long CartoondetailRowId);

    public void Save(CartoonDetailChapter cartoonDetail);
    public void Update(CartoonDetailChapter cartoonDetail);

    public List<CartoonDetailChapter> getList();

    public CartoonDetailChapter Get(@Param("RowId") long RowId);
}
