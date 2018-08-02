/**
 * Created by xyyz150 on 2014/11/19.
 */
vm.Control = vm.Control || {};
vm.Control.SelectPayTypeModel = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectPayType";
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageSelectPayTypeByPQP";
    this.griddataParameter.toolbar = ".tbSelectPayType";
    this.griddataParameter.IsFormLayout = false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addWarehouseClose();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '名称', field: 'Name', width: 120, align: 'right'}

            ]
        ], singleSelect: false, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8Grid(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };

//设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddWarehouse = parameter.callback;
    };
    var callBackAddWarehouse = null;
    this.addWarehouse = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddWarehouse != null) {
            // var result = base.gridModel.datagrid("getSelections");
            callBackAddWarehouse(result);
        }
    };
    this.addWarehouseClose = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddWarehouse != null) {
            // var result = base.gridModel.datagrid("getSelections");
            callBackAddWarehouse(result);
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();
            // delete  base.c8win;
        }
    };
}

