package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.RoleSystemResource;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface RoleSystemResourceDao {
    public List<RoleSystemResource>  GetList(@Param("TenantRowId") long TenantRowId);
    public  RoleSystemResource Get(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public void Create(RoleSystemResource entity);
    public  void Update(RoleSystemResource entity);

    public  void Delete(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    }
