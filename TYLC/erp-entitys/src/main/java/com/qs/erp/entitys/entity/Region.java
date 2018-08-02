package com.qs.erp.entitys.entity;

import com.qs.erp.entitys.common.BaseEntity;
import com.qs.erp.utils.util.DateHelp;

import java.io.Serializable;
import java.util.Date;

public class Region implements BaseEntity, Serializable {
    public Region() {
        setCode("");
        setName("");
        setFullName("");
        setCreateDate(DateHelp.getDefaultDate());
        setCreater("");
        setAiasName1("");
        setAiasName2("");
        setAiasName3("");
        setAiasName4("");
        setAiasName5("");
        setPinyin("");
        setZip("");
        setShunFenName("");

    }
    private long TenantRowId;
    public long getTenantRowId() {
        return 0;
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
     * 父主键
     */
    private long ParentRowId;


    /**
     * 直辖市
     */
    private boolean IsDirectCity;


    /**
     * 子节点
     */
    private boolean IsChildNode;


    /**
     * 全名称
     */
    private String FullName;


    /**
     * 创建时间
     */
    private Date CreateDate;


    /**
     * 创建人
     */
    private String Creater;


    /**
     * 别名1
     */
    private String AiasName1;


    /**
     * 别名2
     */
    private String AiasName2;


    /**
     * 别名3
     */
    private String AiasName3;


    /**
     * 别名4
     */
    private String AiasName4;


    /**
     * 别名4
     */
    private String AiasName5;


    /**
     * 拼音
     */
    private String Pinyin;


    /**

     */
    private long RegionTypeRowId;


    /**
     * 邮编
     */
    private String Zip;


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
     * 父主键
     */
    public long getParentRowId() {

        return this.ParentRowId;
    }

    public void setParentRowId(long ParentRowId) {
        this.ParentRowId = ParentRowId;
    }


    /**
     * 直辖市
     */
    public boolean getIsDirectCity() {

        return this.IsDirectCity;
    }

    public void setIsDirectCity(boolean IsDirectCity) {
        this.IsDirectCity = IsDirectCity;
    }


    /**
     * 子节点
     */
    public boolean getIsChildNode() {

        return this.IsChildNode;
    }

    public void setIsChildNode(boolean IsChildNode) {
        this.IsChildNode = IsChildNode;
    }


    /**
     * 全名称
     */
    public String getFullName() {

        return this.FullName;
    }

    public void setFullName(String FullName) {
        if (FullName != null) {
            this.FullName = FullName;
        } else {
            this.FullName = "";
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
     * 别名1
     */
    public String getAiasName1() {

        return this.AiasName1;
    }

    public void setAiasName1(String AiasName1) {
        if (AiasName1 != null) {
            this.AiasName1 = AiasName1;
        } else {
            this.AiasName1 = "";
        }

    }


    /**
     * 别名2
     */
    public String getAiasName2() {

        return this.AiasName2;
    }

    public void setAiasName2(String AiasName2) {
        if (AiasName2 != null) {
            this.AiasName2 = AiasName2;
        } else {
            this.AiasName2 = "";
        }

    }


    /**
     * 别名3
     */
    public String getAiasName3() {

        return this.AiasName3;
    }

    public void setAiasName3(String AiasName3) {
        if (AiasName3 != null) {
            this.AiasName3 = AiasName3;
        } else {
            this.AiasName3 = "";
        }

    }


    /**
     * 别名4
     */
    public String getAiasName4() {

        return this.AiasName4;
    }

    public void setAiasName4(String AiasName4) {
        if (AiasName4 != null) {
            this.AiasName4 = AiasName4;
        } else {
            this.AiasName4 = "";
        }

    }


    /**
     * 别名4
     */
    public String getAiasName5() {

        return this.AiasName5;
    }

    public void setAiasName5(String AiasName5) {
        if (AiasName5 != null) {
            this.AiasName5 = AiasName5;
        } else {
            this.AiasName5 = "";
        }

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
    public long getRegionTypeRowId() {

        return this.RegionTypeRowId;
    }

    public void setRegionTypeRowId(long RegionTypeRowId) {
        this.RegionTypeRowId = RegionTypeRowId;
    }


    /**
     * 邮编
     */
    public String getZip() {

        return this.Zip;
    }

    public void setZip(String Zip) {
        if (Zip != null) {
            this.Zip = Zip;
        } else {
            this.Zip = "";
        }

    }

    public String getRegionShortName() {
        return RegionShortName;
    }

    public void setRegionShortName(String regionShortName) {
        RegionShortName = regionShortName;
    }

    /*
        *省简称
        * */
    private String RegionShortName;

    private boolean IsStop;

    public boolean getIsStop() {
        return this.IsStop;
    }

    public void setIsStop(boolean IsStop) {
        this.IsStop = IsStop;
    }

    public String getShunFenName() {
        return ShunFenName;
    }

    public void setShunFenName(String shunFenName) {
        ShunFenName = shunFenName;
    }

    /*
        * 顺丰地址名称
        * */
    private String ShunFenName;

}