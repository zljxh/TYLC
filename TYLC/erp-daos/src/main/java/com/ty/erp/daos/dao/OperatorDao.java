package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.Operator;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface OperatorDao {
    public List<Operator>  GetList(@Param("TenantRowId") long TenantRowId);
    public Operator Get(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public void Create(Operator entity);
    public  void Update(Operator entity);
    public  void Delete(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public Operator findByAccount(@Param("TenantRowId") long TenantRowId, @Param("Account") String Account);
    }
