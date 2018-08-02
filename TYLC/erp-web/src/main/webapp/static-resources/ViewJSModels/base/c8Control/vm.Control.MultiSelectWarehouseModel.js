/**
 * Created by xyyz150 on 2014/11/19.
 */
vm.Control=vm.Control||{};
vm.Control.MultiSelectWarehouseModel=function(griddataParameter)
{
    var base=this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl="/BusinessControl/MultiSelectWarehouse";
    this.OperatorGroupRowId=null;
    var base=this;
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageMultiSelectWarehouseByPQP";
this.griddataParameter.countUrl = "/BusinessControl/GetCountMultiSelectWarehouseByPQP";
this.griddataParameter.toolbar=".tbMultiSelectWarehouse";
    this.griddataParameter.IsFormLayout=false;
var f_onRowContextMenu=function (e, rowIndex, rowData){
    e.preventDefault();
    base.gridModel.datagrid("selectRow",rowIndex);
    //model,context,selector
    base.gridModel.getWindowContext().ko.c8BindingViewModel(base,base.gridModel.c8GetElementsBySelector('#tbMultiSelectWarehouseMenu'));
    base.gridModel.c8GetElementsBySelector('#tbMultiSelectWarehouseMenu').menu('show',{
        left: e.pageX,
        top: e.pageY
    });
}
var  hideRowContextMenu=function()
{
    base.gridModel.c8GetElementsBySelector('#tbMultiSelectWarehouseMenu').menu('hide');
}
this.f_DblClickRow=function(rowIndex, rowData) {
    base.addWarehouseClose();
}
this.griddataParameter.dataoptions = {columns: [
    [
        {title: '选择', field: 'ck',checkbox:true},
        {title: '名称', field: 'Name', width: 120, align: 'right'},
        {title: '代码', field: 'Code', width: 120, align: 'right'}
    ]
],singleSelect:false,onDblClickRow:this.f_DblClickRow,onRowContextMenu:f_onRowContextMenu};
this.gridModel = new c8GridPaginationModel(this.griddataParameter);
this.searchClick = function () {
    base.gridModel.pSearch({WarehouseTypeEnumList:warehouseTypeEnumList});
};

var warehouseTypeEnumList=null;
//设置添加商品的回调函数
this.setParameter=function(parameter)
{
    warehouseTypeEnumList=parameter.warehouseTypeEnumList;
    callBackAddWarehouse=parameter.callback;
};
var callBackAddWarehouse=null;
this.addWarehouse=function() {
    if (callBackAddWarehouse != null) {
        var result = base.gridModel.datagrid("getSelections");
        callBackAddWarehouse(result);
    }
    hideRowContextMenu();
};
this.addWarehouseClose=function(){
    base.addWarehouse();
    if(base.c8win)
    {
        base.c8win.c8CloseWin();
        hideRowContextMenu();
        // delete  base.c8win;
    }
};
}
