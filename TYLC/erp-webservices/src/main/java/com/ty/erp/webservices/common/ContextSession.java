package com.ty.erp.webservices.common;



/**
 * Created by admin on 2014/10/15.
 */
public class ContextSession {

//    static volatile long TenantId;
//    static volatile String TenantCode;
//    static boolean SystemError;
//    static CacheBlockingQueued<String> queued;

//    public static boolean getSystemError() {
//        return SystemError;
//    }
//
//    public static void setSystemError(boolean systemError) {
//        SystemError = systemError;
//    }

//    public static String getTenantCode() {
//        loadTenant();
//        if (StringHelp.IsNullOrEmpty(ContextSession.TenantCode)) {
//            throw new NullPointerException("租户未绑定1");
//        }
//        return ContextSession.TenantCode;
//    }

//    public static void loadTenant() {
//        if (StringHelp.IsNullOrEmpty(ContextSession.TenantCode)) {
//            MyLogger.error("ContextSession:获取租户绑定信息");
//            TenantLoginDaoExt daoExtTenantLogin = SpringContextUtil.getBean(TenantLoginDaoExt.class);
////            TenantLogin tl = daoExtTenantLogin.GetTenantLogin();
////            ContextSession.TenantId = Long.parseLong(tl.getTenantIdentity());
////            ContextSession.TenantCode = tl.getTenantCode();
//        }
//    }

//    public static void setTenantCode(String tenantCode) {
//        ContextSession.TenantCode = tenantCode;
//    }

//    public static long getTenantId() {
//        loadTenant();
//        if (ContextSession.TenantId == 0) {
//            throw new NullPointerException("租户未绑定1");
//        }
//        return ContextSession.TenantId;
//    }

//    public static void setTenantId(long tenantId) {
//        ContextSession.TenantId = tenantId;
//    }


//    public static String getUserName() {
//
//        Subject subject = SecurityUtils.getSubject();
//        Operator user = (Operator) subject.getPrincipal();
//        if (user != null)
//            return user.getAccount();
//        else return "";
//    }

//    public static Subject getSubject() {
//        Subject subject = SecurityUtils.getSubject();
//        //subject.isPermitted();
//        return subject;
//    }

//    public static boolean isPermitted(String permission) {
//        Subject subject = SecurityUtils.getSubject();
//        return subject.isPermitted(permission);
//    }

//    public static long getOperatorRowId() {
//        Subject subject = SecurityUtils.getSubject();
//        Operator user = (Operator) subject.getPrincipal();
//        return user.getRowId();
//    }

//    public static Operator getOperator() {
//        Subject subject = SecurityUtils.getSubject();
//        Operator user = (Operator) subject.getPrincipal();
//        return user;
//    }

//    public static OperatorConfigRole getOperatorConfig() {
//        Subject subject = SecurityUtils.getSubject();
//        Session session = subject.getSession();
//        OperatorConfigRole configRole = (OperatorConfigRole) session.getAttribute("OperatorConfigRole");
//        if (configRole != null) {
//            return configRole;
//        }
//        configRole = new OperatorConfigRole();
//        Operator user = (Operator) subject.getPrincipal();
//        OperatorConfigRoleService service = SpringContextUtil.getBean(OperatorConfigRoleService.class);
//        Map<String, Object> map = (Map<String, Object>) service.getOperatorConfig(user.getRowId());
//        if (map == null || map.size() == 0) {
//            return configRole;
//        }
//        configRole.setRowId(ConvertHelp.ToLong(map.get("RowId")));
//        configRole.setOperatorRowId(user.getRowId());
//        configRole.setIsRepeatPrintDeliveryOrder(ConvertHelp.ToBoolean(map.get("IsRepeatPrintDeliveryOrder")));
//        configRole.setIsRepeatPrintExpressOrder(ConvertHelp.ToBoolean(map.get("IsRepeatPrintExpressOrder")));
//        session.setAttribute("OperatorConfigRole", configRole);
//        return configRole;
//    }

//    public static String getCompanyCode() {
//        Subject subject = SecurityUtils.getSubject();
//        Session session = subject.getSession();
//        String CompanyCode = (String) session.getAttribute("CompanyCode");
//        if (StringHelp.IsNullOrEmpty(CompanyCode)) {
//            return "";
//        }
//        return CompanyCode;
//    }

//    public static void setCompanyCode(String CompanyCode) {
//        Subject subject = SecurityUtils.getSubject();
//        Session session = subject.getSession();
//        session.setAttribute("CompanyCode", CompanyCode);
//    }

//    public static CacheBlockingQueued<String> getQueued() {
//        if (queued == null) {
//            queued = new CacheBlockingQueued<String>("测试队列", 100, true);
//            queued.setCache(SpringContextUtil.getBean(SystemCache.class));
//        }
//        return queued;
//    }


}
