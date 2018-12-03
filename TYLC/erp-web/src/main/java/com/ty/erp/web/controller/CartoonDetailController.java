package com.ty.erp.web.controller;

import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.businessmodel.FreeModel;
import com.ty.erp.entitys.businessmodel.Role.CartoonDetailMasterSlave;
import com.ty.erp.entitys.entity.CartoonDetail;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.services.service.CartoonDetailService;
import com.ty.erp.web.spring.ControllerContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "cartoondetail/addfree", method = RequestMethod.POST)
    @ResponseBody
    public CallResult CartoonDetailSetFree(@RequestBody FreeModel free) {
        CallResult result = new CallResult();
        cartoonDetailService.setFree(free);
        return result;
    }

}
