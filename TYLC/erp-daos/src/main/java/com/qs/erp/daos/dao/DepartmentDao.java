package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.Department;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface DepartmentDao {
    public List<Department>  GetList(@Param("TenantRowId") long TenantRowId);
    public Department Get(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public void Create(Department entity);
    public  void Update(Department entity);

    public  void Delete(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    }
