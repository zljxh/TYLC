var MyReportProxy=function() {
    this.GetList(PrintTemplateTypeRowId)
    {
        var url = "/MyReportProxy/GetList?PrintTemplateTypeRowId="+PrintTemplateTypeRowId;
        var result=null;
        ko.c8PostJSON(url,{},function(data){
            result=data;
        });
        return result;
    }
}
MyReportProxy.create=function() {
    return new MyReportProxy();
}