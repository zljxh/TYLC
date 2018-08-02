//pageUrl, countUrl, form
function c8TreeGrid(dataParameter) {
    this.c8type="c8TreeGrid";
    this.windowContext=dataParameter.windowContext||window;
    this.form={};

    this.pageUrl = dataParameter.dataoptions.pageUrl;//"/api/OPUserApi/GetPage"
    var gridBase = this;
    this.dataParameter=dataParameter;
    if(!this.dataParameter["toolbar"])
    {
        this.dataParameter["toolbar"]="#tb";
    }
    if(!this.dataParameter["searchConditionsSelector"])
    {
        this.dataParameter.searchConditionsSelector=this.dataParameter["toolbar"];//".c8SearchConditions";
    }
    this.dataoptions = { autoRowHeight:false,rownumbers: true,nowrap:true, singleSelect: true, toolbar:  this.dataParameter.toolbar, loadMsg: '数据努力加载中,请稍后......' }
    if(dataParameter.dataoptions)
    {
        for(var i in dataParameter.dataoptions)
        {
            this.dataoptions[i]=dataParameter.dataoptions[i];
        }
    }
    this.grid = null; //grid dom对象
};
c8TreeGrid.prototype.setWindowContext = function (wc) {
    this.dataParameter.windowContext = wc;

}
c8TreeGrid.prototype.getWindowContext = function () {
    var windowContext = this.dataParameter.windowContext || window;
    return windowContext;
}
c8TreeGrid.prototype.pLoadData = function (data) {
    if (data) {
        this.showRowCount = data.length;
        this.getWindowContext().$(this.grid).treegrid('loadData', {"total": 1000, "rows": data});
    }
}
c8TreeGrid.prototype.datagrid = function (p1, p2, p3, p4, p5, p6, p7, p8) {
    return this.getWindowContext().$(this.grid).treegrid(p1, p2, p3, p4, p5, p6, p7, p8);
}
c8TreeGrid.prototype.updateRow = function (rowinfo) {
    if (rowinfo == null) return;
    this.getWindowContext().$(this.grid).treegrid('update', {
        id: rowinfo.RowId,
        row: rowinfo
    });
};
c8TreeGrid.prototype.deleteRow = function (rowinfo) {
    if (rowinfo == null) {
        rowinfo = this.getWindowContext().$(this.grid).treegrid('getSelected');
    }
    if(rowinfo == null)return;
    this.getWindowContext().$(this.grid).treegrid('remove',rowinfo.RowId);
};
c8TreeGrid.prototype.getSelectorContext = function () {
    var selectorContext = this.dataParameter.selectorContext;
    return selectorContext;
}
c8TreeGrid.prototype.pSearch = function (data) {
    /// <summary>查询</summary>
    //var param = ko.toJS(this.form);
    this.form = data || {};
    /*if (data) {
     for (var key in data) {
     this.form[key] = data[key];
     }
     }*/
    this.pGetPage();
};
c8TreeGrid.prototype.pLoadData = function (data) {
    if (data) {
        this.showRowCount = data.length;
        this.getWindowContext().$(this.grid).treegrid('loadData', {"total": 1000, "rows": data});
    }
}
c8TreeGrid.prototype.pGetPage = function () {
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
            base.pLoadData(data);
        },
        error: function (e) {
            $.alert(e.responseText);
        },
        beforeSend: function () {
        },
        complete: function () {
        },
        onLoadSuccess: function (data) {
        }
    });
};
c8TreeGrid.prototype.insertRow = function (rowinfo) {
    if (rowinfo == null) return;
    this.getWindowContext().$(this.grid).treegrid('append', {data: [rowinfo]});
};


