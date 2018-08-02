/**
 * Created by JX on 18/06/23.
 */
(function ($) {
    $.extend($.fn.bootstrapTable.defaults, {
        onLoadOfOffline: function (data) {
            return false;
        },
        customHeaderContextMenu: function(headerTable){
            return false;
        }
    });
    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initBodyOfCustom = BootstrapTable.prototype.initBody,
        _fitHeaderOfCustom = BootstrapTable.prototype.fitHeader;

    BootstrapTable.prototype.initBody = function (data) {
        var that = this;
        _initBodyOfCustom.apply(this, [data]);
        if (this.options.onLoadOfOffline) {
            that.options.onLoadOfOffline(that.getData());
        }
    };

    BootstrapTable.prototype.fitHeader = function (data) {
        var that = this;
        _fitHeaderOfCustom.apply(this, [data]);

        if(this.$tableFooter){
            this.$tableFooter.css("margin-right", "17px");
            this.$tableFooter.find('table').removeClass("table-hover");
            var headerClone = this.$header.clone(true, true);
            var oldFooterTds = this.$tableFooter.find('td');
            this.$tableFooter.find('tbody').html("").append(headerClone.html().replace(/<th/g,"<td").replace(/\/th>/g,"/td>"));
            var newFooterThs = this.$tableFooter.find('td');
            $.each(newFooterThs, function (index, item) {
                var oldTd = $(oldFooterTds[index]);
                var newTd = $(item);
                newTd.css("border-left", "1px solid #dddddd");
                newTd.find(".th-inner").text(oldTd.find(".th-inner").text());
            });
        }

        if (this.options.customHeaderContextMenu) {
            that.options.customHeaderContextMenu(this.$tableHeader.find('table'));
        }
    };

})(jQuery);