package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.businessmodel.LoginCenterBusiness;
import org.apache.ibatis.annotations.Param;

@MyBatisRepository
public interface TenantDao {
     LoginCenterBusiness getLoginInfoByTenantcode(@Param("Tenantcode")String Tenantcode);
}
