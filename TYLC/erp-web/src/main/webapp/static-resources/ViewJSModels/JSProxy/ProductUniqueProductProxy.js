var ProductUniqueProductProxy=function()
{
    this.GetByUniqueCode=function(UniqueCode) {
        var url = "/ProductUniqueProduct/GetMapByUniqueCode?UniqueCode="+UniqueCode;
        var result=null;
        ko.c8PostJSON(url,{},function(data){
            result=data;
        });
        return result;
    };
}
ProductUniqueProductProxy.create=function() {
    return new ProductUniqueProductProxy();
}
