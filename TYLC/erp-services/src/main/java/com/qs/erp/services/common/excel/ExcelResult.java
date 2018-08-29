package com.qs.erp.services.common.excel;

import com.qs.erp.entitys.businessmodel.BaseMultiHandleResult;
import com.qs.erp.entitys.common.MyConstant;

import java.io.Serializable;

/**
 * Created by xyyz150 on 2015/1/8.
 */
public class ExcelResult extends BaseMultiHandleResult implements Serializable {
    @Override
    public void AddErrCodeAndMsg(String errCode, String errMsg) {
        getErrorMsg().add(String.format(MyConstant.PlatFormProductErrMsg, errCode, errMsg));
        setErrorResults(getErrorResults()<=0?1:getErrorResults()+1);
    }
}
