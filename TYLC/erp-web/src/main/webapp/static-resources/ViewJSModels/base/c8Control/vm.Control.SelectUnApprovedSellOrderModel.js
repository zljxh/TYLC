/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SelectUnApprovedSellOrder = function (griddataParameter) {
    var base = this;
    this.winUrl = "/BusinessControl/getControlView?ControlName=MultiSelectUnArrivalSellOrder";
    this.c8winId=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageUnApprovedSellOrder";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountUnApprovedSellOrder";
    this.griddataParameter.toolbar = ".tbSelectUnArrivalSellOrder";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.UnApprovedSellOrderClose();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '订单编号', field: 'Code', width: 100, align: 'right'},
                {title: '平台单号', field: 'Tid', width: 100, align: 'right'},
                {title: '店铺名称', field: 'ShopName', width: 100, align: 'right'},
                {title: '平台名称', field: 'PlatTypeRowId', width: 100, align: 'right'},
                {title: '未核销金额', field: 'UnApprovedAmount', width: 80, align: 'right'}
            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddOrder = parameter.callback;
        if (parameter.singleSelect != null) {
            base.griddataParameter.dataoptions.singleSelect = parameter.singleSelect;
        }
    };
    var callBackAddOrder = null;
    this.addUnApprovedSellOrder = function () {
        if (callBackAddOrder != null) {
            var result = base.gridModel.datagrid("getSelections");
            callBackAddOrder(result);
        }
    };
    this.UnApprovedSellOrderClose = function () {
        base.addUnApprovedSellOrder();
        if (base.c8win) {
            base.c8win.c8CloseWin();
           // delete  base.c8win;
        }
    };
}
