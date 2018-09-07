package com.ty.erp.webservices.service;

import com.ty.erp.daos.dao.TenantLoginDao;
import com.ty.erp.entitys.entity.Operator;
import com.ty.erp.entitys.entity.OperatorConfigRole;
import com.ty.erp.entitys.entity.TenantLogin;
import com.ty.erp.services.common.CurrentContext;
import com.ty.erp.services.common.spring.SpringContextUtil;
import com.ty.erp.services.service.OperatorConfigRoleService;
import com.ty.erp.utils.util.ConvertHelp;
import com.ty.erp.utils.util.StringHelp;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by xyyz150 on 2015/9/7.
 */
@Service("currentContext")
public class WebCurrentContext implements CurrentContext {


    public long getOperatorRowId() {
        return getOperator().getRowId();
    }

    public String getUserName() {
        return getOperator().getAccount();
    }

    public boolean getSystemError() {
        return false;
    }

    /**
     * 租户代码，用于租户对应web验证，保存缓存前缀
     * @return
     */
    public String getTenantCode() {
        Subject subject = SecurityUtils.getSubject();
        if(subject==null)return "";
        Session session = subject.getSession();
        String tenantCode = (String) session.getAttribute("tenantCode");
        if(StringHelp.IsNullOrEmpty(tenantCode)){
            TenantLoginDao tenantloginservice = SpringContextUtil.getBean(TenantLoginDao.class);
            if(tenantloginservice==null){
                return "";
            }
            long tenantid=getTenantId();
            if(tenantid==0){
                return "";
            }
            TenantLogin tenantLogin= tenantloginservice.GetTenant(tenantid);
            if(tenantLogin==null){
                return "";
            }
            tenantCode=tenantLogin.getTenantCode();
            session.setAttribute("tenantCode", tenantCode);
        }
        return tenantCode;
    }

    public long getTenantId() {
        return getOperator().getTenantRowId();
    }

    public Operator getOperator() {
        Subject subject = SecurityUtils.getSubject();
        if (subject == null) {
            return new Operator();
        }
        Operator user = (Operator) subject.getPrincipal();
        if (user == null) {
            user = new Operator();
        }
        return user;
    }

    public void setTenantId(Long tenantId) {

    }

    public void setTenantCode(String tenantCode) {
        Subject subject = SecurityUtils.getSubject();
        if(subject==null)return ;
        Session session = subject.getSession();
        session.setAttribute("tenantCode", tenantCode);
    }

    public void setSystemError(boolean systemError) {

    }

    public String getCompanyCode() {
        Subject subject = SecurityUtils.getSubject();
        if(subject==null)return "";
        Session session = subject.getSession();
        String CompanyCode = (String) session.getAttribute("CompanyCode");
        if (StringHelp.IsNullOrEmpty(CompanyCode)) {
            return "";
        }
        return CompanyCode;
    }

    public void setCompanyCode(String CompanyCode) {
        Subject subject = SecurityUtils.getSubject();
        if(subject==null)return ;
        Session session = subject.getSession();
        session.setAttribute("CompanyCode", CompanyCode);
    }

    public OperatorConfigRole getOperatorConfig() {
        Subject subject = SecurityUtils.getSubject();
        Session session = subject.getSession();
        OperatorConfigRole configRole = (OperatorConfigRole) session.getAttribute("OperatorConfigRole");
        if (configRole != null) {
            return configRole;
        }
        configRole = new OperatorConfigRole();
        Operator user = (Operator) subject.getPrincipal();
        OperatorConfigRoleService service = SpringContextUtil.getBean(OperatorConfigRoleService.class);
        Map<String, Object> map = (Map<String, Object>) service.getOperatorConfig(user.getRowId());
        if (map == null || map.size() == 0) {
            return configRole;
        }
        configRole.setRowId(ConvertHelp.ToLong(map.get("RowId")));
        configRole.setOperatorRowId(user.getRowId());
        configRole.setIsRepeatPrintDeliveryOrder(ConvertHelp.ToBoolean(map.get("IsRepeatPrintDeliveryOrder")));
        configRole.setIsRepeatPrintExpressOrder(ConvertHelp.ToBoolean(map.get("IsRepeatPrintExpressOrder")));
        session.setAttribute("OperatorConfigRole", configRole);
        return configRole;
    }
}
