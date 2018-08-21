package com.qs.erp.web.controller;

import com.qs.erp.common.ServiceContext;
import com.qs.erp.daos.daoext.TenantLoginDaoExt;
import com.qs.erp.entitys.businessmodel.ClientLoginBusiness;
import com.qs.erp.entitys.businessmodel.LoginBusiness;
import com.qs.erp.entitys.entity.Employee;
import com.qs.erp.entitys.entity.Operator;
import com.qs.erp.entitys.entity.TenantLogin;
import com.qs.erp.services.common.GlobalParameter;
import com.qs.erp.services.common.MyConstant;
import com.qs.erp.services.common.MyLogger;
import com.qs.erp.services.common.cache.SystemCache;
import com.qs.erp.services.common.shiro.MyRealm;
import com.qs.erp.services.common.shiro.MyTenantToken;
import com.qs.erp.services.common.spring.SpringContextUtil;
import com.qs.erp.services.service.OperatorService;
import com.qs.erp.services.common.ControllerHelper;
import com.qs.erp.utils.util.ConvertHelp;
import com.qs.erp.utils.util.ExceptionHelp;
import com.qs.erp.web.spring.ControllerContext;
import com.qs.erp.entitys.entity.OperatorLoginLog;
import com.qs.erp.web.jcaptcha.JCaptchaValidateFilter;
import com.qs.erp.services.service.EmployeeService;
import com.qs.erp.services.service.OperatorLoginLogService;
import com.qs.erp.utils.util.StringHelp;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.apache.shiro.web.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Controller
public class LoginController {
    @Autowired
    EmployeeService employeeService;
    @Autowired
    JCaptchaValidateFilter jCaptchaValidateFilter;
    @Autowired
    SystemCache systemCache;
    @Autowired
    TenantLoginDaoExt tenantLoginDaoExt;

    @Autowired
    OperatorLoginLogService serviceLog;
    @Autowired
    private OperatorService service;

    @RequestMapping(value = "/login")
    public String login(HttpServletRequest req, HttpServletResponse resp, Model model) throws UnsupportedEncodingException {
        String error = null;
        req.setCharacterEncoding("UTF-8");
        String usercode = req.getParameter("usercode");
        String password = req.getParameter("password");
        String tenantcode = req.getParameter("tenantcode");
        if (!StringHelp.IsNullOrEmpty(usercode))
            usercode = usercode.trim();
        if (!StringHelp.IsNullOrEmpty(password))
            password = password.trim();
        if (!StringHelp.IsNullOrEmpty(tenantcode))
            tenantcode = tenantcode.trim();
        Subject subject = SecurityUtils.getSubject();
        if (subject.getPrincipal() != null) {
            //return "redirect:/";
            try {
                WebUtils.redirectToSavedRequest(req, resp, "/");
            } catch (Exception ex) {
                MyLogger.logger.error("登陆1异常:"+ ExceptionHelp.getExceptionMsg(ex));
                error = ex.getMessage();
            }
        }
//        String exceptionClassName = (String) req.getAttribute("shiroLoginFailure");
//        if ("jCaptcha.error".equals(exceptionClassName)) {
//            error = "验证码错误";
//        }
//        if (!jCaptchaValidateFilter.Validate(req)) {
//            error = "验证码错误";
//        }
        if (usercode != null && error == null && tenantcode != null) {
            TenantLogin tenantLogin = tenantLoginDaoExt.getTenantLogin(tenantcode);
            if (tenantLogin == null) {
                error = "未绑定租户,请联系管理员";
            } else {
                MyTenantToken token = new MyTenantToken(usercode, password);
                token.setTenantRowId(tenantLogin.getTenantRowId());
                try {
                    subject.login(token);
                    AddLoginLog(req, "登入");
                    //  MyLogger.error("成功 sessionid=" + session.getId());
                } catch (UnknownAccountException e) {
                    error = "用户名/密码错误";
                } catch (IncorrectCredentialsException e) {
                    error = "用户名/密码错误";
                } catch (ExcessiveAttemptsException e) {
                    error = "尝试登陆次数太多";
                } catch (Exception e) {
                    MyLogger.logger.error("登陆2异常:"+ ExceptionHelp.getExceptionMsg(e));
                    //其他错误，比如锁定，如果想单独处理请单独catch处理
                    error = "其他错误：" + e.getMessage();
                }
            }
            if (error == null) {
                String fallbackUrl = "/";
                try {
                    WebUtils.redirectToSavedRequest(req, resp, fallbackUrl);
                } catch (Exception ex) {
                    MyLogger.logger.error("登陆3异常:"+ ExceptionHelp.getExceptionMsg(ex));
                    error = ex.getMessage();
                }
            }
        }
        req.setAttribute("error", error);
        model.addAttribute("error", error);
        model.addAttribute("usercode", usercode);
        //  req.getRequestedSessionId()
        ControllerHelper.logoutCookie(resp);
        return "Login/login";
    }

