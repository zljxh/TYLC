/**
 * Created by Administrator on 17/12/26.
 */
//pageUrl, countUrl, form
function BootstrapTableModel(dataParameter) {
    this.c8type = "BootstrapTableModel";
    var gridBase = this;
    this.c8winId = null;
    this.grid = null; //grid dom对象

    // 指定分页Url
    this.pageUrl = dataParameter.pageUrl;//"/api/OPUserApi/GetPage"
    // 指定数量Url
    this.countUrl = dataParameter.countUrl;//"/api/OPUserApi/GetCount"
    // 查询条件绑定模型
    this.form = dataParameter.form;// ko.mapping.fromJS(dataParameter.form);
    this.windowContext = dataParameter.windowContext || window;
    this.selectorContext = dataParameter.selectorContext;
    this.dataParameter = dataParameter;
    //table数据总数
    this.tableTotal = 0;

    this.dataoptions = {
        pageNumber:0,
        pageSize:50,
        pagination: true,
        sidePagination:"server",
        paginationHAlign:"left",
        paginationDetailHAlign:"right",
        pageList:[ 50, 100, 200],
        paginationLoop: false,
        onPageChange:function(number, size){
            gridBase.pSelectPage(number, size, false);
        }
    };
    if (dataParameter.dataoptions) {
        $.extend(this.dataoptions,dataParameter.dataoptions);
    }


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
    };

    this.formatFormName = function () {
        var url = $.myBrowser() == 'IE' ? window.document.URL : window.document.baseURI;
        var index = url.lastIndexOf('/');
        var start = url.substr(index + 1);
        dataParameter.FormName = start + '_' + dataParameter.FormName;
    };

    var setTableColumnVisible = function(columnList, tableColumns){
        var columns =[];
        columns.push(gridBase.dataoptions.columns[0]);
        columns.push(gridBase.dataoptions.columns[1]);
        $.each(columnList, function (firstLevelIndex, firstLevelItem) {
            $.each(tableColumns, function (secondLevelIndex, secondLevelItem) {
                if(firstLevelItem.Id == secondLevelItem.field){
                    secondLevelItem.visible = firstLevelItem.IsShow;
                    columns.push(secondLevelItem);
                    return false;
                }
            });
        });
        return columns;
    };

    function getElementListByColumns(columns){
        var elementList = [];
        $.each(columns, function (index, item) {
            if(index == 0 || index == 1) return true;
            var row = {};
            row.Id = item.field;
            row.ColName = item.title;
            if(item.visible == undefined || item.visible){
                row.IsShow = true;
            } else {
                row.IsShow = false;
            }
            elementList.push(row);
        });
        return elementList
    }
    var callbackOfSearch = null;
    this.editSellOrderTableColumnList = function(columnList){
        gridBase.dataoptions.columns = setTableColumnVisible(columnList, gridBase.dataoptions.columns);
        gridBase.getWindowContext().$(gridBase.grid).bootstrapTable('refreshOptions', gridBase.dataoptions);
        if(callbackOfSearch){
            callbackOfSearch();
        }
    };
    //grid布局
    //dataParameter.IsFormLayout 是否允许设置布局
    //dataParameter.FormName 布局grid名称
    //dataParameter.FormLayoutCloumnFilterCallBack:  function(column[]) return column[] 过滤列，返回筛选过后的列
    var win = null;
    var isFormLayout = dataParameter.IsFormLayout;
    if(isFormLayout == undefined)isFormLayout = true;
    if(isFormLayout) {
        gridBase.formatFormName();
        win = new vm.CommonMethod.ColumnSortingPopup(getElementListByColumns(gridBase.dataoptions.columns), dataParameter.FormName);
        var layout = this.getGridLayoutData(dataParameter.FormName);
        if (layout != undefined && layout != null && layout != "") {
            var comColumnJson = layout.ComColumn;
            if ( comColumnJson != undefined && comColumnJson != null && comColumnJson != "") {
                gridBase.dataoptions.columns = setTableColumnVisible( JSON.parse(layout.ComColumn), gridBase.dataoptions.columns);
            }
        }
    }
    this.openSetTableColumnWin = function(callback) {
        callbackOfSearch = callback;
        if(win){
            win.openPopup(gridBase, getElementListByColumns(gridBase.dataoptions.columns));
        }
    };
}

BootstrapTableModel.prototype.pSearch = function (data, callback) {
    this.handleSearch(true, data, callback);
};

BootstrapTableModel.prototype.pSearchNoForm = function (data) {
    this.handleSearch(false,data);
};

BootstrapTableModel.prototype.handleSearch = function (withForm,data, callback) {
    this.pSearchParams(withForm,data);
    this.pGetCount(callback);
    var options= this.getWindowContext().$(this.grid).bootstrapTable('getOptions');//change by banchao 20180730
    this.pSelectPage(1, options.pageSize, true, callback);
};

BootstrapTableModel.prototype.pGetCount = function (callback) {
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
            base.tableTotal = parseInt(data);
        },
        error: function (e) {
            alert(e.responseText);
        },
        complete: function(e){
            if(callback){
                callback("count");
            }
        }
    });
};

BootstrapTableModel.prototype.pSelectPage = function (number, size, isSearch, callback) {
    var base = this;
    var p = {};
    p.Parameters = this.form;
    p["PageIndex"] = number;
    p["PageRowCount"] = size;
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
            base.pLoadData(data, isSearch);
        },
        error: function (e) {
            alert(e.responseText);
        },
        complete: function(e){
            if(callback){
                callback("value");
            }
        }
    });
};

