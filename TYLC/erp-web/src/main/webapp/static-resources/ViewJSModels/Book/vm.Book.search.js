vm.Book = vm.Book || {};
vm.Book.search = function (dataParameter) {
    var base = this;
    var griddataParameter = {};
    griddataParameter.pageUrl = "/Book/getpage";
    griddataParameter.countUrl = "/Book/getcount";
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
            {title: '标题', field: 'Title', width: 80, align: 'left'},
            {title: '图片', field: 'Pic', width: 80, align: 'left'},
            {
                title: '免费', field: 'FreeStatus', width: 80, align: 'left',
                formatter: function (value, row, index) {
                    if (value == -1) {
                        return "全免";
                    } else {
                        return "前" + value + "章节免费";
                    }
                }
            },
            {title: '总章数', field: 'AllCount', width: 80, align: 'left'},
            {title: '最新章节排序', field: 'LastChapterSort', width: 80, align: 'left'},
            {title: '作者', field: 'Author', width: 80, align: 'left'},
            {title: '描述', field: 'Des', width: 300, align: 'left'},
            {
                title: '性别', field: 'Sex', width: 80, align: 'left',
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return "男";
                    } else if (value == 2) {
                        return "女";
                    } else {
                        return "不限";
                    }
                }
            },
            {title: '类型', field: 'Type', width: 100, align: 'left'},
            {title: '阅读数', field: 'VisitCount', width: 100, align: 'left'},
            {title: '创建时间', field: 'CreateDate', width: 130, align: 'left'}
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
            winedit = new vm.Book.edit();
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
            url: "/bookdetail/addfree",
            async: true,
            data: ko.toJSON(Obj),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                $.closeProgress();
                base.searchClick();
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

    var freeWin = new c8.c8Window({url: 'Book/partfree', isShowParent: true, model: this});
    this.partFreeWin = function () {
        this.modelInfo = {};
        this.modelInfo.RowId = 0;
        freeWin.c8SetFormModel({model: this.modelInfo});
        freeWin.openWin();
    }


    var setCost = new c8.c8Window({url: 'Book/cost', isShowParent: true, model: this});
    this.setCost = function () {
        this.modelInfo = {};
        this.modelInfo.RowId = 0;
        setCost.c8SetFormModel({model: this.modelInfo});
        setCost.openWin();
    }

    var adddetail = new c8.c8Window({url: 'book/adddetail', isShowParent: true, model: this});
    this.addBookDetail = function () {
        var row = $(base.gridPaginationModel.grid).datagrid('getSelected');
        var BookRowId = 0;
        var LastChapterSort = 0;
        if (row) {
            BookRowId = row.RowId;
            LastChapterSort = parseInt(row.LastChapterSort);
        } else {
            ko.c8showMessage('warn', '请选择单据!');
            return;
        }
        if (LastChapterSort > 0) {
            LastChapterSort = LastChapterSort + 1;
        }
        this.modelInfo = {};
        this.modelInfo.BookRowId = BookRowId;
        this.modelInfo.Sort = LastChapterSort;
        adddetail.c8SetFormModel({model: this.modelInfo});
        adddetail.openWin();
    }

    this.saveDetailModel = function () {
        var modelInfo = adddetail.c8GetFormModel();
        ko.c8Ajax({
            type: "post",
            url: "/book/adddetail",
            async: true,
            data: ko.toJSON(modelInfo),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                $.closeProgress();
                base.searchClick();
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


    this.closeDialog = function () {
        freeWin.closeWin();
        adddetail.closeWin();
        setCost.closeWin();
    }

    this.setpartFree = function () {
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
            if (rows[i].Total < modelInfo.part) {
                ko.c8showMessage('warn', rows[i].Title + "的免费数不能大于总章节数");
            }
            arrayObj.push(rows[i].RowId);
        }


        var Obj = {};
        Obj.Type = 2;
        Obj.RowIdList = arrayObj;
        Obj.Start = modelInfo.part;
        ko.c8Ajax({
            type: "post",
            url: "/bookdetail/addfree",
            async: true,
            data: ko.toJSON(Obj),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                $.closeProgress();
                base.searchClick();
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

    this.saveCost = function () {
        var modelInfo = setCost.c8GetFormModel();
        if (!modelInfo.cost) {
            $.customerAlert('提前天数不能为空');
            return;
        }
        if (modelInfo.cost == 0) {
            $.customerAlert('价格不能为零');
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
            arrayObj.push(rows[i].RowId);
        }


        var Obj = {};
        Obj.RowIdList = arrayObj;
        Obj.Cost = modelInfo.cost;
        ko.c8Ajax({
            type: "post",
            url: "/bookdetail/saveCost",
            async: true,
            data: ko.toJSON(Obj),
            dataType: "json",
            contentType: "application/json",
            success: function (result) {
                $.closeProgress();
                base.searchClick();
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

var opModel = new vm.Book.search();
ko.bindingViewModel(opModel);
$(function () {
    opModel.setFormValidate();
    ko.c8LoadControl();
});
