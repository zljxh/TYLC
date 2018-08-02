//pageUrl, countUrl, form
function c8GridPaginationModel(dataParameter) {
    this.c8type = "c8GridPagination";
    var gridBase = this;
    this.c8winId = null;
    //列布局
    this.getGridLayoutData = function (formName) {
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
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result;
    }

    var formatFormName = function () {
        var url = $.myBrowser() == 'IE' ? window.document.URL : window.document.baseURI;
        var index = url.lastIndexOf('/');
        var start = url.substr(index + 1);
        dataParameter.FormName = start + '_' + dataParameter.FormName;
    }

    //grid布局
    //dataParameter.IsFormLayout 是否允许设置布局
    //dataParameter.FormName 布局grid名称
    //dataParameter.FormLayoutCloumnFilterCallBack:  function(column[]) return column[] 过滤列，返回筛选过后的列
    var isformlayout=dataParameter.IsFormLayout;
    if(isformlayout==undefined)isformlayout=true;
    if(isformlayout) {
        var frozencolumns = [];
        var cloumns = [];
        if (dataParameter.dataoptions.frozenColumns != undefined) {
            frozencolumns = dataParameter.dataoptions.frozenColumns[0];
        }
        if (dataParameter.dataoptions.columns != undefined) {
            cloumns = dataParameter.dataoptions.columns[0];
        }
        var frozendata = [];
        var columndata = [];
        formatFormName();
        var layout = this.getGridLayoutData(dataParameter.FormName);
        if (layout == undefined || layout == "") {
            frozendata = frozencolumns;
            columndata = cloumns;
        } else {
            var allcolumns = frozencolumns.concat(cloumns);
            //固定列
            var strfrozendata = layout.FrozenColumn;
            var oldfrozendata = [];
            if (strfrozendata == undefined || strfrozendata == "" || strfrozendata.length == 0) {
                frozendata = frozencolumns;
            } else {
                oldfrozendata = JSON.parse(strfrozendata);
                $.each(oldfrozendata, function (i, item) {
                    if (item.IsShow == 0) {
                        return true;
                    }
                    $.each(allcolumns, function (index, indexitem) {
                        if (item.ColEn == indexitem.field) {
                            frozendata.push(indexitem);
                            return false;
                        }
                    })
                });
            }
            //移出已分配的列
            $.each(frozendata, function (i, item) {
                var _index = -1;
                for (var index in allcolumns) {
                    if (allcolumns[index].field == item.field) {
                        _index = index;
                        break;
                    }
                }
                if (_index > -1) {
                    allcolumns.splice(_index, 1);
                }
            })
            //普通列
            var strcolumndata = layout.ComColumn;
            var oldcolumndata = [];
            if (strcolumndata == undefined || strcolumndata == "" || strcolumndata.length == 0) {
                columndata = cloumns;
            } else {
                oldcolumndata = JSON.parse(strcolumndata);
                $.each(oldcolumndata, function (i, item) {
                    if (item.IsShow == 0) {
                        return true;
                    }
                    for (var index in allcolumns) {
                        if (item.ColEn == allcolumns[index].field) {
                            columndata.push(allcolumns[index]);
                            break;
                        }
                    }
                });
            }
            //补上剩余的列
            var oldallcolumns = oldfrozendata.concat(oldcolumndata);
            if (oldallcolumns.length != allcolumns.length) {
                $.each(allcolumns, function (i, item) {
                    var isexist = $.c8help.c8ExistsObject(oldallcolumns, item, function (trg, obj) {
                        if (trg.field == obj.ColEn) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    if (!isexist) {
                        columndata.push(item);
                    }
                })
            }
        }
        var targetcolumns = [];
        var targetfrozencolumns = [];
        if(dataParameter.FormLayoutCloumnFilterCallBack) {
            var frozendatafilter = dataParameter.FormLayoutCloumnFilterCallBack(frozendata);
            targetfrozencolumns.push(frozendatafilter);
            var columndatafilter= dataParameter.FormLayoutCloumnFilterCallBack(columndata);
            targetcolumns.push(columndatafilter);
        }else{
            targetfrozencolumns.push(frozendata);
            targetcolumns.push(columndata);
        }
        dataParameter.dataoptions.frozenColumns = targetfrozencolumns;
        dataParameter.dataoptions.columns = targetcolumns;

        //加右键菜单
        var cmenu;
        this.headcontextmenu = function (e, rowIndex, rowData) {
            e.preventDefault();
            if (!cmenu) {
                createColumnMenu();
            }
            cmenu.menu('show', {
                left: e.pageX,
                top: e.pageY
            });
        }
        function createColumnMenu() {
            var modeWin = new vm.Control.GridLayout();
            var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
            modeWin.setParameter({data: gridBase.getColumnData()});
            cmenu = gridBase.getWindowContext().$('<div/>').appendTo(gridBase.getWindowContext().document.body);
            cmenu.menu({
                onClick: function (item) {
                    win.c8OpenWin();
                    modeWin.InitData(win.c8GetWinId());
                }
            });
            cmenu.menu('appendItem', {
                text: '设置布局',
                name: '设置布局',
                iconCls: 'icon-set1'
            });
        }

        dataParameter.dataoptions.onHeaderContextMenu = this.headcontextmenu;
    }

    /// <summary>表格分页模型</summary>
    /// <param name="pageUrl" type="String">获取指定分页Url</param>
    /// <param name="countUrl" type="String">获取数量Url</param>
    /// <param name="form" type="String">查询条件绑定模型</param>
    this.pageUrl = dataParameter.pageUrl;//"/api/OPUserApi/GetPage"
    this.countUrl = dataParameter.countUrl;//"/api/OPUserApi/GetCount"
    this.form = dataParameter.form;// ko.mapping.fromJS(dataParameter.form);
    this.windowContext = dataParameter.windowContext || window;
    this.selectorContext = dataParameter.selectorContext;

    this.dataParameter = dataParameter;
    if (!this.dataParameter["toolbar"]) {
        this.dataParameter["toolbar"] = "#tb";
    }
    if (!this.dataParameter["searchConditionsSelector"]) {
        this.dataParameter.searchConditionsSelector = this.dataParameter["toolbar"];
    }
    this.dataoptions = {
        autoRowHeight: false,
        rownumbers: true,
        nowrap: true,
        singleSelect: true,
        pagination: true,
        toolbar: this.dataParameter.toolbar,
        loadMsg: '数据努力加载中,请稍后......',
        striped: true
    }
    if (dataParameter.dataoptions) {
        for (var i in dataParameter.dataoptions) {
            this.dataoptions[i] = dataParameter.dataoptions[i];
        }
    }
    this.paginationoptions = {
        pageSize: 50,//每页显示的记录条数，默认为10
        pageList: [50, 100, 200],//可以设置每页记录条数的列表
        beforePageText: '第',//页数文本框前显示的汉字  
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',
        total: 0,
        onSelectPage: function (pageNumber, pageSize) {
            gridBase.pGetPage(pageNumber, pageSize);
        },
        onBeforeRefresh: function (pageNumber, pageSize) {

        },
        onRefresh: function (pageNumber, pageSize) {
        }
    };

    this.grid = null; //grid dom对象
    this.pagination = null;//分页 dom对象

    this.getColumnData = function () {
        var obj = {};
        obj.formName = dataParameter.FormName;
        obj.frozencolumns = frozencolumns;
        obj.cloumns = cloumns;
        return obj;
    }
};
c8GridPaginationModel.prototype.pSearch = function (data) {
    /// <summary>查询</summary>
    //var param = ko.toJS(this.form);
    this.form = this.getWindowContext().ko.c8GetFormModel({context: this.getWindowContext().$(this.dataParameter.searchConditionsSelector, this.getSelectorContext())});
    this.form = this.form || {};
    if (data) {
        for (var key in data) {
            this.form[key] = data[key];
        }
    }
    var delArr = new Array();
    for (var p in  this.form) {
        if (typeof(this.form[p]) == 'string') {
            this.form[p] = $.trim(this.form[p]);

        }
        if (this.form[p]  instanceof Array) {
            if (this.form[p].length == 1 && this.form[p][0] == "") {
                delArr.push(p);
            }
        }

    }
    for (var a in delArr) {
        this.form[delArr[a]] = undefined;
    }
    this.pGetCount();
    this.getWindowContext().$(this.pagination).pagination('select', 1);
};

c8GridPaginationModel.prototype.pSearchNoForm = function (data) {
    /// <summary>查询</summary>
    //var param = ko.toJS(this.form);
  //  this.form = this.getWindowContext().ko.c8GetFormModel({context: this.getWindowContext().$(this.dataParameter.searchConditionsSelector, this.getSelectorContext())});
    this.form =  {};
    if (data) {
        for (var key in data) {
            this.form[key] = data[key];
        }
    }
    var delArr = new Array();
    for (var p in  this.form) {
        if (typeof(this.form[p]) == 'string') {
            this.form[p] = $.trim(this.form[p]);

        }
        if (this.form[p]  instanceof Array) {
            if (this.form[p].length == 1 && this.form[p][0] == "") {
                delArr.push(p);
            }
        }

    }
    for (var a in delArr) {
        this.form[delArr[a]] = undefined;
    }
    this.pGetCount();
    this.getWindowContext().$(this.pagination).pagination('select', 1);
};


c8GridPaginationModel.prototype.pSearchParams = function (data) {
    /// <summary>查询</summary>
    //var param = ko.toJS(this.form);
    this.form = this.getWindowContext().ko.c8GetFormModel({context: this.getWindowContext().$(this.dataParameter.searchConditionsSelector, this.getSelectorContext())});
    this.form = this.form || {};
    if (data) {
        for (var key in data) {
            this.form[key] = data[key];
        }
    }
    var delArr = new Array();
    for (var p in  this.form) {
        if (typeof(this.form[p]) == 'string') {
            this.form[p] = $.trim(this.form[p]);

        }
        if (this.form[p]  instanceof Array) {
            if (this.form[p].length == 1 && this.form[p][0] == "") {
                delArr.push(p);
            }
        }

    }
    for (var a in delArr) {
        this.form[delArr[a]] = undefined;
    }
    return this.form;
};

c8GridPaginationModel.prototype.saveMenuContent = function () {
    var content = this.getWindowContext().ko.c8GetFormModel({context: this.getWindowContext().$(this.dataParameter.searchConditionsSelector, this.getSelectorContext())});
    var url = window.location.href;
    var json = ko.toJSON(content);
    var saveObj = {};
    saveObj.Content = json;
    saveObj.MenuName = url.substring(url.lastIndexOf('/') + 1, url.length);
    saveObj.MenuName = saveObj.MenuName.replace("#", "");
    ko.c8Ajax({
        type: "post",
        url: "/OperatorMenuDefaultQuery/save",
        async: true,
        data: ko.toJSON(saveObj),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            if (data.Result) {
                ko.c8showMessage('success', "保存成功");
            }
        },
        error: function (e) {

        },
        beforeSend: function () {

        },
        complete: function () {

        }
    });
}

c8GridPaginationModel.prototype.getMenuContent = function () {
    var content = $.fn.getMenuContent();
    if (content != null) {
        var gg = $.parseJSON(content.Content);
        ko.c8SetFormQueryModel({model: gg});
    }
}
c8GridPaginationModel.prototype.pLoading = function () {
    this.getWindowContext().$(this.grid).datagrid('loading');
};
c8GridPaginationModel.prototype.pLoaded = function () {
    this.getWindowContext().$(this.grid).datagrid('loaded');
};
c8GridPaginationModel.prototype.pLoadData = function (data) {
    if(this.pagination==null||this.grid==null)return;
    this.getWindowContext().$(this.grid).datagrid("uncheckAll");
    var total = this.pGetTotal();
    if (data instanceof Array) {
        if (data || data.length > 0) {
            if (total < data.length) {
                total = data.length;
            }
        }
        this.getWindowContext().$(this.grid).datagrid('loadData', {"total": total, "rows": data});
    } else {
        if (data.Rows || data.Rows.length > 0) {
            if (total < data.Rows.length) {
                total = data.Rows.length;
            }
        }
        this.getWindowContext().$(this.grid).datagrid('loadData', {
            "total": total,
            "rows": data.Rows,
            "footer": data.Footer
        });
    }
}
c8GridPaginationModel.prototype.pGetTotal = function () {
    if(this.pagination!=null) {
        return this.getWindowContext().$(this.pagination).pagination('options').total;
    }else{
        return 0;
    }
}
c8GridPaginationModel.prototype.pLoadPagination = function (data) {
    this.getWindowContext().$(this.pagination).pagination('refresh', data);	// 改变选项并刷新分页栏信息
};
c8GridPaginationModel.prototype.pGetCountByParameters = function (Parameters) {
    var base = this;
    var p = {};
    var count = 0;
    p.Parameters = Parameters;
    ko.c8Ajax({
        type: "POST",
        url: base.countUrl,
        async: false,
        data: ko.toJSON(p),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            count = parseInt(data);
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
    return count;
};
c8GridPaginationModel.prototype.pGetCount = function () {
    var base = this;
    var p = {};
    p.Parameters = this.form;
    ko.c8Ajax({
        type: "POST",
        url: base.countUrl,
        async: true,
        data: ko.toJSON(p),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            base.pLoadPagination({"total": parseInt(data)});
            //$(_pagination).pagination('refresh', {	// 改变选项并刷新分页栏信息
            //	"total": parseInt(data)
            //});
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
};
c8GridPaginationModel.prototype.getPageCallBack = null;
c8GridPaginationModel.prototype.pGetPage = function (PageIndex, PageRowCount) {
    var base = this;
    if (base.getPageCallBack) {
        base.getPageCallBack(function () {
            base._pGetPage(PageIndex, PageRowCount);
        });
    }
    else {
        base._pGetPage(PageIndex, PageRowCount);
    }
}
c8GridPaginationModel.prototype._pGetPage = function (PageIndex, PageRowCount) {
    var base = this;
    var p = {};
    p.Parameters = this.form;
    p["PageIndex"] = PageIndex;
    p["PageRowCount"] = PageRowCount;
    p["MinValue"] = 66;
    p["maxValue"] = 99;
    ko.c8Ajax({
        type: "POST",
        url: base.pageUrl,
        async: true,
        data: ko.toJSON(p),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            base.pLoaded();
            base.pLoadData(data);
            //$('.my-datagrid').datagrid('loadData', { "total": $(_pagination).pagination('options').total, "rows": data });
            //$('.my-datagrid').datagrid('loadData', { "total": 1000});
            // $(_pagination).pagination('refresh');
        },
        error: function (e) {

            base.pLoaded();
            alert(e.responseText);
            // self.message(e.responseText);
        },
        beforeSend: function () {
            base.pLoading();
            //$('#my-datagrid').datagrid('loading');
            // $(form).find("input").attr("disabled", true);
            // self.message("正在登陆处理，请稍候...");
        },
        complete: function () {
            base.pLoaded();
            //$('#my-datagrid').datagrid('loaded');
        }
    });
};

c8GridPaginationModel.prototype.updateRow = function (rowinfo, rowIndex) {
    if (rowinfo == null) return;
    if (rowIndex == undefined) {
        var row = this.getWindowContext().$(this.grid).datagrid('getSelected');
        rowIndex = this.getWindowContext().$(this.grid).datagrid('getRowIndex', row);
    }
    if (rowIndex < 0) return;
    this.getWindowContext().$(this.grid).datagrid('updateRow', {
        index: rowIndex,
        row: rowinfo
    });
};

c8GridPaginationModel.prototype.updateRowMultiSelected = function (rowinfo) {
    if (rowinfo == null) return;
    var rowIndex = this.getWindowContext().$(this.grid).datagrid('getRowIndex', rowinfo);
    if (rowIndex < 0) return;
    this.getWindowContext().$(this.grid).datagrid('updateRow', {
        index: rowIndex,
        row: rowinfo
    });
};

c8GridPaginationModel.prototype.getRowIndex = function (rowinfo) {
    if (rowinfo == null) return;
    var rowIndex = this.getWindowContext().$(this.grid).datagrid('getRowIndex', rowinfo);


    return rowIndex;
};


c8GridPaginationModel.prototype.insertRow = function (rowinfo, isAppend) {
    if (isAppend) {
        this.datagrid('appendRow', rowinfo);
    }
    else {
        this.datagrid('insertRow', {
            index: 0,	// 索引从0开始
            row: rowinfo
        });
        this.datagrid("selectRow", 0);
    }
};
c8GridPaginationModel.prototype.deleteRow = function (row, rowIndex) {
    if (rowIndex != undefined) {
        if (rowIndex >= 0) {
            this.getWindowContext().$(this.grid).datagrid('deleteRow', rowIndex);
            return;
        }
    }

    if (row == null) {
        var row = this.getWindowContext().$(this.grid).datagrid('getSelected');
    }
    if (!rowIndex) {
        rowIndex = this.getWindowContext().$(this.grid).datagrid('getRowIndex', row);
    }
    if (rowIndex < 0) return;
    this.getWindowContext().$(this.grid).datagrid('deleteRow', rowIndex);
};
c8GridPaginationModel.prototype.setWindowContext = function (wc) {
    this.dataParameter.windowContext = wc;
}
c8GridPaginationModel.prototype.getWindowContext = function () {
    var windowContext = this.dataParameter.windowContext || window;
    return windowContext;
}
c8GridPaginationModel.prototype.c8GetWindowContext = function () {
    return this.getWindowContext();
}
c8GridPaginationModel.prototype.c8GetElementsBySelector = function (selector) {
    return this.getWindowContext().$(selector);
}
c8GridPaginationModel.prototype.getSelectorContext = function () {
    var selectorContext = this.dataParameter.selectorContext;
    if (this.c8winId != null) {
        selectorContext = this.getWindowContext().$('#' + this.c8winId);
    }
    return selectorContext;
}
c8GridPaginationModel.prototype.c8GetSelected = function () {
    return this.getWindowContext().$(this.grid).datagrid('getSelected');
}
c8GridPaginationModel.prototype.datagrid = function (p1, p2, p3, p4, p5, p6, p7, p8) {
    return this.getWindowContext().$(this.grid).datagrid(p1, p2, p3, p4, p5, p6, p7, p8);
}
c8GridPaginationModel.prototype.c8GetRowByRowIndex = function (RowIndex) {
    if (RowIndex != null && RowIndex >= 0) {
        this.datagrid("unselectAll");
        this.datagrid("selectRow", RowIndex);
        return this.datagrid("getSelected");
    }
    return null;
};
c8GridPaginationModel.prototype.insertRowList = function (rowList, isAppend) {

    var IsSetTotal = false;
    if (this.pGetTotal() <= 0) {
        IsSetTotal = true;
    }
    var count = rowList.length;
    for (var i = 0; i < count; i++) {
        this.insertRow(rowList[i], isAppend);
    }
    //if (IsSetTotal) {
    //    this.getWindowContext().$(this.pagination).pagination('options').total=count;
    //}
};
c8GridPaginationModel.prototype.c8GetFieldArray = function (rowList) {
    var options = this.datagrid("options");
    var result = [];
    var clumns = options["columns"][0]
    var count = clumns.length;
    for (var i = 0; i < count; i++) {
        result.push(clumns[i]["field"]);
    }
    return result;
};
c8GridPaginationModel.prototype.c8BindGridEditorEvent = function (isEditingRowIndex, expression) {
    var base = this;
    var keyList = expression.split(/[=,+,-,*,/]/);
    var editObject = {};
    var count = keyList.length;
    for (var i = 0; i < count; i++) {
        editObject[keyList[i] + "Edit"] = base.datagrid('getEditor', {index: isEditingRowIndex, field: keyList[i]});            // 数量
    }
    try {
        for (var i = 1; i < count; i++) {
            var edit = editObject[keyList[i] + "Edit"];
            if (!edit)continue;
            base.getWindowContext().$(edit.target).numberbox("textbox").bind("keyup", function () {
                for (var i = 1; i < count; i++) {
                    if (!editObject[keyList[i] + "Edit"]) {
                        var row = base.c8GetSelected();
                        if (row) {
                            editObject[keyList[i]] = row[keyList[i]];
                        }
                    }
                    else {
                        editObject[keyList[i]] = base.getWindowContext().$(editObject[keyList[i] + "Edit"].target).numberbox("textbox").val();
                    }
                }       // 金额  值
                //实现表达式计算器
                if (expression.lastIndexOf("*") > 0) {
                    editObject[keyList[0]] = editObject[keyList[1]] * editObject[keyList[2]];
                }
                else if (expression.lastIndexOf("/") > 0) {
                    if (editObject[keyList[2]] != "0") {
                        editObject[keyList[0]] = editObject[keyList[1]] / editObject[keyList[2]];
                    }
                    else {
                        editObject[keyList[0]] = 0;
                    }
                }
                var edt = editObject[keyList[0] + "Edit"];
                if (edt) {
                    base.getWindowContext().$(edt.target).numberbox("setValue", editObject[keyList[0]]);    // 给 单价  赋值
                }
                else {
                    var row = base.c8GetSelected();
                    if (row) {
                        row[keyList[0]] = editObject[keyList[0]];
                    }
                }
            });
        }
    }
    catch (e) {
        alert(e);
    }
}
c8GridPaginationModel.prototype.c8GetChangeRows = function (deleteId) {
    var DetailList = [];
    var DeleteRowIdList = [];
    var resultdelete = this.datagrid('getChanges', 'deleted');
    $.each(resultdelete, function (i, item) {
        if (item[deleteId] && item[deleteId] != "0") {
            DeleteRowIdList.push(item[deleteId])
        }
    })
    var resultinsert = this.datagrid('getChanges', 'inserted');
    $.each(resultinsert, function (i, item) {
        DetailList.push(item);
    })
    var resultupdate = this.datagrid('getChanges', 'updated');
    $.each(resultupdate, function (i, item) {
        DetailList.push(item);
    })
    return {DetailList: DetailList, DeleteRowIdList: DeleteRowIdList};
};
c8GridPaginationModel.prototype.updateRowByFieldId = function (rowinfo) {
    var rowIndex = null;
    if (rowinfo == null) return;
    if (!rowIndex) {
        rowIndex = this.getWindowContext().$(this.grid).datagrid('getRowIndex', rowinfo);
    }
    if (rowIndex < 0) return;
    this.getWindowContext().$(this.grid).datagrid('updateRow', {
        index: rowIndex,
        row: rowinfo
    });
};

c8GridPaginationModel.prototype.c8GetRows = function () {
    return this.datagrid("getRows");
}
var c8GridPagination = c8GridPaginationModel;