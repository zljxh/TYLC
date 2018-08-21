var RegionProxy=function() {
    this.GetComboTreeRegionParentAllByRowId(RowId)
    {
        var url = "/Region/GetComboTreeRegionParentAllByRowId?RowId="+RowId;
        var result=null;
        ko.c8PostJSON(url,{},function(data){
            result=data;
        });
        return result;
    }
}
RegionProxy.create=function() {
    return new RegionProxy();
}