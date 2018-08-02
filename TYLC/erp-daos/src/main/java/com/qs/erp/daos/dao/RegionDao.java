package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.Region;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@MyBatisRepository
public interface RegionDao {
    public List<Region>  GetList();
    public Region Get(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    public void Create(Region entity);
    public  void Update(Region entity);

    public  void Delete(@Param("TenantRowId") long TenantRowId, @Param("RowId") long RowId);
    }
