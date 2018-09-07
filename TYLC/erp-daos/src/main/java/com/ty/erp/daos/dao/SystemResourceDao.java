package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.SystemResource;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface SystemResourceDao {
    public List<SystemResource>  GetList();
    public SystemResource Get(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public void Create(SystemResource entity);
    public  void Update(SystemResource entity);

    public  void Delete(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    }
