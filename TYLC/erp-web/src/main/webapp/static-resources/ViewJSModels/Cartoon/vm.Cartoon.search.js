vm.Cartoon=vm.Cartoon || {};
vm.Cartoon.search = function (dataParameter){
    var base = this;
    var griddataParameter = {};
    griddataParameter.pageUrl = "/Cartoon/getpage";
    griddataParameter.countUrl = "/Cartoon/getcount";
    griddataParameter.form = {};//this.form;
    griddataParameter.dataoptions = {
        onSelect: function (rowIndex, rowData) {
            base.f_onSelect(rowIndex, rowData);
        },
        remoteSort: false,
        singleSelect: true,
        checkOnSelect: false,
        selectOnCheck: false,
        columns: [[{title: '标题', field: 'Title', width: 80, align: 'right'},
            {title: '图片', field: 'Pic', width: 80, align: 'right'},
            {title: '作者', field: 'Author', width: 80, align: 'right'},
            {title: '创建人', field: 'Creater', width: 80, align: 'right'},
            {title: '描述', field: 'Des', width: 300, align: 'right'},
            {title: '创建时间', field: 'CreateTime', width: 130, align: 'right'},
            {title: '更新时间', field: 'UpdateTime', width: 130, align: 'right'},
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
            winedit = new vm.Cartoon.edit();
            winedit.ParentModel = base;
        }
    }

    this.addWin = function () {
        loadWinEdit();
        winedit.openWin();
    };

    this.editWin=function () {
        
    };
    this.ChangeEnabled=function () {
        
    }
};

var opModel = new vm.Cartoon.search();
ko.bindingViewModel(opModel);
$(function () {
    opModel.setFormValidate();
    ko.c8LoadControl();
});
