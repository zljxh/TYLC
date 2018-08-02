/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SelectBuySentShareModel = function (griddataParameter) {
    var base = this;
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectBuySentShare";
    this.c8winId = null;
    this.setWinId = function (winid) {
        this.c8winId = winid;
        base.gridModel.c8winId = this.c8winId;
    }
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageSelectBuySentShare";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountSelectBuySentShare";
    this.griddataParameter.toolbar = ".tbSelectBuySentShare";
    this.griddataParameter.IsFormLayout = false;
    var f_onRowContextMenu = function (e, rowIndex, rowData) {
        e.preventDefault();
        base.gridModel.datagrid("selectRow", rowIndex);
        //model,context,selector
        base.gridModel.getWindowContext().ko.c8BindingViewModel(base, base.gridModel.c8GetElementsBySelector('#tbSelectBuySentShareMenu'));
        base.gridModel.c8GetElementsBySelector('#tbSelectBuySentShareMenu').menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    }
    var hideRowContextMenu = function () {
        base.gridModel.c8GetElementsBySelector('#tbSelectBuySentShareMenu').menu('hide');
    }
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addPurchaseOrderClose();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '名称', field: 'Name', width: 160, align: 'right'},
                {title: '开始时间', field: 'BeginDate', width: 160, align: 'right'},
                {title: '截止时间', field: 'EndDate', width: 160, align: 'right'},
                {title: '共享赠品数量', field: 'Quantity', width: 160, align: 'right'},
                {title: '已赠送数量', field: 'CompleteQuantity', width: 160, align: 'right'}
            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow, onRowContextMenu: f_onRowContextMenu
    };
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch({"FullSentEd": FullSentEd});
    };
    //设置添加商品的回调函数
    this.setParameter=function(parameter)
    {
        callBackAddPurchaseOrder=parameter.callback;
        FullSentEd = parameter.FullSentEd;
        if(parameter.singleSelect!=null)
        {
            base.griddataParameter.dataoptions.singleSelect=parameter.singleSelect;
        }
    };
    var callBackAddPurchaseOrder=null;
    var FullSentEd = 0;
    this.addPurchaseOrder = function () {
        if (callBackAddPurchaseOrder != null) {
            var result = base.gridModel.datagrid("getSelections");
            callBackAddPurchaseOrder(result);
        }
        hideRowContextMenu();
    };
    this.addPurchaseOrderClose = function () {
        base.addPurchaseOrder();
        if (base.c8win) {
            base.c8win.c8CloseWin();
            hideRowContextMenu();
            // delete  base.c8win;
        }
    };
}
