/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SelectReturnChangedOrder = function (griddataParameter) {
    var base = this;
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectReturnChangedOrder";
    this.c8winId=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/PinBackStorage/getByCodeAndRowId";
    this.griddataParameter.toolbar = ".tbSelectReturnChangedOrder";
    this.griddataParameter.IsFormLayout = false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addDataExpressClose();
    }

    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '退换货单代码', field: 'Code', width: 200, align: 'right'}

            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };

    this.gridModel = new c8Grid(this.griddataParameter);
    var win = null;
    this.OpenWin = function (codeType,code) {
        win = new c8.c8Window({url: base.winUrl, isShowParent: true});
        win.c8BindingWin(base);
        if(codeType=='Mobile') {
            base.gridModel.pSearch({Mobile: code});
        }else if(codeType=='InExpressNo'){
            base.gridModel.pSearch({InExpressNo: code});
        }
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
        if (result == null || result.length == 0){
            ko.c8showMessage('warn','请选择单据');
            return;
        }

        if (callBackAddExpress != null) {
            //var result = base.gridModel.datagrid("getSelections");
            callBackAddExpress(result);

        }else{
            base.ParentModel.modifyExpressSingle(result[0]);
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();

        }
    };
}
var SelectReturnChangedOrder= new vm.Control.SelectReturnChangedOrder();
