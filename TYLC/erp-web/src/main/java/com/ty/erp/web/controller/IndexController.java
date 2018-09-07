package com.ty.erp.web.controller;


import com.ty.erp.daos.dao.TenantLoginDao;
import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.entity.TenantLogin;
import com.ty.erp.services.common.GlobalTenant;
import com.ty.erp.services.service.Init.InitService;
import com.ty.erp.services.service.TenantLoginService;
import com.ty.erp.web.WebConstant;
import com.ty.erp.web.spring.ControllerContext;
import com.ty.erp.services.common.GlobalParameter;
import com.ty.erp.services.service.OperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller

public class IndexController {

    @Autowired
    OperatorService operatorService;
    @Autowired
    InitService initService;
    @Autowired
    TenantLoginDao tenantLoginDao;
    @Autowired
    TenantLoginService tenantLoginService;
    @Autowired
    GlobalTenant globalTenant;

    @RequestMapping("/")
    public String index(HttpServletRequest req, HttpServletResponse resp, ModelMap model) {
        try {
            resp.sendRedirect("/index");
        } catch (Exception ex) {
        }

        return "main";
    }

    @RequestMapping("/index")
    public String main(ModelMap model) {
        CallResult result = initService.IsInitFinished(ControllerContext.getTenantId());
        if (!result.getResult()) {
            return "redirect:/Init/DataInitProgress";
        }
        Object menuTree = operatorService.GetMenuTree(ControllerContext.getCurrentContext());
        String companyCode = ControllerContext.getCompanyCode();
        String username = ControllerContext.getUserName();
        TenantLogin tenantLogin = tenantLoginDao.GetTenant(ControllerContext.getTenantId());
        model.addAttribute("companyCode", companyCode);
        model.addAttribute("UserName", username);
        model.addAttribute("menuTree", menuTree);
        model.addAttribute("version", WebConstant.APP_VERSION);

        model.addAttribute("head", "head");
        model.addAttribute("Title", "千胜电商ERP");

        return "index";
    }

    //main.jsp
    @RequestMapping("/main")
    public String index1(ModelMap model) {
        model.addAttribute("UserName", ControllerContext.getUserName());
        model.addAttribute("IsBatch", GlobalParameter.IsBatch(ControllerContext.getCurrentContext().getTenantRowId()));//是否启用批次
        return "main";
    }

    @RequestMapping("/index56")
    public String index56(ModelMap model) {
        model.addAttribute("UserName", ControllerContext.getUserName());
        return "index56";
    }
}
