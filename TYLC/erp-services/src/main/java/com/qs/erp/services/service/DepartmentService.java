package com.qs.erp.services.service;

import com.qs.erp.common.ServiceContext;
import com.qs.erp.daos.dao.DepartmentDao;
import com.qs.erp.daos.daoext.DepartmentExtDao;
import com.qs.erp.entitys.entity.Department;
import com.qs.erp.services.businessmodel.MyPagination;
import com.qs.erp.services.businessmodel.PageQueryParameters;
import com.qs.erp.services.common.BaseService;
import com.qs.erp.utils.util.ConvertHelp;
import com.qs.erp.utils.util.StringHelp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2014/8/13.
 */
@Service
public class DepartmentService extends BaseService {
    @Autowired
    private DepartmentDao dao;
    @Autowired
    DepartmentExtDao extDao;


    public List GetPageByPageQueryParameters(ServiceContext serviceContext, PageQueryParameters parameter) {
        MyPagination myPagination = new MyPagination();
        myPagination.setPageRowCount(parameter.getPageRowCount());
        myPagination.setPageIndex(parameter.getPageIndex());
        Map<String, Object> map = parameter.GetSqlMapParameter();
        map.put("BeginRowIndex", myPagination.getBeginRowIndex());
        map.put("PageRowCount", myPagination.getPageRowCount());
        List<Map<String, Object>> mapList = extDao.GetPageByPageQueryParameters(serviceContext.getTenantRowId(), map);
        return mapList;
    }

    public long GetCountByPageQueryParameters(ServiceContext serviceContext, PageQueryParameters parameter) {
        MyPagination myPagination = new MyPagination();
        myPagination.setPageRowCount(parameter.getPageRowCount());
        myPagination.setPageIndex(parameter.getPageIndex());
        Map<String, Object> map = parameter.GetSqlMapParameter();
        return extDao.GetCountByPageQueryParameters(serviceContext.getTenantRowId(), map);

    }

    public Department Get(ServiceContext serviceContext, Long RowId) {
        return dao.Get(serviceContext.getTenantRowId(), RowId);
    }

    public Object GetGridRow(Long RowId) {
        String sql = "SELECT Department.* FROM Department  where Department.RowId=" + RowId;

        return db.ExecuteRowSet(sql);
    }

    public void Save(Department entity) {
        entity.setPinyin(this.getPinYinHeadChar(entity.getName()));
        if (StringHelp.StringIsNullOrEmpty(entity.getCode())) {
            entity.setCode("");
        }
        if (entity.getRowId() == 0) {
            long RowId = this.db.NewId();
            entity.setRowId(RowId);
            entity.setCreateDate(this.getDate());
            entity.setCreater(this.getUserName());
            entity.setIsEnabled(true);
            dao.Create(entity);
        } else {
            dao.Update(entity);
        }

    }

    public boolean delete(ServiceContext serviceContext, Long RowId) {
        dao.Delete(serviceContext.getTenantRowId(), RowId);
        return true;
    }


    public boolean NotEXISTSCode(ServiceContext serviceContext, Long RowId, String Code) {
        String sql = "select count(*) from Department where Code=? and RowId!=? and TenantRowId=? limit 1";
        long c = db.ExecuteForLong(sql, new Object[]{Code, RowId, serviceContext.getTenantRowId()});
        return c == 0;
    }

    public boolean NotEXISTSName(ServiceContext serviceContext, Long RowId, String Name) {
        String sql = "select count(*) from Department where Name=? and RowId!=?  and TenantRowId=?  limit 1";
        long c = db.ExecuteForLong(sql, new Object[]{Name, RowId, serviceContext.getTenantRowId()});
        return c == 0;
    }

    public boolean ChangeEnabled(ServiceContext serviceContext, Long RowId) {
        return extDao.ChangeEnabled(serviceContext.getTenantRowId(), RowId) > 0;
    }
}
