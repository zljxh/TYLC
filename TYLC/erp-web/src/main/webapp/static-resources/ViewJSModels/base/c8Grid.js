//pageUrl, countUrl, form
function c8Grid(dataParameter) {
    var gridBase = this;
    this.c8type = "c8Grid";
    this.windowContext = dataParameter.windowContext || window;
    this.showRowCount = 0;

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
    var isformlayout = dataParameter.IsFormLayout;
    if (isformlayout == undefined)isformlayout = true;
    if (isformlayout) {
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
        if (dataParameter.FormLayoutCloumnFilterCallBack) {
            var frozendatafilter = dataParameter.FormLayoutCloumnFilterCallBack(frozendata);
            targetfrozencolumns.push(frozendatafilter);
            var columndatafilter = dataParameter.FormLayoutCloumnFilterCallBack(columndata);
            targetcolumns.push(columndatafilter);
        } else {
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

    this.pageUrl = dataParameter.pageUrl;//"/api/OPUserApi/GetPage"

    this.dataParameter = dataParameter;
    if (!this.dataParameter["toolbar"]) {
        this.dataParameter["toolbar"] = "#tb";
    }
    if (!this.dataParameter["searchConditionsSelector"]) {
        this.dataParameter.searchConditionsSelector = this.dataParameter["toolbar"];//".c8SearchConditions";
    }
    this.dataoptions = {
        autoRowHeight: false,
        rownumbers: true,
        nowrap: true,
        singleSelect: true,
        toolbar: this.dataParameter.toolbar,
        loadMsg: '数据努力加载中,请稍后......',
        striped: true
    }
    if (dataParameter.dataoptions) {
        for (var i in dataParameter.dataoptions) {
            this.dataoptions[i] = dataParameter.dataoptions[i];
        }
    }
    this.grid = null; //grid dom对象

    this.getColumnData = function () {
        var obj = {};
        obj.formName = dataParameter.FormName;
        obj.frozencolumns = frozencolumns;
        obj.cloumns = cloumns;
        return obj;
    }

};
c8Grid.prototype.c8GetSelected = function () {
    return this.getWindowContext().$(this.grid).datagrid('getSelected');
}
c8Grid.prototype.pSearch = function (data) {
    /// <summary>查询</summary>
    //var param = ko.toJS(this.form);
    this.form = this.getWindowContext().ko.c8GetFormModel({context: this.getWindowContext().$(this.dataParameter.searchConditionsSelector, this.getSelectorContext())});
    this.form = this.form || {};
    if (data) {
        for (var key in data) {
            this.form[key] = data[key];
        }
    }
    this.pGetPage();
};
c8Grid.prototype.pLoading = function () {
    this.getWindowContext().$(this.grid).datagrid('loading');
};
c8Grid.prototype.pLoaded = function () {
    this.getWindowContext().$(this.grid).datagrid('loaded');
};
c8Grid.prototype.pLoadData = function (data) {
    this.getWindowContext().$(this.grid).datagrid("uncheckAll");
    if (data) {
        if (data instanceof Array) {
            if (data || data.length > 0) {
                if (this.showRowCount < data.length) {
                    this.showRowCount = data.length;

                }
            }
            this.getWindowContext().$(this.grid).datagrid('loadData', {"total": 1000, "rows": data});
        } else {
            if (data.Rows || data.Rows.length > 0) {
                if (this.showRowCount < data.Rows.length) {
                    this.showRowCount = data.Rows.length;
                }
            }
            this.getWindowContext().$(this.grid).datagrid('loadData', {
                "total": this.showRowCount,
                "rows": data.Rows,
                "footer": data.Footer
            });
        }
    }

}
c8Grid.prototype.pGetPage = function () {
    var base = this;
    var p = {};
    p.Parameters = this.form;
    ko.c8Ajax({
        type: "POST",
        url: base.pageUrl,
        async: false,
        data: ko.toJSON(p),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            base.pLoaded();
            base.pLoadData(data);
        },
        error: function (e) {
            base.pLoaded();
            $.alert(e.responseText);
        },
        beforeSend: function () {
            base.pLoading();
        },
        complete: function () {
            base.pLoaded();
        },
        onLoadSuccess: function (data) {
            var dc = $(this).data('datagrid').dc;
            var header2Row = dc.header2.find('tr.datagrid-header-row');
            dc.body2.find('table').append(header2Row.clone().css({"visibility": "hidden"}));
        }
    });
};
c8Grid.prototype.updateRowByFieldId = function (rowinfo) {
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
c8Grid.prototype.updateRow = function (rowinfo, rowIndex) {
    if (rowinfo == null) return;
    var row = this.getWindowContext().$(this.grid).datagrid('getSelected');
    if (rowIndex == undefined) {
        rowIndex = this.getWindowContext().$(this.grid).datagrid('getRowIndex', row);
    }
    if (rowIndex < 0) return;
    this.getWindowContext().$(this.grid).datagrid('updateRow', {
        index: rowIndex,
        row: rowinfo
    });
};
c8Grid.prototype.insertRow = function (rowinfo) {
    this.getWindowContext().$(this.grid).datagrid('insertRow', {
        index: 0,	// 索引从0开始
        row: rowinfo
    });
};
c8Grid.prototype.insertRowList = function (rowList) {
    var count = rowList.length;
    for (var i = 0; i < count; i++) {
        this.insertRow(rowList[i]);
    }
};
c8Grid.prototype.deleteRowList = function (rowList) {
    var count = rowList.length;
    var indexList = [];
    for (var i = 0; i < count; i++) {
        var rowIndex = this.datagrid('getRowIndex', rowList[i]);
        indexList.push(rowIndex);
    }
    //this.datagrid('deleteRow', rowIndex);
    indexList.sort(function (a, b) {
        return b - a
    })
    for (var j = 0; j < count; j++) {
        this.datagrid('deleteRow', indexList[j]);
    }
}
c8Grid.prototype.deleteRow = function (row, rowIndex) {


    if (!rowIndex) {
        if (row == null) {
            row = this.getWindowContext().$(this.grid).datagrid('getSelected');
        }
        if (row == null) return;
        rowIndex = this.getWindowContext().$(this.grid).datagrid('getRowIndex', row);
    }
    if (rowIndex < 0) return;
    this.getWindowContext().$(this.grid).datagrid('deleteRow', rowIndex);
};

c8Grid.prototype.getWindowContext = function () {
    var windowContext = this.dataParameter.windowContext || window;
    return windowContext;
}
c8Grid.prototype.setWindowContext = function (wc) {
    this.dataParameter.windowContext = wc;

}
c8Grid.prototype.getSelectorContext = function () {
    var selectorContext = this.dataParameter.selectorContext;
    return selectorContext;
}
c8Grid.prototype.datagrid = function (p1, p2, p3, p4, p5, p6, p7, p8) {
    return this.getWindowContext().$(this.grid).datagrid(p1, p2, p3, p4, p5, p6, p7, p8);
}
c8Grid.prototype.c8GetChangeRows = function (deleteId) {
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
}
c8Grid.prototype.c8GetElementsBySelector = function (selector) {
    return this.getWindowContext().$(selector);
}
c8Grid.prototype.c8GetRows = function () {
    return this.datagrid("getRows");
}

c8Grid.prototype.getSelections = function () {
    return this.datagrid("getSelections");
}
c8Grid.prototype.c8GetFieldArray = function (rowList) {
    var options = this.datagrid("options");
    var result = [];
    var clumns = options["columns"][0]
    var count = clumns.length;
    for (var i = 0; i < count; i++) {
        result.push(clumns[i]["field"]);
    }
    return result;
};
c8Grid.prototype.c8GetRowByRowIndex = function (RowIndex) {
    if (RowIndex != null && RowIndex >= 0) {
        this.datagrid("unselectAll");
        this.datagrid("selectRow", RowIndex);
        return this.datagrid("getSelected");
    }
    return null;
};
c8Grid.prototype.c8BindGridEditorEvent = function (isEditingRowIndex, expression) {
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

c8Grid.prototype.pCustomerGetPage = function (form,filterData) {
    var base = this;
    form = form || {};
    var urlparam = $().c8help.c8ToUrlparameter(form)
    ko.c8Ajax({
        type: "GET",
        url: base.pageUrl + "?" + urlparam,
        async: true,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            base.pLoaded();
            if(filterData!=null){
               var newData= filterData(data);
                base.pLoadData(newData);
            }else {
                base.pLoadData(data);
            }
        },
        error: function (e) {
            base.pLoaded();
            $.alert(e.responseText);
        },
        beforeSend: function () {
            base.pLoading();
        },
        complete: function () {
            base.pLoaded();
        },
        onLoadSuccess: function (data) {
            var dc = $(this).data('datagrid').dc;
            var header2Row = dc.header2.find('tr.datagrid-header-row');
            dc.body2.find('table').append(header2Row.clone().css({"visibility": "hidden"}));
        }
    });
};
c8Grid.prototype.getRowIndex = function (rowinfo) {
    if (rowinfo == null) return;
    var rowIndex = this.getWindowContext().$(this.grid).datagrid('getRowIndex', rowinfo);


    return rowIndex;
};


c8Grid.prototype.updateRowMultiSelected = function (rowinfo) {
    if (rowinfo == null) return;
    var rowIndex = this.getWindowContext().$(this.grid).datagrid('getRowIndex', rowinfo);
    if (rowIndex < 0) return;
    this.getWindowContext().$(this.grid).datagrid('updateRow', {
        index: rowIndex,
        row: rowinfo
    });
}