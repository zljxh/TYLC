package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.Employee;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface EmployeeDao {
    public List<Employee>  GetList(@Param("TenantRowId") long TenantRowId);
    public Employee Get(@Param("TenantRowId") long TenantRowId, @Param("RowId") Object RowId);
    public void Create(Employee entity);
    public  void Update(Employee entity);

    public  void Delete(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public Employee getByName(@Param("TenantRowId") long TenantRowId, @Param("Name") String Name);

    public String GetEmployeeNameByRowId(@Param("TenantRowId") long TenantRowId, @Param("RowId") long EmployeeRowId);
    }
