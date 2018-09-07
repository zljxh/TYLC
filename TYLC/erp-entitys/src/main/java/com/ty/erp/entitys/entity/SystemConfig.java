package com.ty.erp.entitys.entity;

import com.ty.erp.entitys.common.BaseEntity;
import com.ty.erp.utils.util.DateHelp;

import java.io.Serializable;
import java.util.Date;

public class SystemConfig implements BaseEntity, Serializable {
    public SystemConfig() {
        setKeyName("");
        setKeyCode("");
        setKeyValue("");
        setConfigTypeName("");
        setRemark("");
        setCreater("");
        setCreateDate(DateHelp.getDefaultDate());

    }

    private long TenantRowId;

    public long getTenantRowId() {
        return TenantRowId;
    }

    public void setTenantRowId(long tenantRowId) {
        TenantRowId = tenantRowId;
    }

    /**
     * 主键
     */
    private long RowId;


    /**
     * 参数名称
     */
    private String KeyName;


    /**
     * 参数代码||唯一
     */
    private String KeyCode;


    /**
     * 参数值
     */
    private String KeyValue;


    /**
     * 参数类型名称
     */
    private String ConfigTypeName;


    /**
     * 描述
     */
    private String Remark;


    /**
     * 显示顺序
     */
    private int DisplayNum;


    /**
     * 创建人
     */
    private String Creater;


    /**
     * 创建时间
     */
    private Date CreateDate;


    /**
     * 主键
     */
    public long getRowId() {

        return this.RowId;
    }

    public void setRowId(long RowId) {
        this.RowId = RowId;
    }


    /**
     * 参数名称
     */
    public String getKeyName() {

        return this.KeyName;
    }

    public void setKeyName(String KeyName) {
        if (KeyName != null) {
            this.KeyName = KeyName;
        } else {
            this.KeyName = "";
        }

    }


    /**
     * 参数代码||唯一
     */
    public String getKeyCode() {

        return this.KeyCode;
    }

    public void setKeyCode(String KeyCode) {
        if (KeyCode != null) {
            this.KeyCode = KeyCode;
        } else {
            this.KeyCode = "";
        }

    }


    /**
     * 参数值
     */
    public String getKeyValue() {

        return this.KeyValue;
    }

    public void setKeyValue(String KeyValue) {
        if (KeyValue != null) {
            this.KeyValue = KeyValue;
        } else {
            this.KeyValue = "";
        }

    }


    /**
     * 参数类型名称
     */
    public String getConfigTypeName() {

        return this.ConfigTypeName;
    }

    public void setConfigTypeName(String ConfigTypeName) {
        if (ConfigTypeName != null) {
            this.ConfigTypeName = ConfigTypeName;
        } else {
            this.ConfigTypeName = "";
        }

    }


    /**
     * 描述
     */
    public String getRemark() {

        return this.Remark;
    }

    public void setRemark(String Remark) {
        if (Remark != null) {
            this.Remark = Remark;
        } else {
            this.Remark = "";
        }

    }


    /**
     * 显示顺序
     */
    public int getDisplayNum() {

        return this.DisplayNum;
    }

    public void setDisplayNum(int DisplayNum) {
        this.DisplayNum = DisplayNum;
    }


    /**
     * 创建人
     */
    public String getCreater() {

        return this.Creater;
    }

    public void setCreater(String Creater) {
        if (Creater != null) {
            this.Creater = Creater;
        } else {
            this.Creater = "";
        }

    }


    /**
     * 创建时间
     */
    public Date getCreateDate() {

        return this.CreateDate;
    }

    public void setCreateDate(Date CreateDate) {
        if (CreateDate != null) {
            this.CreateDate = CreateDate;
        } else {
            this.CreateDate = DateHelp.getDefaultDate();
        }

    }

    public long getParamId() {
        return ParamId;
    }

    public void setParamId(long paramId) {
        ParamId = paramId;
    }

    private long ParamId;

}