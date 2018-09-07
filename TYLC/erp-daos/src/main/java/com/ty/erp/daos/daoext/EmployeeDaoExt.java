package com.ty.erp.daos.daoext;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.Employee;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2014/12/15.
 */
@MyBatisRepository
public interface EmployeeDaoExt {
    public List GetPageByPageQueryParameters(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public long GetCountByPageQueryParameters(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);
    public Employee getNameByCode(@Param("TenantRowId") long TenantRowId, @Param("Code") String Code);

    public Employee GetFirst(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public List getPageList(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public int getPageCount(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public List getComboList(@Param("TenantRowId") long TenantRowId);

    public List getComboNotOperatorList(@Param("TenantRowId") long TenantRowId);

    public int ChangeEnabled(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public Employee GetFirstByName(@Param("TenantRowId") long TenantRowId, @Param("Name") String Name);

    public String getCurrentOperatorName(@Param("TenantRowId") long TenantRowId, @Param("Code") String Code);
}
