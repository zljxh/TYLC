package com.qs.erp.services.common;

import com.qs.erp.utils.util.PinYinUtil;
import org.springframework.beans.factory.annotation.Autowired;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by admin on 2014/7/23.
 */
public class BaseService {
    @Autowired
    protected DataBase db;
    @Autowired
    protected FactoryHelp factory;


    public long getOperatorRowId() {
        return CurrentContextFactory.createInstance().getOperatorRowId();
    }


    public String getUserName() {
        return CurrentContextFactory.createInstance().getUserName();
    }

    public Date getDate() {
        return new Date();
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        Date d = new Date();
//        String dateNowStr = sdf.format(d);
        // return sdf.parse(dateNowStr);
    }

    public Date getDateYmd() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date d = new Date();
        String dateNowStr = sdf.format(d);
        try {
            return sdf.parse(dateNowStr);
        } catch (Exception ex) {
        }
        return null;
    }

    public static String getPinYinHeadChar(String Name) {
        String pinyin = PinYinUtil.getPinYinHeadChar(Name);
        if (pinyin.length() > 10) {
            pinyin = pinyin.substring(0, 10);
        }
        return pinyin;
    }

    public String getIpAddress() throws UnknownHostException {
        InetAddress address = InetAddress.getLocalHost();

        return address.getHostAddress();
    }


}
