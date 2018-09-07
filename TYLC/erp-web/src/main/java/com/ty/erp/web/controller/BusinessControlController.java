package com.ty.erp.web.controller;


import com.ty.erp.services.service.BSGridLayoutService;
import com.ty.erp.web.spring.ControllerContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


/**
 * Created by admin on 2014/10/9.
 */
@Controller
public class BusinessControlController {
    @Autowired
    BSGridLayoutService bsGridLayoutService;

    @RequestMapping(value = "/BusinessControl/GetGridLayout")
    @ResponseBody
    public Object GetGridLayout(@RequestParam("FormName") String FormName) {
        return bsGridLayoutService.getByOpeaterAndFormName(ControllerContext.getCurrentContext(), FormName);
    }

    @RequestMapping(value = "/BusinessControl/AddPic")
    public String AddPic() {
        return "BusinessControl/AddPic";
    }
}
