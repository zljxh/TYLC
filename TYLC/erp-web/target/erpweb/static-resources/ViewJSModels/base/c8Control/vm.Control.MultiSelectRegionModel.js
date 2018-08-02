/**
 * Created by admin on 2014/11/2.
 */
vm.Control=vm.Control||{};
vm.Control.MultiSelectRegionModel=function(griddataParameter)
{
    this.winUrl="/BusinessControl/MultiSelectRegion";
    this.OperatorGroupRowId=null;
    var base=this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel=null;
    this.f_DblClickRow=function(rowIndex, rowData) {
        base.addRegionClose();
    }
    this.griddataParameter = griddataParameter||{};
    this.griddataParameter.IsFormLayout=false;
    this.griddataParameter.dataoptions = {singleSelect:false,
        iconCls: 'icon-ok',
        rownumbers: true,
        animate: true,
        collapsible: true,
        fitColumns: true,
        url: '/Region/GetGridTreeObjectList',
        method: 'get',
        idField: 'RowId',
        treeField: 'Name',columns: [
        [
            {title: '选择', field: 'ck',checkbox:true},
            {title: '名称', field: 'Name', width: 80},
            {title: '代码', field: 'Code', width: 80}
        ]
    ]};
    this.gridModel = new c8TreeGrid(this.griddataParameter);
    this.searchClick = function () {
     //   base.gridModel.pSearch({RegionCategoryRowId:RegionCategoryRowId});
    };
    this.setParameter=function(parameter)
    {
        callBackAddRegion=parameter.callback;
    };
    var callBackAddRegion=null;
    this.addRegion=function() {
        if (callBackAddRegion != null) {
            var result = base.gridModel.datagrid("getSelections");
            callBackAddRegion(result);
        }

    };
    this.addRegionClose=function(){
        base.addRegion();
        if(base.c8win)
        {
            base.c8win.c8CloseWin();

           // delete  base.c8win;
        }
    };
}