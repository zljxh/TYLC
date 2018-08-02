;
(function ($) {
    function c8formatter() {
    };
    c8formatter.prototype.checkbox = function (value, row, index) {
        if (typeof(value) == "undefined") {
            return null;
        }
        if (value) {
            return "<input type='checkbox'  onchange='this.checked=!this.checked;' readonly='readonly' checked='true' value='true'/>";
        } else {
            return "<input type='checkbox' onchange='this.checked=!this.checked;' readonly='readonly'    value='false'/>";
        }
    }
    c8formatter.prototype.gridlink = function (callbackname, value, row, index) {
        //  <font color=" + row.TagTypeColor + ">" + value + "</font>
        return "<a class='grid-link' onclick='" + callbackname + "(" + ko.toJSON(row) + "," + index + ")'></a><span class='link-span' title='" + value + "'> " + value + "</span>";
    }

    c8formatter.prototype.gridClickCellLink = function (callbackname, value, row, index) {
        return "<a onclick='" + callbackname + "(" + ko.toJSON(row) + "," + index + ")'><span>" + value + "</span></a>";
    }
    c8formatter.prototype.gridlinkwithstyle = function (callbackname, value, row, index, elementstyle) {
        //  <font color=" + row.TagTypeColor + ">" + value + "</font>
        return "<a class='grid-link' onclick='" + callbackname + "(" + ko.toJSON(row) + "," + index + ")'></a><i class='link-span' style='" + elementstyle + "' title='" + value + "'> " + value + "</i>";
    }
    c8formatter.prototype.gridcellstyle = function (value, elementstyle) {
        return "<i style='color: #fff;padding:0 2px 0 2px;font-style:normal;" + elementstyle + "' title='" + value + "'> " + value + "</i>";
    }

    c8formatter.prototype.gridRowModify = function (callbackname, value, row, index) {
        var span = "";
        if(value && value != ""){
            span = "<span title='" + value + "'> " + value + "</span>";
        }
        return "" +
            "<a class='grid-row-modify' onclick='" + callbackname + "(" + ko.toJSON(row) + "," + index + ")'>" +
                "<i class='fa fa-pencil-square' style='font-size: 18px;'></i>" +
            "</a>" + span;
    };
    c8formatter.prototype.gridRowModifyForTwoParameter = function (callbackname, value, row, index) {
        var span = "";
        if(value && value != ""){
            span = "<span title='" + value + "'> " + value + "</span>";
        }
        return "" +
            "<a class='grid-row-modify' onclick='" + callbackname + "(true," + ko.toJSON(row) + ")'>" +
            "<i class='fa fa-pencil-square' style='font-size: 18px;'></i>" +
            "</a>" + span;
    };
    c8formatter.prototype.griRowModifyWithStyle = function (callbackname, value, row, index, elementstyle) {
        return "" +
            "<a class='grid-row-modify' onclick='" + callbackname + "(" + ko.toJSON(row) + "," + index + ")'>" +
                "<i class='fa fa-pencil-square' style='font-size: 18px;'></i>" +
            "</a>" +
            "<i class='link-span' style='" + elementstyle + "' title='" + value + "'> " + value + "</i>";
    }
    $.fn.c8formatter = new c8formatter();
    $.c8formatter = $.fn.c8formatter;
})(jQuery);