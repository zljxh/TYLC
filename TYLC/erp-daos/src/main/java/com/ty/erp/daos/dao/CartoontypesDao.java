package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.Cartoontypes;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface CartoontypesDao {
public void Save(Cartoontypes cartoontypes);

public void Delete(@Param("CartoonRowId")Long CartoonRowId);
public List<Cartoontypes> getList(@Param("CartoonRowId") long CartoonRowId);

    public List<Long> getRowList(@Param("CartoonRowId") long CartoonRowId);
}
