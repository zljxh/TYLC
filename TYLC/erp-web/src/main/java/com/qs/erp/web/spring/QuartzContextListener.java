package com.qs.erp.web.spring;
import com.qs.erp.services.common.MyLogger;
import com.qs.erp.services.common.spring.SpringContextUtil;
import org.quartz.impl.StdScheduler;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * Created by admin on 2015/4/28.
 */
public class QuartzContextListener implements ServletContextListener {

    /*
     * 测试代码写得随便
     *
     * @seejavax.servlet.ServletContextListener#contextDestroyed(javax.servlet.
     * ServletContextEvent)
     */
    @Override
    public void contextDestroyed(ServletContextEvent arg0) {
        MyLogger.error("contextDestroyed:获取scheduler begin");
//        WebApplicationContext webApplicationContext = (WebApplicationContext) arg0
//                .getServletContext()
//                .getAttribute(
//                        WebApplicationContext.ROOT_WEB_APPLICATION_CONTEXT_ATTRIBUTE);
        try{
            MyLogger.error("scheduler-Begin");//SpringContextUtil
            StdScheduler scheduler= (StdScheduler) SpringContextUtil.getBean("schedulerFactoryBean");;
            MyLogger.error("scheduler-End");
            if (scheduler != null) {
                try {
                    scheduler.shutdown();
                   // scheduler.getObject().shutdown(false);//不等任务执行完 停止
                    MyLogger.error("scheduler.shutdown");
                } catch (Exception e) {//SchedulerException
                    e.printStackTrace();
                }
                //MyLogger.error("startQuertz.shutdown");
            }
        }
     catch (Exception e) {
        e.printStackTrace();
    }
        try {
            MyLogger.error("暂停两秒,scheduler");
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    /*
     * (non-Javadoc)
     *
     * @see
     * javax.servlet.ServletContextListener#contextInitialized(javax.servlet
     * .ServletContextEvent)
     */
    @Override
    public void contextInitialized(ServletContextEvent arg0) {
//        ServletContext context= arg0.getServletContext();
//        Enumeration enumer= context.getAttributeNames();
//        while (enumer.hasMoreElements()){
//            Object key=enumer.nextElement();
//           Object obj = context.getAttribute(key.toString());
//            System.out.print(obj);
//        }
       // <span style="white-space:pre">		</span>//不做任何事情
    }

}