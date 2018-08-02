/**
 * Created by admin on 2014/11/2.
 */
vm.Control=vm.Control||{};
vm.Control.SelectVopPick=function(griddataParameter)
{
    var base=this;
    this.winUrl="/BusinessControl/getControlView?ControlName=SelectVopPick";
    this.c8winId=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetVopPickList";
    this.griddataParameter.countUrl = "/BusinessControl/GetVopPickCount";
    this.griddataParameter.toolbar=".tbSelectVopPick";
    this.griddataParameter.IsFormLayout=false;
    var f_onRowContextMenu=function (e, rowIndex, rowData){
        e.preventDefault();
        base.gridModel.datagrid("selectRow",rowIndex);
        //model,context,selector
        base.gridModel.getWindowContext().ko.c8BindingViewModel(base,base.gridModel.c8GetElementsBySelector('#tbMultiSelectVopPickMenu'));
        base.gridModel.c8GetElementsBySelector('#tbSelectVopPickMenu').menu('show',{
            left: e.pageX,
            top: e.pageY
        });
    }
     var  hideRowContextMenu=function()
     {
         base.gridModel.c8GetElementsBySelector('#tbSelectVopPickMenu').menu('hide');
     }
    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addVopPickClose();
    }
    this.griddataParameter.dataoptions = {columns: [
        [
            {title: '选择', field: 'ck',checkbox:true},
            {title:'拣货单号',field:'PickNo',width:80,align:'right'},
            {title: 'PO单号', field: 'PoNo', width: 160, align: 'right'},
            {title:'RowId',field:'RowId',width:80,align:'right',hidden:"true"},
            {title:'供应商名称',field:'VopVendorName',width:80,align:'right'},
            {title:'唯品会仓库',field:'SellSite',width:80,align:'right'},
            {title:'平台数量',field:'Stock',width:80,align:'right'},
            {title:'通知数',field:'NoticeQuantity',width:80,align:'right'},
            {title:'出库数',field:'OutQuantity',width:80,align:'right'}
        ]
    ], singleSelect:false,onDblClickRow:this.f_DblClickRow,onRowContextMenu:f_onRowContextMenu};
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter=function(parameter)
    {
        callBackAddVopPick=parameter.callback;
        if(parameter.singleSelect!=null)
        {
            base.griddataParameter.dataoptions.singleSelect=parameter.singleSelect;
        }
    };
    var callBackAddVopPick=null;
    this.addVopPick=function() {
        if (callBackAddVopPick != null) {
            var result = base.gridModel.datagrid("getSelections");
            if(result.length<=0){
                return true;
            }
            var pono = result[0].PoNo;
            var warehouse=result[0].SellSite;
            for(var i=0;i<result.length;i++){
                if(pono!=result[i].PoNo||warehouse!=result[i].SellSite){
                    return false;
                }
            }
            callBackAddVopPick(result);
        }else{
            return false;
        }
        hideRowContextMenu();
        return true;
    };
    this.addVopPickClose=function(){
        if(!base.addVopPick()){
            $.customerAlert("请选择同一个唯品会仓库及PO单号下的拣货单！");
            return;
        }
        if(base.c8win)
        {
            base.c8win.c8CloseWin();
            hideRowContextMenu();
           // delete  base.c8win;
        }
    };
}