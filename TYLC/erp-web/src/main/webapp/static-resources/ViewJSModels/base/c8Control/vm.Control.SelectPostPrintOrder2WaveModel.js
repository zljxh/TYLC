/**
 * Created by xyyz150 on 2014/11/19.
 */
vm.Control = vm.Control || {};
vm.Control.SelectPostPrintOrder2WaveModel = function (griddataParameter) {
    var base = this;
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectPostPrintOrder2Wave";
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageSelectPostPrintOrder2WaveByPQP";
    this.griddataParameter.toolbar = ".tbSelectPostPrintOrder2Wave";
    this.griddataParameter.IsFormLayout = false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addPostPrintOrderWaveClose();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '波次号', field: 'WaveCode', width: 150, align: 'right'},
                {title: '一单一货', field: 'IsLonely', width: 90, align: 'center',
                    formatter:function(value, row, index){
                        if(value==1){
                            return "是";
                        }else{
                            return "否";
                        }
                    }
                },
                {title: '仓库', field: 'WarehouseName', width: 100, sortable: true, align: 'right'},
                {title: '快递公司', field: 'ExpressName', width: 120, sortable: true, align: 'right'},
                {title: '单据数量', field: 'TotalBillQuantity', width: 80, align: 'center'},
                {title: '作废数量', field: 'CancelBillQuantity', width: 80, align: 'center'},
                {title: '未打印数量', field: 'noPrintCount', width: 80, align: 'center'},
                {title: '后置打单锁定人', field: 'lockUserName', width: 120, align: 'center'}
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

