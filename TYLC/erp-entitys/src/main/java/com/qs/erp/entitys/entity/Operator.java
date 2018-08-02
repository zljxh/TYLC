package com.qs.erp.entitys.entity;

import com.qs.erp.utils.util.DateHelp;

import java.util.Date;

public class Operator {
    public Operator() {
        setAccount("");
        setPassword("");
        setCreateDate(DateHelp.getDefaultDate());
        setCreater("");
        setSalt("");

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
     * 账号
     */
    private String Account;


    /**
     * 密码
     */
    private String Password;


    /**
     * 启用||启用=1 0=禁用
     */
    private boolean IsEnabled;


    /**
     * 创建时间
     */
    private Date CreateDate;


    /**
     * 创建人
     */
    private String Creater;


    /**
     * 掩
     */
    private String Salt;
    /*
  *系统设置
  * */
    private boolean IsSystem;

    public boolean getIsSystem() {
        return this.IsSystem;
    }

    public void setIsSystem(boolean isSystem) {
        this.IsSystem = isSystem;
    }

    /**
     * 主键|| 关联员工主键
     */
    public long getRowId() {

        return this.RowId;
    }

    public void setRowId(long RowId) {
        this.RowId = RowId;
        ;
    }


    /**
     * 账号
     */
    public String getAccount() {

        return this.Account;
    }

    public void setAccount(String Account) {
        this.Account = Account;
        ;
    }


    /**
     * 密码
     */
    public String getPassword() {

        return this.Password;
    }

    public void setPassword(String Password) {
        this.Password = Password;
        ;
    }


    /**
     * 启用||启用=1 0=禁用
     */
    public boolean getIsEnabled() {

        return this.IsEnabled;
    }

    public void setIsEnabled(boolean IsEnabled) {
        this.IsEnabled = IsEnabled;
        ;
    }


    /**
     * 创建时间
     */
    public Date getCreateDate() {

        return this.CreateDate;
    }

    public void setCreateDate(Date CreateDate) {
        this.CreateDate = CreateDate;
        ;
    }


    /**
     * 创建人
     */
    public String getCreater() {

        return this.Creater;
    }

    public void setCreater(String Creater) {
        this.Creater = Creater;
        ;
    }


    /**
     * 掩
     */
    public String getSalt() {

        return this.Salt;
    }

    public void setSalt(String Salt) {
        this.Salt = Salt;
        ;
    }

}