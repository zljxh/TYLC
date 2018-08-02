package com.qs.erp.services.common;


import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by xyyz150 on 2016/4/13.
 */
public class ControllerHelper {

    public static void logoutCookie(HttpServletResponse resp){
        Cookie cookie = new Cookie(MyConstant.TENANTID, "-1");
        cookie.setPath("/");
        resp.addCookie(cookie);
        Cookie cookie2 = new Cookie(MyConstant.GROUPCODE, "-1");
        cookie2.setPath("/");
        resp.addCookie(cookie2);
        Cookie cookie3 = new Cookie("sid", "-1");
        cookie3.setPath("/");
        resp.addCookie(cookie3);
    }
}
