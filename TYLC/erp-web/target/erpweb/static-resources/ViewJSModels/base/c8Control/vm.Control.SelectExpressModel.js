/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SelectExpress = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectExpress";
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/getExpressList";
    this.griddataParameter.countUrl = "/BusinessControl/getExpressCount";
    this.griddataParameter.toolbar = ".tbSelectExpress";
    this.griddataParameter.IsFormLayout = false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addDataExpressClose();
    }

    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '快递名称', field: 'Name', width: 120, align: 'right'}

            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };

    this.gridModel = new c8Grid(this.griddataParameter);
    var win = null;
    this.OpenWin = function () {
        win = new c8.c8Window({url: base.winUrl, isShowParent: true});
        win.c8BindingWin(base);
        win.openWin();
    }
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddExpress = parameter.callback;
        if (parameter.singleSelect != null) {
            base.griddataParameter.dataoptions.singleSelect = parameter.singleSelect;
        }
    };
    var callBackAddExpress = null;
    this.addDataExpress = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddExpress != null) {
            //var result = base.gridModel.datagrid("getSelections");
            callBackAddExpress(result);

        }
    };
    this.addDataExpressClose = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddExpress != null) {
            //var result = base.gridModel.datagrid("getSelections");
            callBackAddExpress(result);

        }else{
            base.ParentModel.modifyExpressSingle(base.ParentRow.RowId,result[0].RowId,result[0].Name,base.ParentRow);
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();

        }
    };
}
