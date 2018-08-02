package com.qs.erp.services.service;

import com.qs.erp.common.ServiceContext;
import com.qs.erp.daos.daoext.OperatorDaoExt;
import com.qs.erp.entitys.entity.Operator;
import com.qs.erp.services.common.BaseService;
import com.qs.erp.services.common.CurrentContextFactory;
import com.qs.erp.services.common.GlobalParameter;
import com.qs.erp.services.common.TreeObjectHelp;
import com.qs.erp.utils.util.ConvertHelp;
import com.qs.erp.utils.util.ListEquals;
import com.qs.erp.utils.util.ListGetTReturn;
import com.qs.erp.utils.util.ListHelp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by admin on 2014/8/13.
 */
@Service
public class OperatorService extends BaseService {
    @Autowired
    OperatorDaoExt daoExt;


    public Object GetMenuTree(ServiceContext serviceContext) {//"state":"closed",


        List<Map<String, Object>> list;
        if (CurrentContextFactory.createInstance().getSystemError()) {
            list = daoExt.getTenantResoure(serviceContext.getTenantRowId());
        } else {
            List<Long> ListRoleRowId = getRole(this.getOperatorRowId());
            if (ListRoleRowId == null || ListRoleRowId.size() == 0) {
                list = new ArrayList<Map<String, Object>>();
            } else {
                Map<String, Object> map = new HashMap<String, Object>();
                //admin不用验证权限
                if(!"admin".equals(serviceContext.getUserName())) {
                    map.put("ListRoleRowId", ListRoleRowId);
                }
                list = daoExt.getSystemResourceByListRowId(serviceContext.getTenantRowId(), map);
            }
        }
        this.FilterMenu(serviceContext,list);
        return TreeObjectHelp.GetTreeObject(list, "0", "RowId", "ParentRowId", "Name");

    }