    @RequestMapping(value = "/login/logout")
    public String Logout(HttpServletRequest req, HttpServletResponse resp, Model model) {
        Subject subject = SecurityUtils.getSubject();
        if(subject!=null) {
            AddLoginLog(req, "退出");
            subject.logout();
        }
        ControllerHelper.logoutCookie(resp);
        return "redirect:/login";
    }


    public void AddLoginLog(HttpServletRequest request, String LoginTypeName) {
        ServiceContext serviceContext= ControllerContext.getCurrentContext();
        if(serviceContext==null){
            return;
        }
        OperatorLoginLog log = new OperatorLoginLog();
        log.setComputerName(getRemoteHost(request));
        log.setCreateDate(new Date());
        log.setIp(getIpAddr(request));
        log.setNetworkCard("");
        log.setLoginTypeName(LoginTypeName);
        log.setTenantRowId(serviceContext.getTenantRowId());
        serviceLog.Save(log);
    }

    public String getRemoteHost(HttpServletRequest request) {
        return request.getRemoteHost();
    }

    public String getIpAddr(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    @ResponseBody
    @RequestMapping(value = "/login/check", method = RequestMethod.POST)
    public String check(@RequestBody HashMap<String, String> hm, HttpServletRequest req, HttpServletResponse resp, Model model) {
        String error = null;
        String username = hm.get("usercode");//req.getParameter("usercode");
        String password = hm.get("password");//req.getParameter("password");
        if (username != null) {
            Subject subject = SecurityUtils.getSubject();
            MyTenantToken token = new MyTenantToken(username, password);
            try {
                subject.login(token);
            } catch (UnknownAccountException e) {
                error = "用户名/密码错误";
            } catch (IncorrectCredentialsException e) {
                error = "用户名/密码错误";
            } catch (Exception e) {
                //其他错误，比如锁定，如果想单独处理请单独catch处理
                error = "其他错误：" + e.getMessage();
            }
            if (error != null) {//出错了，返回登录页面
                req.setAttribute("error", error);
                model.addAttribute("error", error);
                return "{Result:true}";
            } else {//登录成功
                String fallbackUrl = "/main";
                try {
                    WebUtils.redirectToSavedRequest(req, resp, fallbackUrl);
                } catch (Exception ex) {

                }
                return "{Result:true}";
//                SavedRequest savedRequest =    WebUtils.getAndClearSavedRequest(req);

                // return"";
            }

        }
        return "用户名或密码不对";
    }

    @RequestMapping(value = "/showLogin")
    public String showLogin() {
        return "Login/showLogin";
    }



    @ResponseBody
    @RequestMapping(value = "/RouterCheck", method = RequestMethod.POST)
    public LoginBusiness RouterCheck(@RequestBody HashMap<String, String> hm, HttpServletRequest req, HttpServletResponse resp, HttpSession session) {
        LoginBusiness loginBusiness = new LoginBusiness();
        String error = null;
        String usercode = hm.get("usercode");
        String password = hm.get("password");
        String companycode = hm.get("companycode");
        String tenantcode = hm.get("tenantcode");
        if (!StringHelp.IsNullOrEmpty(usercode))
            usercode = usercode.trim();
        if (!StringHelp.IsNullOrEmpty(password))
            password = password.trim();
        if (!StringHelp.IsNullOrEmpty(tenantcode))
            tenantcode = tenantcode.trim();
        if (!StringHelp.IsNullOrEmpty(companycode))
            companycode = companycode.trim();
        if (usercode != null) {
            try {
                TenantLogin tenantLogin = tenantLoginDaoExt.getTenantLogin(tenantcode);
                if (tenantLogin == null) {
                    loginBusiness.setIsSuccess(false);
                    loginBusiness.setMessage("租户绑定信息不对，到数据中心解绑");
                    ControllerHelper.logoutCookie(resp);
                    return loginBusiness;
                }
                ServiceContext serviceContext = new ServiceContext();
                serviceContext.setTenantRowId(tenantLogin.getTenantRowId());
                Operator op = service.findByAccount(serviceContext, usercode);
                if (op == null) {
                    throw new UnknownAccountException();
                }
                if (Boolean.FALSE.equals(op.getIsEnabled())) {
                    throw new LockedAccountException(); //帐号锁定
                }
                HashedCredentialsMatcher matcher = SpringContextUtil.getBean(HashedCredentialsMatcher.class);
                MyRealm myRealm = SpringContextUtil.getBean(MyRealm.class);
                SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                        op, //用户名
                        op.getPassword(), //密码
                        ByteSource.Util.bytes(op.getAccount() + op.getSalt()),//"admin8d78869f470951332959580424d4bf4f"),//user.getCredentialsSalt()),//salt=username+salt
                        myRealm.getName()  //realm name
                );
                MyTenantToken token = new MyTenantToken(usercode, password);
                token.setTenantRowId(tenantLogin.getTenantRowId());
                if (matcher.doCredentialsMatch(token, authenticationInfo)) {

                } else {
                    error = "用户名/密码校验错误";
                }
                AddLoginLog(req, "路由客户端验证");
                Employee employee = employeeService.Get(serviceContext, op.getRowId());
                loginBusiness.setMoblie(employee.getMobile());
            } catch (UnknownAccountException e) {
                error = "用户名/密码错误";
            } catch (IncorrectCredentialsException e) {
                error = "用户名/密码错误";
            } catch (ExcessiveAttemptsException e) {
                error = "尝试登陆次数太多";
            } catch (Exception e) {
                //其他错误，比如锁定，如果想单独处理请单独catch处理
                error = "其他错误：" + e.getMessage();
            }
            if (error == null) {
                //把用户名密码放入缓存
                UUID uuid = UUID.randomUUID();
                Map map = new HashMap();
                map.put("usercode", usercode);
                map.put("password", password);
                map.put("companycode", companycode);
                systemCache.set(uuid.toString(), 15 * 60, map);//15分钟
                loginBusiness.setMessage(uuid.toString());
                loginBusiness.setIsSuccess(true);

            } else {
                loginBusiness.setMessage(error);
                loginBusiness.setIsSuccess(false);
                ControllerHelper.logoutCookie(resp);
            }
        }
        return loginBusiness;
    }

