
vm.Control=vm.Control||{};
vm.Control.MultiSelectProvinceModel=function(griddataParameter)
{
    var base=this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl="/BusinessControl/MultiSelectProvince";
    this.OperatorGroupRowId=null;
    var base=this;
    this.baseModel=null;
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.pageUrl = "/BusinessControl/GetMultiSelectProvince";
    this.griddataParameter.toolbar=".tbMultiSelectProvince";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addProvinceClose();
    }
    this.griddataParameter.dataoptions = {columns: [
        [
            {title: '选择', field: 'ck',checkbox:true},
            {title: '名称', field: 'Name', width: 120, align: 'right'}
            //,
            //{title: '代码', field: 'Code', width: 80, align: 'right'}
        ]
    ],singleSelect:false};
    this.gridModel = new c8Grid(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };

    //设置添加订单类型的回调函数
    this.setParameter=function(parameter)
    {
        callBackAddProvince=parameter.callback;
    };
    var callBackAddProvince=null;
    this.addProvince=function() {
        if (callBackAddProvince != null) {
            var result = base.gridModel.datagrid("getSelections");
            callBackAddProvince(result);
        }
    };
    this.addProvinceClose=function(){
        base.addProvince();
        if(base.c8win)
        {
            base.c8win.c8CloseWin();
        }
    };
}