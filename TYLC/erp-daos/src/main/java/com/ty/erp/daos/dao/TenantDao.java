package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.businessmodel.LoginCenterBusiness;
import org.apache.ibatis.annotations.Param;

@MyBatisRepository
public interface TenantDao {
     LoginCenterBusiness getLoginInfoByTenantcode(@Param("Tenantcode")String Tenantcode);
}