    @RequestMapping(value = "/Routerlogin")
    public String Routerlogin(HttpServletRequest req, HttpServletResponse resp, RedirectAttributes attributes) throws UnsupportedEncodingException {
        String error = null;
        req.setCharacterEncoding("UTF-8");
        Cookie[] cookies = req.getCookies();
        if (cookies == null || cookies.length <= 0) {
            error = "租户信息未设置";
            MyLogger.error(error);
        }
        TenantLogin tenantLogin = null;
        boolean ishavegroupcode = false;
        String tenantcode = "";
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals(MyConstant.TENANTID)) {
                tenantcode = cookie.getValue();
                tenantLogin = tenantLoginDaoExt.getTenantLogin(cookie.getValue());
                if (tenantLogin == null) {
                    error = "租户信息异常";
                    MyLogger.error(error + ":租户ID：[" + cookie.getValue() + "],IP：[" + req.getServerName() + ":" + req.getServerPort() + "]");
                }
            }
            if (cookie.getName().equals(MyConstant.GROUPCODE)) {
                ishavegroupcode = true;
            }
        }
        if (error == null && ishavegroupcode == false) {
            error = "租户组信息异常";
            MyLogger.error(error + ":租户ID：[" + tenantcode + "],IP：[" + req.getServerName() + ":" + req.getServerPort() + "]");
        }
        //从缓存中取用户名密码
        try {
            if (error == null) {
                String sign = URLDecoder.decode(req.getParameter("sign"));
                Map map = systemCache.get(sign);
                if (map == null) {//缓存过期，重新登陆
                    error = "登陆超时，请重新登陆";
                } else {
                    String usercode = map.get("usercode").toString();
                    String password = map.get("password").toString();
                    String companycode = map.get("companycode").toString();
                    if (!StringHelp.IsNullOrEmpty(usercode))
                        usercode = usercode.trim();
                    if (!StringHelp.IsNullOrEmpty(password))
                        password = password.trim();
                    if (!StringHelp.IsNullOrEmpty(companycode))
                        companycode = companycode.trim();
                    systemCache.delete(sign);
                    Subject subject = SecurityUtils.getSubject();
                    if (subject.getPrincipal() != null) {
                        if (!StringHelp.IsNullOrEmpty(companycode)) {
                            ControllerContext.setCompanyCode(companycode);
                        }
                        WebUtils.redirectToSavedRequest(req, resp, "/");//成功
                    }
                    if (usercode != null) {
                        MyTenantToken token = new MyTenantToken(usercode, password);
                        token.setTenantRowId(tenantLogin.getTenantRowId());
                        try {
                            subject.login(token);
                            AddLoginLog(req, "登入");
                        } catch (UnknownAccountException e) {
                            error = "用户名/密码错误";
                        } catch (IncorrectCredentialsException e) {
                            error = "用户名/密码错误";
                        } catch (ExcessiveAttemptsException e) {
                            error = "尝试登陆次数太多";
                        } catch (Exception e) {
                            //其他错误，比如锁定，如果想单独处理请单独catch处理
                            error = "其他错误：" + e.getMessage();
                        }
                        if (error == null) {
                            try {
                                if (!StringHelp.IsNullOrEmpty(companycode)) {
                                    ControllerContext.setCompanyCode(companycode);
                                }
                                return "redirect:/";
//                    WebUtils.redirectToSavedRequest(req, resp, fallbackUrl);
                            } catch (Exception ex) {
                                error = ex.getMessage();
                            }
                        }
                    }
                }
            }
            ControllerHelper.logoutCookie(resp);
        } catch (Exception ex) {
            ControllerHelper.logoutCookie(resp);
            error = ex.getMessage();
        }
        attributes.addAttribute("error", error);
        return "redirect:/login";
