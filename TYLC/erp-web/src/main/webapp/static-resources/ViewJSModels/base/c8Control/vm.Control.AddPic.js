/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.AddPic = function (griddataParameter) {
    var base = this;
    this.winUrl = "/BusinessControl/AddPic";
    this.OperatorGroupRowId = null;
    this.c8winId=null;
    this.c8win=null;
    this.setWinId=function(winid){
        base.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageSelectProductSkuByPQP";
    this.griddataParameter.toolbar = ".tbSelectProductSku";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addProductClose();
    }
    this.griddataParameter.dataoptions = {remoteSort: false,
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true, sortable: true},
                {title: '规格代码', field: 'Code', width: 120, align: 'left', sortable: true},
                {title: '规格名称', field: 'Name', width: 300, align: 'left', sortable: true}
            ]
        ], singleSelect: true, onDblClickRow: this.f_DblClickRow
    };
    this.gridModel = new c8Grid(this.griddataParameter);
    this.searchClick = function () {
        base.gridModel.pSearch({ProductRowId: base.ProductRowId});
    };
    this.ProductRowId = null;
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddProduct = parameter.callback;
    };
    var callBackAddProduct = null;
    this.addProduct = function () {
        if (callBackAddProduct != null) {
            var result = base.gridModel.datagrid("getSelections");
            if(result.length==0){
                return;
            }
            if(result.length>0&&result[0].IsEnabled!=1){
                ko.c8showMessage('warn', '商品'+result[0].Code+'已停用!');
                return;
            }
            callBackAddProduct(result);
            base.gridModel.datagrid("clearChecked");
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();
            // delete  base.c8win;
        }
    };
    this.addProductClose = function () {
        base.addProduct();
    };
    this.setFormValidate = function () {
        $('.default-checkbox').threeStateCheckbox();
    }
    this.setWin=function (win) {
        base.c8win=win;
    }


    this.importproductData=function () {
        var data = {};
        $.ajaxFileUpload({
            url: '/File/ImportFile?randomNum=' + Math.random(), //用于文件上传的服务器端请求地址
            secureuri: false, //是否需要安全协议，一般设置为false
            fileElement: base.c8win.c8GetElementListBySelector('#ImportExcelFile'),
            data: data,//ko.toJSON(data),
            dataType: 'json', //返回值类型 一般设置为json
            success: function (data, status)  //服务器成功响应处理函数
            {
                callBackAddProduct(data);
                base.c8win.closeWin();
                if (data.Result) {
                    ko.c8showMessage('success', '操作成功!');
                } else {
                    $.customerAlert('保存失败' + data.Message);
                    // importFlagWin.c8messager().alert('提示', '保存失败' + data.StringErrMsg);
                }
            },
            error: function (data, status, e)//服务器响应失败处理函数
            {
                $.customerAlert('保存失败' + e);
            },
            beforeUpload: function () {
                var isValid = base.c8win.validate();
                return isValid;
            }
        });
    }
}
