package com.qs.erp.web.controller;

import com.qs.erp.entitys.businessmodel.CallResult;
import com.qs.erp.entitys.businessmodel.Role.CartoonMasterSlave;
import com.qs.erp.services.businessmodel.PageQueryParameters;
import com.qs.erp.services.service.CartoonService;
import com.qs.erp.web.spring.ControllerContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CartoonController {

    @Autowired
    CartoonService service;

    @RequestMapping(value = "Cartoon")
    public String index() {
        return "Cartoon/index";
    }

    @RequestMapping(value = "Cartoon/edit")
    public String edit() {
        return "Cartoon/edit";
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
        service.Save(ControllerContext.getCurrentContext(),slave);
        return callResult;
    }
}
