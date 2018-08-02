/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SelectProductModel = function (griddataParameter) {
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

    this.griddataParameter.dataoptions = {
        remoteSort: false,
        columns: [
            [   {title: '选择', field: 'ck', checkbox: true, sortable: true},
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
                    title: '图片', field: 'PicturePath1', width: 50, align: 'right',hidden: true},
                {
                    title: '组合', field: 'IsCombin', width: 60, align: 'left', sortable: true,
                    formatter: function (value, row, index) {
                        if (row.IsCombin == '1') {
                            return "<input type='checkbox'  onchange='this.checked=!this.checked;' readonly='readonly' checked='true' value='true'/>";
                        } else {
                            return "<input type='checkbox' onchange='this.checked=!this.checked;' readonly='readonly'    value='false'/>";
                        }
                    }
                }
            ]
        ], singleSelect: true
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
    this.addProduct = function () {
        if (callBackAddProduct != null) {
            var result = base.gridModel.datagrid("getSelected");
            if(!result){
                ko.c8showMessage('warn', '请选择商品!');
                return;
            }
            if(result.length==0){
                ko.c8showMessage('warn', '请选择商品!');
                return;
            }
            if(result.IsStoped==1){
                ko.c8showMessage('warn', '商品'+result.ProductSkuCode+'已停用!');
                return;
            }
            callBackAddProduct(result);
            ko.c8showMessage('success', '添加成功！');
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();
        }
    };
    this.setFormValidate = function () {
        $('.default-checkbox').threeStateCheckbox();
    }

    this.addProductClose = function (data) {
        base.addProduct();

    };
}