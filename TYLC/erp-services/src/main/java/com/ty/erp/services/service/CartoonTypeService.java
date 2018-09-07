package com.ty.erp.services.service;

import com.ty.erp.daos.dao.CartoonTypeDao;
import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.entity.CartoonType;
import com.ty.erp.services.common.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartoonTypeService extends BaseService {
    @Autowired
    CartoonTypeDao cartoonTypeDao;

    public List<CartoonType> getLists() {
        return cartoonTypeDao.getLists();
    }

    public CallResult Save(CartoonType type) {
        CallResult callResult = new CallResult();
        cartoonTypeDao.Save(type);
        return callResult;
    }

    public boolean delete(long rowid) {
        cartoonTypeDao.delete(rowid);
        return true;
    }

    public boolean update(long rowid) {
        cartoonTypeDao.update(rowid);
        return true;
    }

    public CartoonType Get(long rowid) {
        return cartoonTypeDao.Get(rowid);
    }


    public boolean NotEXISTSName(Long RowId, String Name) {
        String sql = "select count(*) from CartoonType where Name=? and RowId!=? limit 1";
        long c = db.ExecuteForLong(sql, new Object[]{Name, RowId});
        return c == 0;
    }
}
