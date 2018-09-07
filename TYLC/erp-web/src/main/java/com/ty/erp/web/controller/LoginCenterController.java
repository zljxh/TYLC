package com.ty.erp.web.controller;

import org.springframework.stereotype.Controller;

@Controller
public class LoginCenterController {
//    @Autowired
//    TenantLoginDaoExt tenantLoginDaoExt;
//
//    @Autowired
//    TenantDao tenantDao;
//
//    @Autowired
//    SystemCache systemCache;
//
//    @Autowired
//    CookiesService cookiesService;
//
//    @RequestMapping(value = "/login")
//    public String login(HttpServletRequest req, HttpServletResponse resp, Model model) throws UnsupportedEncodingException {
//        Map map=new HashMap();
//        req.setCharacterEncoding("UTF-8");
//        String usercode = req.getParameter("usercode");
//        String password = req.getParameter("password");
//        String tenantcode = req.getParameter("tenantcode");
//        ClientLoginBusiness loginBusiness=new ClientLoginBusiness();
//        LoginCenterBusiness tenantLogin=null;
//        if (!StringHelp.IsNullOrEmpty(usercode))
//            usercode = usercode.trim();
//        if (!StringHelp.IsNullOrEmpty(password))
//            password = password.trim();
//        if (!StringHelp.IsNullOrEmpty(tenantcode))
//            tenantcode = tenantcode.trim();
//        if (usercode != null &&  tenantcode != null) {
//             tenantLogin = tenantDao.getLoginInfoByTenantcode(tenantcode);
//            if (tenantLogin == null) {
//                loginBusiness.setSuccess("false");
//                loginBusiness.setMessage("未绑定租户,请联系管理员");
//            } else {
//                MyTenantToken token = new MyTenantToken(usercode, password);
//                token.setTenantRowId(tenantLogin.getTenantRowId());
//
//                try {
//                    map.put("usercode", usercode);
//                    map.put("password", password);
//                    map.put("tenantcode", tenantcode);
////                    String result = HttpHelper.doPostJson("http://" + tenantLogin.getIp() + ":" + tenantLogin.getPort() + "/ClientCheck", JsonHelper.writeValueAsString(map));
//                    loginBusiness = WebUtils.doPost("http://" + tenantLogin.getIp() + ":" + tenantLogin.getPort() + "/ClientCheck", map,ClientLoginBusiness.class);
//                } catch (Exception e) {
//                    MyLogger.logger.error("登陆2异常:" + ExceptionHelp.getExceptionMsg(e));
//
//                    loginBusiness=new ClientLoginBusiness();
//                    loginBusiness.setSuccess("false");
//                    loginBusiness.setMessage("其他错误：" + e.getMessage());
//                }
//            }
//            if (loginBusiness.getSuccess().equals("true")) {
//                String fallbackUrl = "/Routerlogin?sign="+loginBusiness.getSid();
//                try {
//                    cookiesService.saveCookie(MyConstant.GROUPCODE,tenantLogin.getGroupCode(),resp);
//                    cookiesService.saveCookie(MyConstant.TENANTID,tenantLogin.getTenantRowId(),resp);
//                    map.put("companycode",tenantcode);
//                    systemCache.set(loginBusiness.getSid(),map);
//                    WebUtils.redirectToSavedRequest(req, resp, fallbackUrl);
//                } catch (Exception e) {
//                    MyLogger.logger.error("登陆3异常:" + ExceptionHelp.getExceptionMsg(e));
//                    loginBusiness.setSuccess("false");
//                    loginBusiness.setMessage("其他错误：" + e.getMessage());
//
//                }
//            }
//        }
//        req.setAttribute("error", loginBusiness.getMessage());
//        model.addAttribute("error", loginBusiness.getMessage());
//        model.addAttribute("usercode", usercode);
//        //  req.getRequestedSessionId()
//        ControllerHelper.logoutCookie(resp);
//        return "Login/login";
//    }


}
