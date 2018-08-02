/**
 * Created by JX on 18/01/14.
 */
function CustomUniqueIdBootstrapTableModel(dataParameter) {
    this.c8type = "CustomUniqueIdBootstrapTableModel";
    var gridBase = this;
    this.c8winId = null;
    this.grid = null; //grid dom对象
    this.customUniqueId = 0;

    // 指定分页Url
    this.pageUrl = dataParameter.pageUrl;
    // 查询条件绑定模型
    this.form = dataParameter.form;// ko.mapping.fromJS(dataParameter.form);
    this.windowContext = dataParameter.windowContext || window;
    this.selectorContext = dataParameter.selectorContext;
    this.dataParameter = dataParameter;

    this.dataoptions = {
        uniqueId:"CustomUniqueId",
        onPageChange:function(number, size){
            gridBase.pSelectPage(number, size, false);
        }
    };
    if (dataParameter.dataoptions) {
        $.extend(this.dataoptions,dataParameter.dataoptions);
    }
}
CustomUniqueIdBootstrapTableModel.prototype.pSearch = function (data) {
    this.form = this.getWindowContext().ko.c8GetFormModel({context: this.getWindowContext().$(this.dataParameter.searchConditionsSelector, this.getSelectorContext())});
    this.form = this.form || {};
    if (data) {
        $.extend(this.form, data);
    }
    this.removeAll();
    this.pSelectPage();
};

CustomUniqueIdBootstrapTableModel.prototype.pSelectPage = function () {
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

CustomUniqueIdBootstrapTableModel.prototype.pCustomerGetPage = function (form) {
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
            $.alert(e.responseText);
        }
    });
};

CustomUniqueIdBootstrapTableModel.prototype.pLoadData = function (data) {
    var base = this;
    if(base.grid == null)return;
    if (data) {
        var loadData = [];
        if (data instanceof Array) {
            loadData = data;
        } else {
            loadData = data.Rows;
        }
        base.customUniqueId = 0;
        loadData.forEach(function(item, index, array){
            base.customUniqueId += 1;
            item.CustomUniqueId = base.customUniqueId;
        });
        this.getWindowContext().$(this.grid).bootstrapTable('load', loadData);
    }
};

CustomUniqueIdBootstrapTableModel.prototype.insertRow = function (index, rowInfo) {
    if (rowInfo == null) return;
    var base = this;
    base.customUniqueId += 1;
    rowInfo.CustomUniqueId = base.customUniqueId;
    this.getWindowContext().$(this.grid).bootstrapTable('insertRow', {index: index, row: rowInfo});
};

CustomUniqueIdBootstrapTableModel.prototype.insertFinalRow = function (rowInfo) {
    if (rowInfo == null) return;
    var base = this;
    base.customUniqueId += 1;
    rowInfo.CustomUniqueId = base.customUniqueId;
    this.getWindowContext().$(this.grid).bootstrapTable('insertRow', {index: base.customUniqueId, row: rowInfo});
};

CustomUniqueIdBootstrapTableModel.prototype.updateRow = function (rowInfo) {
    if (rowInfo == null) return;
    this.getWindowContext().$(this.grid).bootstrapTable('updateByUniqueId', {id: rowInfo.CustomUniqueId, row: rowInfo});
};

CustomUniqueIdBootstrapTableModel.prototype.removeByCustomUniqueId = function (customUniqueId) {
    if(customUniqueId == null || customUniqueId == '')return;
    this.getWindowContext().$(this.grid).bootstrapTable('removeByUniqueId', customUniqueId);
};

CustomUniqueIdBootstrapTableModel.prototype.removeAll = function () {
    var base = this;
    if(base.grid == null)return;
    this.getWindowContext().$(this.grid).bootstrapTable('removeAll');
};

CustomUniqueIdBootstrapTableModel.prototype.setWindowContext = function (wc) {
    this.dataParameter.windowContext = wc;
};

CustomUniqueIdBootstrapTableModel.prototype.getWindowContext = function () {
    return this.dataParameter.windowContext || window;
};

CustomUniqueIdBootstrapTableModel.prototype.getSelectorContext = function () {
    var selectorContext = this.dataParameter.selectorContext;
    if (this.c8winId != null) {
        selectorContext = this.getWindowContext().$('#' + this.c8winId);
    }
    return selectorContext;
};

//获取当前选定的所有数据，如果获取不到则获取当前选中的数据
CustomUniqueIdBootstrapTableModel.prototype.getAllSelectionOfTable = function (){
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
CustomUniqueIdBootstrapTableModel.prototype.getTableData = function (){
    var gridTable = this.getWindowContext().$(this.grid);
    var rows = gridTable.bootstrapTable("getData");
    return rows || [];
};

//获取当前点击的数据的rowId
CustomUniqueIdBootstrapTableModel.prototype.getSelectionRowId = function(){
    var row = this.getWindowContext().$(this.grid).find(".selected");
    if(row && row.length == 1){
        return row.attr("data-uniqueid");
    } else {
        return null;
    }
};

//获取当前点击的数据
CustomUniqueIdBootstrapTableModel.prototype.getSelectionRow = function(){
    return this.getWindowContext().$(this.grid).bootstrapTable('getSelected');
};

// 根据UniqueId获取行数据
CustomUniqueIdBootstrapTableModel.prototype.getRowByCustomUniqueId = function(customUniqueId){
    return this.getWindowContext().$(this.grid).bootstrapTable('getRowByUniqueId', customUniqueId);
};
