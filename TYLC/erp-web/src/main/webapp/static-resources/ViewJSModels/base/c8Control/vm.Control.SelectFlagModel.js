/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SelectFlag = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectFlag";
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/getFlagList";
    this.griddataParameter.countUrl = "/BusinessControl/getFlagCount";
    this.griddataParameter.toolbar = ".tbSelectExpress";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow = function (rowIndex, rowData) {
       base.addDataFlagClose();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '旗帜代码', field: 'Code', width: 100, align: 'right'},
                {title: '旗帜名称', field: 'Name', width: 100, align: 'right'},
                {
                    title: '淘宝旗帜', field: 'RowId', width: 100, align: 'center',
                    formatter: function (value, row, index) {
                        if (row.RowId == 0)
                            return null;
                        else {
                            return '<img src="/Content/images/taobaoflag/' + row.RowId + '.png" />';
                        }

                    }
                },
            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8Grid(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddFlag = parameter.callback;
        if (parameter.singleSelect != null) {
            base.griddataParameter.dataoptions.singleSelect = parameter.singleSelect;
        }
    };
    var callBackAddFlag = null;
    this.addDataFlag = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddFlag != null) {
          //  var result = base.gridModel.datagrid("getSelections");
            callBackAddFlag(result);

        }
    };
    this.addDataFlagClose = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddFlag != null) {
            //  var result = base.gridModel.datagrid("getSelections");
            callBackAddFlag(result);

        }
        if (base.c8win) {
            base.c8win.c8CloseWin();

        }
    };
}