    public void FilterMenu(ServiceContext serviceContext,List<Map<String,Object>> list)
    {
        List<Map<String, Object> > removeList = new ArrayList();
        for (Map<String, Object> stringObjectMap : list) {
            if (!GlobalParameter.IsJcjm(serviceContext.getTenantRowId())) {
                if("303105".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
            }

            if(!GlobalParameter.IsBatch(serviceContext.getTenantRowId())) {
                if("15502".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("10303030".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("103030301".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
            }

            if(!GlobalParameter.IsJit(serviceContext.getTenantRowId()))
            {
                if("135".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
            }
            if(!GlobalParameter.IsJDDJ(serviceContext.getTenantRowId()))
            {
                if("150001".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
            }
            //未启动自动推送仓储,则日志信息不显示
            if(!GlobalParameter.IsAutoPushWsm(serviceContext))
            {
                if("10924".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
            }
            //启用采购码采购则手工配货菜单不显示
            if(GlobalParameter.IsPurchaseCodePurchase(serviceContext)){
                if("10608".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("303158".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("303108".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("303107".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("303110".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
//                if("303116".equals(stringObjectMap.get("Code"))){
//                    removeList.add(stringObjectMap);
//                    continue;
//                }
                if("303114".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("10322".equals((stringObjectMap.get("Code")))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("303109".equals((stringObjectMap.get("Code")))){
                    removeList.add(stringObjectMap);
                    continue;
                }
            } else {
                if("10110".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("303116".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("303117".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if ("10324".equals(stringObjectMap.get("Code"))) {
                    removeList.add(stringObjectMap);
                    continue;
                }
            }
            //是否启用奇门对接
            if(!GlobalParameter.IsQMDJ(serviceContext.getTenantRowId()))
            {
                if("1020404".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("16001001".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("10924".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("303100115".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("1000000100".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("1000000200".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("1000000400".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("1000000401".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("3030010006".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("10303009".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("303100116".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("1000000101".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("1000000201".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("1000000402".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
                if("3030010007".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
            }
            if(!GlobalParameter.pdaEnabled(serviceContext.getTenantRowId())){
                if(ConvertHelp.ToInt(stringObjectMap.get("TypeStatus"))==3) {
                    removeList.add(stringObjectMap);
                    continue;
                }
            }
            if(!GlobalParameter.renTianEnabled(serviceContext.getTenantRowId())){
                if("100112".equals(stringObjectMap.get("Code"))){
                    removeList.add(stringObjectMap);
                    continue;
                }
            }
        }
        if(removeList.size()>0)
        {
            list.removeAll(removeList);
        }
    }


    public List<Long> getRole(long operatorRowId) {
        List<Long> listRoleOperator = getRoleOperator(operatorRowId);
//        List<Long> listRoleOperatorGroup = getRoleOperatorGroup(operatorRowId);
//        return ListHelp.concat(listRoleOperator, listRoleOperatorGroup, new ListEquals<Long, Long>() {
//            @Override
//            public boolean equals(Long aLong, Long aLong2) {
//                return aLong.equals(aLong2);
//            }
//        });
        return listRoleOperator;
    }

    public List<Long> getRoleOperator(long operatorRowId) {
        String sqlRole = "SELECT RoleRowId FROM employee AS a\n" +
                "JOIN `role` AS b ON a.`RoleRowId`=b.`RowId` AND b.`IsEnabled`=1 WHERE a.RowId=?";
        List<Map<String, Object>> listRole = db.ExecuteList(sqlRole, operatorRowId);
        List<Long> list = ListHelp.getTReturnList(listRole, new ListGetTReturn<Map<String, Object>, Long>() {
            @Override
            public Long getReturnT(Map<String, Object> source) {
                return (Long) source.get("RoleRowId");
            }
        });
        return ListHelp.distinct(list, new ListEquals<Long, Long>() {

            @Override
            public boolean equals(Long aLong, Long aLong2) {
                return aLong.equals(aLong2);
            }
        });
    }


    public Operator findByAccount(ServiceContext serviceContext, String Account) {
        //String sql="select * from operator where account=?";
        Operator op = daoExt.findByAccount(serviceContext.getTenantRowId(), Account);  //db.ExecuteQueryForObject(sql,new CustomerRowMap<Operator>(Operator.class),Account);
        return op;
    }


    /**
     * 根据用户名查找其权限
     *
     * @param RowId
     * @return
     */
    public Set<String> findPermissions(ServiceContext serviceContext, long RowId) {
        Set<String> PermissionList = new HashSet<String>();
        List<Long> ListRoleRowId = getRole(RowId);
        if (ListRoleRowId == null || ListRoleRowId.size() == 0) {
            return PermissionList;
        }
        Map<String, Object> map = new HashMap<String, Object>();
        //如果是admin，则不验证权限
        if(!"admin".equals(serviceContext.getUserName())) {
            map.put("ListRoleRowId", ListRoleRowId);
        }
//        String sql = "SELECT systemresource.* FROM `operatorrole`\n" +
//                "JOIN `rolesystemresource` ON operatorrole.`RoleRowId`=rolesystemresource.`RoleRowId`\n" +
//                "JOIN `systemresource` ON rolesystemresource.`SystemResourceRowId`=systemresource.`RowId`\n" +
//                "WHERE operatorrole.`OperatorRowId`=?";
        List<Map<String, Object>> systemResouceList = daoExt.findPermissionsByRoles(serviceContext.getTenantRowId(), map);
        for (Map<String, Object> mapObject : systemResouceList) {
            PermissionList.add(mapObject.get("Code").toString());
        }
        return PermissionList;
    }


    public Set<String> findRoles(ServiceContext serviceContext, long RowId) {
        List<Long> ListRoleRowId = getRole(RowId);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("ListRoleRowId", ListRoleRowId);
//        String sql = "SELECT role.`Code` FROM `operatorrole`\n" +
//                "JOIN `rolesystemresource` ON operatorrole.`RoleRowId`=rolesystemresource.`RoleRowId`\n" +
//                "JOIN `role` ON rolesystemresource.`RoleRowId`=role.`RowId`\n" +
//                " WHERE operatorrole.`OperatorRowId`=?";
        Set<String> RoleList = new HashSet<String>();
        List<Map<String, Object>> systemResouceList = daoExt.findRolesByRoles(serviceContext.getTenantRowId(), map); //db.ExecuteList(sql, RowId);
        for (Map<String, Object> mapObject : systemResouceList) {
            RoleList.add(mapObject.get("Code").toString());
        }
        return RoleList;
    }

}
