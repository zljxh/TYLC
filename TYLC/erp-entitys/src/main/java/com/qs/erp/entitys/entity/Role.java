package com.qs.erp.entitys.entity;

import com.qs.erp.entitys.common.BaseEntity;
import com.qs.erp.utils.util.DateHelp;

import java.io.Serializable;
import java.util.Date;

public class Role implements BaseEntity,Serializable
{
   public Role()
    {
        setCode(""); 
        setName(""); 
        setCreateDate(DateHelp.getDefaultDate());
        setCreater(""); 
        setRemark(""); 
        setPinyin(""); 

    }
    private long TenantRowId;
    public long getTenantRowId() {
        return TenantRowId;
    }

    public void setTenantRowId(long tenantRowId) {
        TenantRowId = tenantRowId;
    }
    
 /**
主键
        */
     private long RowId;
    
    
 /**
角色代码||不能为空 不能重复
        */
     private String Code;
    
    
 /**
角色名称||不能为空 不能重复
        */
     private String Name;
    
    
 /**
启用||启用=1 0=禁用
        */
     private boolean IsEnabled;
    
    
 /**
创建时间
        */
     private Date CreateDate;
    
    
 /**
创建人
        */
     private String Creater;
    
    
 /**
显示顺序
        */
     private int DisplayNum;
    
    
 /**
备注
        */
     private String Remark;
    
    
 /**
拼音
        */
     private String Pinyin;
    
        
         /**
           主键
        */
        public long getRowId()
        {
         
        return this.RowId;
        }
        public void setRowId(long RowId)
        {
         this.RowId=RowId;;
        }
    
        
         /**
           角色代码||不能为空 不能重复
        */
        public String getCode()
        {
         
        return this.Code;
        }
        public void setCode(String Code)
        {
         this.Code=Code;;
        }
    
        
         /**
           角色名称||不能为空 不能重复
        */
        public String getName()
        {
         
        return this.Name;
        }
        public void setName(String Name)
        {
         this.Name=Name;;
        }
    
        
         /**
           启用||启用=1 0=禁用
        */
        public boolean getIsEnabled()
        {
         
        return this.IsEnabled;
        }
        public void setIsEnabled(boolean IsEnabled)
        {
         this.IsEnabled=IsEnabled;;
        }
    
        
         /**
           创建时间
        */
        public Date getCreateDate()
        {
         
        return this.CreateDate;
        }
        public void setCreateDate(Date CreateDate)
        {
         this.CreateDate=CreateDate;;
        }
    
        
         /**
           创建人
        */
        public String getCreater()
        {
         
        return this.Creater;
        }
        public void setCreater(String Creater)
        {
         this.Creater=Creater;;
        }
    
        
         /**
           显示顺序
        */
        public int getDisplayNum()
        {
         
        return this.DisplayNum;
        }
        public void setDisplayNum(int DisplayNum)
        {
         this.DisplayNum=DisplayNum;;
        }
    
        
         /**
           备注
        */
        public String getRemark()
        {
         
        return this.Remark;
        }
        public void setRemark(String Remark)
        {
         this.Remark=Remark;;
        }
    
        
         /**
           拼音
        */
        public String getPinyin()
        {
         
        return this.Pinyin;
        }
        public void setPinyin(String Pinyin)
        {
         this.Pinyin=Pinyin;;
        }
    
}