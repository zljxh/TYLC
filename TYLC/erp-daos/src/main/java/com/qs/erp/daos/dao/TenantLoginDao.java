package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.TenantLogin;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@MyBatisRepository
public interface TenantLoginDao {
    public List<TenantLogin>  GetList(@Param("TenantRowId")long TenantRowId);
    public  TenantLogin Get(@Param("TenantRowId")long TenantRowId,@Param("RowId") long RowId);
    public void Create(TenantLogin entity);
    public  void Update(TenantLogin entity);

    public  void UpdateEncryptEd(TenantLogin entity);

    public  void Delete(@Param("TenantRowId")long TenantRowId,@Param("RowId") long RowId);
	
	public List GetPageByPageQueryParameters(@Param("TenantRowId")long TenantRowId,@Param("map") Map<String,Object> param);

    public long GetCountByPageQueryParameters(@Param("TenantRowId")long TenantRowId,@Param("map") Map<String,Object> param);
    public  String GetTenantId(@Param("TenantRowId")long TenantRowId );

    public  TenantLogin GetTenant(@Param("TenantRowId")long TenantRowId );
    }
