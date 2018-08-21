vm.Cartoon=vm.Cartoon || {};
vm.Cartoon.search = function (dataParameter){
    var base = this;
    var griddataParameter = {};
    griddataParameter.pageUrl = "/Employee/getpage";
    griddataParameter.countUrl = "/Employee/getcount";
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
            {
                title: '状态', field: 'IsEnabled', width: 80, align: 'right', formatter: function (value, row, index) {
                    if (row.IsEnabled) {
                        return "启用";
                    } else {
                        return "停用";
                    }
                }
            },
            {
                title: '性别', field: 'Sex', width: 80, align: 'right', formatter: function (value, row, index) {
                    if (row.Sex == 1) {
                        return "男";
                    } else {
                        return "女";
                    }
                }
            },
            {title: '部门名称', field: 'DepartmentName', width: 80, align: 'right'},
            {title: '角色', field: 'RoleName', width: 80, align: 'right'},
            {title: '供应商权限', field: 'SupplierName', width: 120, align: 'right'},
            {title: '上级主管', field: 'Leader', width: 80, align: 'right'},
            {title: '入职时间', field: 'EmployeDate', width: 130, align: 'right'},
            {
                title: '是否离职', field: 'IsleaveOffice', width: 80, align: 'right'
                , formatter: function (value, row, index) {
                    if (row.IsleaveOffice) {
                        return "是";
                    } else {
                        return "否";
                    }
                }
            },
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
};

var opModel = new vm.Cartoon.search();
ko.bindingViewModel(opModel);
$(function () {
    opModel.setFormValidate();
    ko.c8LoadControl();
});
