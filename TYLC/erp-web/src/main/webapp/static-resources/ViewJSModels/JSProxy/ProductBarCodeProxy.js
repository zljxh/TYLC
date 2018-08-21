var ProductBarCodeProxy=function()
{
    //根据条码获取商品信息
    this.getProductScanInfoByBarCode=function(BarCode) {
        var url = "/ProductBarcode/getProductScanInfoByBarCode?BarCode="+BarCode;
        var result=null;
        ko.c8PostJSON(url,{},function(data){
            result=data;
        });
        return result;
    };
    //根据条码获取批次商品信息
    this.getProductScanBatchInfoByBarCode=function(BarCode) {
        var url = "/ProductBarcode/getProductScanBatchInfoByBarCode?BarCode="+BarCode;
        var result=null;
        ko.c8PostJSON(url,{},function(data){
            result=data;
        });
        return result;
    }
    //根据条码和库位代码获取商品皮尺库存信息
    this.getProductBatchInfoByBarCodeAndWarehousePosition=function(BarCode,WarehousePositionRowId) {
        var url = "/ProductBarcode/getProductBatchInfoByBarCodeAndWarehousePosition?BarCode="+BarCode+"&WarehousePositionRowId="+WarehousePositionRowId;
        var result=null;
        ko.c8PostJSON(url,{},function(data){
            result=data;
        });
        return result;
    }
}

ProductBarCodeProxy.create=function() {
    return new ProductBarCodeProxy();
}