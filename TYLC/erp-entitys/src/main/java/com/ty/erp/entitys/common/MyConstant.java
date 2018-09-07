package com.ty.erp.entitys.common;

/**
 * Created by xyyz150 on 2014/11/28.
 */
public class MyConstant {
    /**
     * 平台商品下载错误
     */
    public static final String PlatFormProductErrMsg="ErrCode:%1$s;ErrMsg:%2$s";

    /**
     * 平台商品上传库存错误
     */
    public static final String PlatFormUpdateStockErrMsg="SkuRowId:%1$s; ErrCode:%2$s;ErrMsg:%3$s";

    /**
     * 平台商品下架错误
     */
    public static final String PlatFormProductDelistingErrMsg="商品宝贝ID:%1$s;下架错误 ErrCode:%2$s;ErrMsg:%3$s";

    /**
     * 平台商品上架错误
     */
    public static final String PlatFormProductListingErrMsg="商品宝贝ID:%1$s;上架错误 ErrCode:%2$s;ErrMsg:%3$s";

    /**
     * 平台发货错误
     */
    public static final String PlatFormDeliveryErrMsg="交易号:%1$s;发货错误 ErrCode:%2$s;ErrMsg:%3$s";

    /**
     * 获取平台订单错误
     */
    public static final String PlatFormTradeErrMsg="交易号:%1$s;获取平台订单错误 ErrCode:%2$s;ErrMsg:%3$s";

    /**
     * 抓取配货单错误
     */
    public static final String DispatchGrapErrMsg="抓取发货单错误:%1$s;";

    /**
     * 配货错误
     */
    public static final String DispatchOrderErrMsg="配货错误:%1$s;";

    /**
     * 平台发货错误
     */
    public static final String DeliveryOrderErrMsg="平台发货错误:%1$s;";

    /**
     * 平台已经发货错误
     */
    public static final String IsPlatDeliveryMsg="交易号：%1$s;平台订单已发货";

    /**
     * 更新订单备注错误
     */
    public static final String UpdateMemoErrMsg="更新订单备注错误:%1$s;";


    /**
     * 同步wms商品错误
     */
    public static final String SyncProductErrMsg="同步wms商品错误:%1$s;";

    /**
     * 同步wms配货单错误
     */
    public static final String SyncDispatchErrMsg="同步wms配货单错误:%1$s;";
    /**
     * 平台商品修改错误
     */
    public static final String PlatFormUpdateErrMsg="PlatId:%1$s;PlatSkuId:%2$s; ErrCode:%3$s;ErrMsg:%4$s";


    /**
     * 确认订单错误
     * 蜜芽接口平台发货前需确认订单打单
     */
    public static final String PlatFormDeliveryBeforeConfirmErrMsg="交易号:%1$s;发货前确认打单错误 ErrCode:%2$s;ErrMsg:%3$s";
    /**
     * 图片解析错误
     */
    public static final String ImageUploadErrMsg="ErrCode:%1$s;ErrMsg:%2$s";

    /**
     * 平台商品更新价格错误
     */
    public static final String PlatFormProductPriceUpdateErrMsg="SkuRowId:%1$s; ErrCode:%2$s;ErrMsg:%3$s";

}
