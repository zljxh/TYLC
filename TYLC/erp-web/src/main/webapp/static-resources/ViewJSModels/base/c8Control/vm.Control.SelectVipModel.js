/**
 * Created by xyyz150 on 2015/9/29.
 */

/**
 * Created by xyyz150 on 2014/12/19.
 */
vm.Control = vm.Control || {};
vm.Control.SelectVipModel = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectVipModel";
    this.OperatorGroupRowId = null;
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageVipByPQP";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountVipByPQP";
    this.griddataParameter.toolbar = ".tbSelectVip";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addVipClose();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '会员代码', field: 'Code', width: 100, align: 'right'},
                {title: '会员名称', field: 'Name', width: 100, align: 'right'},
                {title: '手机', field: 'Mobile', width: 100, align: 'right'},
                {title: '平台名称', field: 'PlatTypeName', width: 100, align: 'right'},
                {title: '店铺', field: 'ShopName', width: 100, align: 'right'},
                {title: '会员级别', field: 'LevelName', width: 100, align: 'right'}
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
            if(result==null){
                $.customerAlert("请选择会员!");
                return;
            }
            callBackAddProduct(result);
            if (base.c8win) {
                base.c8win.c8CloseWin();
                // delete  base.c8win;
            }
        }
    };
    this.addVipClose = function () {
        base.addProduct();

    };
}
