package com.qs.erp.entitys.businessmodel.Role;

import com.qs.erp.entitys.entity.Cartoon;
import com.qs.erp.entitys.entity.CartoonDetail;

import java.util.List;

public class CartoonMasterSlave {
    private Cartoon SellOrder;
    private List<CartoonDetail> sellOrderDetailSet;
    private List<Long> DeleteDetailIdSet;

    public Cartoon getSellOrder() {
        return SellOrder;
    }

    public void setSellOrder(Cartoon sellOrder) {
        SellOrder = sellOrder;
    }

    public List<CartoonDetail> getSellOrderDetailSet() {
        return sellOrderDetailSet;
    }

    public void setSellOrderDetailSet(List<CartoonDetail> sellOrderDetailSet) {
        this.sellOrderDetailSet = sellOrderDetailSet;
    }

    public List<Long> getDeleteDetailIdSet() {
        return DeleteDetailIdSet;
    }

    public void setDeleteDetailIdSet(List<Long> deleteDetailIdSet) {
        DeleteDetailIdSet = deleteDetailIdSet;
    }
}
