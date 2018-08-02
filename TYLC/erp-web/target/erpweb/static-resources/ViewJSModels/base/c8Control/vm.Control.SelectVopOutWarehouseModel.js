/**
 * Created by admin on 2014/11/2.
 */
vm.Control=vm.Control||{};
vm.Control.MultiSelectVopOutWarehouseModel=function(griddataParameter)
{
    var base=this;
    this.winUrl="/BusinessControl/getControlView?ControlName=MultiSelectVopOutWarehouse";
    this.c8winId=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageMultiSelectVopOutWarehouseByPQP";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountMultiSelectVopOutWarehouseByPQP";
    this.griddataParameter.toolbar=".tbMultiSelectVopOutWarehouse";
    this.griddataParameter.IsFormLayout=false;
    var f_onRowContextMenu=function (e, rowIndex, rowData){
        e.preventDefault();
        base.gridModel.datagrid("selectRow",rowIndex);
        //model,context,selector
        base.gridModel.getWindowContext().ko.c8BindingViewModel(base,base.gridModel.c8GetElementsBySelector('#tbMultiSelectVopOutWarehouseMenu'));
        base.gridModel.c8GetElementsBySelector('#tbMultiSelectVopOutWarehouseMenu').menu('show',{
            left: e.pageX,
            top: e.pageY
        });
    }
     var  hideRowContextMenu=function()
     {
         base.gridModel.c8GetElementsBySelector('#tbMultiSelectVopOutWarehouseMenu').menu('hide');
     }
    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addVopOutWarehouseClose();
    }
    this.griddataParameter.dataoptions = {
        /*remoteSort: false,
        singleSelect: true,
        checkOnSelect: false,
        selectOnCheck: false,
        ctrlSelect: true,*/

        columns: [
        [   {field: 'ck', checkbox: true, sortable: true},
            {title:'出库单号',field:'Code',width:150,align:'center'},
            {title:'审核',field:'IsAudit',width:40,align:'center',formatter: $.c8formatter.checkbox },
            {title:'仓库名称',field:'WarehouseName',width:80,align:'center'},
            {title:'通知数',field:'TotalNoticeQuantity',width:55,align:'center'},
            {title:'出库数',field:'TotalQuantity',width:55,align:'center'},
            {title:'唯品会仓库',field:'VopWarehouseName',width:80,align:'center'},
            {title:'出库时间',field:'WarehouseDeliveryTime',width:140,align:'center'},
            {title:'备注',field:'Remark',width:100,align:'center'}
        ]
    ],singleSelect:false,idFiled:"Code",onDblClickRow:this.f_DblClickRow,onRowContextMenu:f_onRowContextMenu};
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter=function(parameter)
    {
        callBackAddVopOutWarehouse=parameter.callback;
        if(parameter.singleSelect!=null)
        {
            base.griddataParameter.dataoptions.singleSelect=parameter.singleSelect;
        }
    };
    var callBackAddVopOutWarehouse=null;
    this.addVopOutWarehouse=function() {
        if (callBackAddVopOutWarehouse != null) {
            var result = base.gridModel.datagrid("getSelections");
            callBackAddVopOutWarehouse(result);
        }
        hideRowContextMenu();
    };
    this.addVopOutWarehouseClose=function(){
        base.addVopOutWarehouse();
        if(base.c8win)
        {
            base.c8win.c8CloseWin();
            hideRowContextMenu();
           // delete  base.c8win;
        }
    };
   /* this.setFormValidate = function () {
        $('.default-checkbox').threeStateCheckbox();
        $(".easyui-textbox").each(function (i, item) {
            $(item).textbox('textbox').keydown(function (e) {
                if (e.keyCode == 13) {
                    base.searchClick();
                }
            });
        })
    };*/
}
$(function () {
    //opModel.setFormValidate();

});