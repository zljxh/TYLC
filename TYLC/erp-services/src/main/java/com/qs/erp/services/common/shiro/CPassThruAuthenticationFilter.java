package com.qs.erp.services.common.shiro;

import com.qs.erp.services.common.ControllerHelper;
import org.apache.shiro.web.filter.authc.PassThruAuthenticationFilter;
import org.apache.shiro.web.servlet.ShiroHttpServletRequest;
import org.apache.shiro.web.servlet.ShiroHttpServletResponse;
import org.apache.shiro.web.util.WebUtils;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by admin on 2015/1/22.
 */
public class CPassThruAuthenticationFilter extends PassThruAuthenticationFilter {
    protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
        ControllerHelper.logoutCookie((HttpServletResponse) response);
        if (isLoginRequest(request, response)) {
            return true;
        } else {
            if (((ShiroHttpServletRequest) request).getHeader("x-requested-with")!=null) {
                ((ShiroHttpServletResponse) response).addHeader("showLogin","168168");
//                ((ContentBufferingResponse) response).addHeader("showLogin","168168");
                WebUtils.toHttp(response).sendError(HttpServletResponse.SC_UNAUTHORIZED);
            } else {

              return  super.onAccessDenied(request, response);
            }
            return false;
        }
    }
}
