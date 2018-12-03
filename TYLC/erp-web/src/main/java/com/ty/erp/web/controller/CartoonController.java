package com.ty.erp.web.controller;

import com.ty.erp.daos.dao.CartoontypesDao;
import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.businessmodel.Role.CartoonMasterSlave;
import com.ty.erp.entitys.entity.Cartoon;
import com.ty.erp.entitys.entity.Cartoontypes;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.services.service.CartoonService;
import com.ty.erp.web.spring.ControllerContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class CartoonController {

    @Autowired
    CartoonService service;
    @Autowired
    CartoontypesDao cartoontypesDao;

    @RequestMapping(value = "Cartoon")
    public String index() {
        return "Cartoon/index";
    }

    @RequestMapping(value = "Cartoon/edit")
    public String edit() {
        return "Cartoon/edit";
    }
    @RequestMapping(value = "cartoon/partfree")
    public String partfree(){
        return "Cartoon/partfree";
    }

    @RequestMapping(value = "/Cartoon/getpage", method = RequestMethod.POST)
    @ResponseBody
    public Object getpage(@RequestBody PageQueryParameters parameter) {
        return service.getPage(parameter);
    }

    @RequestMapping(value = "/Cartoon/getcount", method = RequestMethod.POST)
    @ResponseBody
    public Object getcount(@RequestBody PageQueryParameters parameter) {
        return service.getcount(parameter);
    }

    @RequestMapping(value = "/Cartoon/saveajax", method = RequestMethod.POST)
    @ResponseBody
    public CallResult Save(@RequestBody CartoonMasterSlave slave) {
        CallResult callResult = new CallResult();
        service.Save(ControllerContext.getCurrentContext(), slave);
        return callResult;
    }

    @RequestMapping(value = "/Cartoon/changeEnable", method = RequestMethod.POST)
    @ResponseBody
    public CallResult changeEnable(@RequestParam(value = "rowid") long rowid) {
        CallResult callResult = new CallResult();
        service.changeEnable(rowid);
        return callResult;
    }

    @RequestMapping(value = "/Cartoon/get", method = RequestMethod.GET)
    @ResponseBody
    public Object get(@RequestParam("RowId") Long RowId) throws Exception {
        Cartoon cartoon = service.Get(RowId);
        List<Cartoontypes> types = cartoontypesDao.getList(cartoon.getRowId());
        List<Long> type = new ArrayList<>();
        for (Cartoontypes cartoontypes : types) {
            type.add(cartoontypes.getCartoonTypeRowId());
        }
        cartoon.setTypeRowId(type);
        return cartoon;
    }
}
