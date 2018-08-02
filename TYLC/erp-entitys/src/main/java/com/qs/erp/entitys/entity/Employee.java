package com.qs.erp.entitys.entity;

import com.qs.erp.entitys.common.BaseEntity;
import com.qs.erp.utils.util.DateHelp;

import java.io.Serializable;
import java.util.Date;

public class Employee implements BaseEntity, Serializable {
    public Employee() {
        setCode("");
        setName("");
        setLeader("");
        setEmployeDate(DateHelp.getDefaultDate());
        setMobile("");
        setPhone("");
        setCreateDate(DateHelp.getDefaultDate());
        setCreater("");
        setRemark("");
        setPinYin("");
        setSupplierRowId(0);


    }

    private long TenantRowId;

    //add by banchao 0429 有值的话会应用供应商订单列表查询数据的权限
    private long SupplierRowId;//供应商Id

    /**
     * 主键
     */
    private long RowId;


    /**
     * 员工编号
     */
    private String Code;


    /**
     * 员工名称
     */
    private String Name;


    /**
     * 性别
     */
    private int Sex;


    /**
     * 部门名称
     */
    private long DepartmentRowId;


    /**
     * 上级主管
     */
    private String Leader;


    /**
     * 入职时间||
     */
    private Date EmployeDate;


    /**
     * 离职=1  未离职=0
     */
    private boolean IsleaveOffice;


    /**
     * 手机
     */
    private String Mobile;


    /**
     * 座机
     */
    private String Phone;

    public boolean getIsGuest() {
        return IsGuest;
    }

    public void setIsGuest(boolean IsGuest) {
        this.IsGuest = IsGuest;
    }

    /*
        *客服
        * */
    private boolean IsGuest;


    /**
     * 创建时间
     */
    private Date CreateDate;


    /**
     * 创建人
     */
    private String Creater;


    /**
     * 备注
     */
    private String Remark;


    /**
     * 拼音
     */
    private String PinYin;

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

    /*
    * 1=启用
    * 0=停用
    * */
    private boolean IsEnabled;

    public boolean getIsEnabled() {
        return this.IsEnabled;
    }

    public void setIsEnabled(boolean isEnabled) {
        this.IsEnabled = isEnabled;
    }

    /*
     * 角色
     * */

    private long RoleRowId;

    public long getRoleRowId() {
        return RoleRowId;
    }

    public void setRoleRowId(long roleRowId) {
        RoleRowId = roleRowId;
    }

    /**
     * 主键
     */
    public long getRowId() {

        return this.RowId;
    }

    public void setRowId(long RowId) {
        this.RowId = RowId;
        ;
    }


    /**
     * 员工编号
     */
    public String getCode() {

        return this.Code;
    }

    public void setCode(String Code) {
        this.Code = Code;
        ;
    }


    /**
     * 员工名称
     */
    public String getName() {

        return this.Name;
    }

    public void setName(String Name) {
        this.Name = Name;
        ;
    }


    /**
     * 性别
     */
    public int getSex() {

        return this.Sex;
    }

    public void setSex(int Sex) {
        this.Sex = Sex;
        ;
    }


    /**
     * 部门名称
     */
    public long getDepartmentRowId() {

        return this.DepartmentRowId;
    }

    public void setDepartmentRowId(long DepartmentRowId) {
        this.DepartmentRowId = DepartmentRowId;
        ;
    }


    /**
     * 上级主管
     */
    public String getLeader() {

        return this.Leader;
    }

    public void setLeader(String Leader) {
        this.Leader = Leader;
        ;
    }


    /**
     * 入职时间||
     */
    public Date getEmployeDate() {

        return this.EmployeDate;
    }

    public void setEmployeDate(Date EmployeDate) {
        this.EmployeDate = EmployeDate;
        ;
    }


    /**
     * 离职=1  未离职=0
     */
    public boolean getIsleaveOffice() {

        return this.IsleaveOffice;
    }

    public void setIsleaveOffice(boolean IsleaveOffice) {
        this.IsleaveOffice = IsleaveOffice;
        ;
    }


    /**
     * 手机
     */
    public String getMobile() {

        return this.Mobile;
    }

    public void setMobile(String Mobile) {
        this.Mobile = Mobile;
        ;
    }


    /**
     * 座机
     */
    public String getPhone() {

        return this.Phone;
    }

    public void setPhone(String Phone) {
        this.Phone = Phone;
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
     * 备注
     */
    public String getRemark() {

        return this.Remark;
    }

    public void setRemark(String Remark) {
        this.Remark = Remark;
        ;
    }


    /**
     * 拼音
     */
    public String getPinYin() {

        return this.PinYin;
    }

    public void setPinYin(String PinYin) {
        this.PinYin = PinYin;
        ;
    }

    public long getSupplierRowId() {
        return SupplierRowId;
    }

    public void setSupplierRowId(long supplierRowId) {
        SupplierRowId = supplierRowId;
    }

    public long getTenantRowId() {
        return TenantRowId;
    }

    public void setTenantRowId(long tenantRowId) {
        TenantRowId = tenantRowId;
    }
}