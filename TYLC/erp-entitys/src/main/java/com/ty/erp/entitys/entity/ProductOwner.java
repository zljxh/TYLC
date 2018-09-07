package com.ty.erp.entitys.entity;

import com.ty.erp.entitys.common.BaseEntity;
import com.ty.erp.utils.util.DateHelp;

import java.io.Serializable;
import java.util.Date;

public class ProductOwner implements BaseEntity,Serializable
{
   public ProductOwner()
    {
        setCode(""); 
        setName(""); 
        setCompanyName(""); 
        setMobile(""); 
        setTelephone(""); 
        setZipCode(""); 
        setMailbox(""); 
        setAddress(""); 
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
代码
        */
     private String Code;
    
    
 /**
名称
        */
     private String Name;
    
    
 /**
状态||启用=1 0=停用
        */
     private boolean IsEnabled;
    
    
 /**
公司名称
        */
     private String CompanyName;
    
    
 /**
手机
        */
     private String Mobile;
    
    
 /**
电话
        */
     private String Telephone;
    
    
 /**
邮编
        */
     private String ZipCode;
    
    
 /**
邮箱
        */
     private String Mailbox;
    
    
 /**
地址
        */
     private String Address;
    
    
 /**
显示顺序
        */
     private int DisplayNum;
    
    
 /**
创建时间
        */
     private Date CreateDate;
    
    
 /**
创建人
        */
     private String Creater;
    
    
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
           代码
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
           名称
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
           状态||启用=1 0=停用
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
           公司名称
        */
        public String getCompanyName()
        {
         
        return this.CompanyName;
        }
        public void setCompanyName(String CompanyName)
        {
         this.CompanyName=CompanyName;;
        }
    
        
         /**
           手机
        */
        public String getMobile()
        {
         
        return this.Mobile;
        }
        public void setMobile(String Mobile)
        {
         this.Mobile=Mobile;;
        }
    
        
         /**
           电话
        */
        public String getTelephone()
        {
         
        return this.Telephone;
        }
        public void setTelephone(String Telephone)
        {
         this.Telephone=Telephone;;
        }
    
        
         /**
           邮编
        */
        public String getZipCode()
        {
         
        return this.ZipCode;
        }
        public void setZipCode(String ZipCode)
        {
         this.ZipCode=ZipCode;;
        }
    
        
         /**
           邮箱
        */
        public String getMailbox()
        {
         
        return this.Mailbox;
        }
        public void setMailbox(String Mailbox)
        {
         this.Mailbox=Mailbox;;
        }
    
        
         /**
           地址
        */
        public String getAddress()
        {
         
        return this.Address;
        }
        public void setAddress(String Address)
        {
         this.Address=Address;;
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