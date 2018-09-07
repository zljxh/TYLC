package com.ty.erp.daos.daoext;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.Operator;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2014/12/15.
 */
@MyBatisRepository
public interface OperatorDaoExt {
    public List GetPageByPageQueryParameters(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public long GetCountByPageQueryParameters(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public void Enabled(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public List<Map<String, Object>> getSystemResourceByListRowId(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);
    public List<Map<String, Object>> getPdaSystemResourceByListRowId(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);
    public List<Map<String, Object>> getSystemResourceByListRowIdNoJCJM(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public Operator findByAccount(@Param("TenantRowId") long TenantRowId, @Param("Account") String Account);

    public List<Map<String, Object>> findPermissionsByRoles(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public List<Map<String, Object>> findRolesByRoles(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public List<Map<String, Object>> getTenantResoure(@Param("TenantRowId") long TenantRowId);

    public List getOperatorList(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);

    public long getOperatorCount(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> map);
}
