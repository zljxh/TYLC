package com.qs.erp.web.controller;

import com.qs.erp.entitys.businessmodel.CallResult;
import com.qs.erp.services.common.GlobalTenant;
import com.qs.erp.services.common.excel.ExcelResult;
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

    @RequestMapping(value = "/File/ImportFile", method = RequestMethod.POST)
    @ResponseBody
    public CallResult importFile(@RequestParam("ImportExcelFile") MultipartFile ImportExcelFile) throws Exception {
        CallResult callResult = new CallResult();
        File file=a(ImportExcelFile);
        Map<String, ContentBody> maps = HttpClientUtil.getReqParamToFileCenter("2", "", "", "",file );
        Object object = HttpClientUtil.postFileMultiPart(globalTenant.getFileUrl("/file/cartoon"), maps, Object.class);
        callResult.seto("zl");
        callResult.setMessage("zl");

        File del = new File(file.toURI());
        del.delete();
        return callResult;
    }


    public File a(MultipartFile file)throws Exception {

        File f = null;
        if (file.equals("") || file.getSize() <= 0) {
            file = null;
        } else {
            InputStream ins = file.getInputStream();
            f = new File(file.getOriginalFilename());
            inputStreamToFile(ins, f);


        }

        return f;
    }

    public  void inputStreamToFile(InputStream ins,File file) {
        try {
            OutputStream os = new FileOutputStream(file);
            int bytesRead = 0;
            byte[] buffer = new byte[8192];
            while ((bytesRead = ins.read(buffer, 0, 8192)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            os.close();
            ins.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    }
