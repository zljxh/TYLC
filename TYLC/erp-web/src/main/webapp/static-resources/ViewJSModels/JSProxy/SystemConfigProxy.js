var SystemConfigProxy=function()
{
    this.getListSystemConfigSaveInfo=function() {
        var url = "/SystemConfig/getListSystemConfigSaveInfo";
        var result=null;
        ko.c8PostJSON(url,{},function(data){
            result=data;
        });
        return result;
    }
    this.aveListSystemConfigSaveInfo=function() {
        var url = "/SystemConfig/saveListSystemConfigSaveInfo";
    }
}
SystemConfigProxy.create=function() {
    return new SystemConfigProxy();
}