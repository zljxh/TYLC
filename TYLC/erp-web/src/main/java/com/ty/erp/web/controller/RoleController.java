package com.ty.erp.web.controller;

import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.businessmodel.Role.SaveRoleSystemResourceParameter;
import com.ty.erp.entitys.entity.Role;
import com.ty.erp.entitys.entity.SystemResource;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.services.service.RoleService;
import com.ty.erp.web.spring.ControllerContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 笑傲江湖 on 2014/10/7 18:34:46
 */
@Controller
public class RoleController {
    @Autowired
    RoleService service;

    @RequestMapping(value = "/Role")
    public String Index(ModelMap model) {


        return "Role/index";
    }

    public RoleController() {
    }

    @RequestMapping(value = "/Role/save")
    @ResponseBody
    public CallResult Save(@RequestBody Role entity) {
        CallResult result = new CallResult();
        entity.setTenantRowId(ControllerContext.getTenantId());
        service.Save(entity);
        result.seto(entity.getRowId());
        return result;
    }

    @RequestMapping(value = "/Role/delete", method = RequestMethod.GET)
    @ResponseBody
    public boolean delete(Long RowId) {
        return service.delete(ControllerContext.getCurrentContext(), RowId);
    }

    @RequestMapping(value = "/Role/edit")
    public String Edit() {
        return "Role/edit";
    }

    @RequestMapping(value = "/Role/get")
    @ResponseBody
    public Object get(@RequestParam("RowId") Long RowId) throws Exception {
        return service.Get(ControllerContext.getCurrentContext(), RowId);

    }

    @RequestMapping(value = "/Role/getpage", method = RequestMethod.POST)
    @ResponseBody
    public Object getpage(@RequestBody PageQueryParameters parameter) {
        Object list = service.GetPageByPageQueryParameters(ControllerContext.getCurrentContext(), parameter);
        return list;
    }

    @RequestMapping(value = "/Role/getcount", method = RequestMethod.POST)
    @ResponseBody
    public Object getcount(@RequestBody PageQueryParameters parameter) {
        Object list = service.GetCountByPageQueryParameters(ControllerContext.getCurrentContext(), parameter);
        return list;
    }

    @RequestMapping(value = "/Role/GetGridRow", method = RequestMethod.GET)
    @ResponseBody
    public Object GetGridRow(Long RowId) {
        return service.GetGridRow(RowId);
    }

    @RequestMapping(value = "/Role/NotEXISTSCode", method = RequestMethod.GET)
    @ResponseBody
    public boolean NotEXISTSCode(HttpServletRequest request) {
        Long RowId = 0L;
        String id = request.getParameter("RowId");
        String Code = request.getParameter("Code");
        if (id != null && id != "") RowId = Long.parseLong(id);
        return service.NotEXISTSCode(ControllerContext.getCurrentContext(), RowId, Code);
    }

    @RequestMapping(value = "/Role/NotEXISTSName", method = RequestMethod.GET)
    @ResponseBody
    public boolean NotEXISTSName(HttpServletRequest request) {
        Long RowId = 0L;
        String id = request.getParameter("RowId");
        String Name = request.getParameter("Name");
        if (id != null && id != "") RowId = Long.parseLong(id);
        return service.NotEXISTSName(ControllerContext.getCurrentContext(), RowId, Name);
    }

    @RequestMapping(value = "/Role/GetRoleSystemResourceAll", method = RequestMethod.POST)
    @ResponseBody
    public Object GetRoleSystemResourceAll(long roleRowId) {

        return service.GetRoleSystemResourceAll(ControllerContext.getCurrentContext(), roleRowId);
    }

    @RequestMapping(value = "/Role/RoleSystemResourceEdit")
    public String RoleSystemResourceEdit() {
        return "Role/RoleSystemResourceEdit";
    }

    @RequestMapping(value = "/Role/SaveRoleSystemResource")
    @ResponseBody
    public CallResult SaveRoleSystemResource(@RequestBody SaveRoleSystemResourceParameter parameter) {
        return service.SaveRoleSystemResource(ControllerContext.getCurrentContext(), parameter);
    }

    @RequestMapping(value = "/Role/ChangeEnabled", method = RequestMethod.GET)
    @ResponseBody
    public boolean ChangeEnabled(Long RowId) {
        return service.ChangeEnabled(ControllerContext.getCurrentContext(), RowId);
    }


    @RequestMapping(value = "/Role/IsPermitted", method = RequestMethod.GET)
    @ResponseBody
    public Object isPermitted(@RequestParam("permission") String permission) {
        SystemResource resource = service.getRoleSystemResource(ControllerContext.getCurrentContext(), permission);
        if (resource != null && resource.isChecked()) {
            return true;
        }
        return false;
    }

}
