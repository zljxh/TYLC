package com.qs.erp.entitys.entity;
import java.util.Date;

public class RoleSystemResource
{
    private long TenantRowId;
    public long getTenantRowId() {
        return TenantRowId;
    }

    public void setTenantRowId(long tenantRowId) {
        TenantRowId = tenantRowId;
    }
 /**
主键||
        */
     private Long RowId;
    
    
 /**
角色主键
        */
     private Long RoleRowId;
    
    
 /**
系统资源主键
        */
     private Long SystemResourceRowId;
    
    
 /**
创建时间
        */
     private Date CreateDate;
    
    
 /**
创建人
        */
     private String Creater;
    
        
         /**
           主键||
        */
        public Long getRowId()
        {
        return this.RowId;
        }
        public void setRowId(Long RowId)
        {
         this.RowId=RowId;;
        }
    
        
         /**
           角色主键
        */
        public Long getRoleRowId()
        {
        return this.RoleRowId;
        }
        public void setRoleRowId(Long RoleRowId)
        {
         this.RoleRowId=RoleRowId;;
        }
    
        
         /**
           系统资源主键
        */
        public Long getSystemResourceRowId()
        {
        return this.SystemResourceRowId;
        }
        public void setSystemResourceRowId(Long SystemResourceRowId)
        {
         this.SystemResourceRowId=SystemResourceRowId;;
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
    
}