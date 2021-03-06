package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.SystemConfig;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface SystemConfigDao {
    public List<SystemConfig> GetList(@Param("TenantRowId") long TenantRowId);

    public SystemConfig GetByParamId(@Param("TenantRowId") long TenantRowId, @Param("ParamId") long ParamId);

    public void Create(SystemConfig entity);

    public void Update(SystemConfig entity);

    public void Delete(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
}
