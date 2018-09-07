package com.ty.erp.web.controller;

import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.entity.Employee;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.services.service.EmployeeService;
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
public class EmployeeController {
    @Autowired
    EmployeeService service;

    @RequestMapping(value = "/Employee")
    public String Index(ModelMap model) {
        return "Employee/index";
    }

    public EmployeeController() {
    }

    @RequestMapping(value = "/Employee/save")
    @ResponseBody
    public CallResult Save(@RequestBody Employee entity) {
        CallResult result = new CallResult();
        entity.setTenantRowId(ControllerContext.getTenantId());
        service.Save(ControllerContext.getCurrentContext(), entity);
        result.seto(entity.getRowId());
        return result;
    }

    @RequestMapping(value = "/Employee/add")
    public String Add() {
        return "Employee/add";
    }

    @RequestMapping(value = "/Employee/edit")
    public String Edit() {
        return "Employee/edit";
    }

    @RequestMapping(value = "/Employee/get")
    @ResponseBody
    public Object get(@RequestParam("RowId") Long RowId) throws Exception {
        return service.Get(ControllerContext.getCurrentContext(), RowId);

    }

    @RequestMapping(value = "/Employee/getlist", method = RequestMethod.GET)
    @ResponseBody
    public Object getlist() {
        Object list = service.GetList(ControllerContext.getCurrentContext());
        return list;
    }

    @RequestMapping(value = "/Employee/getpage", method = RequestMethod.POST)
    @ResponseBody
    public Object getpage(@RequestBody PageQueryParameters parameter) {
        Object list = service.GetPageByPageQueryParameters(ControllerContext.getCurrentContext(), parameter);
        return list;
    }

    @RequestMapping(value = "/Employee/getcount", method = RequestMethod.POST)
    @ResponseBody
    public Object getcount(@RequestBody PageQueryParameters parameter) {
        Object list = service.GetCountByPageQueryParameters(ControllerContext.getCurrentContext(), parameter);
        return list;
    }

    @RequestMapping(value = "/Employee/GetGridRow", method = RequestMethod.GET)
    @ResponseBody
    public Object GetGridRow(Long RowId) {
        return service.GetGridRow(RowId);
    }

    @RequestMapping(value = "/Employee/delete", method = RequestMethod.GET)
    @ResponseBody
    public boolean delete(Long RowId) {
        service.delete(ControllerContext.getCurrentContext(), RowId);
        return true;
    }

    @RequestMapping(value = "/Employee/NotEXISTSCode", method = RequestMethod.GET)
    @ResponseBody
    public boolean NotEXISTSCode(HttpServletRequest request) {
        Long RowId = 0L;
        String id = request.getParameter("RowId");
        String Code = request.getParameter("Code");
        if (id != null && id != "") RowId = Long.parseLong(id);
        return service.NotEXISTSCode(ControllerContext.getCurrentContext(), RowId, Code);
    }

    @RequestMapping(value = "/Employee/NotEXISTSName", method = RequestMethod.GET)
    @ResponseBody
    public boolean NotEXISTSName(HttpServletRequest request) {
        Long RowId = 0L;
        String id = request.getParameter("RowId");
        String Name = request.getParameter("Name");
        if (id != null && id != "") RowId = Long.parseLong(id);
        return service.NotEXISTSName(ControllerContext.getCurrentContext(), RowId, Name);
    }



    @RequestMapping(value = "/Employee/getCurrentOperatorName")
    @ResponseBody
    public String getCurrentOperatorName(){
        return service.getCurrentOperatorName(ControllerContext.getCurrentContext());
    }

    @RequestMapping(value = "/Employee/getCurrentOperatorCode")
    @ResponseBody
    public String getCurrentOperatorCode(){
        return service.getCurrentOperatorCode(ControllerContext.getCurrentContext());
    }
}
