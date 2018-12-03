vm.Cartoon=vm.Cartoon || {};
vm.Cartoon.search = function (dataParameter) {
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
        columns: [[
            {field: 'ck', checkbox: true, sortable: true},
            {title: '标题', field: 'Title', width: 80, align: 'right'},
            {title: '图片', field: 'Pic', width: 80, align: 'right'},
            {title: '总张数', field: 'Pic', width: 80, align: 'right'},
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

    this.editWin = function () {
        var row = $(this.gridPaginationModel.grid).datagrid('getSelected');
        if (row) {
            loadWinEdit();
            winedit.editWin(row.RowId);
            winedit.Isload = false;
        }
    };
    this.ChangeEnabled = function () {

    };


    this.allFree = function () {
        var rows = $(base.gridPaginationModel.grid).datagrid('getChecked');
        if (rows == null || rows.length <= 0) {
            var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
            if (row) {
                rows = new Array();
                rows.push(row);
            }
        }
        if (rows == null || rows.length <= 0) {
            ko.c8showMessage('warn', '请选择单据!');
            return;
        }

        var arrayObj = new Array();
        for (var i = 0; i < rows.length; i++) {
            arrayObj.push(rows[i].RowId);
        }
        var Obj = {};
        Obj.Type = 1;
        Obj.RowIdList = arrayObj;
        ko.c8Ajax({
            type: "post",
            url: "/cartoondetail/addfree",
            async: true,
            data: ko.toJSON(Obj),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                $.closeProgress();
                if (result.Result) {
                    ko.c8showMessage('success', '操作成功');
                }
                else {
                    $.customerAlert(result.Message);
                }
            },
            error: function (e) {
                $.closeProgress();
                alert(e.responseText);
            },
            beforeSend: function () {
                $.alertProgress("修改快递中,请稍后...")
            },
            complete: function () {
                $.closeProgress();
            }
        });
    }
    this.modelInfo = {};

    var freeWin = new c8.c8Window({url: 'cartoon/partfree', isShowParent: true, model: this});
    this.partFreeWin = function () {
        this.modelInfo = {};
        this.modelInfo.RowId = 0;
        freeWin.c8SetFormModel({model: this.modelInfo});
        freeWin.openWin();
    }


    this.closeDialog = function () {
        freeWin.closeWin();
    }

    this.setpartFree=function () {
        var modelInfo = freeWin.c8GetFormModel();
        if (!modelInfo.part) {
            $.customerAlert('提前天数不能为空');
            return;
        }

        var rows = $(base.gridPaginationModel.grid).datagrid('getChecked');
        if (rows == null || rows.length <= 0) {
            var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
            if (row) {
                rows = new Array();
                rows.push(row);
            }
        }
        if (rows == null || rows.length <= 0) {
            ko.c8showMessage('warn', '请选择单据!');
            return;
        }

        var arrayObj = new Array();
        for (var i = 0; i < rows.length; i++) {
            if(rows[i].Total<modelInfo.part){
                ko.c8showMessage('warn',rows[i].Title+"的免费数不能大于总章节数" );
            }
            arrayObj.push(rows[i].RowId);
        }



        var Obj = {};
        Obj.Type = 2;
        Obj.RowIdList = arrayObj;
        Obj.Start=modelInfo.part;
        ko.c8Ajax({
            type: "post",
            url: "/cartoondetail/addfree",
            async: true,
            data: ko.toJSON(Obj),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                $.closeProgress();
                if (result.Result) {
                    ko.c8showMessage('success', '操作成功');
                }
                else {
                    $.customerAlert(result.Message);
                }
            },
            error: function (e) {
                $.closeProgress();
                alert(e.responseText);
            },
            beforeSend: function () {
                $.alertProgress("修改快递中,请稍后...")
            },
            complete: function () {
                $.closeProgress();
            }
        });
    }
}

var opModel = new vm.Cartoon.search();
ko.bindingViewModel(opModel);
$(function () {
    opModel.setFormValidate();
    ko.c8LoadControl();
});
