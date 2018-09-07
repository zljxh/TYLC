package com.ty.erp.services.common.shiro;

import com.ty.erp.services.common.ControllerHelper;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.apache.shiro.web.servlet.ShiroHttpServletResponse;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by admin on 2015/1/5.
 */
public class CPermissionsAuthorizationFilter extends org.apache.shiro.web.filter.authz.PermissionsAuthorizationFilter {
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws IOException {
        ControllerHelper.logoutCookie((HttpServletResponse) response);
        Subject subject = getSubject(request, response);
        // If the subject isn't identified, redirect to login URL
        if (subject.getPrincipal() == null&&((ShiroHttpServletRequest) request).getHeader("x-requested-with")!=null) {
            ((ShiroHttpServletResponse) response).addHeader("showLogin","168168");
//            ((ContentBufferingResponse) response).addHeader("showLogin","168168");
            WebUtils.toHttp(response).sendError(HttpServletResponse.SC_UNAUTHORIZED);
        } else {
            return super.onAccessDenied(request,response);
        }
        return false;
    }
}