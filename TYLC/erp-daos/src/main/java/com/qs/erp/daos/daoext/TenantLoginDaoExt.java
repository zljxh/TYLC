package com.qs.erp.daos.daoext;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.TenantLogin;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by admin on 2014/12/31.
 */
@MyBatisRepository
public interface TenantLoginDaoExt {
    public  long GetTenantRowId(@Param("TenantRowId") long TenantRowId);
    public TenantLogin GetTenantLogin(@Param("TenantRowId") long TenantRowId);
    public List<TenantLogin> getList();
    public TenantLogin getTenantLogin(@Param("TenantCode") String TenantCode);
}
