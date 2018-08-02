package com.qs.erp.services.service;

import com.qs.erp.daos.dao.RegionDao;
import com.qs.erp.daos.daoext.RegionExtDao;
import com.qs.erp.entitys.entity.Region;
import com.qs.erp.services.common.GlobalTenant;
import com.qs.erp.services.common.MyLogger;
import com.qs.erp.services.common.Task.TaskHelper;
import com.qs.erp.services.common.cache.CachePrefix;
import com.qs.erp.services.common.cache.CustomerSpyMemcached;
import com.qs.erp.utils.util.ListGetTReturn;
import com.qs.erp.utils.util.ListHelp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by xyyz150 on 2015/1/15.
 */
@Service
public class CacheService {
    @Autowired
    RegionExtDao extDao;
    @Autowired
    RegionDao dao;
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
        Region region = dao.Get(0,1);
        GetChildRegion(region.getRowId());
    }

    public void GetChildRegion(Long parentRowId) {
        List<Region> childlist = extDao.GetListByParentId(parentRowId);
        if (ListHelp.IsNullOrEmpty(childlist)) {
            return;
        }
        List<Long> RegionIdList = ListHelp.getTReturnList(childlist, new ListGetTReturn<Region, Long>() {
            @Override
            public Long getReturnT(Region source) {
                return source.getRowId();
            }
        });
        cacheClient.set(String.format(CachePrefix.RegionLevel, parentRowId), RegionIdList);
        for (Long RowId : RegionIdList) {
            GetChildRegion(RowId);
        }
    }

}
