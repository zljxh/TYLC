var ProductUniqueProductConnectProxy=function()
{
    this.GetByUniqueCode=function(UniqueCode) {
        var url = "/ProductUniqueProductConnect/GetByUniqueCode?UniqueCode="+UniqueCode;
        var result=null;
        ko.c8PostJSON(url,{},function(data){
            result=data;
        });
        return result;
    };
}
ProductUniqueProductConnectProxy.create=function() {
    return new ProductUniqueProductConnectProxy();
}
