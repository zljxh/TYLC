package com.qs.erp.webservices.common;

import com.qs.erp.common.ServiceContext;
import com.qs.erp.daos.daoext.TenantLoginDaoExt;
import com.qs.erp.entitys.entity.TenantLogin;
import com.qs.erp.services.common.MyLogger;
import com.qs.erp.services.service.CacheService;
import com.qs.erp.services.service.SystemResourceService;
import com.qs.erp.services.service.TenantLoginService;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.context.ServletContextAware;

import javax.servlet.ServletContext;
import java.util.List;

/**
 * Created by xyyz150 on 2015/1/23.
 */
public class SysInitBean implements InitializingBean, ServletContextAware {
    @Autowired
    CacheService service;
    @Autowired
    TenantLoginDaoExt daoExtTenantLogin;
    @Autowired
    TenantLoginService tenantLoginService;
    @Autowired
    SystemResourceService systemResourceService;

    //ExecutorService executor = Executors.newFixedThreadPool(4);
    @Override
    public void afterPropertiesSet() throws Exception {
        Thread.sleep((long) (Math.random() * 20) * 1000);

//        List<TenantLogin> list= daoExtTenantLogin.getList();
//        if(tl!=null) {
//            ContextSession.setTenantId(Long.parseLong(tl.getTenantIdentity()));
//            ContextSession.setTenantCode(tl.getTenantCode());
//            MyLogger.error("初始化租户信息");
        MyLogger.error("web启动！！！");
        service.InitCache();
        MyLogger.error("初始化地区信息");
//            tenantLoginService.CheckTenant(tl.getTenantIdentity());
//            MyLogger.error("验证租户信息");
        ServiceContext serviceContext = new ServiceContext();
        serviceContext.setTenantRowId(0);
        systemResourceService.initFilterChain(serviceContext);
//        }else {
//            ContextSession.setSystemError(true);
//        }

//        try {
//            SchedulerFactoryBean schedulerFactoryBean = SpringContextUtil.getBean(org.springframework.scheduling.quartz.SchedulerFactoryBean.class);
//            Scheduler scheduler = schedulerFactoryBean.getScheduler();
//            String[] jobnames= scheduler.getJobNames(Scheduler.DEFAULT_GROUP);
//            for (String jobname : jobnames) {
//                if(scheduler.isStarted()){
//                    scheduler.pauseJob(jobname,Scheduler.DEFAULT_GROUP);
//
//                }
//            }
//        }catch (Exception e){
//
//        }
    }

    @Override
    public void setServletContext(ServletContext servletContext) {
    }
}
