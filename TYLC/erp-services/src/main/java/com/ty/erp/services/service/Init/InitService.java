package com.ty.erp.services.service.Init;

import com.ty.erp.daos.dao.SystemConfigDao;
import com.ty.erp.entitys.businessmodel.CallResult;
import com.ty.erp.entitys.entity.SystemConfig;
import com.ty.erp.services.common.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2016-04-28.
 */
@Service
public class InitService extends BaseService {

    @Autowired
    SystemConfigDao systemConfigDao;


    public CallResult IsInitFinished(final long TenantRowId) {

        CallResult result = new CallResult();
        result.setResult(false);
        result.setMessage("");

        SystemConfig sc = systemConfigDao.GetByParamId(TenantRowId, -99999L);
        if (sc == null) {
            result.setMessage("初始化参数未找到！");
            return result;
        }
        if (sc.getKeyValue().equals("初始化已完成")) {
            result.setMessage(sc.getKeyValue());
            result.setResult(true);
            return result;
        }
        result.setMessage("初始化未完成！");
        return result;

    }


}