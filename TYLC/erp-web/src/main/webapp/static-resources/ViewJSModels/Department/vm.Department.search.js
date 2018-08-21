vm.Department = vm.Department || {};
vm.Department.search = function (dataParameter) {
    var base = this;
    // this.form =  ko.mapping.fromJS(dataParameter.form);
    //delete this.form.__ko_mapping__;
    var griddataParameter = {};
    griddataParameter.pageUrl = "/Department/getpage";
    griddataParameter.countUrl = "/Department/getcount";
    griddataParameter.form = {};//this.form;

    griddataParameter.dataoptions = {
        onSelect: function (rowIndex, rowData) {
            if (!rowData) {
                return;
            }
            if (rowData.IsEnabled == 1) {
                $('#ChangeEnabled').linkbutton({text: '停用'});
                $('#btnedit').linkbutton('enable');
            } else {
                $('#ChangeEnabled').linkbutton({text: '启用'});
                $('#btnedit').linkbutton('disable');
            }
        }, columns: [
            [
                {title: '部门代码', field: 'Code', width: 130, align: 'right'},
                {title: '部门名称', field: 'Name', width: 130, align: 'right'},

                {title: '公司名称', field: 'CompanyName', width: 200, align: 'right'},


                {
                    title: '状态',
                    field: 'IsEnabled',
                    width: 40,
                    align: 'right',
                    formatter: function (value, row, index) {
                        if (row.IsEnabled) {
                            return "启用";
                        } else {
                            return "停用";
                        }
                    }
                },

                {title: '显示顺序', field: 'DisplayNum', width: 80, align: 'right'},

                {title: '创建时间', field: 'CreateDate', width: 130, align: 'right'},

                {title: '创建人', field: 'Creater', width: 80, align: 'right'},

                {title: '部门负责人', field: 'Leader', width: 80, align: 'right'},
                {title: '备注', field: 'Remark', width: 200, align: 'right'}

            ]
        ]
    };
    this.gridPaginationModel = new c8GridPaginationModel(griddataParameter);
    this.searchClick = function () {
        this.gridPaginationModel.pSearch();
    };
    this.modelInfo = {};
    var addUrl = "/Department/save";
    var deleteUrl = "Department/delete";
    var getUrl = "/Department/get";
    var getGridRowUrl = "/Department/GetGridRow";
    var editView = "/Department/edit?rrere";
    var win = new c8.c8Window({url: editView, isShowParent: true, model: this});
    this.addWin = function () {
        this.modelInfo = {};
        this.modelInfo.RowId = 0;
        this.modelInfo.IsEnabled = true;
        win.c8SetFormModel({model: this.modelInfo});
        win.openWin();
    };
    this.editWin = function () {
        var row= $(base.gridPaginationModel.grid).datagrid('getSelected');
        if (!row) {
            $.alert("请选择行");
            return;
        }
        if (row) {
            this.modelInfo = this.getModel(row.RowId);
            win.c8SetFormModel({model: this.modelInfo});
            win.openWin();
        }
    }
    this.deleteWin = function () {
        var row = $(this.gridPaginationModel.grid).datagrid('getSelected');
        if (!row) {
            $.alert("请选择行");
            return;
        }
        $.messager.confirm('系统提示', '您确定要删除吗?', function (r) {
            if (!r)return;
            var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
            ko.c8Ajax({
                type: "get",
                url: deleteUrl + "?RowId=" + row.RowId,
                async: true,
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    $.messager.progress('close');
                    base.deleteRow(data.o);
                },
                error: function (e) {
                    $.messager.progress('close');	// 如果提交成功则隐藏进度条
                    alert(e.responseText);
                    // self.message(e.responseText);
                },
                beforeSend: function () {
                    $.messager.progress();
                },
                complete: function () {
                    $.messager.progress('close');	// 如果提交成功则隐藏进度条
                }
            });
        });

    }
    this.updateRow = function (RowId) {
        var info = this.getGridRow(RowId);
        this.gridPaginationModel.updateRow(info);
    };
    this.deleteRow = function () {
        this.gridPaginationModel.deleteRow();
    };
    this.insertRow = function (RowId) {
        var info = this.getGridRow(RowId);
        this.gridPaginationModel.insertRow(info);
    };


    this.getGridRow = function (RowId) {
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: getGridRowUrl + '?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    }
    this.getModel = function (RowId) {
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: getUrl + '?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;

            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    }
    this.saveModel = function () {
        var modelInfo = win.c8GetFormModel();
        ko.c8Ajax({
            type: "POST",
            url: addUrl,
            async: true,
            data: ko.toJSON(modelInfo),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                win.closeWin();
                if (modelInfo.RowId == 0) {
                    base.insertRow(data.o);
                }
                else {
                    base.updateRow(data.o);

                }
            },
            error: function (e) {
                // 如果提交成功则隐藏进度条
                alert(e.responseText);
            },
            beforeSend: function () {
                win.openProgress();
                var isValid = win.validate();
                if (!isValid) {
                    win.closeProgress();	// 如果表单是无效的则隐藏进度条
                }
                return isValid;
            },
            complete: function () {
                win.closeProgress();	// 如果提交成功则隐藏进度条
            }
        });
    }
    this.closeDialog = function () {
        win.closeWin();
    }
    this.setFormValidate = function () {
        base.searchClick();

    };
    this.ChangeEnabled = function () {
        var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
        var msg = row.IsEnabled == 1 ? '停用' : '启用';
        $.messager.confirm('提示', '您确定要' + msg + '?', function (r) {
            if (!r)return;
            ko.c8Ajax({
                type: "get",
                url: "/Department/ChangeEnabled?RowId=" + row.RowId,
                async: true,
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    $.messager.progress('close');
                    $.messager.alert('提示', msg + '成功');
                    row.IsEnabled = row.IsEnabled == 1 ? 0 : 1;
                    base.gridPaginationModel.updateRow(row);
                },
                error: function (e) {
                    $.messager.progress('close');	// 如果提交成功则隐藏进度条
                    alert(e.responseText);
                    // self.message(e.responseText);
                },
                beforeSend: function () {
                    $.messager.progress();
                },
                complete: function () {
                    $.messager.progress('close');	// 如果提交成功则隐藏进度条
                }
            });
        });
    }
};
var opModel = new vm.Department.search();
ko.bindingViewModel(opModel);
$(function () {
    opModel.setFormValidate();
    ko.c8LoadControl();

});

