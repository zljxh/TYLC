package com.qs.erp.entitys.businessmodel.Role;

import com.qs.erp.entitys.entity.Cartoon;
import com.qs.erp.entitys.entity.CartoonDetail;
import com.qs.erp.entitys.entity.CartoonDetailChapter;

import java.util.List;

public class CartoonDetailMasterSlave {
    private CartoonDetail SellOrder;
    private List<CartoonDetailChapter> sellOrderDetailSet;
    private List<Long> DeleteDetailIdSet;


    public CartoonDetail getSellOrder() {
        return SellOrder;
    }

    public void setSellOrder(CartoonDetail sellOrder) {
        SellOrder = sellOrder;
    }

    public List<CartoonDetailChapter> getSellOrderDetailSet() {
        return sellOrderDetailSet;
    }

    public void setSellOrderDetailSet(List<CartoonDetailChapter> sellOrderDetailSet) {
        this.sellOrderDetailSet = sellOrderDetailSet;
    }

    public List<Long> getDeleteDetailIdSet() {
        return DeleteDetailIdSet;
    }

    public void setDeleteDetailIdSet(List<Long> deleteDetailIdSet) {
        DeleteDetailIdSet = deleteDetailIdSet;
    }
}
