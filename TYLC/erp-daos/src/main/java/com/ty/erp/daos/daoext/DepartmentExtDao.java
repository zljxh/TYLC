package com.ty.erp.daos.daoext;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.Department;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by xyyz150 on 2015/1/9.
 */
@MyBatisRepository
public interface DepartmentExtDao {
    public List GetPageByPageQueryParameters(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public long GetCountByPageQueryParameters(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);
    public Department GetFirst(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public int ChangeEnabled(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);

    public List getComboList(@Param("TenantRowId") long TenantRowId);
}
