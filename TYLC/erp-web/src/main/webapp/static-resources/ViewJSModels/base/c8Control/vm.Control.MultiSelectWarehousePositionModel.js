/**
 * Created by admin on 2014/11/2.
 */
vm.Control=vm.Control||{};
vm.Control.MultiSelectWarehousePositionModel=function(griddataParameter)
{
    var base=this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl="/BusinessControl/getControlView?ControlName=MultiSelectWarehousePosition";
    var base=this;
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageWarehouserPositionByPQP";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountWarehouserPositionByPQP";
    this.griddataParameter.toolbar=".tbMultiSelectWarehousePosition";
    this.griddataParameter.IsFormLayout=false;

    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addWarehousePositionClose();
    }
    this.griddataParameter.dataoptions = {columns: [
        [
            {title: '选择', field: 'ck',checkbox:true},
            {title: '库位代码', field: 'Code', width: 120, align: 'left'},
            {title: '库位名称', field: 'Name', width: 120, align: 'left'},
            {title: '仓库名称', field: 'WarehouseRowId', width: 120, align: 'left'}
        ]
    ],singleSelect:false,onDblClickRow:this.f_DblClickRow};
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        if (getData != null) {
            var data = getData();
            if (data == undefined) {
                return;
            }
            base.gridModel.pSearch(data);
        } else {
            base.gridModel.pSearch(this.callBackParameter.data);
        }

    };
    this.callBackParameter=null;
    var getData = null;//function获取查询条件,返回一个object
    //设置添加库位的回调函数
    this.setParameter=function(parameter)
    {
        this.callBackParameter=parameter;
        callBackAddWarehousePosition=parameter.callback;
        getData=parameter.getData;
    };
    var callBackAddWarehousePosition=null;
    this.addWarehousePosition=function() {
        if (callBackAddWarehousePosition != null) {
            if(this.callBackParameter.singleSelect==undefined||this.callBackParameter.singleSelect)
            {
                var result = base.gridModel.datagrid("getSelected");
                callBackAddWarehousePosition(result, this.callBackParameter);
            }
            else {
                var result = base.gridModel.datagrid("getSelections");
                callBackAddWarehousePosition(result, this.callBackParameter);
            }
        }
    };
    this.addWarehousePositionClose=function(){
        base.addWarehousePosition();
        if(base.c8win)
        {
            base.c8win.c8CloseWin();
           // delete  base.c8win;
        }
    };
}