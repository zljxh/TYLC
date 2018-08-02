/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.MultiSelectProductBatchInventoryModel = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=MultiSelectProductBatchInventory&433234";
    this.OperatorGroupRowId = null;
    var base = this;
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageInventoryBatchProductInfo";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountByPageQueryParameters";
    this.griddataParameter.toolbar = ".tbMultiSelectProductBatchnventory";

    var editIndex = undefined;

    function endEditing() {
        if (editIndex == undefined) {
            return true
        }
        if (base.gridModel.datagrid('validateRow', editIndex)) {
            base.gridModel.datagrid('endEdit', editIndex);
            editIndex = undefined;

            return true;
        } else {
            return false;
        }
    }

    function f_onClickRow(index) {
        if (editIndex != index) {
            if (endEditing()) {
                base.gridModel.datagrid('selectRow', index)
                    .datagrid('beginEdit', index);
                editIndex = index;
            } else {
                base.gridModel.datagrid('selectRow', editIndex);
            }
        }
    }

    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '仓库名称', field: 'WarehouseName', width: 120, align: 'left'},
                {title: '库位代码', field: 'KWCode', width: 100, align: 'left'},
                {
                    title: '数量',
                    field: 'Quantity',
                    width: 80,
                    align: 'right',
                    editor:{
                        type:'numberbox' ,
                        options:{
                            min:0,
                            precision:0
                        }
                    },
                    formatter: function (val, row) {
                        row.Quantity = row.Quantity || 1;
                        return row.Quantity;
                    }
                },
                {title: '锁定数', field: 'LockedQuantity', width: 80, align: 'right'},
                {title: '库存数', field: 'InventoryQuantity', width: 80, align: 'right'},
                {title: '商品代码', field: 'ProductCode', width: 120, align: 'left'},
                {title: '商品名称', field: 'ProductName', width: 120, align: 'left'},
                {title: '规格代码', field: 'ProductSkuCode', width: 120, align: 'left'},
                {title: '规格名称', field: 'ProductSkuName', width: 120, align: 'left'},
                {title: '生产日期', field: 'ProductionDate', width: 120, align: 'left'},
                {title: '保质期', field: 'SafeDate', width: 120, align: 'left'},
                {title: '有效期', field: 'ValidDate', width: 120, align: 'left'},
                {title: '批次号', field: 'BatchNo', width: 120, align: 'left'}
            ]
        ], singleSelect: false, onClickRow: f_onClickRow
    };
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch(this.callBackParameter.data);
    };
    this.callBackParameter = null;
    //设置参数
    this.setParameter = function (parameter) {
        this.callBackParameter = parameter;
        callBackAdd = parameter.callback;
        if (parameter.singleSelect != null) {
            base.griddataParameter.dataoptions.singleSelect = parameter.singleSelect;
        }
    };
    var callBackAdd = null;
    this.addItem = function () {
        if (callBackAdd != null) {
            endEditing();
            var result = base.gridModel.datagrid("getSelections");
            callBackAdd(result);
            base.gridModel.datagrid("clearChecked");
        }
    };
    this.addItemClose = function () {
        base.addItem();
        if (base.c8win) {
            base.c8win.c8CloseWin();
        }
    };
}