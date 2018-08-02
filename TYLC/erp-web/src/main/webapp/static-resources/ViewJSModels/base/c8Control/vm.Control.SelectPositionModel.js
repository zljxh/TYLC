vm.Control = vm.Control || {};
vm.Control.SelectPositionModel = function (griddataParameter) {
    var base = this;
    this.c8winId = null;
    this.setWinId = function (winid) {
        this.c8winId = winid;
        base.gridModel.c8winId = this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectPosition";
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/getPositionList";
    this.griddataParameter.countUrl = "/BusinessControl/getPositionCount";
    this.griddataParameter.toolbar = ".tbSelectVip";
    this.griddataParameter.IsFormLayout = false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addDataExpressClose();
    }

    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '库位代码', field: 'Code', width: 120, align: 'right'},
                {title: '库位名称', field: 'Name', width: 120, align: 'right'}

            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    var win = null;
    var WarehouseRowId = null;
    this.OpenWin = function (RowId) {
        win = new c8.c8Window({url: base.winUrl, isShowParent: true});
        WarehouseRowId = RowId;
        base.modelInfo = {};
        base.modelInfo.WarehouseRowId = RowId;
        base.modelInfo.Code = "";
        base.modelInfo.Name = "";
        ko.c8SetFormQueryModel({model: base.modelInfo});
        win.c8BindingWin(base);
        win.openWin();

    }
    this.searchClick = function () {
        var code = null;
        var name = null;
        if ($("#Code").val() != "") {
            code = $("#Code").val()
        }
        if ($("#Name").val() != "") {
            name = $("#Name").val()
        }

        var modelInfo = win.c8GetFormModel();
        modelInfo.WarehouseRowId = WarehouseRowId;
        base.gridModel.pSearch(modelInfo);
        code = null;
        name = null;
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

        } else {
            base.ParentModel.modifyWarehousePosition(result[0], result[0].Name, base.ParentRow);
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();
        }
    };
}
