package com.qs.erp.services.service;

import com.qs.erp.common.ServiceContext;
import com.qs.erp.daos.dao.CartoonDao;
import com.qs.erp.daos.dao.CartoonTypeDao;
import com.qs.erp.daos.dao.CartoontypesDao;
import com.qs.erp.entitys.businessmodel.CallResult;
import com.qs.erp.entitys.businessmodel.Role.CartoonMasterSlave;
import com.qs.erp.entitys.entity.Cartoon;
import com.qs.erp.entitys.entity.Cartoontypes;
import com.qs.erp.services.businessmodel.PageQueryParameters;
import com.qs.erp.utils.util.Snowflake.FactoryIdWorker;
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
    CartoontypesDao cartoontypesDao;

    public List getPage(PageQueryParameters parameter) {
        List list = new ArrayList();

        return dao.getList();
    }

    public long getcount(PageQueryParameters parameter) {
        return dao.getcount();
    }

    public CallResult Save(ServiceContext currentContext, CartoonMasterSlave slave) {
        CallResult callResult = new CallResult();
        if (slave.getSellOrder().getRowId() == 0) {
            Cartoon cartoon = slave.getSellOrder();
            cartoon.setRowId(FactoryIdWorker.NextId());
            cartoon.setCreater(currentContext.getUserName());
            cartoon.setCreateTime(new Date());
            cartoon.setUpdateTime(new Date());
            cartoon.setEnable(1);
            dao.Create(cartoon);
            saveCartoontypesDao(cartoon.getRowId(),cartoon.getTypeRowId());
        } else {
            slave.getSellOrder().setEnable(1);
            dao.Update(slave.getSellOrder());
            saveCartoontypesDao(slave.getSellOrder().getRowId(),slave.getSellOrder().getTypeRowId());
        }

        return callResult;
    }

    public void changeEnable(long rowid){
     dao.changeEnable(rowid);
    }


    public void saveCartoontypesDao(long cartoonRowId,List<Long> cartoonTypeRowid){
        cartoontypesDao.Delete(cartoonRowId);
        for (Long rowid:cartoonTypeRowid){
            Cartoontypes cartoontypes=new Cartoontypes();
            cartoontypes.setRowId(FactoryIdWorker.NextId());
            cartoontypes.setCartoonRowId(cartoonRowId);
            cartoontypes.setCartoonTypeRowId(rowid);
            cartoontypesDao.Save(cartoontypes);
        }
    }
}
