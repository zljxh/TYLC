package com.ty.erp.services.service;

import com.ty.erp.common.ServiceContext;
import com.ty.erp.daos.dao.CartoonDao;
import com.ty.erp.daos.dao.CartoonDetailDao;
import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.businessmodel.Role.CartoonMasterSlave;
import com.ty.erp.entitys.entity.Cartoon;
import com.ty.erp.entitys.entity.CartoonDetail;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.utils.util.Snowflake.FactoryIdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CartoonService {
    @Autowired
    CartoonDao dao;

    @Autowired
    CartoonDetailDao cartoonDetailDao;

    @Autowired
    TypeService typeService;

    public List getPage(PageQueryParameters parameter) {
        List list = new ArrayList();

        return dao.getList();
    }

    public long getcount(PageQueryParameters parameter) {
        return dao.getcount();
    }

    public CallResult Save(ServiceContext currentContext, CartoonMasterSlave slave) {
        CallResult callResult = new CallResult();
        long cartoonRowId = 0;
        if (slave.getSellOrder().getRowId() == 0) {
            Cartoon cartoon = slave.getSellOrder();
            cartoon.setRowId(FactoryIdWorker.NextId());
            cartoon.setCreater(currentContext.getUserName());
            cartoon.setCreateTime(new Date());
            cartoon.setUpdateTime(new Date());
            cartoon.setEnable(1);

            cartoonRowId = cartoon.getRowId();
            dao.Create(cartoon);
            typeService.saveTypes(cartoon.getRowId(), cartoon.getTypeRowId());
        } else {
            slave.getSellOrder().setEnable(1);
            cartoonRowId = slave.getSellOrder().getRowId();
            dao.Update(slave.getSellOrder());
            typeService.saveTypes(slave.getSellOrder().getRowId(), slave.getSellOrder().getTypeRowId());
        }

        for (CartoonDetail detail : slave.getSellOrderDetailSet()) {
            if (detail.getRowId() == 0) {
                detail.setRowId(FactoryIdWorker.NextId());
                detail.setCreateTime(new Date());
                detail.setCartoonRowId(cartoonRowId);
                cartoonDetailDao.Save(detail);
            } else {
//                cartoonDetailDao.Update(detail);
            }
        }

        if (slave.getDeleteDetailIdSet() != null) {

        }

        return callResult;
    }

    public void changeEnable(long rowid) {
        dao.changeEnable(rowid);
    }

    public Cartoon Get(Long rowid) {
        return dao.Get(rowid);
    }


}
