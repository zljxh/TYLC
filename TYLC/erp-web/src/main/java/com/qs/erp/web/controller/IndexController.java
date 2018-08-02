package com.qs.erp.web.controller;


import com.qs.erp.daos.dao.TenantLoginDao;
import com.qs.erp.entitys.businessmodel.CallResult;
import com.qs.erp.entitys.entity.TenantLogin;
import com.qs.erp.services.common.GlobalTenant;
import com.qs.erp.services.service.Init.InitService;
import com.qs.erp.services.service.TenantLoginService;
import com.qs.erp.utils.util.StringHelp;
import com.qs.erp.web.WebConstant;
import com.qs.erp.web.spring.ControllerContext;
import com.qs.erp.webservices.common.ContextSession;
import com.qs.erp.services.common.GlobalParameter;
import com.qs.erp.services.service.OperatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

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
            //req.getRequestDispatcher("/index").forward(req, resp);
            resp.sendRedirect("/index");
        } catch (Exception ex) {
//            ex.printStackTrace();
        }

        return "main";
    }

    @RequestMapping("/index")
    public String main(ModelMap model) {
        CallResult result=initService.IsInitFinished(ControllerContext.getTenantId());
        if(!result.getResult())
        {
            return "redirect:/Init/DataInitProgress";
        }
        Object menuTree = operatorService.GetMenuTree(ControllerContext.getCurrentContext());
        String companyCode=ControllerContext.getCompanyCode();
        String username =ControllerContext.getUserName();
        TenantLogin tenantLogin=tenantLoginDao.GetTenant(ControllerContext.getTenantId());
        CallResult callResult=tenantLoginService.IsJiFeiNumberAdequate(ControllerContext.getTenantId());
        if(tenantLogin!=null){
            model.addAttribute("IsJiFei", tenantLogin.getIsJiFei());
            if(callResult.getResult()&&tenantLogin.getIsJiFei()) {
                Date now =new Date();
                if(tenantLogin.getJiFeiStartDate()!=null && now.getTime()>tenantLogin.getJiFeiStartDate().getTime()){
                    model.addAttribute("AdequateNumber", callResult.geto());
                }else{
                    callResult.setMessage("尚未开始计费");
                }
            }
            if(!StringHelp.IsNullOrEmpty(callResult.getMessage())) {
                model.addAttribute("ErrorMsg", StringHelp.subString(callResult.getMessage(), 20));
            }
        }
        CallResult msgResult=tenantLoginService.GetMsgCount(ControllerContext.getTenantId());
        if(msgResult.getResult()) {
            model.addAttribute("remainMsgNumber", msgResult.geto());
        }
        /*if(!StringHelp.IsNullOrEmpty(msgResult.getMessage())) {
            model.addAttribute("msgErrorMsg", StringHelp.subString(msgResult.getMessage(), 20));
        }*/
        model.addAttribute("companyCode",companyCode);
        model.addAttribute("UserName", username);
        model.addAttribute("menuTree", menuTree);
        model.addAttribute("version", WebConstant.APP_VERSION);
        if(globalTenant.getVersion()==null){
            model.addAttribute("head","head");
            model.addAttribute("Title","千胜电商ERP");
        }else {
            if(globalTenant.getVersion().equals("QS")){
                model.addAttribute("head","head");
                model.addAttribute("Title","千胜电商ERP");
            }else if(globalTenant.getVersion().equals("WD")){
                model.addAttribute("head","wdhead");
                model.addAttribute("Title","问道云平台");
            }else if(globalTenant.getVersion().equals("SD")){
                model.addAttribute("head","sdhead");
                model.addAttribute("Title","顺德家云平台");
            }else {
                model.addAttribute("head","head");
                model.addAttribute("Title","千胜电商ERP");
            }
        }
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
