
/**
 * Created by xyyz150 on 2014/12/19.
 */
vm.Control=vm.Control||{};
vm.Control.SelectAccountModel=function(griddataParameter)
{
    var base=this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl="/BusinessControl/getControlView?ControlName=SelectAccountModel";
    this.OperatorGroupRowId=null;
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageAccountByPQP";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountAccountByPQP";
    this.griddataParameter.toolbar=".tbSelectAccount";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addProductClose();
    }
    this.griddataParameter.dataoptions = {columns: [
        [
            {title: '选择', field: 'ck',checkbox:true},
            {title: '费用科目名称', field: 'AccountName', width: 120, align: 'right'},
            {title: '费用科目编码', field: 'AccountCode', width: 120, align: 'right'}
        ]
    ],singleSelect:true,onDblClickRow:this.f_DblClickRow};
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter=function(parameter)
    {
        callBackAddProduct=parameter.callback;
    };
    var callBackAddProduct=null;
    this.addProduct=function() {
        if (callBackAddProduct != null) {
            var result = base.gridModel.datagrid("getSelected");
            callBackAddProduct(result);
        }
    };
    this.addProductClose=function(){
        base.addProduct();
        if(base.c8win)
        {
            base.c8win.c8CloseWin();
            // delete  base.c8win;
        }
    };
}