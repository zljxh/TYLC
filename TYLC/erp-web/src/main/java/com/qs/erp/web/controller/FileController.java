package com.qs.erp.web.controller;

import com.qs.erp.entitys.businessmodel.CallResult;
import com.qs.erp.entitys.businessmodel.FileResult;
import com.qs.erp.services.common.GlobalTenant;
import com.qs.erp.services.common.excel.ExcelResult;
import com.qs.erp.services.service.FileService;
import com.qs.erp.utils.util.HttpClientUtil;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.apache.http.entity.mime.content.ContentBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Map;

@Controller
public class FileController {

    @Autowired
    GlobalTenant globalTenant;
    @Autowired
    FileService fileService;

    @RequestMapping(value = "/File/ImportFile", method = RequestMethod.POST)
    @ResponseBody
    public CallResult importFile(@RequestParam("ImportExcelFile") MultipartFile ImportExcelFile) throws Exception {
        CallResult callResult = new CallResult();
        File file=fileService.MultipartFileToFile(ImportExcelFile);
        Map<String, ContentBody> maps = HttpClientUtil.getReqParamToFileCenter("2", "", "", "",file );
        FileResult object = HttpClientUtil.postFileMultiPart(globalTenant.getFileUrl("/file/cartoon"), maps, FileResult.class);

        File del = new File(file.toURI());
        del.delete();
        callResult.setResult(object.getresult());
        callResult.setMessage(object.getmessage());
        return callResult;
    }




    }
