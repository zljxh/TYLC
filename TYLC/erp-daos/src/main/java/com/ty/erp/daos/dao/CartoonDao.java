package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.Cartoon;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface CartoonDao {
    public void Create(Cartoon cartoon);

    public void Update(Cartoon cartoon);

    public List<Cartoon> getList();

    public long getcount();

    public void changeEnable(@Param("RowId") long rowid);

    public Cartoon Get(@Param("RowId") long RowId);
}