package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.Role;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface RoleDao {
    public List<Role>  GetList(@Param("TenantRowId") long TenantRowId);
    public  Role Get(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public void Create(Role entity);
    public  void Update(Role entity);

    public  void Delete(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    }
