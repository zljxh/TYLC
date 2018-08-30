package com.qs.erp.services.service;

import com.qs.erp.common.ServiceContext;
import com.qs.erp.daos.dao.CartoonDao;
import com.qs.erp.daos.dao.CartoonDetailDao;
import com.qs.erp.daos.dao.CartoontypesDao;
import com.qs.erp.entitys.businessmodel.CallResult;
import com.qs.erp.entitys.businessmodel.Role.CartoonDetailMasterSlave;
import com.qs.erp.entitys.businessmodel.Role.CartoonMasterSlave;
import com.qs.erp.entitys.entity.Cartoon;
import com.qs.erp.entitys.entity.CartoonDetail;
import com.qs.erp.entitys.entity.Cartoontypes;
import com.qs.erp.services.businessmodel.PageQueryParameters;
import com.qs.erp.utils.util.Snowflake.FactoryIdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CartoonDetailService {
    @Autowired
    CartoonDetailDao dao;

    public List<CartoonDetail> getByCartoonRowId(long CartoonRowId) {
        return dao.getByCartoonRowId(CartoonRowId);
    }

    public List<CartoonDetail> getPage(PageQueryParameters parameter) {
        return dao.getList();
    }

    public CartoonDetail Get(long RowId) {
        return dao.Get(RowId);
    }

    public CallResult Save(ServiceContext context, CartoonDetailMasterSlave slave) {
        CallResult callResult = new CallResult();

        return callResult;
    }

}
