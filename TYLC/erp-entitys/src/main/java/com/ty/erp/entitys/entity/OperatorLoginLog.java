package com.ty.erp.entitys.entity;

import com.ty.erp.entitys.common.BaseEntity;
import com.ty.erp.utils.util.DateHelp;

import java.io.Serializable;
import java.util.Date;

public class OperatorLoginLog implements BaseEntity,Serializable
{
   public OperatorLoginLog()
    {
        setCreateDate(DateHelp.getDefaultDate());
        setLoginTypeName(""); 
        setIp(""); 
        setComputerName(""); 
        setNetworkCard(""); 

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
时间
        */
     private Date CreateDate;
    
    
 /**
登入类型|| 登入 | 退出
        */
     private String LoginTypeName;
    
    
 /**
操作员名称
        */
     private long OperatorRowId;
    
    
 /**
登入IP
        */
     private String Ip;
    
    
 /**
登入电脑用户
        */
     private String ComputerName;
    
    
 /**
网卡
        */
     private String NetworkCard;
    
        
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
           时间
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
           登入类型|| 登入 | 退出
        */
        public String getLoginTypeName()
        {
         
        return this.LoginTypeName;
        }
        public void setLoginTypeName(String LoginTypeName)
        {
         this.LoginTypeName=LoginTypeName;;
        }
    
        
         /**
           操作员名称
        */
        public long getOperatorRowId()
        {
         
        return this.OperatorRowId;
        }
        public void setOperatorRowId(long OperatorRowId)
        {
         this.OperatorRowId=OperatorRowId;;
        }
    
        
         /**
           登入IP
        */
        public String getIp()
        {
         
        return this.Ip;
        }
        public void setIp(String Ip)
        {
         this.Ip=Ip;;
        }
    
        
         /**
           登入电脑用户
        */
        public String getComputerName()
        {
         
        return this.ComputerName;
        }
        public void setComputerName(String ComputerName)
        {
         this.ComputerName=ComputerName;;
        }
    
        
         /**
           网卡
        */
        public String getNetworkCard()
        {
         
        return this.NetworkCard;
        }
        public void setNetworkCard(String NetworkCard)
        {
         this.NetworkCard=NetworkCard;;
        }
    
}