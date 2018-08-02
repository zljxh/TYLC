/**
 * Created by xyyz150 on 2014/11/19.
 */
vm.Control = vm.Control || {};
vm.Control.SelectPostPrintOrderWaveModel = function (griddataParameter) {
    var base = this;
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectPostPrintOrderWave";
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageSelectPostPrintOrderWaveByPQP";
    this.griddataParameter.toolbar = ".tbSelectPostPrintOrderWave";
    this.griddataParameter.IsFormLayout = false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addPostPrintOrderWaveClose();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '波次号', field: 'WaveCode', width: 150, align: 'right'},
                //{title: '数量', field: 'TotalQuantity', width: 120, align: 'right'},
                {title: '单据数量', field: 'TotalBillQuantity', width: 90, align: 'center'},
                {title: '未打印数量', field: 'noPrintCount', width: 90, align: 'center'},
                {title: '后置打单锁定人', field: 'lockUserName', width: 150, align: 'center'}
            ]
        ], singleSelect: false, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8Grid(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch();
    };

//设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddPostPrintOrderWave = parameter.callback;
    };
    var callBackAddPostPrintOrderWave = null;
    this.addPostPrintOrderWave = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddPostPrintOrderWave != null) {
            callBackAddPostPrintOrderWave(result);
        }
    };
    this.addPostPrintOrderWaveClose = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddPostPrintOrderWave != null) {
            callBackAddPostPrintOrderWave(result);
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();
        }
    };
}

