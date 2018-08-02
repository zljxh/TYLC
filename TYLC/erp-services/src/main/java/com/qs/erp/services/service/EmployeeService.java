package com.qs.erp.services.service;

import com.qs.erp.common.ServiceContext;
import com.qs.erp.daos.dao.EmployeeDao;
import com.qs.erp.entitys.entity.*;
import com.qs.erp.services.common.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * implements baseAopService<Employee>
 * Created by admin on 2014/8/13.
 */
@Service
public class EmployeeService extends BaseService {
    @Autowired
    private EmployeeDao dao;

    public Employee Get(ServiceContext serviceContext, long RowId) {
        if (RowId == 0)
            return null;
        return dao.Get(serviceContext.getTenantRowId(), RowId);
    }


}
