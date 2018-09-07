package com.ty.erp.services.common.cache;

/**
 * Created by xyyz150 on 2015/1/15.
 */
public class CachePrefix {
    //地区上下级关系，key：rowid；value：下级rowid数组
    public static final String RegionLevel="RegionLevel:%1$s";
    //物流公司配送范围key:ExpressRowId:RegionRowId; value:ExpressRegionKey
    public static final String ExpressRegion="ExpressRegion:%1$s:%2$s";
}
