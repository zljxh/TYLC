vm.Employee = vm.Employee || {};
vm.Employee.search = function (dataParameter) {
    var base = this;


    // this.form =  ko.mapping.fromJS(dataParameter.form);
    //delete this.form.__ko_mapping__;
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
    this.modelInfo = {};
    var addUrl = "/Employee/save";
    var deleteUrl = "Employee/delete";
    var getUrl = "/Employee/get";
    var getGridUrl = "/Employee/GetGridRow";
    var getGridRowUrl = "/Employee/GetGridRow";
    var editView = "/Employee/edit";
    var addWinFormUrl = "/Employee/add";
    var editOperatorRole = "/Operator/editOperatorRole";
    var addWinForm = new c8.c8Window({url: addWinFormUrl, isShowParent: true, c8IsBindEnter: true, model: this});
    var ediWinForm = new c8.c8Window({url: editView, isShowParent: true, c8IsBindEnter: true, model: this});

    this.addWinFun = function () {
        this.modelInfo = {};
        this.modelInfo["Sex"] = 1;
        this.modelInfo["IsleaveOffice"] = "false";
        this.modelInfo.RowId = 0;
        addWinForm.c8SetFormModel({model: this.modelInfo});
        addWinForm.openWin();
    };
    this.editWinFun = function () {
        var row = $(this.gridPaginationModel.grid).datagrid('getSelected');
        if (row) {
            this.modelInfo = this.getModel(row.RowId);
            ediWinForm.c8SetFormModel({model: this.modelInfo});
            ediWinForm.openWin();
        }
        else {
            if (!row) {
                $.alert("请选择行");
                return;
            }
        }
    }
    this.deleteWin = function () {
        var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
        if (!row) {
            $.alert("请选择行");
            return;
        }
        ko.messager.confirm('提示', '您确定要删除本条记录吗?', function (r) {

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
    this.EnabledWin = function () {
        var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
        if (!row) {
            $.alert("未选择行");
            return;
        }
        $.messager.confirm('系统提示', '您确定要启用该操作员吗?', function (r) {
            if (!r) return;
            SetEnabled(1);
        });
    }
    this.NotEnabledWin = function () {
        var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
        if (!row) {
            $.alert("未选择行");
            return;
        }
        $.messager.confirm('系统提示', '您确定要禁用该操作员吗?', function (r) {
            if (!r) return;
            SetEnabled(0);
        });
    }
    this.f_onSelect = function (rowIndex, rowData) {
        setButtonEnable(rowData);
    }
    var setButtonEnable = function (row) {
        if (!row) {
            row = base.gridPaginationModel.c8GetSelected();
        }
        var aList = {"启用": false, "禁用": false, "设置角色": false, "重置密码": false, "设置参数权限": false};
        if (row) {
            aList["启用"] = !row.IsEnabled;
            aList["禁用"] = row.IsEnabled;
            aList["设置角色"] = row.IsEnabled;
            aList["重置密码"] = row.IsEnabled;
            aList["设置参数权限"] = row.IsEnabled;
        }
        ko.c8SetEnable(aList);
    }
    var EnabledUrl = "/Operator/Enabled";
    var SetEnabled = function (IsEnabled) {
        var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
        var modelInfo = {RowId: row.RowId, IsEnabled: IsEnabled};
        ko.c8Ajax({
            type: "post",
            url: EnabledUrl + "?RowId=" + row.RowId,
            async: true,
            data: ko.toJSON(modelInfo),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $.messager.progress('close');
                if (data.Result) {
                    row.IsEnabled = IsEnabled;
                    base.gridPaginationModel.updateRow(row);
                    setButtonEnable(row);
                }
                else {
                    $.alert(data.Message);
                }
            },
            error: function (e) {
                $.messager.progress('close');	// 如果提交成功则隐藏进度条
                $.alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {
                $.messager.progress();
            },
            complete: function () {
                $.messager.progress('close');	// 如果提交成功则隐藏进度条
            }
        });
    }
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
            url: getGridUrl + '?RowId=' + RowId + "&randomid=" + Math.random(),
            //url: getUrl + '?RowId=' + RowId + "&randomid=" + Math.random(),
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
    this.saveOperatorAddModel = function () {
        var modelInfo = addWinForm.c8GetFormModel(); //contextWin.ko.c8GetFormModel({model:this.modelInfo});
        if($.trim(modelInfo.SupplierName) === ""){
            modelInfo.SupplierRowId = 0; //置默认0
        }
        ko.c8Ajax({
            type: "POST",
            url: addUrl,
            async: true,
            data: ko.toJSON(modelInfo),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                addWinForm.closeProgress();
                //contextWin.$('#dlg').dialog('close');
                addWinForm.closeWin();
                if (modelInfo.RowId == 0) {
                    base.insertRow(data.o);
                }
                else {
                    base.updateRow(data.o);
                }
                base.searchClick();
            },
            error: function (e) {
                addWinForm.closeProgress();	// 如果提交成功则隐藏进度条
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {
                addWinForm.openProgress();
                var isValid = addWinForm.validate(); //contextWin.$("#fm").form('validate');
                if (!isValid) {
                    addWinForm.closeProgress();	// 如果表单是无效的则隐藏进度条
                }
                return isValid;
            },
            complete: function () {
                addWinForm.closeProgress();	// 如果提交成功则隐藏进度条
            }
        });
    }
    this.saveOperatorEdiModel = function () {
        var modelInfo = ediWinForm.c8GetFormModel(); //contextWin.ko.c8GetFormModel({model:this.modelInfo});
        if($.trim(modelInfo.SupplierName) === ""){
            modelInfo.SupplierRowId = 0; //置默认0
        }
        ko.c8Ajax({
            type: "POST",
            url: addUrl,
            async: true,
            data: ko.toJSON(modelInfo),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                ediWinForm.closeProgress();
                //contextWin.$('#dlg').dialog('close');
                ediWinForm.closeWin();
                if (modelInfo.RowId == 0) {
                    base.insertRow(data.o);
                }
                else {
                    base.updateRow(data.o);
                }
                base.searchClick();
            },
            error: function (e) {
                ediWinForm.closeProgress();	// 如果提交成功则隐藏进度条
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {
                ediWinForm.openProgress();
                var isValid = ediWinForm.validate(); //contextWin.$("#fm").form('validate');
                if (!isValid) {
                    ediWinForm.closeProgress();	// 如果表单是无效的则隐藏进度条
                }
                return isValid;
            },
            complete: function () {
                ediWinForm.closeProgress();	// 如果提交成功则隐藏进度条
            }
        });
    }
    this.closeAddDialog = function () {
        addWinForm.closeWin();
    }
    this.closeEditDialog = function () {
        ediWinForm.closeWin();
    }
    this.setFormValidate = function () {
        $('.default-checkbox').threeStateCheckbox();
        $(".easyui-textbox").each(function (i, item) {
            $(item).textbox('textbox').keydown(function (e) {
                if (e.keyCode == 13) {
                    base.searchClick();
                }
            });
        })
    };








    var ResetPwdUrl = "/Operator/ResetPwd";
    this.ResetPwd = function () {
        var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
        if (!row) {
            $.alert("未选择行");
            return;
        }
        ko.c8Ajax({
            type: "post",
            url: ResetPwdUrl + "?RowId=" + row.RowId,
            async: true,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                $.messager.progress('close');
                $.messager.alert("提示", "密码重置为12345,登陆后请修改密码!");
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
    }
    this.setOperatorRole = function () {
        var row = base.gridPaginationModel.c8GetSelected();
        if (!row) {
            $.alert("未选择行!");
            return;
        }
        var operatorRoleModel = new editOperatorRoleModel({windowContext: window.parent});
        operatorRoleModel.OperatorRowId = row.RowId;
        var win = new c8.c8Window({url: editOperatorRole, isShowParent: true, model: operatorRoleModel});
        // operatorRoleModel.griddataParameter.searchConditionsSelector="#"+win.getWinId();
        win.c8OpenWin();
        //var context=win.c8GetElementListBySelector('.c8SearchConditions');
        //win.c8SetFormModel({model:operatorRoleModel,context:context});
        operatorRoleModel.searchClick({OperatorRowId: operatorRoleModel.OperatorRowId});
    };

    var editOperatorRoleModel = function (griddataParameter) {
        this.OperatorRowId = null;
        var base = this;

        function f_onRowContextMenu(e, rowIndex, rowData) {
            e.preventDefault();
            window.parent.$('#mmRole').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }

        this.griddataParameter = griddataParameter || {};
        this.griddataParameter.pageUrl = "/Operator/GetRolePage";
        this.griddataParameter.dataoptions = {
            columns: [
                [
                    {title: '角色', field: 'RoleName', width: 80, align: 'right'},
                    {title: '创建时间', field: 'CreateDate', width: 80, align: 'right'},
                    {title: '创建人', field: 'Creater', width: 80, align: 'right'}
                ]
            ], onRowContextMenu: f_onRowContextMenu
        };

        this.gridModel = new c8Grid(this.griddataParameter);
        this.grid = null;
        this.searchClick = function (data) {
            base.gridModel.pSearch(data);
        };
        var addRoleUrl = "/Operator/addRole";
        var addSaveUrl = "/Operator/saveRole";
        var getGridRowUrl = "/Operator/GetGridRowRole";
        var deleteUrl = "/Operator/deleteOperatorRole";
        var loadWin = function () {
            if (!win) {
                win = new c8.c8Window({url: addRoleUrl, isShowParent: true, model: {saveModel: base.saveModel}});
            }
        }
        var win = null;
        this.addWin = function () {
            loadWin();
            win.c8SetFormModel({});
            win.c8OpenWin();
        };
        this.deleteWin = function () {
            var row = base.gridModel.c8GetSelected();
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
                    base.gridModel.pLoaded();
                    alert(e.responseText);
                    // self.message(e.responseText);
                },
                beforeSend: function () {
                    // $.messager.progress();
                    base.gridModel.pLoading();
                },
                complete: function () {
                    //$.messager.progress('close');	// 如果提交成功则隐藏进度条
                    base.gridModel.pLoaded();
                }
            });
        }
        this.insertRow = function (RowId) {
            var info = this.getGridRow(RowId);
            this.gridModel.insertRow(info);
        };
        this.deleteRow = function () {
            this.gridModel.deleteRow();
        };
        this.getGridRow = function (RowId) {
            var result = null;
            ko.c8Ajax({
                type: "post",
                url: getGridRowUrl + '?RowId=' + RowId,
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
            modelInfo.OperatorRowId = base.OperatorRowId;
            ko.c8Ajax({
                type: "POST",
                url: addSaveUrl,
                async: true,
                data: ko.toJSON(modelInfo),
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    win.closeWin();
//                if(modelInfo.RowId==0)
//                {
                    base.insertRow(data.o);
//                }
//                else
//                {
//                    base.updateRow(data.o);
//                }
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
    }
    this.saveOperatorConfigModel = function () {
        var modelInfo = winOperatorConfig.c8GetFormModel();
        ko.c8Ajax({
            type: "POST",
            url: '/OperatorConfigRole/save',
            async: true,
            data: ko.toJSON(modelInfo),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                if (data.Result) {
                    winOperatorConfig.closeWin();
                }
                else {
                    winOperatorConfig.alert(data.Message);
                }
            },
            error: function (e) {
                winOperatorConfig.closeProgress();	// 如果提交成功则隐藏进度条
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {
                winOperatorConfig.openProgress();
                var isValid = winOperatorConfig.validate(); //contextWin.$("#fm").form('validate');
                if (!isValid) {
                    winOperatorConfig.closeProgress();	// 如果表单是无效的则隐藏进度条
                }
                return isValid;
            },
            complete: function () {
                winOperatorConfig.closeProgress();	// 如果提交成功则隐藏进度条
            }
        });
    };
    this.closeOperatorConfigDialog = function () {
        winOperatorConfig.closeWin();
    };


    var addSupplier = function (data) {
        base.modelInfo = ediWinForm.c8GetFormModel({model: base.modelInfo});
        base.modelInfo.SupplierRowId = data[0].RowId;
        base.modelInfo.SupplierName = data[0].Name;
        ediWinForm.c8SetFormModel({model: base.modelInfo});

        base.modelInfo = addWinForm.c8GetFormModel({model: base.modelInfo});
        base.modelInfo.SupplierRowId = data[0].RowId;
        base.modelInfo.SupplierName = data[0].Name;
        addWinForm.c8SetFormModel({model: base.modelInfo});

    }

    this.c8SelectVipTextOption = {callback: addSupplier};

};
var opModel = new vm.Employee.search();

$(function () {
    ko.c8BindingViewModel(opModel);
    opModel.setFormValidate();
    ko.c8LoadControl();
    ko.c8LoadSelect2Control();
    opModel.searchClick();
});

vm.Employee.RoleTakeGoodRoad = function () {
    var editTakeGoodRoad = "/Role/setTakeGoodRoad";
    var saveRoleTakeGoodRoadUrl = "/Role/SaveTakeGoodRoadEmployee";
    var base = this;
    var winRoleTakeGoodRoad = null;
    var loadWin = function () {
        if (!winRoleTakeGoodRoad) {
            winRoleTakeGoodRoad = new c8.c8Window({url: editTakeGoodRoad, isShowParent: true, model: base});
        }
    }
    var row = null;
    this.openWin = function (_row) {
        row = _row;
        loadWin();
        var rowId = row.RowId;
        winRoleTakeGoodRoad.openWin();
        //  winRoleTakeGoodRoad.c8GetElementListBySelector("#tt").tree({"cascadeCheck":false});
        winRoleTakeGoodRoad.c8GetElementListBySelector("#gg").tree({
            url: '/Role/getTakeGoodRoadByEmployeeRowIdList?RoleRowId=' + rowId
            , animate: true
            , checkbox: true
            , lines: true

        });

    };
    this.saveTakeGoodRoad = function () {
        var parameter = {};
        parameter.TakeGoodRoadRowIdList = [];
        parameter.RoleRowId = row.RowId;//cascadeCheck
        var nodes = winRoleTakeGoodRoad.c8GetElementListBySelector("#gg").tree('getChecked', ['checked', 'indeterminate']);
        for (var i = 0; i < nodes.length; i++) {
            parameter.TakeGoodRoadRowIdList.push(nodes[i].id);
        }
        ko.c8Ajax({
            type: "POST",
            url: saveRoleTakeGoodRoadUrl,
            async: true,
            data: ko.toJSON(parameter),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                winRoleTakeGoodRoad.closeWin();
            },
            error: function (e) {
                winRoleTakeGoodRoad.closeProgress();	// 如果提交成功则隐藏进度条
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {
                winRoleTakeGoodRoad.openProgress();
                //var isValid = winRoleTakeGoodRoad.validate(); //contextWin.$("#fm").form('validate');
                //if (!isValid) {
                //    winRoleTakeGoodRoad.closeProgress();	// 如果表单是无效的则隐藏进度条
                //}
                return true;
            },
            complete: function () {
                winRoleTakeGoodRoad.closeProgress();	// 如果提交成功则隐藏进度条
            }
        });
    }
}

