package com.ty.erp.services.common;

import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Service
public class CookiesService {

    public void saveCookie(String key, Object value, HttpServletResponse response) {
        Cookie cookie=new Cookie(key,value.toString());
        cookie.setPath("/");
        cookie.setDomain("localhost");
        cookie.setMaxAge(10*60);
        response.addCookie(cookie);
    }
}
