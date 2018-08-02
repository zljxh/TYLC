/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SelectWarehouse = function (griddataParameter) {
    var base = this;
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectWarehouse";
    this.c8winId=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/getWarehouseList";
    this.griddataParameter.countUrl = "/BusinessControl/getWarehouseCount";
    this.griddataParameter.toolbar = ".tbSelectExpress";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.Close();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '仓库代码', field: 'Code', width: 120, align: 'right'},
                {title: '仓库名称', field: 'Name', width: 120, align: 'right'}
            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8Grid(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddWarehouse = parameter.callback;
        if (parameter.singleSelect != null) {
            base.griddataParameter.dataoptions.singleSelect = parameter.singleSelect;
        }
    };
    var callBackAddWarehouse = null;
    this.addDataWarehouse = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddWarehouse != null) {
          //  var result = base.gridModel.datagrid("getSelections");
            callBackAddWarehouse(result);

        }
    };
    this.addDataWarehouseClose = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddWarehouse != null) {
            //  var result = base.gridModel.datagrid("getSelections");
            callBackAddWarehouse(result);

        }
        if (base.c8win) {
            base.c8win.c8CloseWin();

        }
    };
}
