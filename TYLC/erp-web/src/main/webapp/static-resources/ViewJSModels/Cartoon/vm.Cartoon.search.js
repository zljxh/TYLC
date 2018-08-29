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
        columns: [[{title: '员工编号', field: 'Code', width: 80, align: 'right'},
            {title: '员工名称', field: 'Name', width: 80, align: 'right'},
            {title: '部门名称', field: 'DepartmentName', width: 80, align: 'right'},
            {title: '角色', field: 'RoleName', width: 80, align: 'right'},
            {title: '供应商权限', field: 'SupplierName', width: 120, align: 'right'},
            {title: '上级主管', field: 'Leader', width: 80, align: 'right'},
            {title: '入职时间', field: 'EmployeDate', width: 130, align: 'right'},
            {title: '手机', field: 'Mobile', width: 80, align: 'right'},
            {title: '座机', field: 'Phone', width: 80, align: 'right'},
            {title: '创建时间', field: 'CreateDate', width: 130, align: 'right'},
            {title: '创建人', field: 'Creater', width: 80, align: 'right'},
            {title: '备注', field: 'Remark', width: 80, align: 'right'}]]
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
