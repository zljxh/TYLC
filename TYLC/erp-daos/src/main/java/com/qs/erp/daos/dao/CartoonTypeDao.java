package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.CartoonType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface CartoonTypeDao {
    List<CartoonType> getLists();
    void Save(CartoonType type);
    void delete(@Param("RowId") long RowId);
    void update(@Param("RowId") long RowId);
    CartoonType Get(@Param("RowId") long rowid);
}
