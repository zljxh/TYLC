/**
 * Created by xyyz150 on 2014/11/19.
 */
vm.Control = vm.Control || {};
vm.Control.ShowPostPrintOrder2RemainProducts = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel3.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=ShowPostPrintOrder2RemainProducts";
    this.baseModel = null;
    //格子或波次中的为扫商品
    //this.griddataParameter = griddataParameter || {};
    //this.griddataParameter.pageUrl = "/PostPrintOrder2/GetPostPrintOrder2RemainProducts";
    //this.griddataParameter.toolbar = ".tbSelectPostPrintOrder2Wave";
    //this.griddataParameter.IsFormLayout = false;
    //this.griddataParameter.dataoptions = {
    //    remoteSort: false,
    //    columns: [
    //        [
    //            {title: '商品名称', field: 'ProductName', width: 150, align: 'center',sortable:true},
    //            {title: '商品代码', field: 'ProductCode', width: 150, align: 'center',sortable:true},
    //            {title: '商品规格名称', field: 'ProductSkuName', width: 150, align: 'center',sortable:true},
    //            {title: '商品规格代码', field: 'ProductSkuCode', width: 150, align: 'center',sortable:true},
    //            {title: '库位名称', field: 'KwCode', width: 120, align: 'center',sortable:true},
    //            {title: '数量', field: 'RemainQuantity', width: 80, align: 'center',sortable:true}
    //        ]
    //    ]
    //};
    //this.gridModel = new c8Grid(this.griddataParameter);
    //所有的未扫商品
    //this.griddataParameter2 = griddataParameter || {};
    //this.griddataParameter2.pageUrl = "/PostPrintOrder2/GetPostPrintOrder2AllNoScanProducts";
    //this.griddataParameter2.toolbar = ".tbSelectPostPrintOrder2AllNoScanProducts";
    //this.griddataParameter2.IsFormLayout = false;
    //this.griddataParameter2.dataoptions = {
    //    remoteSort: false,
    //    columns: [
    //        [
    //            {title: '商品名称', field: 'ProductName', width: 150, align: 'center',sortable:true},
    //            {title: '商品代码', field: 'ProductCode', width: 150, align: 'center',sortable:true},
    //            {title: '商品规格名称', field: 'ProductSkuName', width: 150, align: 'center',sortable:true},
    //            {title: '商品规格代码', field: 'ProductSkuCode', width: 150, align: 'center',sortable:true},
    //            {title: '库位名称', field: 'KwCode', width: 120, align: 'center',sortable:true},
    //            {title: '数量', field: 'RemainQuantity', width: 80, align: 'center',sortable:true}
    //        ]
    //    ]
    //};
    //this.gridModel2 = new c8Grid(this.griddataParameter2);

    this.griddataParameter3 = griddataParameter || {};
    this.griddataParameter3.pageUrl = "/PostPrintOrder2/GetPostPrintOrder2AllNoScanProducts";
    this.griddataParameter3.toolbar = ".tbSelectPostPrintOrder2AllNoScanProducts";
    this.griddataParameter3.IsFormLayout = false;
    this.griddataParameter3.dataoptions = {
        remoteSort: false,
        columns: [
            [
                {
                    title: '图片', field: 'PicturePath1', width: 50, align: 'right',
                    formatter: function (value, row, index) {
                        if (value != '' && value != null) {
                            return "<img class='showimg' src='" + value + "_30x30.jpg' imgurl='" + value + "' />"
                        } else {
                            return "无";
                        }
                    }
                },
                {title: '商品名称', field: 'ProductName', width: 130, align: 'center',sortable:true},
                {title: '商品代码', field: 'ProductCode', width: 130, align: 'center',sortable:true},
                {title: '商品规格名称', field: 'ProductSkuName', width: 130, align: 'center',sortable:true},
                {title: '商品规格代码', field: 'ProductSkuCode', width: 130, align: 'center',sortable:true},
                {title: '仓库名称', field: 'WarehouseName', width: 120, align: 'center',sortable:true},
                {title: '库位名称', field: 'KwCode', width: 120, align: 'center',sortable:true},
                {title: '数量', field: 'RemainQuantity', width: 80, align: 'center',sortable:true}
            ]
        ], onDblClickRow: function (rowIndex, rowData) {
            base.addProductClose();
        }
        // onDblClickRow: this.f_DblClickRow()
    };
    this.gridModel3 = new c8Grid(this.griddataParameter3);

    this.searchClick = function () {
        //base.gridModel.pSearch();
        //base.gridModel2.pSearch();
        //$.ajax({
        //    url:"/PostPrintOrder2/IsWave",
        //    success:function(data){
        //        var tab = $('#tabs').tabs('getTab',"发货单所有未扫商品").panel('options').tab; //title替换成tab的title
        //        if(data){
        //            tab.hide();
        //        }else{
        //            tab.show();
        //        }
        //
        //    }
        //})
        base.gridModel3.pSearch();
        base.showproductimg();
    };
    //打印剩余商品
    var FJPrint;
    var fenjian = new vm.PostPrintOrder2.PickProductsPrint();
    //this.remainProductsPrint = function(){
    //    if (FJPrint == undefined) {
    //        FJPrint = getCaiNiaoPrint(null, null);
    //    }
    //    fenjian.parentModel = base;
    //    fenjian.excete(base.gridModel.datagrid("getRows"), FJPrint);
    //}
    //打印剩余所有未扫描商品
    this.remainAllNoScanProductsPrint = function(){
        if (FJPrint == undefined) {
            FJPrint = getCaiNiaoPrint(null, null);
        }
        fenjian.parentModel = base;
        fenjian.excete(base.gridModel3.datagrid("getRows"), FJPrint);
    }
    
    var callBackAddProduct = null;
    var getData=null;//function获取查询条件,返回一个object
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        
        callBackAddProduct = parameter.callback;
        getData=parameter.getData;
    };
    // this.f_DblClickRow = function (rowIndex, rowData) {
    //     alert(333)
    //     base.addProductClose();
    // }
    this.addProductClose = function () {
        base.addProduct();
        if (base.c8win) {
         base.c8win.c8CloseWin();
         // delete  base.c8win;
         }
        // ko.c8showMessage('success','添加成功！');
    };
    this.addProduct = function () {
        if (callBackAddProduct != null) {
            var result = base.gridModel3.datagrid("getSelections");
            callBackAddProduct(result);
            base.gridModel3.datagrid("clearChecked");
        }
    };

    this.remainAllNoScanProductsExport = function(){
        var rows = base.gridModel3.datagrid("getRows");
        if (rows == null || rows.length <= 0) {
            ko.c8showMessage('warn', '请选择单据');
            return;
        }
        var p = {};
        p.Parameters = ko.toJSON(rows);
        $.ajaxFileDownload({
            url: "/PostPrintOrder2/remainAllNoScanProductsExport",
            data: p,
            method: 'POST'
        });
    }

    this.showproductimg = function () {
        var list = $('.showimg');
        $.each(list, function (i, item) {
            $(item).poshytip({
                content: function (updateCallback) {
                    window.setTimeout(function () {
                        updateCallback("<img src='" + $(item).attr('imgurl') + "_290x290.jpg'>");
                    }, 500);
                    return 'Loading...<br />';
                },
                className: 'tip-yellowsimple',
                alignX: 'right',
                alignY: 'center',
                alignTo: 'target'
            })
        })
    }
}

