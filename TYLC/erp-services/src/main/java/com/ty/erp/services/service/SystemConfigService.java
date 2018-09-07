package com.ty.erp.services.service;

import com.ty.erp.common.ServiceContext;
import com.ty.erp.daos.dao.SystemConfigDao;
import com.ty.erp.entitys.entity.SystemConfig;
import com.ty.erp.services.common.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



/**
 * Created by admin on 2014/8/13.
 */
@Service
public class SystemConfigService extends BaseService {
    //    @Autowired
//    SystemConfigService serviceSystemConfig;
    @Autowired
    private SystemConfigDao dao;

    public SystemConfig Get(ServiceContext serviceContext, Long RowId) {
        return dao.GetByParamId(serviceContext.getTenantRowId(), RowId);
    }


}
