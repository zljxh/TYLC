/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.MultiSelectPurchaseOrderModelPreIn = function (griddataParameter) {
    var base = this;
    this.winUrl = "/BusinessControl/getControlView?ControlName=MultiSelectPurchaseOrder";
    this.c8winId = null;
    this.setWinId = function (winid) {
        base.c8winId = winid;
        base.gridModel.c8winId = this.c8winId;
    }
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageMultiSelectPurchaseOrderByPQPPreIn";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountMultiSelectPurchaseOrderByPQPPreIn";
    this.griddataParameter.toolbar = ".tbMultiSelectPurchaseOrder";
    this.griddataParameter.IsFormLayout = false;
    var f_onRowContextMenu = function (e, rowIndex, rowData) {
        e.preventDefault();
        base.gridModel.datagrid("selectRow", rowIndex);
        //model,context,selector
        base.gridModel.getWindowContext().ko.c8BindingViewModel(base, base.gridModel.c8GetElementsBySelector('#tbMultiSelectPurchaseOrderMenu'));
        base.gridModel.c8GetElementsBySelector('#tbMultiSelectPurchaseOrderMenu').menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    }
    var hideRowContextMenu = function () {
        base.gridModel.c8GetElementsBySelector('#tbMultiSelectPurchaseOrderMenu').menu('hide');
    }
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addPurchaseOrderClose();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {
                    title: '单据编号', field: 'Code', width: 160, align: 'left', formatter: function (value, row, index) {
                    var title = "采购入库通知单";
                    var url = "/PurchaseOrder";

                    var icon = "";
                    return "<a onclick='ko.addTab(\"" + title + "\",\"" + url + "\",\"" + icon + "\",{Code:\"" + row.Code + "\"})'>" + row.Code + "</a>";

                    }
                },
                //{title: '单据编号', field: 'Code', width: 160, align: 'right'},
                {title: '采购进货类型', field: 'PurchaseInTypeName', width: 80, align: 'right'},
                {title: '供应商', field: 'SupplierName', width: 80, align: 'right'},
                {title: '外部编号', field: 'OutCode', width: 80, align: 'right'},
                {title: '商品代码', field: 'ProductCodes', width: 120, align: 'right'},
                {title: '业务员', field: 'BusinessEmployeeName', width: 80, align: 'right'},
                {title: '仓库', field: 'WarehouseName', width: 80, align: 'right'},
                {title: '预入库总数', field: 'TotalPreInQuantity', width: 80, align: 'right'},
                {title: '计划到货日期', field: 'PlanDeliveryDate', width: 100, align: 'right'},
                {title: '付款期限', field: 'PayTermDate', width: 80, align: 'right'}
            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow, onRowContextMenu: f_onRowContextMenu
    };
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddPurchaseOrder = parameter.callback;
        if (parameter.singleSelect != null) {
            base.griddataParameter.dataoptions.singleSelect = parameter.singleSelect;
        }

        ////addby banchao 20180423
        //if(parameter.searchConditions!=null && typeof parameter.searchConditions != "undefined")
        //{
        //    base.searchConditions=parameter.searchConditions;
        //    alert(base.searchConditions.PreInWarehouse);
        //    //ko.c8SetFormModel({model: base.searchConditions, });
        //    ko.c8SetFormModel({model: base.searchConditions});
        //    ko.c8SetFormModel({model: {ProductSkuCode:"aaa",testname:"bbb"}, context: $(".tbMultiSelectPurchaseOrder")});
        //}

    };
    var callBackAddPurchaseOrder = null;
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