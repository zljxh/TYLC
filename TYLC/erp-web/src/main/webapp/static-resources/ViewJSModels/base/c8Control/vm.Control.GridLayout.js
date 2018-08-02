/**
 * Created by xyyz150 on 2015/11/18.
 */
/**
 * Created by xyyz150 on 2014/11/17.
 */

vm.Control = vm.Control || {};
vm.Control.GridLayout = function (griddataParameter) {
    var base = this;
    var editIndex = -1;
    var formName = null;//页面名称
    var formColumns = [];//全部列
    var callBackLayout = null;
    this.winUrl = "/BusinessControl/getControlView?ControlName=GridLayout";
    this.c8winId = null;
    this.grid = null;

    this.getWindowContext = function () {
        //var windowContext = window.parent;
        var windowContext = window;
        return windowContext;
    }
    this.getContext = function () {
        return this.getWindowContext().$("#" + this.c8winId);
    }


    function endEditing() {
        if (editIndex == -1) {
            return true
        }
        if (base.grid.datagrid('validateRow', editIndex)) {
            base.grid.datagrid('endEdit', editIndex);
            editIndex = undefined;
            return true;
        } else {
            return false;
        }
    }

    this.InitData = function (winid) {
        base.c8winId = winid;
        var context = base.getContext();
        base.grid = base.getWindowContext().$('#layout-datagrid', context);
        base.grid.datagrid({
            singleSelect: true,
            //data: data,
            columns: [
                [
                    {title: '列名', field: 'ColName', width: 200, align: 'right'},
                    {
                        title: '固定列', field: 'IsFrozen', width: 80, align: 'center',
                        formatter: function (value, row, index) {
                            if (value == "1") {
                                return "<img src='/Content/css/icon/icon/bullet_tick.png'>";
                                //return "是";
                            } else {
                                return "<img src='/Content/css/icon/icon/bullet_cross.png'>";
                                //return "否";
                            }
                        }, editor: {type: 'checkbox', options: {on: '1', off: '0'}}
                    },
                    {
                        title: '显示', field: 'IsShow', width: 80, align: 'center',
                        formatter: function (value, row, index) {
                            if (value == "1") {
                                return "<img src='/Content/css/icon/icon/bullet_tick.png'>";
                            } else {
                                return "<img src='/Content/css/icon/icon/bullet_cross.png'>";
                            }
                        }, editor: {type: 'checkbox', options: {on: '1', off: '0'}}
                    },
                ]
            ],
            onClickRow: function (rowIndex, rowData) {
                if (endEditing()) {
                    base.getWindowContext().$(this).datagrid('selectRow', rowIndex)
                        .datagrid('beginEdit', rowIndex);
                    editIndex = rowIndex;
                } else {
                    base.getWindowContext().$(this).datagrid('selectRow', editIndex);
                }
            },
            onLoadSuccess: function () {
                //base.getWindowContext().$(this).datagrid('enableDnd');
            }
        });
        var jsonfrozendata = [];
        var jsoncolumdata = [];
        var layout = base.getData();
        if (layout == null || layout == undefined || layout == "") {
            columndata = formColumns;

        } else {
            if (layout.FrozenColumn != undefined && layout.FrozenColumn != "") {
                var strfrozendata = layout.FrozenColumn;
                jsonfrozendata = JSON.parse(strfrozendata);
            }
            if (layout.ComColumn != undefined && layout.ComColumn != "") {
                var strcolumdata = layout.ComColumn;
                jsoncolumdata = JSON.parse(strcolumdata);
            }
            var columndata = jsonfrozendata.concat(jsoncolumdata);
        }
        if (columndata == undefined || columndata.length == 0) {
            columndata = formColumns;
        }
        this.InitGrid(columndata);

    }

    this.InitGrid = function (columndata) {
        var data = {"total": columndata.length, "rows": columndata};
        base.grid.datagrid('loadData', data);
        base.grid.datagrid('enableDnd');
    }

    this.getData = function () {
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: '/BusinessControl/GetGridLayout?FormName=' + formName,
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

    this.f_DblClickRow = function (rowIndex, rowData) {
        base.addCallbackClose();
    }

    //设置回调函数
    this.setParameter = function (parameter) {
        callBackLayout = parameter.callback;
        var data = parameter.data;
        formName = data.formName;
        if (data.frozencolumns != undefined && data.frozencolumns.length > 0) {
            $.each(data.frozencolumns, function (i, item) {
                var obj = {};
                obj.ColName = item.title;
                obj.ColEn = item.field;
                obj.IsFrozen = 1;
                obj.IsShow = 1;
                formColumns.push(obj);
            })
        }
        if (data.cloumns != undefined && data.cloumns.length > 0) {
            $.each(data.cloumns, function (i, item) {
                var obj = {};
                obj.ColName = item.title;
                obj.ColEn = item.field;
                obj.IsFrozen = 0;
                obj.IsShow = 1;
                formColumns.push(obj);
            })
        }

    };

    this.addCallback = function () {
        if (editIndex > -1) {
            base.grid.datagrid("endEdit", editIndex);
        }
        var result = base.grid.datagrid("getRows");
        var obj = {};
        obj.FormName = formName;
        var forzens = [];
        var columns = [];
        $.each(result, function (i, item) {
            if (item.IsFrozen == 1) {
                forzens.push(item);
            } else {
                columns.push(item);
            }
        })
        obj.FrozenColumn = ko.toJSON(forzens);
        obj.ComColumn = ko.toJSON(columns);
        var callresult = this.saveData(ko.toJSON(obj));
        if (callresult.Result) {
            ko.c8showMessage('success', '保存成功');
        } else {
            ko.c8showMessage('error', callresult.Message);
        }
        //var json = ko.toJSON(result);
        //alert(JSON.stringify(json));
        if (callBackLayout != null) {
            callBackLayout(result);
        }
    };
    this.addCallbackClose = function () {
        base.addCallback();
        if (base.c8win) {
            base.c8win.c8CloseWin();
        }
    };

    this.resetClick = function () {
        this.InitGrid(formColumns);
    }

    this.saveData = function (data) {
        var result = null;
        ko.c8Ajax({
            type: "post",
            url: '/BSGridLayout/save',
            data: data,
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result;
    }
}
