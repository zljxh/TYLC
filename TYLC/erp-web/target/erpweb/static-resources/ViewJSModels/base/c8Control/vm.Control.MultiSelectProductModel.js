/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.MultiSelectProductModel = function (griddataParameter) {
    var base = this;
    this.c8winId = null;
    this.setWinId = function (winid) {
        this.c8winId = winid;
        base.gridModel.c8winId = this.c8winId;
    }
    this.winUrl = "/BusinessControl/MultiSelectProduct";
    this.OperatorGroupRowId = null;
    var base = this;
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    this.griddataParameter.pageUrl = "/BusinessControl/GetPageMultiSelectProductByPQP";
    this.griddataParameter.countUrl = "/BusinessControl/GetCountMultiSelectProductByPQP";
    this.griddataParameter.toolbar = ".tbMultiSelectProduct";
    var f_onRowContextMenu = function (e, rowIndex, rowData) {
        e.preventDefault();
        base.gridModel.datagrid("selectRow", rowIndex);
        //model,context,selector
        base.gridModel.getWindowContext().ko.c8BindingViewModel(base, base.gridModel.c8GetElementsBySelector('#tbMultiSelectProductMenu'));
        base.gridModel.c8GetElementsBySelector('#tbMultiSelectProductMenu').menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    }
    var hideRowContextMenu = function () {
        base.gridModel.c8GetElementsBySelector('#tbMultiSelectProductMenu').menu('hide');
    }
    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addProductClose(rowData);
    }
    this.griddataParameter.dataoptions = {
        remoteSort: false,
        columns: [
            [
                {title: '选择', field: 'ck', checkbox: true, sortable: true},
                {title: '商品简称', field: 'ProductShortName', width: 120, align: 'left', sortable: true},
                {title: '商品代码', field: 'ProductCode', width: 120, align: 'left', sortable: true},
                {title: '商品名称', field: 'ProductName', width: 120, align: 'left', sortable: true},
                {title: '规格代码', field: 'ProductSkuCode', width: 120, align: 'left', sortable: true},
                {title: '规格名称', field: 'ProductSkuName', width: 120, align: 'left', sortable: true},
                {title: '厂家货号', field: 'FactoryCode', width: 120, align: 'left', sortable: true},
                {title: '库存', field: 'InventoryQuantity', width: 120, align: 'left', sortable: true},
                {title: '可用库存', field: 'KYQuantity', width: 120, align: 'left', sortable: true},
                {
                    title: '是否赠品',
                    field: 'IsGift',
                    width: 100,
                    align: 'right',
                    hidden: true
                },
                {
                    title: '图片', field: 'PicturePath1', width: 50, align: 'right', hidden: true
                },
                {
                    title: '组合', field: 'IsCombin', width: 60, align: 'left', sortable: true,
                    formatter: function (value, row, index) {
                        if (row.IsCombin == '1') {
                            return "<input type='checkbox'  onchange='this.checked=!this.checked;' readonly='readonly' checked='true' value='true'/>";
                        } else {
                            return "<input type='checkbox' onchange='this.checked=!this.checked;' readonly='readonly'    value='false'/>";
                        }
                    }
                }, {title: '厂家货号', field: 'FactoryCode', width: 120, align: 'left', sortable: true}
            ]
        ], singleSelect: false, onDblClickRow: this.f_DblClickRow, onRowContextMenu: f_onRowContextMenu
    };
    this.gridModel = new c8GridPaginationModel(this.griddataParameter);
    this.searchClick = function () {
        if (getData != null) {
            var data = getData();
            if (data == undefined) {
                return;
            }
            data.ProductCategoryRowId = ProductCategoryRowId;
            base.gridModel.pSearch(data);
        } else {
            base.gridModel.pSearch({ProductCategoryRowId: ProductCategoryRowId});
        }
    };
    var ProductCategoryRowId = null;
    this.treeoption = {
        url: 'BusinessControl/GetComboTreeProductCategory',
        onClick: function (node) {
            ProductCategoryRowId = node.id;
            base.searchClick();
        }
    };
    var callBackAddProduct = null;
    var getData = null;//function获取查询条件,返回一个object
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddProduct = parameter.callback;
        getData = parameter.getData;
    };
    this.addProduct = function (data) {
        var stopedProductSku='';
        var productLength = 0;
        if (callBackAddProduct != null) {
            var result = base.gridModel.datagrid("getSelections");
            if (result.length <= 0 && data != null) {
                result.push(data);
            }

            $.each(result, function(index, row) {
                if(row.IsStoped==1){
                    stopedProductSku=stopedProductSku+row.ProductSkuCode+",";
                }
            });

            if(stopedProductSku){
                stopedProductSku=stopedProductSku.substr(0,stopedProductSku.length-1);
                ko.c8showMessage('warn', '商品'+stopedProductSku+'已停用,添加失败!');
                return;
            }

            if(result.length>0 && result[0].ProductSkuCode){
                productLength = result.length;
                callBackAddProduct(result);
            }
            base.gridModel.datagrid("clearChecked");
        }
        hideRowContextMenu();
        if(!stopedProductSku){
            if(productLength>0)
                ko.c8showMessage('success', '添加成功！');
            else
                ko.c8showMessage('success', '未选择商品！');
        }
    };
    this.addProductClose = function (data) {
        base.addProduct(data);
        /*if (base.c8win) {
         base.c8win.c8CloseWin();
         hideRowContextMenu();
         // delete  base.c8win;
         }*/

    };
    this.setFormValidate = function () {
        $('.default-checkbox').threeStateCheckbox();
    }
}