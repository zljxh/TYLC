vm.CartoonType = vm.CartoonType || {};
vm.CartoonType.search = function (dataParameter) {
    var base = this;
    var griddataParameter = {};
    griddataParameter.pageUrl = "/CartoonType/getpage";
    griddataParameter.countUrl = "/CartoonType/getcount";
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
        }, columns: [[

            {title: '年度名称', field: 'Name', width: 80, align: 'right'},
            {
                title: '状态', field: 'IsEnabled', width: 60, align: 'right', formatter: function (value, row, index) {
                if (row.IsEnabled) {
                    return "启用";
                } else {
                    return "停用";
                }
            }
            }
        ]]
    };
    this.gridPaginationModel = new c8GridPaginationModel(griddataParameter);
    this.searchClick = function () {
        this.gridPaginationModel.pSearch();
    };
    this.modelInfo = {};
    var addUrl = "/CartoonType/save";
    var deleteUrl = "/CartoonType/delete";
    var getUrl = "/CartoonType/get";
    var getGridRowUrl = "/CartoonType/GetGridRow";
    var editView = "/CartoonType/edit";
    var win = new c8.c8Window({url: editView, isShowParent: true, model: this});
    this.addWin = function () {
        this.modelInfo = {};
        this.modelInfo.IsEnabled = true;
        this.modelInfo.DisplayNum = 1;
        this.modelInfo.RowId = 0;
        win.c8SetFormModel({model: this.modelInfo});
        win.openWin();
    };
    this.editWin = function () {
        var row = $(this.gridPaginationModel.grid).datagrid('getSelected');


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
                win.closeProgress();	// 如果提交成功则隐藏进度条
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {
                win.openProgress();
                var isValid = win.validate(); //contextWin.$("#fm").form('validate');
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

    this.setFormValidate = function () {
        base.searchClick();

    };

    this.ChangeEnabled = function () {
        var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
        if (!row) {
            $.alert("请选择行");
            return;
        }
        var msg = row.IsEnabled == 1 ? '停用' : '启用';
        $.messager.confirm('提示', '您确定要' + msg + '?', function (r) {
            if (!r)return;
            ko.c8Ajax({
                type: "get",
                url: "/CartoonType/ChangeEnabled?RowId=" + row.RowId,
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

$(function () {
    var opModel = new vm.CartoonType.search();

    ko.c8LoadControl();
    ko.c8BindingViewModel(opModel);
    opModel.setFormValidate();

});

