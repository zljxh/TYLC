package com.qs.erp.services.service;

import com.qs.erp.common.ServiceContext;
import com.qs.erp.daos.dao.SystemConfigDao;
import com.qs.erp.entitys.entity.SystemConfig;
import com.qs.erp.services.common.BaseService;
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
