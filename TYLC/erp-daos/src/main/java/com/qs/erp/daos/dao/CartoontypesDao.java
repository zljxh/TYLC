package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.Cartoontypes;
import org.apache.ibatis.annotations.Param;

@MyBatisRepository
public interface CartoontypesDao {
public void Save(Cartoontypes cartoontypes);

public void Delete(@Param("CartoonRowId")Long CartoonRowId);
}