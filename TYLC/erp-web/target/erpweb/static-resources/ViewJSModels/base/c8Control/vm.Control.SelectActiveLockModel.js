/**
 * Created by admin on 2014/11/2.
 */
vm.Control=vm.Control||{};
vm.Control.SelectActiveLockModel=function(griddataParameter)
{
    var base=this;
    this.winUrl="/BusinessControl/getControlView?ControlName=SelectActiveLock";
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageSelectActiveLockByPQP";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountSelectActiveLockByPQP";
    this.griddataParameter.toolbar=".tbSelectActiveLock";
    this.griddataParameter.IsFormLayout=false;
    var f_onRowContextMenu=function (e, rowIndex, rowData){
        e.preventDefault();
        base.gridModel.datagrid("selectRow",rowIndex);
        //model,context,selector
        base.gridModel.getWindowContext().ko.c8BindingViewModel(base,base.gridModel.c8GetElementsBySelector('#tbSelectActiveLockMenu'));
        base.gridModel.c8GetElementsBySelector('#tbSelectActiveLockMenu').menu('show',{
            left: e.pageX,
            top: e.pageY
        });
    }
    var  hideRowContextMenu=function()
    {
        base.gridModel.c8GetElementsBySelector('#tbSelectActiveLockMenu').menu('hide');
    }
    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addPurchaseOrderClose();
    }
    this.griddataParameter.dataoptions = {columns: [
        [
            {title: '选择', field: 'ck',checkbox:true},
            {title: '编号', field: 'Code', width: 160, align: 'right'},
            {title:'名称',field:'Name',width:160,align:'right'}
        ]
    ],singleSelect:true,onDblClickRow:this.f_DblClickRow,onRowContextMenu:f_onRowContextMenu};
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter=function(parameter)
    {
        callBackAddPurchaseOrder=parameter.callback;
        if(parameter.singleSelect!=null)
        {
            base.griddataParameter.dataoptions.singleSelect=parameter.singleSelect;
        }
    };
    var callBackAddPurchaseOrder=null;
    this.addPurchaseOrder=function() {
        if (callBackAddPurchaseOrder != null) {
            var result = base.gridModel.datagrid("getSelections");
            callBackAddPurchaseOrder(result);
        }
        hideRowContextMenu();
    };
    this.addPurchaseOrderClose=function(){
        base.addPurchaseOrder();
        if(base.c8win)
        {
            base.c8win.c8CloseWin();
            hideRowContextMenu();
            // delete  base.c8win;
        }
    };
}
