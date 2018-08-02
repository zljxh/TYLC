/**
 * Created by xyyz150 on 2014/11/19.
 */
vm.Control = vm.Control || {};
vm.Control.SelectSeparateBoxWaveModel = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectSeparateBoxWave";
    this.baseModel = null;
    var getData=null;//function获取查询条件,返回一个object
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageSelectSeparateBoxWaveByPQP";
    this.griddataParameter.toolbar = ".tbSelectSeparateBoxWave";
    this.griddataParameter.IsFormLayout = false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addSeparateBoxWaveClose();
    }
    this.griddataParameter.dataoptions = {
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true},
                {title: '波次号', field: 'WaveCode', width: 150, align: 'right'},
                {title: '数量', field: 'TotalBillQuantity', width: 120, align: 'right'},
                {title: '扫描数量', field: 'TotalBoxQuantity', width: 190, align: 'center'},
                {title: '店铺', field: 'ShopName', width:190, align:'right',formatter: function (value, row, index) {
                        if (null!=value&&value!=''&&value.length > 20) {
                            return value.substring(0,20)+"...";
                        } else {
                            return value;
                        }

                    }
                }
            ]
        ], singleSelect: false, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8Grid(this.griddataParameter);
    this.searchClick = function () {
        if(getData==null){
            base.gridModel.pSearch();
            base.gridModel.datagrid('hideColumn', 'TotalBoxQuantity');
        }else{
            base.gridModel.pSearch(getData());
        }
        //base.gridModel.pSearch();
    };

//设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddSeparateBoxWave = parameter.callback;
        getData=parameter.getData;
    };
    var callBackAddSeparateBoxWave = null;
    this.addSeparateBoxWave = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddSeparateBoxWave != null) {
            callBackAddSeparateBoxWave(result);
        }
    };
    this.addSeparateBoxWaveClose = function () {
        var result = base.gridModel.datagrid("getSelections");
        if (result == null || result.length == 0)
            return;
        if (callBackAddSeparateBoxWave != null) {
            callBackAddSeparateBoxWave(result);
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();
        }
    };
}

