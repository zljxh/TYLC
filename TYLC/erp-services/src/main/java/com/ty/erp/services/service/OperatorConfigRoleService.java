package com.ty.erp.services.service;


import com.ty.erp.services.common.BaseService;
import org.springframework.stereotype.Service;



/**
 * Created by admin on 2014/8/13.
 */
@Service
public class OperatorConfigRoleService extends BaseService {

    public Object getOperatorConfig(Long OperatorRowId) {
        String sql = "SELECT OperatorConfigRole.* FROM OperatorConfigRole  where OperatorConfigRole.OperatorRowId=" + OperatorRowId + " limit 0,1";

        return db.ExecuteRowSet(sql);
    }
}
