package com.qs.erp.services.common;

import com.qs.erp.utils.util.ExceptionHelp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by xyyz150 on 2014/10/25.
 * 日志帮助类
 */
public class MyLogger {

    /**
     * 记录异常信息，性能慢的信息
     */
    public static Logger logger = LoggerFactory.getLogger(MyLogger.class);

    /**
     * 监控日志，打点日志
     * 例如：XX开始，XX结束
     */
    public static Logger monitorLogger = LoggerFactory.getLogger("monitor");

    //配货日志
    public static Logger DispatchOrderlogger = LoggerFactory.getLogger("DispatchOrder");
    //更新订单备注日志
    public static Logger TradeUpdateMemologger = LoggerFactory.getLogger("TradeUpdateMemo");
    //平台发货
    public static Logger PlatFormDeliverylogger = LoggerFactory.getLogger("PlatFormDelivery");
    //平台上传库存
    public static Logger PlatUpdateStocklogger = LoggerFactory.getLogger("PlatUpdateStock");
    //下载订单
    public static Logger DownloadOrderlogger = LoggerFactory.getLogger("DownloadOrder");
    //审核订单
    public static Logger AuditOrderlogger = LoggerFactory.getLogger("AuditOrder");
    //wms日志
    public static Logger WMSlogger = LoggerFactory.getLogger("PlatFormDelivery");
    //KdNiao日志
    public static Logger KdNiaologger = LoggerFactory.getLogger("DownKdNiao");

    //接口日志
    public static Logger Apilogger = LoggerFactory.getLogger("Api");
    //发短信日志
    public static Logger msgLogger = LoggerFactory.getLogger("Msg");


    public static void error(Exception ex) {
        logger.error(ExceptionHelp.getExceptionMsg(ex));
    }

    public static void error(Object erro) {
        logger.error(erro.toString());
    }


    //平台上传价格
    public static Logger PlatUpdatePricelogger = LoggerFactory.getLogger("PlatUpdatePrice");

    //sap订单
    public static Logger SalesOrderlogger = LoggerFactory.getLogger("SalesOrder");

    //拉取波次
    public static Logger Wavelogger = LoggerFactory.getLogger("Wave");

}
