package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.OperatorLoginLog;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface OperatorLoginLogDao {
    public List<OperatorLoginLog>  GetList(@Param("TenantRowId") long TenantRowId);
    public OperatorLoginLog Get(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public void Create(OperatorLoginLog entity);
    public  void Update(OperatorLoginLog entity);

    public  void Delete(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);

	public List<Map<String,Object>> GetPageByPageQueryParameters(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> param);

    public long GetCountByPageQueryParameters(@Param("TenantRowId") long TenantRowId, @Param("map") Map<String, Object> param);
    }
