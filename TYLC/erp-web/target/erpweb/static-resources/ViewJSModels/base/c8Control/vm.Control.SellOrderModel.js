/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SellOrderModel = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SellOrder";
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/getSellOrderSelectPage";
    this.griddataParameter.countUrl = "/BusinessControl/getSellOrderSelectCount";
    this.griddataParameter.toolbar = ".tbSelectUnArrivalSellOrder";
    this.griddataParameter.dataoptions = {
        remoteSort: false,
        singleSelect: true,
        checkOnSelect: false,
        selectOnCheck: false,
        columns: [
            [{title: '店铺', field: 'EditShopName', width: 100, align: 'right', sortable: true},
                {title: '平台单号', field: 'Tid', width: 130, align: 'right', sortable: true},
                {title: '付款时间', field: 'PayTime', width: 130, align: 'right', sortable: true},
                {title: '收货人', field: 'Consignee', width: 80, align: 'right', sortable: true},
                {title: '手机', field: 'Mobile', width: 110, align: 'right', sortable: true},
                {title: '会员名称', field: 'VipName', width: 80, align: 'right', sortable: true},
                {
                    title: '货到付款',
                    field: 'IsCod',
                    width: 70,
                    align: 'right',
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (row.IsCod == '1') {
                            return "<input type='checkbox'  onchange='this.checked=!this.checked;' readonly='readonly' checked='true' value='true'/>";
                        } else {
                            return "<input type='checkbox' onchange='this.checked=!this.checked;' readonly='readonly'    value='false'/>";
                        }
                    }
                },
                {title: '支付金额', field: 'PayAmount', width: 70, align: 'right', sortable: true},
                {title: '运单号', field: 'ExpressNumber', width: 100, align: 'right', sortable: true},
                {title: '数量', field: 'TotalQuantity', width: 50, align: 'right', sortable: true},
                {title: '平台类型', field: 'EditPlatTypeName', width: 100, align: 'right', sortable: true},
                {title: '订单类型', field: 'EditOrderTypeName', width: 100, align: 'right', sortable: true},
                {title: '让利金额', field: 'BenefitAmount', width: 100, align: 'right', sortable: true},
                {title: '退款状态', field: 'EditRefundStatusName', width: 100, align: 'right', sortable: true},
                {title: '发货单号', field: 'DeliveryOrderCode', width: 150, align: 'right', sortable: true},
                {title: '订单单号', field: 'Code', width: 130, align: 'right', sortable: true},
                {title: '快递费用', field: 'ExpressFee', width: 80, align: 'right', sortable: true},
                {title: '电话', field: 'Telephone', width: 80, align: 'right', sortable: true},
                {title: '会员代码', field: 'VipCode', width: 80, align: 'right', sortable: true},
                {title: '拍单时间', field: 'PlatCreated', width: 130, align: 'right', sortable: true},
                {title: '地址', field: 'Address', width: 200, align: 'right', sortable: true}]
        ], singleSelect: true, onSelect: function (rowIndex, rowData) {
            //var row = $('#my-datagrid').datagrid('getSelected');
            var row = $(base.gridModel.grid).datagrid('getSelected');
            if (!row) {
                base.inSkuDetailGridPaginationModel.pLoadData([]);
                //  base.selectTab(tab.panel('options').title);
            }
            else {
                base.inSkuDetailGridPaginationModel.pSearch({SellOrderRowId: row.RowId});
            }
        }
    };
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    this.save = function () {
    };

    this.SkuDetailGridDataParameter = {};
    this.SkuDetailGridDataParameter.pageUrl = "/BusinessControl/getReturnChangedSellOrderDetailList";
    this.SkuDetailGridDataParameter.form = {};//this.form;
    this.SkuDetailGridDataParameter.toolbar = '.toolbarProductSku';
    this.SkuDetailGridDataParameter.dataoptions = {
        remoteSort: false,
        singleSelect: true,
        checkOnSelect: false,
        selectOnCheck: false,
        columns: [[{field: 'ck', checkbox: true},
            {
                title: '终结',
                field: 'IsStop',
                width: 70,
                align: 'right',
                sortable: true,
                formatter: function (value, row, index) {
                    if (row.IsStop == '1') {
                        return "<input type='checkbox'  onchange='this.checked=!this.checked;' readonly='readonly' checked='true' value='true'/>";
                    } else {
                        return "<input type='checkbox' onchange='this.checked=!this.checked;' readonly='readonly'    value='false'/>";
                    }
                }
            },
            {
                title: '平台退款',
                field: 'IsRefund',
                width: 70,
                align: 'right',
                sortable: true,
                formatter: function (value, row, index) {
                    if (row.IsRefund == '1') {
                        return "<input type='checkbox'  onchange='this.checked=!this.checked;' readonly='readonly' checked='true' value='true'/>";
                    } else {
                        return "<input type='checkbox' onchange='this.checked=!this.checked;' readonly='readonly'    value='false'/>";
                    }
                }
            },
            //{
            //    title: '线下退款',
            //    field: 'IsOffLineRefund',
            //    width: 70,
            //    align: 'right',
            //    sortable: true,
            //    formatter: function (value, row, index) {
            //        if (row.IsOffLineRefund == '1') {
            //            return "<input type='checkbox'  onchange='this.checked=!this.checked;' readonly='readonly' checked='true' value='true'/>";
            //        } else {
            //            return "<input type='checkbox' onchange='this.checked=!this.checked;' readonly='readonly'    value='false'/>";
            //        }
            //    }
            //},
            //{
            //    title: '确认退款',
            //    field: 'IsRefundFinished',
            //    width: 70,
            //    align: 'right',
            //    sortable: true,
            //    formatter: function (value, row, index) {
            //        if (row.IsRefundFinished == '1') {
            //            return "<input type='checkbox'  onchange='this.checked=!this.checked;' readonly='readonly' checked='true' value='true'/>";
            //        } else {
            //            return "<input type='checkbox' onchange='this.checked=!this.checked;' readonly='readonly'    value='false'/>";
            //        }
            //    }
            //},
            {title: '发货状态', field: 'EditStatusName', width: 70, align: 'right', sortable: true},
            {
                title: '虚拟商品',
                field: 'IsVirtual',
                width: 70,
                align: 'right',
                sortable: true,
                formatter: function (value, row, index) {
                    if (row.IsVirtual == '1') {
                        return "<input type='checkbox'  onchange='this.checked=!this.checked;' readonly='readonly' checked='true' value='true'/>";
                    } else {
                        return "<input type='checkbox' onchange='this.checked=!this.checked;' readonly='readonly'    value='false'/>";
                    }
                }
            },
            {
                title: '赠品',
                field: 'IsGift',
                width: 45,
                align: 'right',
                sortable: true,
                formatter: function (value, row, index) {
                    if (row.IsGift == '1') {
                        return "<input type='checkbox'  onchange='this.checked=!this.checked;' readonly='readonly' checked='true' value='true'/>";
                    } else {
                        return "<input type='checkbox' onchange='this.checked=!this.checked;' readonly='readonly'    value='false'/>";
                    }
                }
            },
            {title: '商品简称', field: 'ProductShortName', width: 100, align: 'right', sortable: true},
            {title: '商品名称', field: 'ProductName', width: 100, align: 'right', sortable: true},
            {title: '商品代码', field: 'ProductCode', width: 100, align: 'right', sortable: true},
            {title: '规格名称', field: 'ProductSkuName', width: 100, align: 'right', sortable: true},
            {title: '规格代码', field: 'ProductSkuCode', width: 100, align: 'right', sortable: true},
            //{title: '退款原因', field: 'EditReturnReasonType', width: 80, align: 'right', sortable: true},
            //{title: '退货说明', field: 'Remark', width: 80, align: 'right', sortable: true},
            {title: '数量', field: 'Quantity', width: 45, align: 'right', sortable: true},
            {title: '商品单位', field: 'ProductUnitName', width: 70, align: 'right', sortable: true},
            {title: '让利金额', field: 'BenefitAmount', width: 70, align: 'right', sortable: true},
            {title: '折扣', field: 'Discount', width: 45, align: 'right', sortable: true},
            {title: '标准售价', field: 'StandardPrice', width: 70, align: 'right', sortable: true},
            {title: '销售单价', field: 'SalePrice', width: 70, align: 'right', sortable: true},
            {title: '销售金额', field: 'SaleAmount', width: 70, align: 'right', sortable: true},
            {title: '实付单价', field: 'PaymentPrice', width: 70, align: 'right', sortable: true},
            {title: '实付金额', field: 'Payment', width: 70, align: 'right', sortable: true},
            {title: '物流费用', field: 'ExpressFee', width: 70, align: 'right', sortable: true},
            {title: '发货单号', field: 'DeliveryOrderCode', width: 140, align: 'right', sortable: true},
            {title: '发货仓库', field: 'EditWarehouseName', width: 100, align: 'right', sortable: true},
            {title: '物流公司', field: 'EditExpressName', width: 100, align: 'right', sortable: true},
            {title: '运单号', field: 'ExpressNumber', width: 100, align: 'right', sortable: true},
            {title: '成本价', field: 'CostPrice', width: 100, align: 'right', sortable: true}
            //,
            //{title: '平台商品名称', field: 'PlatformProductName', width: 100, align: 'right', sortable: true},
            //{title: '平台规格名称', field: 'PlatformSkuName', width: 100, align: 'right', sortable: true},
            //{title: '平台规格名称', field: 'PlatformSkuName', width: 100, align: 'right', sortable: true}
        ]]
    };
    this.inSkuDetailGridPaginationModel = new c8Grid(this.SkuDetailGridDataParameter);
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddOrder = parameter.callback;
        if (parameter.singleSelect != null) {
            base.griddataParameter.dataoptions.singleSelect = parameter.singleSelect;
        }
    };
    var callBackAddOrder = null;
    this.SellOrder = function () {
        if (callBackAddOrder != null) {
            var data = {};
            var row = $(this.gridModel.grid).datagrid('getSelected');
            if (!row) {
                $.messager.alert('提示', '请选择主表');
                return;
            }
            var rows = $(base.inSkuDetailGridPaginationModel.grid).datagrid('getChecked');
            //if (!rows || row.length) {
            //    $.messager.alert('提示', '请选择明细');
            //    return;
            //}
            data.Order = row;
            data.SkuDetailList = rows;
            callBackAddOrder(data);
        }
    };
    this.SelectSellOrder = function () {
        var row = $(this.gridModel.grid).datagrid('getSelected');
        if (!row) {
            //$.messager.alert('提示', '请选择主表');
            ko.c8showMessage('error', "请选择主表");
            return;
        }
        var rows = $(base.inSkuDetailGridPaginationModel.grid).datagrid('getChecked');
        if (!rows || rows.length == 0) {
            //$.messager.alert('提示', '请选择明细');
            ko.c8showMessage('error', "请选择明细");
            return;
        }
        base.SellOrder();
        if (base.c8win) {
            base.c8win.c8CloseWin();
            // delete  base.c8win;
        }
    };
    this.Close = function () {
        if (base.c8win) {
            base.c8win.c8CloseWin();
            // delete  base.c8win;
        }
    };

}
