package com.qs.erp.web.controller;

import com.qs.erp.entitys.businessmodel.CallResult;
import com.qs.erp.entitys.businessmodel.Role.CartoonDetailMasterSlave;
import com.qs.erp.entitys.businessmodel.Role.CartoonMasterSlave;
import com.qs.erp.entitys.entity.Cartoon;
import com.qs.erp.entitys.entity.CartoonDetail;
import com.qs.erp.entitys.entity.Cartoontypes;
import com.qs.erp.services.businessmodel.PageQueryParameters;
import com.qs.erp.services.service.CartoonDetailService;
import com.qs.erp.web.spring.ControllerContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
public class CartoonDetailController {

    @Autowired
    CartoonDetailService cartoonDetailService;

    @RequestMapping(value = "Cartoon/getCartoonDetailListByParentId", method = RequestMethod.GET)
    @ResponseBody
    public Object getCartoonDetailListByParentId(@RequestParam("SellOrderRowId") long SellOrderRowId) {
        return cartoonDetailService.getByCartoonRowId(SellOrderRowId);
    }

    @RequestMapping(value = "CartoonDetail")
    public String index() {
        return "CartoonDetail/index";
    }

    @RequestMapping(value = "CartoonDetail/edit")
    public String edit() {
        return "CartoonDetail/edit";
    }

    @RequestMapping(value = "/CartoonDetail/getpage", method = RequestMethod.POST)
    @ResponseBody
    public Object getpage(@RequestBody PageQueryParameters parameter) {
        return cartoonDetailService.getPage(parameter);
    }

    @RequestMapping(value = "/CartoonDetail/getcount", method = RequestMethod.POST)
    @ResponseBody
    public Object getcount(@RequestBody PageQueryParameters parameter) {
        return cartoonDetailService.getPage(parameter).size();
    }

    @RequestMapping(value = "/CartoonDetail/saveajax", method = RequestMethod.POST)
    @ResponseBody
    public CallResult Save(@RequestBody CartoonDetailMasterSlave slave) {
        CallResult callResult = new CallResult();
        cartoonDetailService.Save(ControllerContext.getCurrentContext(), slave);
        return callResult;
    }

    @RequestMapping(value = "/CartoonDetail/changeEnable", method = RequestMethod.POST)
    @ResponseBody
    public CallResult changeEnable(@RequestParam(value = "rowid") long rowid) {
        CallResult callResult = new CallResult();
//        cartoonDetailService.changeEnable(rowid);
        return callResult;
    }

    @RequestMapping(value = "/CartoonDetail/get", method = RequestMethod.GET)
    @ResponseBody
    public Object get(@RequestParam("RowId") Long RowId) throws Exception {
        CartoonDetail cartoon = cartoonDetailService.Get(RowId);
        return cartoon;
    }


}
