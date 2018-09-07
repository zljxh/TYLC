package com.ty.erp.services.common;

import com.ty.erp.services.common.spring.SpringContextUtil;
import org.springframework.beans.BeansException;

/**
 * Created by xyyz150 on 2015/9/7.
 */
public class CurrentContextFactory {
    private static CurrentContext currentContext;

    public static CurrentContext createInstance() {
        if (currentContext == null) {
            synchronized (CurrentContext.class) {
                if (currentContext == null) {
                    try {
                        currentContext = (CurrentContext) SpringContextUtil.getBean("currentContext");
                    } catch (BeansException e) {
                        currentContext = new DefalutCurrentContext();
                    } catch (Exception e) {
                        MyLogger.error("获取CurrentContext错误:" + e.toString());
                        currentContext = new DefalutCurrentContext();
                    }
                }
            }
        }
        return currentContext;
    }
}
