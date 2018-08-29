package com.qs.erp.web.controller;

import com.qs.erp.entitys.businessmodel.CallResult;
import com.qs.erp.services.common.GlobalTenant;
import com.qs.erp.services.common.excel.ExcelResult;
import com.qs.erp.utils.util.HttpClientUtil;
import org.apache.http.entity.mime.content.ContentBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.Map;

@Controller
public class FileController {

    @Autowired
    GlobalTenant globalTenant;

    @RequestMapping(value = "/File/ImportFile", method = RequestMethod.POST)
    @ResponseBody
    public CallResult importFile(@RequestParam("ImportExcelFile") MultipartFile ImportExcelFile) throws Exception {
        CallResult callResult = new CallResult();
        Map<String, ContentBody> maps = HttpClientUtil.getReqParamToFileCenter("", "", "", "", new File(""));
//        Object object = HttpClientUtil.postFileMultiPart(globalTenant.getFileUrl(), maps, Object.class);
//        callResult.seto("zl");
        callResult.setMessage("zl");
        return callResult;
    }
}
