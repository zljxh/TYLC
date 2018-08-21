package com.qs.erp.daos.daoext;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.OperatorConfig;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface OperatorConfigDao {
    public List<OperatorConfig>  GetList(@Param("TenantRowId") long TenantRowId);
    public OperatorConfig Get(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public void Create(OperatorConfig entity);
    public  void Update(OperatorConfig entity);

    public  void Delete(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    }
