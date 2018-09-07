package com.ty.erp.entitys.entity;
import java.util.Date;

public class OperatorConfig
{
    
 /**
主键|| 关联员工主键 
        */
     private long RowId;
    
    
 /**
格子数量
        */
     private int CellCount;
    
    
 /**
租户Id
        */
     private long TenantRowId;
    
    
 /**
创建时间
        */
     private Date CreateDate;
    
    
 /**
创建人
        */
     private String Creater;
    
        
         /**
           主键|| 关联员工主键 
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
           格子数量
        */
        public int getCellCount()
        {
        return this.CellCount;
        }
        public void setCellCount(int CellCount)
        {
         this.CellCount=CellCount;;
        }
    
        
         /**
           租户Id
        */
        public long getTenantRowId()
        {
        return this.TenantRowId;
        }
        public void setTenantRowId(long TenantRowId)
        {
         this.TenantRowId=TenantRowId;;
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