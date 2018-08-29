package com.qs.erp.services.service;

import com.qs.erp.daos.dao.TenantLoginDao;
import com.qs.erp.entitys.businessmodel.CallResult;
import com.qs.erp.entitys.entity.TenantLogin;
import com.qs.erp.services.common.BaseService;
import com.qs.erp.services.common.GlobalTenant;
import com.qs.erp.services.common.MyLogger;
import com.qs.erp.utils.util.ConvertHelp;
import com.qs.erp.utils.util.WebUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



/**
 * Created by admin on 2014/8/13.
 */
@Service
public class TenantLoginService extends BaseService {
    @Autowired
    private TenantLoginDao dao;
    @Autowired
    GlobalTenant globalTenant;
    @Autowired
    GlobalTenant global;

//    public CallResult IsJiFeiNumberAdequate(long TenantRowId){
//        CallResult callResult=new CallResult();
//        TenantLogin tenantLogin=dao.GetTenant(TenantRowId);
//        int num =0;
//        if(tenantLogin.getIsJiFei()) {
//            String url = global.getTenantCenterUrl("/JiFeiSurplusNumber/GetAdequateNumber?TenantRowId="+TenantRowId);
//            try {
//                callResult = WebUtils.doPost(url, null, CallResult.class);
//                if (!callResult.getResult()) {
//                    MyLogger.logger.error("获取租户剩余单量失败:" + callResult.getMessage());
//                    callResult.setResult(false);
//                    callResult.setMessage(callResult.getMessage());
//                    return callResult;
//                }
//                num= ConvertHelp.ToInt(callResult.geto());
//                if(num==0){
//                    callResult.setResult(false);
//                    callResult.setMessage("单量不足");
//                    return callResult;
//                }
//            }catch (Exception e){
//                MyLogger.logger.error("获取租户剩余单量失败:" + e.getMessage());
//                callResult.setResult(false);
//                callResult.setMessage(e.getMessage());
//                return callResult;
//            }
//        }
//        callResult.setResult(true);
//        callResult.seto(num);
//        return callResult;
//    }
//    public CallResult GetMsgCount(long TenantRowId){
//        CallResult callResult=new CallResult();
//        int num =0;
//        String url = global.getTenantCenterUrl("/TenantMesConfig/GetMsgInfo?RowId="+TenantRowId);
//        try {
//            callResult = WebUtils.doPost(url, null, CallResult.class);
//            if (!callResult.getResult()) {
//                MyLogger.logger.error("获取租户剩余短信条数失败:" + callResult.getMessage());
//                callResult.setResult(false);
//                callResult.setMessage(callResult.getMessage());
//                return callResult;
//            }
//            num= ConvertHelp.ToInt(callResult.geto());
//            if(num==0){
//                callResult.setResult(false);
//                callResult.setMessage("短信条数不足");
//                return callResult;
//            }
//        }catch (Exception e){
//            MyLogger.logger.error("获取租户剩余短信条数失败:" + e.getMessage());
//            callResult.setResult(false);
//            callResult.setMessage(e.getMessage());
//            return callResult;
//        }
//        callResult.setResult(true);
//        callResult.seto(num);
//        return callResult;
//    }
}
