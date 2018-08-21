var OperatorProxy=function() {
    this.GetMenuTree=function()
    {
        var url = "/Operator/GetMenuTree"
        var result = null;
        ko.c8Ajax({
            type: "POST",
            url: "/Operator/GetMenuTree",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            }
        });
        return result;
    }
}
OperatorProxy.create=function() {
    return new OperatorProxy();
}