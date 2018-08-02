/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SelectEmployee = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectEmployee";
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/getPageEmployeeList";
    this.griddataParameter.countUrl = "/BusinessControl/getPageEmployeeCount";
    this.griddataParameter.toolbar = ".tbSelectExpress";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.Close();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '客服代码', field: 'Code', width: 120, align: 'right'},
                {title: '客服名称', field: 'Name', width: 120, align: 'right'}
            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8Grid(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddEmployee = parameter.callback;
        if (parameter.singleSelect != null) {
            base.griddataParameter.dataoptions.singleSelect = parameter.singleSelect;
        }
    };
    var callBackAddEmployee = null;
    this.addDataEmployee = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddEmployee != null) {
           // var result = base.gridModel.datagrid("getSelections");
            callBackAddEmployee(result);

        }
    };
    this.addDataEmployeeClose = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddEmployee != null) {
            // var result = base.gridModel.datagrid("getSelections");
            callBackAddEmployee(result);

        }
        if (base.c8win) {
            base.c8win.c8CloseWin();

        }
    };
}
