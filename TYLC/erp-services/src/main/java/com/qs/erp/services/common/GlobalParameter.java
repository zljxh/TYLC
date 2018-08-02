package com.qs.erp.services.common;


import com.qs.erp.common.ServiceContext;
import com.qs.erp.entitys.businessmodel.TenantPerformance;
import com.qs.erp.entitys.businessmodel.TenantPerformanceCondition;
import com.qs.erp.entitys.entity.SystemConfig;
import com.qs.erp.services.common.spring.SpringContextUtil;
import com.qs.erp.services.service.SystemConfigService;
import com.qs.erp.utils.util.ListHelp;
import com.qs.erp.utils.util.WebUtils;

import java.util.*;

/**
 * Created by admin on 2015/3/11.
 */
public class GlobalParameter {
    static SystemConfigService configService = SpringContextUtil.getBean(SystemConfigService.class);
    public static Map<String, List<TenantPerformance>> TenantPerformanceInfoMap = new HashMap<String, List<TenantPerformance>>();
    public static TenantPerformanceCondition tpCondition = new TenantPerformanceCondition();
    static GlobalTenant global = SpringContextUtil.getBean(GlobalTenant.class);

    //是否启用即采即卖模式
    public static boolean IsJcjm(long TenantRowId) {
        ServiceContext serviceContext = new ServiceContext();
        serviceContext.setTenantRowId(TenantRowId);
        SystemConfig config = configService.Get(serviceContext, -3316L);
        if (config == null) return false;
        return config.getKeyValue().equals("1");

    }

    //是否启用批次
    public static boolean IsBatch(long TenantRowId) {
        ServiceContext serviceContext = new ServiceContext();
        serviceContext.setTenantRowId(TenantRowId);
        SystemConfig config = configService.Get(serviceContext, -3022L);
        if (config == null) return false;
        return config.getKeyValue().equals("1");

    }

    //是否启用唯品会Jit模式
    public static boolean IsJit(long TenantRowId) {
        ServiceContext serviceContext = new ServiceContext();
        serviceContext.setTenantRowId(TenantRowId);
        SystemConfig config = configService.Get(serviceContext, -3317L);
        if (config == null) return false;
        return config.getKeyValue().equals("1");

    }
    //是否启用人天
    public static boolean renTianEnabled(long TenantRowId) {
        ServiceContext serviceContext = new ServiceContext();
        serviceContext.setTenantRowId(TenantRowId);
        SystemConfig config = configService.Get(serviceContext, -4001L);
        if (config == null) return false;
        return config.getKeyValue().equals("1");
    }

    //是否启用pda
    public static boolean pdaEnabled(long TenantRowId) {
        ServiceContext serviceContext = new ServiceContext();
        serviceContext.setTenantRowId(TenantRowId);
        SystemConfig config = configService.Get(serviceContext, -8000L);
        if (config == null) return false;
        return config.getKeyValue().equals("1");

    }

    //是否启用金蝶单据
    public static boolean IsJDDJ(long TenantRowId) {
        ServiceContext serviceContext = new ServiceContext();
        serviceContext.setTenantRowId(TenantRowId);
        SystemConfig config = configService.Get(serviceContext, -3320L);
        if (config == null) return false;
        return config.getKeyValue().equals("1");

    }

    /*
     * 启动自动推送仓储
     * */
    public static boolean IsAutoPushWsm(ServiceContext serviceContext) {
        SystemConfig config = configService.Get(serviceContext, -3315L);
        if (config == null) return false;
        return config.getKeyValue().equals("1");
    }


    /**
     * 启用采购码采购
     */
    public static boolean IsPurchaseCodePurchase(ServiceContext serviceContext) {
        SystemConfig config = configService.Get(serviceContext, -4108L);
        if (config == null) return false;
        return config.getKeyValue().equals("1");
    }

    //是否启用奇门对接
    public static boolean IsQMDJ(long TenantRowId) {
        ServiceContext serviceContext = new ServiceContext();
        serviceContext.setTenantRowId(TenantRowId);
        SystemConfig config = configService.Get(serviceContext, -3321L);
        if (config == null) return false;
        return config.getKeyValue().equals("1");
    }


    public static TenantPerformanceCondition GetTenantPerformanceCondition() {
        Date now = new Date();
        if ((now.getTime() - tpCondition.getGetDate().getTime()) > 3600000) {
            int astrictTime = 0;
            try {
                String url = global.getTenantCenterUrl("/TenantPerformance/GetTenantPerformanceTime");
                astrictTime = WebUtils.doPost(url, null, Integer.class);
                if (astrictTime == -1) {
                    tpCondition.setIsEnable(false);
                } else {
                    tpCondition.setSecond(astrictTime);
                    tpCondition.setIsEnable(true);
                }
            } catch (Exception e) {
                tpCondition.setIsEnable(false);
                MyLogger.logger.error("获取租户中心性能时间失败" + e.getMessage());
            }
            tpCondition.setGetDate(new Date());
        }
        return tpCondition;
    }


    public static TenantPerformance getLatelyTenantPerformanceInfo(String key) {
        TenantPerformance result = null;
        List<TenantPerformance> allTenantPerformanceInfo = TenantPerformanceInfoMap.get(key);
        if (!ListHelp.IsNullOrEmpty(allTenantPerformanceInfo)) {
            Collections.sort(allTenantPerformanceInfo, new Comparator<TenantPerformance>() {
                @Override
                public int compare(TenantPerformance o1, TenantPerformance o2) {
                    return o1.getAccessDate().compareTo(o2.getAccessDate());
                }
            });
            result = allTenantPerformanceInfo.get(0);
        }
        return result;
    }


}
