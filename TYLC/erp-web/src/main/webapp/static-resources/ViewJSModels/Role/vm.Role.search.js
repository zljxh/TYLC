vm.Role = vm.Role || {};
vm.Role.search = function (dataParameter) {
    var base = this;
    var griddataParameter = {};
    griddataParameter.pageUrl = "/Role/getpage";
    griddataParameter.countUrl = "/Role/getcount";
    griddataParameter.form = {};//this.form;
    function f_onRowContextMenu(e, rowIndex, rowData) {
        e.preventDefault();
        $('#mm').menu('show', {
            left: e.pageX,
            top: e.pageY
        });
    }

    griddataParameter.dataoptions = {
        onSelect: function (rowIndex, rowData) {
            if (!rowData) {
                return;
            }
            if (rowData.IsEnabled == 1) {
                $('#ChangeEnabled').linkbutton({text: '停用'});
                $('#btnedit').linkbutton('enable');
                $('#btnsetrole').linkbutton('enable');
            } else {
                $('#ChangeEnabled').linkbutton({text: '启用'});
                $('#btnedit').linkbutton('disable');
                $('#btnsetrole').linkbutton('disable');
            }
        },
        columns: [[
           /* {title: '角色代码', field: 'Code', width: 80, align: 'right'},*/
            {title: '角色名称', field: 'Name', width: 80, align: 'right'},
            {
                title: '启用', field: 'IsEnabled', width: 80, align: 'right', formatter: function (value, row, index) {
                if (row.IsEnabled) {
                    return "启用";
                } else {
                    return "停用";
                }
            }
            },
            {title: '创建时间', field: 'CreateDate', width: 120, align: 'right'},
            {title: '创建人', field: 'Creater', width: 80, align: 'right'},
            {title: '显示顺序', field: 'DisplayNum', width: 80, align: 'right'},
            {title: '备注', field: 'Remark', width: 80, align: 'right'},
            {title: '拼音', field: 'Pinyin', width: 80, align: 'right'}
        ]], onRowContextMenu: f_onRowContextMenu
    };
    this.gridPaginationModel = new c8GridPaginationModel(griddataParameter);
    this.searchClick = function () {
        base.gridPaginationModel.pSearch();
    };
    this.modelInfo = {};
    var addUrl = "/Role/save";
    var deleteUrl = "Role/delete";
    var getUrl = "/Role/get";
    var getGridRowUrl = "/Role/GetGridRow";
    var editView = "/Role/edit";

    var saveRoleSystemResourceUrl = "/Role/SaveRoleSystemResource";
    var win = new c8.c8Window({url: editView, isShowParent: true, model: this});
    var winRolSystemResource = undefined;
    this.setRoleSystemResource = function (row) {
        var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
        if (!row) {
            $.alert("请选择行");
            return;
        }
        if (!winRolSystemResource) {
            winSysteemResource = new vm.Role.SystemResource();
        }
        winSysteemResource.openWin(row);
    }


    this.addWin = function () {
        this.modelInfo = {};
        this.modelInfo.IsEnabled = true;
        this.modelInfo.DisplayNum = 1;
        this.modelInfo.RowId = 0;
        this.Remark = "";
        win.c8SetFormModel({model: this.modelInfo});
        win.openWin();
    };
    this.editWin = function () {
        var row = $(this.gridPaginationModel.grid).datagrid('getSelected');
        if (row) {
            this.modelInfo = this.getModel(row.RowId);
            win.c8SetFormModel({model: this.modelInfo});
            win.openWin();
        }
        else {
            if (!row) {
                $.alert("请选择行");
                return;
            }
        }
    }
    this.deleteWin = function () {
        $.messager.confirm('系统提示', '您确定要删除本条记录吗?', function (r) {
            if (!r) return;
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
                if (modelInfo.RowId != 0) {

                    base.insertRow(data.o);
                    //base.searchClick();
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
        $(".easyui-textbox").each(function (i, item) {
            $(item).textbox('textbox').keydown(function (e) {
                if (e.keyCode == 13) {
                    base.searchClick();
                }
            });
        })
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
                url: "/Role/ChangeEnabled?RowId=" + row.RowId,
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
    var opModel = new vm.Role.search();
    ko.c8BindingViewModel(opModel);
    opModel.setFormValidate();
    opModel.searchClick();
});
vm.Role.SystemResource = function () {
    var editSystemResource = "/Role/RoleSystemResourceEdit";
    var saveRoleSystemResourceUrl = "/Role/SaveRoleSystemResource";
    var base = this;
    var winRolSystemResource = null;
    var loadWinRolSystemResource = function () {
        if (!winRolSystemResource) {
            winRolSystemResource = new c8.c8Window({url: editSystemResource, isShowParent: true, model: base});
        }
    }
    var row = null;
    this.openWin = function (_row) {
        row = _row;
        loadWinRolSystemResource();
        var rowId = row.RowId;
        winRolSystemResource.openWin();
        //  winRolSystemResource.c8GetElementListBySelector("#tt").tree({"cascadeCheck":false});
        winRolSystemResource.c8GetElementListBySelector("#tt").tree({
            url: '/Role/GetRoleSystemResourceAll?roleRowId=' + rowId
            , animate: true
            , checkbox: true
            , lines: true

        });
        //winRolSystemResource.c8GetElementListBySelector("#tt").tree({"cascadeCheck":true});
    };
    this.saveRoleSystemResource = function () {
        var parameter = {};
        parameter.AddSystemResourceList = [];
        //var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
        //if(!row) return;
        parameter.RoleRowId = row.RowId;//cascadeCheck
        var nodes = winRolSystemResource.c8GetElementListBySelector("#tt").tree('getChecked', ['checked', 'indeterminate']);
        for (var i = 0; i < nodes.length; i++) {
            parameter.AddSystemResourceList.push(nodes[i].id);
        }
        ko.c8Ajax({
            type: "POST",
            url: saveRoleSystemResourceUrl,
            async: true,
            data: ko.toJSON(parameter),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                winRolSystemResource.closeWin();
            },
            error: function (e) {
                winRolSystemResource.closeProgress();	// 如果提交成功则隐藏进度条
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {
                winRolSystemResource.openProgress();
                //var isValid = winRolSystemResource.validate(); //contextWin.$("#fm").form('validate');
                //if (!isValid) {
                //    winRolSystemResource.closeProgress();	// 如果表单是无效的则隐藏进度条
                //}
                return true;
            },
            complete: function () {
                winRolSystemResource.closeProgress();	// 如果提交成功则隐藏进度条
            }
        });
    }
}

