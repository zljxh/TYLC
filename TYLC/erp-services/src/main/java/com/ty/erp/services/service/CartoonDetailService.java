package com.ty.erp.services.service;

import com.ty.erp.common.ServiceContext;
import com.ty.erp.daos.dao.CartoonDetailChapterDao;
import com.ty.erp.daos.dao.CartoonDetailDao;
import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.businessmodel.Role.CartoonDetailMasterSlave;
import com.ty.erp.entitys.entity.CartoonDetail;
import com.ty.erp.entitys.entity.CartoonDetailChapter;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.utils.util.Snowflake.FactoryIdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartoonDetailService {
    @Autowired
    CartoonDetailDao dao;
    @Autowired
    CartoonDetailChapterDao cartoonDetailChapterDao;

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
        if (slave.getSellOrder() != null) {
            CartoonDetail detail = slave.getSellOrder();
            dao.Update(detail);
        }
        if (slave.getSellOrderDetailSet() != null) {
            List<CartoonDetailChapter> chapters = slave.getSellOrderDetailSet();
            for (CartoonDetailChapter chapter : chapters) {
                if (chapter.getRowId() != 0) {
                    cartoonDetailChapterDao.Update(chapter);
                } else {
                    chapter.setDes("");
                    chapter.setCartoondetailRowId(slave.getSellOrder().getRowId());
                    chapter.setRowId(FactoryIdWorker.NextId());
                    cartoonDetailChapterDao.Save(chapter);
                }
            }
        }
        return callResult;
    }


}