BootstrapTableModel.prototype.pGetCountByParameters = function (Parameters) {
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
        }
    });
    return count;
};

BootstrapTableModel.prototype.pLoadData = function (data , isSearch) {
    var base = this;
    if(base.grid == null)return;
    // isSearch 如果是检索方法调用则设置为true 如果是分页事件则为false或者不传
    if(isSearch) {
        var options= this.getWindowContext().$(this.grid).bootstrapTable('getOptions');
        options.pageNumber=1;
    }
    this.getWindowContext().$(this.grid).bootstrapTable('load', {total:base.tableTotal,rows:data});
};

BootstrapTableModel.prototype.setWindowContext = function (wc) {
    this.dataParameter.windowContext = wc;
};

BootstrapTableModel.prototype.getWindowContext = function () {
    return this.dataParameter.windowContext || window;
};

BootstrapTableModel.prototype.getSelectorContext = function () {
    var selectorContext = this.dataParameter.selectorContext;
    if (this.c8winId != null) {
        selectorContext = this.getWindowContext().$('#' + this.c8winId);
    }
    return selectorContext;
};

BootstrapTableModel.prototype.pSearchParams = function (withForm,data) {
    if(withForm){
        this.form = this.getWindowContext().ko.c8GetFormModel({context: this.getWindowContext().$(this.dataParameter.searchConditionsSelector, this.getSelectorContext())});
        this.form = this.form || {};
    }else{
        this.form =  {};
    }

    if (data) {
        $.extend(this.form, data);
    }
    var delArr = [];
    for (var propertyOfForm in  this.form) {
        if(this.form.hasOwnProperty(propertyOfForm)){
            if (typeof(this.form[propertyOfForm]) == 'string')
                this.form[propertyOfForm] = $.trim(this.form[propertyOfForm]);
            if (this.form[propertyOfForm] instanceof Array && this.form[propertyOfForm].length == 1 && this.form[propertyOfForm][0] == "")
                delArr.push(propertyOfForm);
        }
    }
    for (var propertyOfDelArr in delArr) {
        if(delArr.hasOwnProperty(propertyOfDelArr))
            this.form[delArr[propertyOfDelArr]] = undefined;
    }
    return this.form;
};

BootstrapTableModel.prototype.insertRow = function (index, rowInfo) {
    if (rowInfo == null) return;
    this.getWindowContext().$(this.grid).bootstrapTable('insertRow', {index: index, row: rowInfo});
};

BootstrapTableModel.prototype.updateRow = function (rowInfo) {
    if (rowInfo == null) return;
    this.getWindowContext().$(this.grid).bootstrapTable('updateByUniqueId', {id: rowInfo.RowId, row: rowInfo});
};

BootstrapTableModel.prototype.updateRowMultiSelected = function (rowInfo) {
    if (rowInfo == null) return;
    this.updateRow(rowInfo);
};

// BootstrapTable不需要获取index直接返回-1
BootstrapTableModel.prototype.getRowIndex = function (rowInfo) {
    return -1;
};

//获取当前选定的所有数据，如果获取不到则获取当前选中的数据
BootstrapTableModel.prototype.getAllSelectionOfTable = function (){
    var gridTable = this.getWindowContext().$(this.grid);
    var rows = gridTable.bootstrapTable("getSelections");
    if(rows && rows.length > 0)
        return rows;

    var row =  this.getWindowContext().$(this.grid).bootstrapTable('getSelected');
    if(row){
        var result = [];
        result.push(row);
        return result;
    }
    return null;
};

//获取当前点击的数据的rowId
BootstrapTableModel.prototype.getSelectionRowId = function(){
    var row = this.getWindowContext().$(this.grid).find(".selected");
    if(row && row.length == 1){
        return row.attr("data-uniqueid");
    } else {
        return null;
    }
};

//获取当前点击的数据
BootstrapTableModel.prototype.getSelectionRow = function(){
    var row = this.getWindowContext().$(this.grid).find(".selected");
    if(row && row.length == 1){
        return this.getRowByUniqueId(row.attr("data-uniqueid"));
    }
    return null;
};

// 根据UniqueId或者选中行 获取单条数据的List
BootstrapTableModel.prototype.getRowListByUniqueIdOrSelected = function(uniqueId){
    var result = [];
    if(uniqueId){
        result.push(this.getWindowContext().$(this.grid).bootstrapTable('getRowByUniqueId', uniqueId));
    } else {
        result.push( this.getWindowContext().$(this.grid).bootstrapTable('getSelected'));
    }
    return result;
};

// 根据UniqueId获取行数据
BootstrapTableModel.prototype.getRowByUniqueId = function(uniqueId){
    return this.getWindowContext().$(this.grid).bootstrapTable('getRowByUniqueId', uniqueId);
};

// 设置列
BootstrapTableModel.prototype.SetTableColumn = function(callback){
    this.openSetTableColumnWin(callback);
};

BootstrapTableModel.prototype.datagrid = function(propertyName, value){
    if(typeof propertyName != "string") return;
    if(propertyName == "getRowIndex"){
        return 0;
    }
    if(propertyName == "updateRow"){
        this.updateRow(value.row)
    }
    if(propertyName == "getOptions"){
        return this.getWindowContext().$(this.grid).bootstrapTable('getOptions');
    }
    if(propertyName == "getChecked"){
        return this.getAllSelectionOfTable();
    }
};