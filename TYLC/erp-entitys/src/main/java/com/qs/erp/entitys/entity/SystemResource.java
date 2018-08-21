package com.qs.erp.entitys.entity;

import com.qs.erp.entitys.common.BaseEntity;

import java.io.Serializable;

public class SystemResource implements BaseEntity, Serializable {
    public SystemResource() {
        setCode("");
        setName("");
        setTypeName("");
        setPathName("");
        setParentRowIds("");
        setPermission("");
        setPinyin("");
        setFullCode("");

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
     * 代码
     */
    private String Code;


    /**
     * 名称
     */
    private String Name;


    /**
     * 类型名称
     */
    private String TypeName;


    /**
     * 功能地址
     */
    private String PathName;


    /**
     * 上级主键
     */
    private long ParentRowId;


    /**
     * 所有上级主键
     */
    private String ParentRowIds;


    /**
     * 权限
     */
    private String Permission;


    /**
     * 启用||启用=1 0=禁用
     */
    private boolean IsEnabled;


    /**
     * 拼音
     */
    private String Pinyin;


    /**

     */
    private String FullCode;


    /**
     * 显示顺序
     */
    private int DisplayNum;


    /**
     * 下拉类型 0:级联菜单1：面板菜单
     */
    private int DropdownType;


    /*
    * 1=Cs 0=Bs
    * */
    private boolean IsCS;

    public boolean getIsCS() {
        return this.IsCS;
    }

    public void setIsCS(boolean isCS) {
        this.IsCS = isCS;
    }


    public String getAssemblyPath() {
        return AssemblyPath;
    }

    public void setAssemblyPath(String assemblyPath) {
        AssemblyPath = assemblyPath;
    }

    /*
        * 程序集
        * */
    private String AssemblyPath;


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
     * 代码
     */
    public String getCode() {

        return this.Code;
    }

    public void setCode(String Code) {
        if (Code != null) {
            this.Code = Code;
        } else {
            this.Code = "";
        }

    }


    /**
     * 名称
     */
    public String getName() {

        return this.Name;
    }

    public void setName(String Name) {
        if (Name != null) {
            this.Name = Name;
        } else {
            this.Name = "";
        }

    }


    /**
     * 类型名称
     */
    public String getTypeName() {

        return this.TypeName;
    }

    public void setTypeName(String TypeName) {
        if (TypeName != null) {
            this.TypeName = TypeName;
        } else {
            this.TypeName = "";
        }

    }


    /**
     * 功能地址
     */
    public String getPathName() {

        return this.PathName;
    }

    public void setPathName(String PathName) {
        if (PathName != null) {
            this.PathName = PathName;
        } else {
            this.PathName = "";
        }

    }


    /**
     * 上级主键
     */
    public long getParentRowId() {

        return this.ParentRowId;
    }

    public void setParentRowId(long ParentRowId) {
        this.ParentRowId = ParentRowId;
    }


    /**
     * 所有上级主键
     */
    public String getParentRowIds() {

        return this.ParentRowIds;
    }

    public void setParentRowIds(String ParentRowIds) {
        if (ParentRowIds != null) {
            this.ParentRowIds = ParentRowIds;
        } else {
            this.ParentRowIds = "";
        }

    }


    /**
     * 权限
     */
    public String getPermission() {

        return this.Permission;
    }

    public void setPermission(String Permission) {
        if (Permission != null) {
            this.Permission = Permission;
        } else {
            this.Permission = "";
        }

    }


    /**
     * 启用||启用=1 0=禁用
     */
    public boolean getIsEnabled() {

        return this.IsEnabled;
    }

    public void setIsEnabled(boolean IsEnabled) {
        this.IsEnabled = IsEnabled;
    }


    /**
     * 拼音
     */
    public String getPinyin() {

        return this.Pinyin;
    }

    public void setPinyin(String Pinyin) {
        if (Pinyin != null) {
            this.Pinyin = Pinyin;
        } else {
            this.Pinyin = "";
        }

    }


    /**

     */
    public String getFullCode() {

        return this.FullCode;
    }

    public void setFullCode(String FullCode) {
        if (FullCode != null) {
            this.FullCode = FullCode;
        } else {
            this.FullCode = "";
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
     * 下拉类型 0:级联菜单1：面板菜单
     */
    public int getDropdownType() {

        return this.DropdownType;
    }

    public void setDropdownType(int DropdownType) {
        this.DropdownType = DropdownType;
    }

    /*
    *库位类型 0=普通类型 1=批次 2=唯一码
    * */

    public int getTypeStatus() {
        return TypeStatus;
    }

    public void setTypeStatus(int typeStatus) {
        TypeStatus = typeStatus;
    }

    private int TypeStatus;

    private boolean Checked;

    public boolean isChecked() {
        return Checked;
    }

    public void setChecked(boolean checked) {
        Checked = checked;
    }

}