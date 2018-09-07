package com.ty.erp.entitys.entity;

import com.ty.erp.entitys.common.BaseEntity;

import java.io.Serializable;

public class OperatorConfigRole implements BaseEntity, Serializable {
    public OperatorConfigRole() {
        setIsRepeatPrintExpressOrder(false);
        setIsRepeatPrintDeliveryOrder(false);
    }

    private long TenantRowId;
    public long getTenantRowId() {
        return TenantRowId;
    }

    public void setTenantRowId(long tenantRowId) {
        TenantRowId = tenantRowId;
    }
    /**
     * 主键|| 关联员工主键
     */
    private long RowId;


    /**
     * 操作员
     */
    private long OperatorRowId;


    /**
     * 重打物流单
     */
    private boolean IsRepeatPrintExpressOrder;


    /**
     * 重打发货单
     */
    private boolean IsRepeatPrintDeliveryOrder;
    /**
     * 全部盘点权限
     */
    private boolean IsAllInvTaking;
    /**
     * 平台下载新增商品
     */
    private boolean IsPlatDownProductAdd;

    public boolean getIsPlatDownProductAdd() {
        return IsPlatDownProductAdd;
    }

    public void setIsPlatDownProductAdd(boolean platDownProductAdd) {
        IsPlatDownProductAdd = platDownProductAdd;
    }

    public boolean getIsAllInvTaking() {
        return IsAllInvTaking;
    }

    public void setIsAllInvTaking(boolean allInvTaking) {
        IsAllInvTaking = allInvTaking;
    }

    /**
     * 主键|| 关联员工主键
     */
    public long getRowId() {

        return this.RowId;
    }

    public void setRowId(long RowId) {
        this.RowId = RowId;
    }


    /**
     * 操作员
     */
    public long getOperatorRowId() {

        return this.OperatorRowId;
    }

    public void setOperatorRowId(long OperatorRowId) {
        this.OperatorRowId = OperatorRowId;
    }


    /**
     * 重打物流单
     */
    public boolean getIsRepeatPrintExpressOrder() {

        return this.IsRepeatPrintExpressOrder;
    }

    public void setIsRepeatPrintExpressOrder(boolean IsRepeatPrintExpressOrder) {
        this.IsRepeatPrintExpressOrder = IsRepeatPrintExpressOrder;
    }


    /**
     * 重打发货单
     */
    public boolean getIsRepeatPrintDeliveryOrder() {

        return this.IsRepeatPrintDeliveryOrder;
    }

    public void setIsRepeatPrintDeliveryOrder(boolean IsRepeatPrintDeliveryOrder) {
        this.IsRepeatPrintDeliveryOrder = IsRepeatPrintDeliveryOrder;
    }

}