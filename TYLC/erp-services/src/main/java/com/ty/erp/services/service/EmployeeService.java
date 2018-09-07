package com.ty.erp.services.service;

import com.ty.erp.common.ServiceContext;
import com.ty.erp.daos.dao.DepartmentDao;
import com.ty.erp.daos.dao.EmployeeDao;
import com.ty.erp.daos.dao.RoleDao;
import com.ty.erp.daos.daoext.DepartmentExtDao;
import com.ty.erp.daos.daoext.EmployeeDaoExt;
import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.entity.Department;
import com.ty.erp.entitys.entity.Employee;
import com.ty.erp.entitys.entity.Operator;
import com.ty.erp.entitys.entity.Role;
import com.ty.erp.services.businessmodel.MyPagination;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.services.common.BaseService;
import com.ty.erp.utils.util.ConvertHelp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


/**
 * implements baseAopService<Employee>
 * Created by admin on 2014/8/13.
 */
@Service
public class EmployeeService extends BaseService {
    @Autowired
    private EmployeeDao dao;
    @Autowired
    private OperatorService operatorService;
    @Autowired
    EmployeeDaoExt extDao;

    @Autowired
    DepartmentExtDao departmentExtDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    private DepartmentDao departmentDao;


    public Employee Get(ServiceContext serviceContext, long RowId) {
        if (RowId == 0)
            return null;
        return dao.Get(serviceContext.getTenantRowId(), RowId);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public CallResult Save(ServiceContext serviceContext, Employee entity) {
        CallResult result = new CallResult();
        entity.setPinYin(this.getPinYinHeadChar(entity.getName()));
        if (entity.getRowId() == 0) {
            long RowId = this.db.NewId();
            entity.setRowId(RowId);
            entity.setCreateDate(this.getDate());
            entity.setCreater(this.getUserName());
            entity.setTenantRowId(serviceContext.getTenantRowId());
            entity.setIsEnabled(true);
            dao.Create(entity);
            Operator operator = new Operator();
            operator.setCreater(entity.getCreater());
            operator.setAccount(entity.getCode());
            operator.setCreateDate(this.getDate());
            operator.setIsEnabled(true);
            operator.setIsSystem(false);
            operator.setRowId(entity.getRowId());
            operator.setPassword("12345");
            operator.setTenantRowId(serviceContext.getTenantRowId());
            operatorService.Save(serviceContext, operator);
//              增加员工时 增加的角色()

        } else {
            Employee employee = dao.Get(serviceContext.getTenantRowId(), entity.getRowId());
            dao.Update(entity);
//          更新员工时角色
//          先删除


        }
        result.seto(entity.getRowId());
        return result;
    }

    public List<Employee> GetList(ServiceContext serviceContext) {
        return dao.GetList(serviceContext.getTenantRowId());
    }


    public List GetPageByPageQueryParameters(ServiceContext serviceContext, PageQueryParameters parameter) {
        MyPagination myPagination = new MyPagination();
        myPagination.setPageRowCount(parameter.getPageRowCount());
        myPagination.setPageIndex(parameter.getPageIndex());
        Map<String, Object> mapParameter = parameter.GetSqlMapParameter();
        mapParameter.put("BeginRowIndex", myPagination.getBeginRowIndex());
        mapParameter.put("PageRowCount", myPagination.getPageRowCount());
        List<Map> list =
                extDao.GetPageByPageQueryParameters(serviceContext.getTenantRowId(), mapParameter);
        for (Map<String, Object> map : list) {
            long DepartmentRowId = 0;
            long RoleRowId = 0;
            if (map.get("DepartmentRowId") != null) {
                DepartmentRowId = ConvertHelp.ToLong(map.get("DepartmentRowId"));
            }
            Department department = departmentDao.Get(serviceContext.getTenantRowId(), DepartmentRowId);
            map.put("DepartmentName", department != null ? department.getName() : "");
            if (map.get("RoleRowId") != null) {
                RoleRowId = ConvertHelp.ToLong(map.get("RoleRowId"));
            }
            Role role = roleDao.Get(serviceContext.getTenantRowId(), RoleRowId);
            map.put("RoleName", role != null ? role.getName() : "");

            // add by banchao 20180429
            long SupplierRowId =0;
            if (map.get("SupplierRowId") != null) {
                SupplierRowId = ConvertHelp.ToLong(map.get("SupplierRowId"));
            }


        }
        return list;
    }


    public long GetCountByPageQueryParameters(ServiceContext serviceContext, PageQueryParameters parameter) {
        return extDao.GetCountByPageQueryParameters(serviceContext.getTenantRowId(), parameter.GetSqlMapParameter());
    }

    public Object GetGridRow(Long RowId) {
        String sql = "SELECT Employee.*,department.`Name` AS DepartmentName " +
                " , Supplier.`Name` AS SupplierName " +
                "  FROM Employee\n" +
                "JOIN `department` ON Employee.`DepartmentRowId`=department.`RowId`\n"
                + " left outer JOIN `Supplier` ON Employee.`SupplierRowId`=Supplier.`RowId`\n"
                + "where Employee.RowId=" + RowId;

        return db.ExecuteRowSet(sql);
    }


    public CallResult delete(ServiceContext serviceContext, Long RowId) {
        CallResult result = new CallResult();
        dao.Delete(serviceContext.getTenantRowId(), RowId);
        return result;
    }


    public boolean NotEXISTSCode(ServiceContext serviceContext, Long RowId, String Code) {
        String sql = "select count(*) from Employee where Code=? and RowId!=? and TenantRowId=? limit 1";
        long c = db.ExecuteForLong(sql, new Object[]{Code, RowId, serviceContext.getTenantRowId()});
        return c == 0;
    }

    public boolean NotEXISTSName(ServiceContext serviceContext, Long RowId, String Name) {
        String sql = "select count(*) from Employee where Name=? and RowId!=?  and TenantRowId=? limit 1";
        long c = db.ExecuteForLong(sql, new Object[]{Name, RowId, serviceContext.getTenantRowId()});
        return c == 0;
    }


    public String getCurrentOperatorName(ServiceContext serviceContext) {
        return extDao.getCurrentOperatorName(serviceContext.getTenantRowId(), serviceContext.getUserName());
    }
    public String getCurrentOperatorCode(ServiceContext serviceContext) {
        return serviceContext.getUserName();
    }

}
