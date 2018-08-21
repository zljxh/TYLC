package com.qs.erp.daos.daoext;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.SystemResource;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by xyyz150 on 2015/3/13.
 */
@MyBatisRepository
public interface RoleExtDao {
    public List GetPageByPageQueryParameters(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public long GetCountByPageQueryParameters(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public int ChangeEnabled(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);

    public List getComboList(@Param("TenantRowId") long TenantRowId);

    public List getOperatorbyRole(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);

    public SystemResource getRoleSystemResource(@Param("TenantRowId") long TenantRowId, @Param("OperatorRowId") long OperatorRowId, @Param("permission") String permission);

}
