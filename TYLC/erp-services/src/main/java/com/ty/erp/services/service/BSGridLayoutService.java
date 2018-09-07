package com.ty.erp.services.service;

import com.ty.erp.common.ServiceContext;
import com.ty.erp.daos.dao.BSGridLayoutDao;
import com.ty.erp.daos.daoext.BSGridLayoutExtDao;
import com.ty.erp.entitys.entity.BSGridLayout;
import com.ty.erp.services.common.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by xyyz150 on 2015/11/19.
 */
@Service
public class BSGridLayoutService extends BaseService {

    @Autowired
    BSGridLayoutExtDao extDao;
    @Autowired
    BSGridLayoutDao dao;

    public void save(ServiceContext serviceContext, BSGridLayout entity) {
        BSGridLayout old = extDao.getByOpeaterAndFormName(serviceContext.getTenantRowId(), getOperatorRowId(), entity.getFormName());
        if (old == null) {
            entity.setOpeaterRowId(getOperatorRowId());
            entity.setRowId(db.NewId());
            dao.create(entity);
        } else {
            old.setComColumn(entity.getComColumn());
            old.setFrozenColumn(entity.getFrozenColumn());
            dao.update(old);
        }
    }

    public BSGridLayout getByOpeaterAndFormName(ServiceContext serviceContext, String formname) {
        BSGridLayout bsGridLayout = extDao.getByOpeaterAndFormName(serviceContext.getTenantRowId(), getOperatorRowId(), formname);
        return bsGridLayout;
    }


}
