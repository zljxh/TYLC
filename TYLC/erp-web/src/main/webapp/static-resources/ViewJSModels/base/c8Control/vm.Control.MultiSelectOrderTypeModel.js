
vm.Control=vm.Control||{};
vm.Control.MultiSelectOrderTypeModel=function(griddataParameter)
{
    var base=this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl="/BusinessControl/MultiSelectOrderType";
    this.OperatorGroupRowId=null;
    var base=this;
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageMultiSelectOrderTypeByPQP";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountMultiSelectOrderTypeByPQP";
    this.griddataParameter.toolbar=".tbMultiSelectOrderType";
    this.griddataParameter.IsFormLayout=false;
    var f_onRowContextMenu=function (e, rowIndex, rowData){
        e.preventDefault();
        base.gridModel.datagrid("selectRow",rowIndex);
        //model,context,selector
        base.gridModel.getWindowContext().ko.c8BindingViewModel(base,base.gridModel.c8GetElementsBySelector('#tbMultiSelectOrderTypeMenu'));
        base.gridModel.c8GetElementsBySelector('#tbMultiSelectOrderTypeMenu').menu('show',{
            left: e.pageX,
            top: e.pageY
        });
    }
    var  hideRowContextMenu=function()
    {
        base.gridModel.c8GetElementsBySelector('#tbMultiSelectOrderTypeMenu').menu('hide');
    }
    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addOrderTypeClose();
    }
    this.griddataParameter.dataoptions = {columns: [
        [
            {title: '选择', field: 'ck',checkbox:true},
            {title: '名称', field: 'Name', width: 120, align: 'right'}
            //,
            //{title: '代码', field: 'Code', width: 80, align: 'right'}
        ]
    ],singleSelect:false,onDblClickRow:this.f_DblClickRow,onRowContextMenu:f_onRowContextMenu};
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };

    //设置添加订单类型的回调函数
    this.setParameter=function(parameter)
    {
        callBackAddOrderType=parameter.callback;
    };
    var callBackAddOrderType=null;
    this.addOrderType=function() {
        if (callBackAddOrderType != null) {
            var result = base.gridModel.datagrid("getSelections");
            callBackAddOrderType(result);
        }
        hideRowContextMenu();
    };
    this.addOrderTypeClose=function(){
        base.addOrderType();
        if(base.c8win)
        {
            base.c8win.c8CloseWin();
            hideRowContextMenu();
        }
    };
}