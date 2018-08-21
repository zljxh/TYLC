package com.qs.erp.entitys.businessmodel.Role;

import java.util.List;

/**
 * Created by admin on 2014/10/23.
 */
public class SaveRoleSystemResourceParameter {

    public List<Long> getAddSystemResourceList() {
        return addSystemResourceList;
    }

    public void setAddSystemResourceList(List<Long> addSystemResourceList) {
        this.addSystemResourceList = addSystemResourceList;
    }

    public List<Long> getDeleteSystemResourceList() {
        return deleteSystemResourceList;
    }

    public void setDeleteSystemResourceList(List<Long> deleteSystemResourceList) {
        this.deleteSystemResourceList = deleteSystemResourceList;
    }

    List<Long>  addSystemResourceList;
    List<Long>  deleteSystemResourceList;

    public Long getRoleRowId() {
        return RoleRowId;
    }

    public void setRoleRowId(Long roleRowId) {
        RoleRowId = roleRowId;
    }

    Long RoleRowId;
}
