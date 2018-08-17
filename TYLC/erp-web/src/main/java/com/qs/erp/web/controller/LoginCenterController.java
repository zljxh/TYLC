package com.qs.erp.web.controller;

import com.qs.PlatUtils.utils.HttpHelper;
import com.qs.erp.common.ServiceContext;
import com.qs.erp.daos.dao.TenantDao;
import com.qs.erp.daos.daoext.TenantLoginDaoExt;
import com.qs.erp.entitys.businessmodel.ClientLoginBusiness;
import com.qs.erp.entitys.businessmodel.LoginCenterBusiness;
import com.qs.erp.entitys.entity.OperatorLoginLog;
import com.qs.erp.entitys.entity.TenantLogin;
import com.qs.erp.services.common.ControllerHelper;
import com.qs.erp.services.common.CookiesService;
import com.qs.erp.services.common.MyConstant;
import com.qs.erp.services.common.MyLogger;
import com.qs.erp.services.common.cache.SystemCache;
import com.qs.erp.services.common.shiro.MyTenantToken;
import com.qs.erp.utils.util.ExceptionHelp;
import com.qs.erp.utils.util.StringHelp;
import com.qs.erp.web.spring.ControllerContext;
import com.qs.platforms.helper.JsonHelper;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginCenterController {
    @Autowired
    TenantLoginDaoExt tenantLoginDaoExt;

    @Autowired
    TenantDao tenantDao;

    @Autowired
    SystemCache systemCache;

    @Autowired
    CookiesService cookiesService;

    @RequestMapping(value = "/login")
    public String login(HttpServletRequest req, HttpServletResponse resp, Model model) throws UnsupportedEncodingException {
        Map map=new HashMap();
        req.setCharacterEncoding("UTF-8");
        String usercode = req.getParameter("usercode");
        String password = req.getParameter("password");
        String tenantcode = req.getParameter("tenantcode");
        ClientLoginBusiness loginBusiness=new ClientLoginBusiness();
        LoginCenterBusiness tenantLogin=null;
        if (!StringHelp.IsNullOrEmpty(usercode))
            usercode = usercode.trim();
        if (!StringHelp.IsNullOrEmpty(password))
            password = password.trim();
        if (!StringHelp.IsNullOrEmpty(tenantcode))
            tenantcode = tenantcode.trim();
        if (usercode != null &&  tenantcode != null) {
             tenantLogin = tenantDao.getLoginInfoByTenantcode(tenantcode);
            if (tenantLogin == null) {
                loginBusiness.setSuccess("false");
                loginBusiness.setMessage("未绑定租户,请联系管理员");
            } else {
                MyTenantToken token = new MyTenantToken(usercode, password);
                token.setTenantRowId(tenantLogin.getTenantRowId());

                try {
                    map.put("usercode", usercode);
                    map.put("password", password);
                    map.put("tenantcode", tenantcode);
//                    String result = HttpHelper.doPostJson("http://" + tenantLogin.getIp() + ":" + tenantLogin.getPort() + "/ClientCheck", JsonHelper.writeValueAsString(map));
                    loginBusiness = com.qs.erp.utils.util.WebUtils.doPost("http://" + tenantLogin.getIp() + ":" + tenantLogin.getPort() + "/ClientCheck", map,ClientLoginBusiness.class);
                } catch (Exception e) {
                    MyLogger.logger.error("登陆2异常:" + ExceptionHelp.getExceptionMsg(e));

                    loginBusiness=new ClientLoginBusiness();
                    loginBusiness.setSuccess("false");
                    loginBusiness.setMessage("其他错误：" + e.getMessage());
                }
            }
            if (loginBusiness.getSuccess().equals("true")) {
                String fallbackUrl = "/Routerlogin?sign="+loginBusiness.getSid();
                try {
                    cookiesService.saveCookie(MyConstant.GROUPCODE,tenantLogin.getGroupCode(),resp);
                    cookiesService.saveCookie(MyConstant.TENANTID,tenantLogin.getTenantRowId(),resp);
                    map.put("companycode",tenantcode);
                    systemCache.set(loginBusiness.getSid(),map);
                    WebUtils.redirectToSavedRequest(req, resp, fallbackUrl);
                } catch (Exception e) {
                    MyLogger.logger.error("登陆3异常:" + ExceptionHelp.getExceptionMsg(e));
                    loginBusiness.setSuccess("false");
                    loginBusiness.setMessage("其他错误：" + e.getMessage());

                }
            }
        }
        req.setAttribute("error", loginBusiness.getMessage());
        model.addAttribute("error", loginBusiness.getMessage());
        model.addAttribute("usercode", usercode);
        //  req.getRequestedSessionId()
        ControllerHelper.logoutCookie(resp);
        return "Login/login";
    }


}
