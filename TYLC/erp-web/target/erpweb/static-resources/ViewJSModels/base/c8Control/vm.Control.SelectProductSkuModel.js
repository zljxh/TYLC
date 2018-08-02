/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SelectProductSkuModel = function (griddataParameter) {
    var base = this;
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectProductSku";
    this.OperatorGroupRowId = null;
    this.c8winId=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageSelectProductSkuByPQP";
    this.griddataParameter.toolbar = ".tbSelectProductSku";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addProductClose();
    }
    this.griddataParameter.dataoptions = {remoteSort: false,
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true, sortable: true},
                {title: '规格代码', field: 'Code', width: 120, align: 'left', sortable: true},
                {title: '规格名称', field: 'Name', width: 300, align: 'left', sortable: true}
            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8Grid(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch({ProductRowId: base.ProductRowId});
    };
    this.ProductRowId = null;
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddProduct = parameter.callback;
    };
    var callBackAddProduct = null;
    this.addProduct = function () {
        if (callBackAddProduct != null) {
            var result = base.gridModel.datagrid("getSelections");
            if(result.length==0){
                return;
            }
            if(result.length>0&&result[0].IsEnabled!=1){
                ko.c8showMessage('warn', '商品'+result[0].Code+'已停用!');
                return;
            }
            callBackAddProduct(result);
            base.gridModel.datagrid("clearChecked");
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();
            // delete  base.c8win;
        }
    };
    this.addProductClose = function () {
        base.addProduct();
    };
    this.setFormValidate = function () {
        $('.default-checkbox').threeStateCheckbox();
    }
}
