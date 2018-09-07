package com.ty.erp.services.service;

import com.ty.erp.daos.dao.OperatorLoginLogDao;
import com.ty.erp.entitys.entity.OperatorLoginLog;
import com.ty.erp.services.common.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



/**
 * Created by admin on 2014/8/13.
 */
@Service
public class OperatorLoginLogService extends BaseService {
    @Autowired
    private OperatorLoginLogDao dao;

    public void Save(OperatorLoginLog entity) {
        if (entity.getRowId() == 0) {
                long RowId = this.db.NewId();
                entity.setRowId(RowId);
                entity.setCreateDate(this.getDate());
                entity.setOperatorRowId(this.getOperatorRowId());
                dao.Create(entity);
        } else {
            dao.Update(entity);
        }

    }


}
