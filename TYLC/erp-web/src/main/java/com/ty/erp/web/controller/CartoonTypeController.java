package com.ty.erp.web.controller;

import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.entity.CartoonType;
import com.ty.erp.services.businessmodel.PageQueryParameters;
import com.ty.erp.services.service.CartoonTypeService;
import com.ty.erp.utils.util.Snowflake.FactoryIdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class CartoonTypeController {
    @Autowired
    CartoonTypeService service;


    @RequestMapping(value = "CartoonTypeController/TypeRowIdGrid")
    @ResponseBody
    public Object TypeRowIdGrid() {
        return service.getLists();
    }

    @RequestMapping(value = "/CartoonType")
    public String Index(ModelMap model) {
        return "CartoonType/index";
    }

    public CartoonTypeController() {
    }

    @RequestMapping(value = "/CartoonType/save")
    @ResponseBody
    public CallResult Save(@RequestBody CartoonType entity) {
        CallResult result = new CallResult();
        if (entity.getRowId() == 0) {
            entity.setRowId(FactoryIdWorker.NextId());
            entity.setEnabled(true);
        }
        service.Save(entity);
        result.seto(entity.getRowId());
        return result;
    }

    @RequestMapping(value = "/CartoonType/delete", method = RequestMethod.GET)
    @ResponseBody
    public boolean delete(Long RowId) {
        return service.delete(RowId);
    }

    @RequestMapping(value = "/CartoonType/edit")
    public String Edit() {
        return "CartoonType/edit";
    }

    @RequestMapping(value = "/CartoonType/get")
    @ResponseBody
    public Object get(@RequestParam("RowId") Long RowId) throws Exception {
        return service.Get(RowId);

    }

    @RequestMapping(value = "/CartoonType/getpage", method = RequestMethod.POST)
    @ResponseBody
    public Object getpage(@RequestBody PageQueryParameters parameter) {
        Object list = service.getLists();
        return list;
    }

    @RequestMapping(value = "/CartoonType/getcount", method = RequestMethod.POST)
    @ResponseBody
    public Object getcount(@RequestBody PageQueryParameters parameter) {
        List<CartoonType> list = service.getLists();
        return list.size();
    }

    @RequestMapping(value = "/CartoonType/GetGridRow", method = RequestMethod.GET)
    @ResponseBody
    public Object GetGridRow(Long RowId) {
        return service.Get(RowId);
    }


    @RequestMapping(value = "/CartoonType/ChangeEnabled", method = RequestMethod.GET)
    @ResponseBody
    public boolean ChangeEnabled(Long RowId) {
        return service.update(RowId);
    }

    @RequestMapping(value = "/CartoonType/NotEXISTSName", method = RequestMethod.GET)
    @ResponseBody
    public boolean NotEXISTSName(HttpServletRequest request) {
        Long RowId = 0L;
        String id = request.getParameter("RowId");
        String Name = request.getParameter("Name");
        if (id != null && id != "") RowId = Long.parseLong(id);
        return service.NotEXISTSName(RowId, Name);
    }

}
