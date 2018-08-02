/**
 * Created by JX on 18/01/02.
 */
function BootstrapTableNoPaginationModel(dataParameter) {
    this.c8type = "BootstrapTableNoPaginationModel";
    var gridBase = this;
    this.c8winId = null;
    this.grid = null; //grid dom对象

    // 指定分页Url
    this.pageUrl = dataParameter.pageUrl;
    // 查询条件绑定模型
    this.form = dataParameter.form;// ko.mapping.fromJS(dataParameter.form);
    this.windowContext = dataParameter.windowContext || window;
    this.selectorContext = dataParameter.selectorContext;
    this.dataParameter = dataParameter;

    this.dataoptions = {
        onPageChange:function(number, size){
            gridBase.pSelectPage(number, size, false);
        }
    };
    if (dataParameter.dataoptions) {
        $.extend(this.dataoptions,dataParameter.dataoptions);
    }
}
BootstrapTableNoPaginationModel.prototype.pSearch = function (data) {
    this.form = this.getWindowContext().ko.c8GetFormModel({context: this.getWindowContext().$(this.dataParameter.searchConditionsSelector, this.getSelectorContext())});
    this.form = this.form || {};
    if (data) {
        $.extend(this.form, data);
    }
    this.removeAll();
    this.pSelectPage();
};

BootstrapTableNoPaginationModel.prototype.pSelectPage = function () {
    var base = this;
    var p = {};
    p.Parameters = this.form;
    ko.c8Ajax({
        type: "POST",
        url: base.pageUrl,
        async: true,
        data: ko.toJSON(p),
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            base.pLoadData(data);
        },
        error: function (e) {
            alert(e.responseText);
        }
    });
};

BootstrapTableNoPaginationModel.prototype.pCustomerGetPage = function (form) {
    var base = this;
    form = form || {};
    var urlParam = $().c8help.c8ToUrlparameter(form);
    ko.c8Ajax({
        type: "GET",
        url: base.pageUrl + "?" + urlParam,
        async: true,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            base.pLoadData(data);
        },
        error: function (e) {
            base.pLoaded();
            $.alert(e.responseText);
        }
    });
};

BootstrapTableNoPaginationModel.prototype.pLoadData = function (data) {
    var base = this;
    if(base.grid == null)return;
    if (data) {
        if (data instanceof Array) {
            this.getWindowContext().$(this.grid).bootstrapTable('load', data);
        } else {
            this.getWindowContext().$(this.grid).bootstrapTable('load', data.Rows);
        }
    }
};

BootstrapTableNoPaginationModel.prototype.insertRow = function (index, rowInfo) {
    if (rowInfo == null) return;
    this.getWindowContext().$(this.grid).bootstrapTable('insertRow', {index: index, row: rowInfo});
};

BootstrapTableNoPaginationModel.prototype.updateRow = function (rowInfo) {
    if (rowInfo == null) return;
    this.getWindowContext().$(this.grid).bootstrapTable('updateByUniqueId', {id: rowInfo.RowId, row: rowInfo});
};

BootstrapTableNoPaginationModel.prototype.removeByRowId = function (rowId) {
    if(rowId == null || rowId == '')return;
    this.getWindowContext().$(this.grid).bootstrapTable('removeByUniqueId', rowId);
};

BootstrapTableNoPaginationModel.prototype.removeAll = function () {
    var base = this;
    if(base.grid == null)return;
    this.getWindowContext().$(this.grid).bootstrapTable('removeAll');
};

BootstrapTableNoPaginationModel.prototype.setWindowContext = function (wc) {
    this.dataParameter.windowContext = wc;
};

BootstrapTableNoPaginationModel.prototype.getWindowContext = function () {
    return this.dataParameter.windowContext || window;
};

BootstrapTableNoPaginationModel.prototype.getSelectorContext = function () {
    var selectorContext = this.dataParameter.selectorContext;
    if (this.c8winId != null) {
        selectorContext = this.getWindowContext().$('#' + this.c8winId);
    }
    return selectorContext;
};

//获取当前选定的所有数据，如果获取不到则获取当前选中的数据
BootstrapTableNoPaginationModel.prototype.getAllSelectionOfTable = function (){
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

//获取当前所有数据
BootstrapTableNoPaginationModel.prototype.getTableData = function (){
    var gridTable = this.getWindowContext().$(this.grid);
    var rows = gridTable.bootstrapTable("getData");
    return rows || [];
};

//获取当前点击的数据的rowId
BootstrapTableNoPaginationModel.prototype.getSelectionRowId = function(){
    var row = this.getWindowContext().$(this.grid).find(".selected");
    if(row && row.length == 1){
        return row.attr("data-uniqueid");
    } else {
        return null;
    }
};

//获取当前点击的数据
BootstrapTableNoPaginationModel.prototype.getSelectionRow = function(){
    return this.getWindowContext().$(this.grid).bootstrapTable('getSelected');
};

// 根据UniqueId获取行数据
BootstrapTableNoPaginationModel.prototype.getRowByUniqueId = function(uniqueId){
    return this.getWindowContext().$(this.grid).bootstrapTable('getRowByUniqueId', uniqueId);
};

// 根据index获取行数据
BootstrapTableNoPaginationModel.prototype.getRowByIndex = function(index){
    var tableData = this.getWindowContext().$(this.grid).bootstrapTable('getOptions').data;
    if(tableData.length < index){
        return null;
    }
    return tableData[index];
};