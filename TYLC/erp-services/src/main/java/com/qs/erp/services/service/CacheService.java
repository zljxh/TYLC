package com.qs.erp.services.service;


import com.qs.erp.services.common.GlobalTenant;
import com.qs.erp.services.common.MyLogger;
import com.qs.erp.services.common.Task.TaskHelper;
import com.qs.erp.services.common.cache.CustomerSpyMemcached;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by xyyz150 on 2015/1/15.
 */
@Service
public class CacheService {


    @Autowired
    CustomerSpyMemcached cacheClient;
    //    ExecutorService executor = Executors.newSingleThreadExecutor();
    @Autowired
    GlobalTenant global;

    public void InitCache() {

        TaskHelper.submit(new Runnable() {
            @Override
            public void run() {
                try {
                    InitRegionLevel();
                    InitExpressRegion();
                } catch (Exception e) {
                    MyLogger.error("初始化缓存数据报错:" + e.toString());
                }
            }
        });
    }

    public void InitExpressRegion() {
//        ExpressRegionKey
//                dispatchOrderExtDao.GetListByExpressRowId()
    }

    /**
     * 地区上下级关系
     */
    public void InitRegionLevel() {

    }


}
