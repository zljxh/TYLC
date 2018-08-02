/**
 * Created by xyyz150 on 2014/12/19.
 */
vm.Control = vm.Control || {};
vm.Control.SelectCostTypeModel = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectCostTypeModel";
    this.OperatorGroupRowId = null;
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/getCostTypeList";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountCostType";
    this.griddataParameter.toolbar = ".tbSelectCostType";
    this.griddataParameter.IsFormLayout = false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addProductClose();
    }
    this.griddataParameter.dataoptions = {
        singleSelect: true,
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '名称', field: 'Name', width: 120, align: 'right'}

            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8Grid(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddProduct = parameter.callback;
    };
    var callBackAddProduct = null;
    this.addProduct = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddProduct != null) {
            // var result = base.gridModel.datagrid("getSelected");
            callBackAddProduct(result);
        }
    };
    this.addProductClose = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddProduct != null) {
            // var result = base.gridModel.datagrid("getSelected");
            callBackAddProduct(result);
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();
            // delete  base.c8win;
        }
    };
}