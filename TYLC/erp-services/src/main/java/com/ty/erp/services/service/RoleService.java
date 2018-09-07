package com.ty.erp.services.service;

import com.ty.erp.common.ServiceContext;
import com.ty.erp.daos.dao.RoleDao;
import com.ty.erp.daos.dao.RoleSystemResourceDao;
import com.ty.erp.daos.daoext.RoleExtDao;
import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.businessmodel.ComboTreeObjectCheck;
import com.ty.erp.entitys.businessmodel.Role.SaveRoleSystemResourceParameter;
import com.ty.erp.entitys.entity.Role;
import com.ty.erp.entitys.entity.RoleSystemResource;
import com.ty.erp.entitys.entity.SystemResource;
import com.ty.erp.services.businessmodel.MyPagination;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.services.common.BaseService;
import com.ty.erp.services.common.GlobalParameter;
import com.ty.erp.services.common.TreeObjectCheckHelp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2014/8/13.
 */
@Service
public class RoleService extends BaseService {
    @Autowired
    private RoleDao dao;
    @Autowired
    private RoleSystemResourceDao daoRoleSystemResource;
    @Autowired
    RoleExtDao extDao;


    public List GetPageByPageQueryParameters(ServiceContext serviceContext, PageQueryParameters parameter) {
        MyPagination myPagination = new MyPagination();
        myPagination.setPageRowCount(parameter.getPageRowCount());
        myPagination.setPageIndex(parameter.getPageIndex());
        Map<String, Object> map = parameter.GetSqlMapParameter();
        map.put("BeginRowIndex", myPagination.getBeginRowIndex());
        map.put("PageRowCount", myPagination.getPageRowCount());
        return extDao.GetPageByPageQueryParameters(serviceContext.getTenantRowId(), map);

    }

    public long GetCountByPageQueryParameters(ServiceContext serviceContext, PageQueryParameters parameter) {
        MyPagination myPagination = new MyPagination();
        myPagination.setPageRowCount(parameter.getPageRowCount());
        myPagination.setPageIndex(parameter.getPageIndex());
        Map<String, Object> map = parameter.GetSqlMapParameter();
        return extDao.GetCountByPageQueryParameters(serviceContext.getTenantRowId(), map);

    }

    public Role Get(ServiceContext serviceContext, Long RowId) {
        return dao.Get(serviceContext.getTenantRowId(), RowId);
    }

    public Object GetGridRow(Long RowId) {
        String sql = "SELECT Role.* FROM Role  where Role.RowId=" + RowId;
        return db.ExecuteRowSet(sql);
    }

    public void Save(Role entity) {
        entity.setPinyin(this.getPinYinHeadChar(entity.getName()));
        if (entity.getRowId() == 0) {
            long RowId = this.db.NewId();
            entity.setRowId(RowId);
            entity.setCreateDate(this.getDate());
            entity.setCreater(this.getUserName());
            entity.setIsEnabled(true);
            if (entity.getRemark() == null)
                entity.setRemark("");
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
        String sql = "select count(*) from Role where Code=? and RowId!=? and TenantRowId=? limit 1";
        long c = db.ExecuteForLong(sql, new Object[]{Code, RowId, serviceContext.getTenantRowId()});
        return c == 0;
    }

    public boolean NotEXISTSName(ServiceContext serviceContext, Long RowId, String Name) {
        String sql = "select count(*) from Role where Name=? and RowId!=? and TenantRowId=? limit 1";
        long c = db.ExecuteForLong(sql, new Object[]{Name, RowId, serviceContext.getTenantRowId()});
        return c == 0;
    }

    public Object GetRoleSystemResourceAll(ServiceContext serviceContext, long roleRowId) {
        String sql = "SELECT SystemResource.*,CASE WHEN RoleSystemResource.`RoleRowId` IS NULL THEN  FALSE ELSE  TRUE  END AS Checked \n" +
                "FROM  SystemResource \n" +
                "LEFT JOIN RoleSystemResource ON  RoleSystemResource.`RoleRowId`=? AND SystemResource.`RowId`=RoleSystemResource.`SystemResourceRowId` \n";

        List<Map<String, Object>> list = db.ExecuteList(sql, roleRowId);
        this.FilterMenu(serviceContext, list);
        List<ComboTreeObjectCheck> treeObjectCheckList = TreeObjectCheckHelp.GetTreeObject(list, "0", "RowId", "ParentRowId", "Name", "Checked", false);
        return treeObjectCheckList;
    }

    public void FilterMenu(ServiceContext serviceContext, List<Map<String, Object>> list) {
        List<Map<String, Object>> removeList = new ArrayList();
        if (!GlobalParameter.IsJcjm(serviceContext.getTenantRowId())) {
            for (Map<String, Object> stringObjectMap : list) {
                if ("303105".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                }
            }
        }
        if (!GlobalParameter.IsBatch(serviceContext.getTenantRowId())) {
            for (Map<String, Object> stringObjectMap : list) {
                if ("15502".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("10303030".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("103030301".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }

            }
        }
        if (!GlobalParameter.IsJit(serviceContext.getTenantRowId())) {
            for (Map<String, Object> stringObjectMap : list) {
                if ("135".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                }
            }
        }
        //是否启用奇门对接
        if (!GlobalParameter.IsQMDJ(serviceContext.getTenantRowId())) {
            for (Map<String, Object> stringObjectMap : list) {
                if ("1020404".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("16001001".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("303100115".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("1000000100".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("1000000200".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("1000000400".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("1000000401".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("3030010006".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("10303009".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("303100116".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("1000000101".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("1000000201".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("1000000402".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("3030010007".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
            }
        }
        if (removeList.size() > 0) {
            list.removeAll(removeList);
        }
    }



    @Transactional(propagation = Propagation.REQUIRED)
    public CallResult SaveRoleSystemResource(ServiceContext serviceContext, SaveRoleSystemResourceParameter parameter) {
        CallResult result = new CallResult();
        result.setResult(true);

        String sql = String.format("DELETE a FROM  RoleSystemResource AS a WHERE a.`RoleRowId`=%1$s;", parameter.getRoleRowId());
        db.Execute(sql);
        for (long id : parameter.getAddSystemResourceList()) {
            RoleSystemResource rs = new RoleSystemResource();
            rs.setRowId(db.NewId());
            rs.setRoleRowId(parameter.getRoleRowId());
            rs.setSystemResourceRowId(id);
            rs.setCreater(this.getUserName());
            rs.setCreateDate(this.getDate());
            rs.setTenantRowId(serviceContext.getTenantRowId());
            daoRoleSystemResource.Create(rs);
        }
        return result;

    }

    public boolean ChangeEnabled(ServiceContext serviceContext, Long RowId) {
        return extDao.ChangeEnabled(serviceContext.getTenantRowId(), RowId) > 0;
    }








    public SystemResource getRoleSystemResource(ServiceContext context, String permission){
        return extDao.getRoleSystemResource(context.getTenantRowId(),context.getOperatorRowId(),permission);
    }

}
