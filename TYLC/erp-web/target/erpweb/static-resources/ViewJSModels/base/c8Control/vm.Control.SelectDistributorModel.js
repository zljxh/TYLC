/**
 * Created by xyyz150 on 2015/9/29.
 */

/**
 * Created by xyyz150 on 2014/12/19.
 */
vm.Control = vm.Control || {};
vm.Control.SelectDistributorModel = function (griddataParameter) {
    var base = this;
    this.c8winId = null;
    this.setWinId = function (winid) {
        this.c8winId = winid;
        base.gridModel.c8winId = this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectDistributorModel";
    this.OperatorGroupRowId = null;
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/Distributor/getpage";
    this.griddataParameter.countUrl = "/Distributor/getcount";
    this.griddataParameter.toolbar = ".tbSelectVip";

    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addVipClose();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '代码', field: 'Code', width: 120, align: 'right'},
                {title: '名称', field: 'Name', width: 120, align: 'right'},
                {title: '手机', field: 'Mobile', width: 120, align: 'right'}

            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddProduct = parameter.callback;
    };
    var callBackAddProduct = null;
    this.addProduct = function () {
        if (callBackAddProduct != null) {
            var result = base.gridModel.datagrid("getSelected");
            callBackAddProduct(result);
        }
    };
    this.addVipClose = function () {
        base.addProduct();
        if (base.c8win) {
            base.c8win.c8CloseWin();
            // delete  base.c8win;
        }
    };
    this.setFormValidate = function () {
        $(".easyui-textbox").each(function (i, item) {
            $(item).textbox('textbox').keydown(function (e) {
                if (e.keyCode == 13) {
                    base.searchClick();
                }
            });
        })
    }
}
