vm.CartoonDetail=vm.CartoonDetail || {};
vm.CartoonDetail.search = function (dataParameter){
    var base = this;
    var griddataParameter = {};
    griddataParameter.pageUrl = "/CartoonDetail/getpage";
    griddataParameter.countUrl = "/CartoonDetail/getcount";
    griddataParameter.form = {};//this.form;
    griddataParameter.dataoptions = {
        onSelect: function (rowIndex, rowData) {
            base.f_onSelect(rowIndex, rowData);
        },
        remoteSort: false,
        singleSelect: true,
        checkOnSelect: false,
        selectOnCheck: false,
        columns: [[{title: '标题', field: 'Title', width: 100, align: 'right'},
            {title: '图片', field: 'Pic', width: 100, align: 'right'},
            {title: '排序', field: 'Sort', width: 100, align: 'right'},
            {title: '价格', field: 'Cost', width: 100, align: 'right'},
            {title: '创建人', field: 'Creater', width: 100, align: 'right'},
            {title: '描述', field: 'Des', width: 300, align: 'right'},
            {title: '创建时间', field: 'CreateTime', width: 130, align: 'right'},

         ]]
    };
    this.gridPaginationModel = new c8GridPaginationModel(griddataParameter);
    this.searchClick = function () {
        this.gridPaginationModel.pSearch();
    };
    this.setFormValidate = function () {
        base.searchClick();

    };

    var winedit = null;

    var loadWinEdit = function () {
        if (!winedit) {
            winedit = new vm.CartoonDetail.edit();
            winedit.ParentModel = base;
        }
    }

    this.addWin = function () {
        loadWinEdit();
        winedit.openWin();
    };

    this.editWin=function () {
        var row = $(this.gridPaginationModel.grid).datagrid('getSelected');
        if (row) {
            loadWinEdit();
            winedit.editWin(row.RowId);
            winedit.Isload = false;
        }
    };
    this.ChangeEnabled=function () {
        
    }
};

var opModel = new vm.CartoonDetail.search();
ko.bindingViewModel(opModel);
$(function () {
    opModel.setFormValidate();
    ko.c8LoadControl();
});
