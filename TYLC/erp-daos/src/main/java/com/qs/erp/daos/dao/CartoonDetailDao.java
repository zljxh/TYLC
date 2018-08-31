package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.CartoonDetail;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface CartoonDetailDao {
    public List<CartoonDetail> getByCartoonRowId(@Param("CartoonRowId") long CartoonRowId);

    public void Save(CartoonDetail cartoonDetail);

    public List<CartoonDetail> getList();

    public CartoonDetail Get(@Param("CartoonRowId") long RowId);

    void Update(CartoonDetail detail);
}
