package com.qs.erp.utils.util.Snowflake;
/**
 * Created by xyyz150 on 2015/9/6.
 */
public class FactoryIdWorker {
    public final static IdWorker idWorker=new IdWorker(16,18);
    //  配置分布式获取id的地址   重写该方法  方案待定
    public static synchronized   long NextId()
    {
        return  idWorker.NextId();
    }
}
