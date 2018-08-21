var WarehousePositionProxy=function()
{
}
WarehousePositionProxy.prototype.GetRowIdByCodeAndWarehouse=function(Code,WarehouseRowId) {
    var url = "/WarehousePosition/GetRowIdByCodeAndWarehouse?Code="+Code+"&WarehouseRowId="+WarehouseRowId;
    var result=null;
    ko.c8PostJSON(url,{},function(data){
        result=data;
    });
    return result;
}
WarehousePositionProxy.create=function() {
    return new WarehousePositionProxy();
}