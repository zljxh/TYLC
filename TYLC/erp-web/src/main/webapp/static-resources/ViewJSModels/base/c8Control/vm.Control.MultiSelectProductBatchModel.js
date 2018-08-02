/**
 * Created by admin on 2014/11/2.
 */
vm.Control=vm.Control||{};
vm.Control.MultiSelectProductBatchModel=function(griddataParameter)
{
    var base=this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl="/BusinessControl/MultiSelectProductBatch";
    this.OperatorGroupRowId=null;
    var base=this;
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageMultiSelectProductBatchByPQP";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountMultiSelectProductBatchByPQP";
    this.griddataParameter.toolbar=".tbMultiSelectProduct";
    this.griddataParameter.IsFormLayout=false;
    var f_onRowContextMenu=function (e, rowIndex, rowData){
        e.preventDefault();
        base.gridModel.datagrid("selectRow",rowIndex);
        //model,context,selector
        base.gridModel.getWindowContext().ko.c8BindingViewModel(base,base.gridModel.c8GetElementsBySelector('#tbMultiSelectProductMenu'));
        base.gridModel.c8GetElementsBySelector('#tbMultiSelectProductMenu').menu('show',{
            left: e.pageX,
            top: e.pageY
        });
    }
     var  hideRowContextMenu=function()
     {
         base.gridModel.c8GetElementsBySelector('#tbMultiSelectProductMenu').menu('hide');
     }
    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addProductClose();
    }
    this.griddataParameter.dataoptions = {columns: [
        [
            {title: '选择', field: 'ck',checkbox:true},
            {title: '商品代码', field: 'ProductCode', width: 120, align: 'left'},
            {title: '商品名称', field: 'ProductName', width: 120, align: 'left'},
            {title:'规格代码',field:'ProductSkuCode',width:120,align:'left'},
            {title:'规格名称',field:'ProductSkuName',width:120,align:'left'}
        ]
    ],singleSelect:false,onDblClickRow:this.f_DblClickRow,onRowContextMenu:f_onRowContextMenu};
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch({ProductCategoryRowId:ProductCategoryRowId});
    };
    var ProductCategoryRowId=null;
    this.treeoption={
        url: 'BusinessControl/GetComboTreeProductCategory',
        onClick: function (node) {
            ProductCategoryRowId=node.id;
            base.searchClick();
        }
    };
    //设置添加商品的回调函数
    this.setParameter=function(parameter)
    {
        callBackAddProduct=parameter.callback;
    };
    var callBackAddProduct=null;
    this.addProduct=function() {
        if (callBackAddProduct != null) {
            var result = base.gridModel.datagrid("getSelections");
            callBackAddProduct(result);
            base.gridModel.datagrid("clearChecked");
        }
        hideRowContextMenu();
    };
    this.addProductClose=function(){
        base.addProduct();
        if(base.c8win)
        {
            base.c8win.c8CloseWin();
            hideRowContextMenu();
           // delete  base.c8win;
        }
    };
}