//        req.setAttribute("error", error);
//        return "Login/login";
    }

    @ResponseBody
    @RequestMapping(value = "/ClientCheck", method = RequestMethod.POST)
    public ClientLoginBusiness ClientCheck(@RequestBody HashMap<String, String> hm, HttpServletRequest req, HttpServletResponse resp, HttpSession session) {
        ClientLoginBusiness clientLoginBusiness = new ClientLoginBusiness();
        String error = null;
        String usercode = hm.get("usercode");
        String password = hm.get("password");
        String tenantcode = hm.get("tenantcode");
        if (!StringHelp.IsNullOrEmpty(usercode))
            usercode = usercode.trim();
        if (!StringHelp.IsNullOrEmpty(password))
            password = password.trim();
        if (!StringHelp.IsNullOrEmpty(tenantcode))
            tenantcode = tenantcode.trim();
        if (usercode != null) {
            Subject subject = SecurityUtils.getSubject();
            TenantLogin tenantLogin = tenantLoginDaoExt.getTenantLogin(tenantcode);
            if (tenantLogin == null) {
                error = "租户信息不对";
            } else {
                MyTenantToken token = new MyTenantToken(usercode, password);
                token.setTenantRowId(tenantLogin.getTenantRowId());
                try {
                    subject.login(token);
                    AddLoginLog(req, "登入");
                } catch (UnknownAccountException e) {
                    error = "用户名/密码错误1";
                } catch (IncorrectCredentialsException e) {
                    error = "用户名/密码错误1";
                } catch (ExcessiveAttemptsException e) {
                    error = "尝试登陆次数太多";
                } catch (Exception e) {
                    //其他错误，比如锁定，如果想单独处理请单独catch处理
                    error = "其他错误1：" + e.getMessage();
                }
            }
            if (error == null) {
                clientLoginBusiness.setTENANTID(tenantLogin.getTenantRowId());
                clientLoginBusiness.setSid(session.getId());
                clientLoginBusiness.setJSESSIONID(((HttpServletRequest) ((ShiroHttpServletRequest) req).getRequest()).getSession().getId());
                clientLoginBusiness.setMessage("登入成功");
                clientLoginBusiness.setSuccess("true");
                ServiceContext serviceContext = new ServiceContext();
                serviceContext.setTenantRowId(tenantLogin.getTenantRowId());
                boolean isPurchaseCodePurchase = GlobalParameter.IsPurchaseCodePurchase(serviceContext);
                clientLoginBusiness.setPurchaseCodePurchaseEd(isPurchaseCodePurchase);
                try {
                    MyLogger.logger.error("登录信息:" + ConvertHelp.ToJson(clientLoginBusiness));
                } catch (Exception ex) {
                }
            } else {
                clientLoginBusiness.setMessage(error);
                clientLoginBusiness.setSuccess("false");
            }
        }
        return clientLoginBusiness;
    }

}