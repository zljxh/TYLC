package com.ty.erp.web.controller;

import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.entity.Department;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.services.service.DepartmentService;
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
public class DepartmentController {
    @Autowired
    DepartmentService service;

    @RequestMapping(value = "/Department")
    public String Index(ModelMap model) {
        return "Department/index";
    }

    public DepartmentController() {
    }

    @RequestMapping(value = "/Department/save")
    @ResponseBody
    public CallResult Save(@RequestBody Department entity) {
        CallResult result = new CallResult();
        entity.setTenantRowId(ControllerContext.getTenantId());
        service.Save(entity);
        result.seto(entity.getRowId());
        return result;
    }

    @RequestMapping(value = "/Department/delete", method = RequestMethod.GET)
    @ResponseBody
    public boolean delete(Long RowId) {
        return service.delete(ControllerContext.getCurrentContext(), RowId);
    }

    @RequestMapping(value = "/Department/edit")
    public String Edit() {
        return "Department/edit";
    }

    @RequestMapping(value = "/Department/get")
    @ResponseBody
    public Object get(@RequestParam("RowId") Long RowId) throws Exception {
        return service.Get(ControllerContext.getCurrentContext(), RowId);

    }

    @RequestMapping(value = "/Department/getpage", method = RequestMethod.POST)
    @ResponseBody
    public Object getpage(@RequestBody PageQueryParameters parameter) {
        Object list = service.GetPageByPageQueryParameters(ControllerContext.getCurrentContext(), parameter);
        return list;
    }

    @RequestMapping(value = "/Department/getcount", method = RequestMethod.POST)
    @ResponseBody
    public Object getcount(@RequestBody PageQueryParameters parameter) {
        Object list = service.GetCountByPageQueryParameters(ControllerContext.getCurrentContext(), parameter);
        return list;
    }

    @RequestMapping(value = "/Department/GetGridRow", method = RequestMethod.GET)
    @ResponseBody
    public Object GetGridRow(Long RowId) {
        return service.GetGridRow(RowId);
    }

    @RequestMapping(value = "/Department/NotEXISTSCode", method = RequestMethod.GET)
    @ResponseBody
    public boolean NotEXISTSCode(HttpServletRequest request) {
        Long RowId = 0L;
        String id = request.getParameter("RowId");
        String Code = request.getParameter("Code");
        if (id != null && id != "") RowId = Long.parseLong(id);
        return service.NotEXISTSCode(ControllerContext.getCurrentContext(), RowId, Code);
    }

    @RequestMapping(value = "/Department/NotEXISTSName", method = RequestMethod.GET)
    @ResponseBody
    public boolean NotEXISTSName(HttpServletRequest request) {
        Long RowId = 0L;
        String id = request.getParameter("RowId");
        String Name = request.getParameter("Name");
        if (id != null && id != "") RowId = Long.parseLong(id);
        return service.NotEXISTSName(ControllerContext.getCurrentContext(), RowId, Name);
    }

    @RequestMapping(value = "/Department/ChangeEnabled", method = RequestMethod.GET)
    @ResponseBody
    public boolean ChangeEnabled(Long RowId) {
        return service.ChangeEnabled(ControllerContext.getCurrentContext(), RowId);
    }
}
