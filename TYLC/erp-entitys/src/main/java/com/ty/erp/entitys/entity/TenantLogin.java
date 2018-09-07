package com.ty.erp.entitys.entity;

import com.ty.erp.entitys.common.BaseEntity;
import com.ty.erp.utils.util.DateHelp;

import java.io.Serializable;
import java.util.Date;

public class TenantLogin implements BaseEntity,Serializable
{
   public TenantLogin()
    {
        setTenantCode(""); 
        setTenantIdentity(""); 
        setCreateDate(DateHelp.getDefaultDate());
        setCreater(""); 
        setLoginDate(DateHelp.getDefaultDate());
        setJiFeiStartDate(DateHelp.getDefaultDate());
        setEncryptEd(false);
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
租户代码
        */
     private String TenantCode;
    
    
 /**
租户标识
        */
     private String TenantIdentity;
    
    
 /**
创建时间
        */
     private Date CreateDate;
    
    
 /**
创建人
        */
     private String Creater;
    
    
 /**
登入时间
        */
     private Date LoginDate;
    
        
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
           租户代码
        */
        public String getTenantCode()
        {
         
        return this.TenantCode;
        }
        public void setTenantCode(String TenantCode)
        {
         this.TenantCode=TenantCode;;
        }
    
        
         /**
           租户标识
        */
        public String getTenantIdentity()
        {
         
        return this.TenantIdentity;
        }
        public void setTenantIdentity(String TenantIdentity)
        {
         this.TenantIdentity=TenantIdentity;;
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
           登入时间
        */
        public Date getLoginDate()
        {
         
        return this.LoginDate;
        }
        public void setLoginDate(Date LoginDate)
        {
         this.LoginDate=LoginDate;;
        }

    private boolean IsJiFei;

    private boolean EncryptEd;

    public boolean getIsJiFei() {
        return IsJiFei;
    }

    public void setIsJiFei(boolean isJiFei) {
        IsJiFei = isJiFei;
    }

    private Date JiFeiStartDate;

    public Date getJiFeiStartDate() {
        return JiFeiStartDate;
    }

    public void setJiFeiStartDate(Date jiFeiStartDate) {
        JiFeiStartDate = jiFeiStartDate;
    }

    public boolean isEncryptEd() {
        return EncryptEd;
    }

    public void setEncryptEd(boolean encryptEd) {
        EncryptEd = encryptEd;
    }
}