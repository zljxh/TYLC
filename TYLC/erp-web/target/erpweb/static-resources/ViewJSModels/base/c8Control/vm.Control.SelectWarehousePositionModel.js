/**
 * Created by xyyz150 on 2014/12/19.
 */
vm.Control=vm.Control||{};
vm.Control.SelectWarehousePositionModel=function(griddataParameter)
{
    var base=this;
    this.winUrl="/BusinessControl/SelectWarehouserPosition";
    this.OperatorGroupRowId=null;
    this.c8winId=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageWarehouserPositionByPQP";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountWarehouserPositionByPQP";
    this.griddataParameter.toolbar=".tbSelectWarehousePosition";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addProductClose();
    }
    this.griddataParameter.dataoptions = {columns: [
        [
            {title: '选择', field: 'ck',checkbox:true},
            {title: '库位代码', field: 'Code', width: 80, align: 'right'},
            {title: '库位名称', field: 'Name', width: 80, align: 'right'}
        ]
    ],singleSelect:true,onDblClickRow:this.f_DblClickRow};
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch({WarehouseRowId:WarehouseRowId});
    };
    var WarehouseRowId=null;
    this.treeoption={
        url: 'BusinessControl/GetComboWarehouse',
        onClick: function (node) {
            WarehouseRowId=node.id;
            base.searchClick();
        }
    };
    //设置添加商品的回调函数
    this.setParameter=function(parameter)
    {
        callBackAddProduct=parameter.callback;
    };
    var callBackAddProduct=null;
    this.addProduct=function() {
        if (callBackAddProduct != null) {
            var result = base.gridModel.datagrid("getSelected");
            callBackAddProduct(result);
        }
    };
    this.addProductClose=function(){
        base.addProduct();
        if(base.c8win)
        {
            base.c8win.c8CloseWin();
            // delete  base.c8win;
        }
    };
}