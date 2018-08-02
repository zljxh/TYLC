/**
 * Created by admin on 2014/11/2.
 */
vm.Control=vm.Control||{};
vm.Control.MultiSelectShopModel=function(griddataParameter)
{
    var base=this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl="/BusinessControl/MultiSelectShop";
    this.OperatorGroupRowId=null;
    var base=this;
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageMultiSelectShopByPQP";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountMultiSelectShopByPQP";
    this.griddataParameter.toolbar=".tbMultiSelectShop";
    this.griddataParameter.IsFormLayout=false;
    var f_onRowContextMenu=function (e, rowIndex, rowData){
        e.preventDefault();
        base.gridModel.datagrid("selectRow",rowIndex);
        //model,context,selector
        base.gridModel.getWindowContext().ko.c8BindingViewModel(base,base.gridModel.c8GetElementsBySelector('#tbMultiSelectShopMenu'));
        base.gridModel.c8GetElementsBySelector('#tbMultiSelectShopMenu').menu('show',{
            left: e.pageX,
            top: e.pageY
        });
    }
     var  hideRowContextMenu=function()
     {
         base.gridModel.c8GetElementsBySelector('#tbMultiSelectShopMenu').menu('hide');
     }
    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addShopClose();
    }
    this.griddataParameter.dataoptions = {columns: [
        [
            {title: '选择', field: 'ck',checkbox:true},
            {title: '名称', field: 'Name', width: 120, align: 'right'},
            {title: '代码', field: 'Code', width: 120, align: 'right'}
        ]
    ],singleSelect:false,onDblClickRow:this.f_DblClickRow,onRowContextMenu:f_onRowContextMenu};
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch({ShopCategoryRowId:ShopCategoryRowId});
    };
    var ShopCategoryRowId=null;
    this.treeoption={
        url: 'BusinessControl/GetComboTreeShopCategory',
        onClick: function (node) {
            ShopCategoryRowId=node.id;
            base.searchClick();
        }
    };
    //设置添加商品的回调函数
    this.setParameter=function(parameter)
    {
        callBackAddShop=parameter.callback;
    };
    var callBackAddShop=null;
    this.addShop=function() {
        if (callBackAddShop != null) {
            var result = base.gridModel.datagrid("getSelections");
            callBackAddShop(result);
        }
        hideRowContextMenu();
    };
    this.addShopClose=function(){
        base.addShop();
        if(base.c8win)
        {
            base.c8win.c8CloseWin();
            hideRowContextMenu();
           // delete  base.c8win;
        }
    };
}