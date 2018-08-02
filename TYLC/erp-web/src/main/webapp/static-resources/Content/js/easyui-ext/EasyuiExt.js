/**
 * linkbutton方法扩展      解决1.4.1 设置enable不起作用的问题
 * @param {Object} jq
 */
$.extend($.fn.linkbutton.methods, {
    /**
     * 激活选项（覆盖重写）
     * @param {Object} jq
     */
    enable: function (jq) {
        return jq.each(function () {
            var state = $.data(this, 'linkbutton');
            if (!state) {
                var options = {};
                $.data(this, 'linkbutton', {
                    options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), options)
                });
                state = $.data(this, 'linkbutton');
            }
            if ($(this).hasClass('l-btn-disabled')) {
                var itemData = state._eventsStore;
                //恢复超链接
                if (itemData.href) {
                    $(this).attr("href", itemData.href);
                }
                //回复点击事件
                if (itemData.onclicks) {
                    for (var j = 0; j < itemData.onclicks.length; j++) {
                        $(this).bind('click', itemData.onclicks[j]);
                    }
                }
                //设置target为null，清空存储的事件处理程序
                itemData.target = null;
                itemData.onclicks = [];
                $(this).removeClass('l-btn-disabled');
            }
        });
    },
    /**
     * 禁用选项（覆盖重写）
     * @param {Object} jq
     */
    disable: function (jq) {
        return jq.each(function () {
            var state = $.data(this, 'linkbutton');
            if (!state) {
                var options = {};
                $.data(this, 'linkbutton', {
                    options: $.extend({}, $.fn.linkbutton.defaults, $.fn.linkbutton.parseOptions(this), options)
                });
                state = $.data(this, 'linkbutton');
            }
            if (!state._eventsStore)
                state._eventsStore = {};
            if (!$(this).hasClass('l-btn-disabled')) {
                var eventsStore = {};
                eventsStore.target = this;
                eventsStore.onclicks = [];
                //处理超链接
                var strHref = $(this).attr("href");
                if (strHref) {
                    eventsStore.href = strHref;
                    $(this).attr("href", "javascript:void(0)");
                }
                //处理直接耦合绑定到onclick属性上的事件
                var onclickStr = $(this).attr("onclick");
                if (onclickStr && onclickStr != "") {
                    eventsStore.onclicks[eventsStore.onclicks.length] = new Function(onclickStr);
                    $(this).attr("onclick", "");
                }
                //处理使用jquery绑定的事件
                var eventDatas = $(this).data("events") || $._data(this, 'events');
                if(eventDatas) {
                    if (eventDatas["click"]) {
                        var eventData = eventDatas["click"];
                        for (var i = 0; i < eventData.length; i++) {
                            if (eventData[i].namespace != "menu") {
                                eventsStore.onclicks[eventsStore.onclicks.length] = eventData[i]["handler"];
                                $(this).unbind('click', eventData[i]["handler"]);
                                i--;
                            }
                        }
                    }
                }
                state._eventsStore = eventsStore;
                $(this).addClass('l-btn-disabled');
            }
        });
    }
});

//如果有变量，为了防止变量为全局变量，放在自调用匿名函数中
(function ($) {
    var _oldSetValue = $.fn.combotree.methods.setValue;
    $.fn.combotree.methods._oldSetValue = _oldSetValue;
    $.fn.combotree.methods.setValue = function (jq, value) {
        var options = jq.combotree("options");
        if (options.eBeforeSetValue) {
            options.eBeforeSetValue(jq, value);
        }
        jq.combotree("_oldSetValue", value);
        if (options.eAfterSetValue) {
            options.eAfterSetValue(jq, value);
        }
    };
    //扩展datebox
    var tempdataboxbtn = $.extend([], $.fn.datebox.defaults.buttons);
    tempdataboxbtn.splice(1, 0, {
        text: '清空',
        handler: function (target) {
            $(target).datebox('setValue', '');
        }
    });
    $.fn.datebox.defaults.buttons = tempdataboxbtn;

    $.fn.panel.defaults.onClose = function () {
    };
    $.messager.defaults.onClose = function () {
    };
})(jQuery);

//为防止$符号混淆，最后放在自调用匿名函数中，传入juqery
(function ($) {
    //上下按键方法
    $.extend($.fn.datagrid.methods, {
        keyCtr: function (jq) {
            return jq.each(function () {
                var grid = $(this);
                grid.datagrid('getPanel').panel('panel').attr('tabindex', 1).bind('keydown', function (e) {
                    switch (e.keyCode) {
                        case 38: // up
                            var selected = grid.datagrid('getSelected');
                            if (selected) {
                                var index = grid.datagrid('getRowIndex', selected);
                                if (index == 0) {
                                    grid.datagrid('selectRow', 0);
                                }
                                else {
                                    grid.datagrid('selectRow', index - 1);
                                }
                            } else {
                                var rows = grid.datagrid('getRows');
                                if (rows.length != 0)
                                    grid.datagrid('selectRow', rows.length - 1);
                            }
                            break;
                        case 40: // down
                            var selected = grid.datagrid('getSelected');
                            if (selected) {
                                var rows = grid.datagrid('getRows');
                                var index = grid.datagrid('getRowIndex', selected);
                                if (index + 1 >= rows.length) {
                                    grid.datagrid('selectRow', 0);
                                }
                                else {
                                    grid.datagrid('selectRow', index + 1);
                                }

                            } else {
                                var rows = grid.datagrid('getRows');
                                if (rows.length != 0)
                                    grid.datagrid('selectRow', 0);
                            }
                            break;
                    }
                });
            });
        }
    });
    //行上下拖动方法
    $.extend($.fn.datagrid.defaults, {
        onBeforeDrag: function(row){},	// return false to deny drag
        onStartDrag: function(row){},
        onStopDrag: function(row){},
        onDragEnter: function(targetRow, sourceRow){},	// return false to deny drop
        onDragOver: function(targetRow, sourceRow){},	// return false to deny drop
        onDragLeave: function(targetRow, sourceRow){},
        onBeforeDrop: function(targetRow, sourceRow, point){},
        onDrop: function(targetRow, sourceRow, point){}	// point:'append','top','bottom'
    });
    $.extend($.fn.datagrid.methods, {
        enableDnd: function (jq, index) {
            return jq.each(function () {
                var target = this;
                var state = $.data(this, 'datagrid');
                state.disabledRows = [];
                var dg = $(this);
                var opts = state.options;
                if (index != undefined) {
                    var trs = opts.finder.getTr(this, index);
                } else {
                    var trs = opts.finder.getTr(this, 0, 'allbody');
                }
                trs.draggable({
                    disabled: false,
                    revert: true,
                    cursor: 'pointer',
                    proxy: function (source) {
                        var index = $(source).attr('datagrid-row-index');
                        var tr1 = opts.finder.getTr(target, index, 'body', 1);
                        var tr2 = opts.finder.getTr(target, index, 'body', 2);
                        var p = $('<div style="z-index:9999999999999"></div>').appendTo('body');
                        tr2.clone().removeAttr('id').removeClass('droppable').appendTo(p);
                        tr1.clone().removeAttr('id').removeClass('droppable').find('td').insertBefore(p.find('td:first'));
                        $('<td><span class="tree-dnd-icon tree-dnd-no" style="position:static">&nbsp;</span></td>').insertBefore(p.find('td:first'));
                        p.find('td').css('vertical-align', 'middle');
                        p.hide();
                        return p;
                    },
                    deltaX: 15,
                    deltaY: 15,
                    onBeforeDrag: function (e) {
                        if (opts.onBeforeDrag.call(target, getRow(this)) == false) {
                            return false;
                        }
                        if ($(e.target).parent().hasClass('datagrid-cell-check')) {
                            return false;
                        }
                        if (e.which != 1) {
                            return false;
                        }
                        opts.finder.getTr(target, $(this).attr('datagrid-row-index')).droppable({accept: 'no-accept'});
                    },
                    onStartDrag: function () {
                        $(this).draggable('proxy').css({
                            left: -10000,
                            top: -10000
                        });
                        var row = getRow(this);
                        opts.onStartDrag.call(target, row);
                        state.draggingRow = row;
                    },
                    onDrag: function (e) {
                        var x1 = e.pageX, y1 = e.pageY, x2 = e.data.startX, y2 = e.data.startY;
                        var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                        if (d > 3) {	// when drag a little distance, show the proxy object
                            $(this).draggable('proxy').show();
                            var tr = opts.finder.getTr(target, parseInt($(this).attr('datagrid-row-index')), 'body');
                            $.extend(e.data, {
                                startX: tr.offset().left,
                                startY: tr.offset().top,
                                offsetWidth: 0,
                                offsetHeight: 0
                            });
                        }
                        this.pageY = e.pageY;
                    },
                    onStopDrag: function () {
                        for (var i = 0; i < state.disabledRows.length; i++) {
                            var index = dg.datagrid('getRowIndex', state.disabledRows[i]);
                            if (index >= 0) {
                                opts.finder.getTr(target, index).droppable('enable');
                            }
                        }
                        state.disabledRows = [];
                        var index = dg.datagrid('getRowIndex', state.draggingRow);
                        dg.datagrid('enableDnd', index);
                        opts.onStopDrag.call(target, state.draggingRow);
                    }
                }).droppable({
                    accept: 'tr.datagrid-row',
                    onDragEnter: function (e, source) {
                        if (opts.onDragEnter.call(target, getRow(this), getRow(source)) == false) {
                            allowDrop(source, false);
                            var tr = opts.finder.getTr(target, $(this).attr('datagrid-row-index'));
                            tr.find('td').css('border', '');
                            tr.droppable('disable');
                            state.disabledRows.push(getRow(this));
                        }
                    },
                    onDragOver: function (e, source) {
                        var targetRow = getRow(this);
                        if ($.inArray(targetRow, state.disabledRows) >= 0) {
                            return;
                        }
                        var pageY = source.pageY;
                        var top = $(this).offset().top;
                        var bottom = top + $(this).outerHeight();

                        allowDrop(source, true);
                        var tr = opts.finder.getTr(target, $(this).attr('datagrid-row-index'));
                        tr.children('td').css('border', '');
                        if (pageY > top + (bottom - top) / 2) {
                            tr.children('td').css('border-bottom', '1px solid red');
                        } else {
                            tr.children('td').css('border-top', '1px solid red');
                        }

                        if (opts.onDragOver.call(target, targetRow, getRow(source)) == false) {
                            allowDrop(source, false);
                            tr.find('td').css('border', '');
                            tr.droppable('disable');
                            state.disabledRows.push(targetRow);
                        }
                    },
                    onDragLeave: function (e, source) {
                        allowDrop(source, false);
                        var tr = opts.finder.getTr(target, $(this).attr('datagrid-row-index'));
                        tr.children('td').css('border', '');
                        opts.onDragLeave.call(target, getRow(this), getRow(source));
                    },
                    onDrop: function (e, source) {
                        var sourceIndex = parseInt($(source).attr('datagrid-row-index'));
                        var destIndex = parseInt($(this).attr('datagrid-row-index'));

                        var tr = opts.finder.getTr(target, $(this).attr('datagrid-row-index'));
                        var td = tr.children('td');
                        var point = parseInt(td.css('border-top-width')) ? 'top' : 'bottom';
                        td.css('border', '');

                        var rows = dg.datagrid('getRows');
                        var dRow = rows[destIndex];
                        var sRow = rows[sourceIndex];
                        if (opts.onBeforeDrop.call(target, dRow, sRow, point) == false) {
                            return;
                        }
                        insert();
                        opts.onDrop.call(target, dRow, sRow, point);

                        function insert() {
                            var row = $(target).datagrid('getRows')[sourceIndex];
                            var index = 0;
                            if (point == 'top') {
                                index = destIndex;
                            } else {
                                index = destIndex + 1;
                            }
                            if (index < sourceIndex) {
                                dg.datagrid('deleteRow', sourceIndex).datagrid('insertRow', {
                                    index: index,
                                    row: row
                                });
                                dg.datagrid('enableDnd', index);
                            } else {
                                dg.datagrid('insertRow', {
                                    index: index,
                                    row: row
                                }).datagrid('deleteRow', sourceIndex);
                                dg.datagrid('enableDnd', index - 1);
                            }
                        }
                    }
                });

                function allowDrop(source, allowed) {
                    var icon = $(source).draggable('proxy').find('span.tree-dnd-icon');
                    icon.removeClass('tree-dnd-yes tree-dnd-no').addClass(allowed ? 'tree-dnd-yes' : 'tree-dnd-no');
                }

                function getRow(tr) {
                    return opts.finder.getRow(target, $(tr));
                }
            });
        }

    });
//扩展验证
    $.extend($.fn.validatebox.defaults.rules, {
        cRemote: {
            validator: function (value, param) {
                var url = param[0];//uril
                var name = param[1];//
                var modelInfo = [];
                if (param[2]) {//选择器
                    var context = $(this).parents(".c8myform")
                    modelInfo = ko.c8GetFormModel({selector: param[2], context: context});
                }
                var p = '';
                if (modelInfo) {
                    for (var i in modelInfo) {
                        p += "&" + i + "=" + modelInfo[i];
                    }
                }
                var result = false;//encodeURI/encodeURIComponent
                var urlNew = url + '?' + name + '=' + value + p + "&randomid=" + Math.random();
                $.ajax({
                    type: "GET",
                    url: encodeURI(urlNew),
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
                    },
                    complete: function () {

                    }
                });
                return result;
            },
            message: '已经存在'
        },
        equals: {
            validator: function (value, param) {
                return value == $(param[0]).val();
            },
            message: '两次输入不一致'
        },
        notequals: {
            validator: function (value, param) {
                return value != $(param[0]).val();
            },
            message: '两次输入不一致'
        }
    });

  /*  *//**
     * menu方法扩展
     * @param {Object} jq
     * @param {Object} itemEl
     *//*
    $.extend($.fn.menu.methods, {
        *//**
         * 激活选项（覆盖重写）
         * @param {Object} jq
         * @param {Object} itemEl
         *//*
        enableItem : function(jq, itemEl) {
            return jq.each(function(){
                var jqElements = $(itemEl);
                var state = $.data(this, 'menu');
                if (jqElements.length > 0) {
                    jqElements.each(function(){
                        if ($(this).hasClass('menu-item-disabled')) {
                            for(var i=0; i<state._eventsStore.length; i++){
                                var itemData = state._eventsStore[i];
                                if(itemData.target == this){
                                    //恢复超链接
                                    if (itemData.href) {
                                        $(this).attr("href", itemData.href);
                                    }
                                    //回复点击事件
                                    if (itemData.onclicks) {
                                        for (var j = 0; j < itemData.onclicks.length; j++) {
                                            $(this).bind('click', itemData.onclicks[j]);
                                        }
                                    }
                                    //设置target为null，清空存储的事件处理程序
                                    itemData.target = null;
                                    itemData.onclicks = [];
                                    $(this).removeClass('menu-item-disabled');
                                }
                            }
                        }
                    });
                }
            });
        },
        *//**
         * 禁用选项（覆盖重写）
         * @param {Object} jq
         * @param {Object} itemEl
         *//*
        disableItem : function(jq, itemEl) {
            return jq.each(function() {
                var jqElements = $(itemEl);
                var state = $.data(this,'menu');
                if (jqElements.length > 0) {
                    if (!state._eventsStore)
                        state._eventsStore = [];
                    jqElements.each(function(){
                        if (!$(this).hasClass('menu-item-disabled')) {
                            var backStore = {};
                            backStore.target = this;
                            backStore.onclicks = [];
                            //处理超链接
                            var strHref = $(this).attr("href");
                            if (strHref) {
                                backStore.href = strHref;
                                $(this).attr("href", "javascript:void(0)");
                            }
                            //处理直接耦合绑定到onclick属性上的事件
                            var onclickStr = $(this).attr("onclick");
                            if (onclickStr && onclickStr != "") {
                                backStore.onclicks[backStore.onclicks.length] = new Function(onclickStr);
                                $(this).attr("onclick", "");
                            }
                            //处理使用jquery绑定的事件
                            var eventDatas = $(this).data("events") || $._data(this, 'events');
                            if (eventDatas["click"]) {
                                var eventData = eventDatas["click"];
                                for (var i = 0; i < eventData.length; i++) {
                                    if (eventData[i].namespace != "menu") {
                                        backStore.onclicks[backStore.onclicks.length] = eventData[i]["handler"];
                                        $(this).unbind('click', eventData[i]["handler"]);
                                        i--;
                                    }
                                }
                            }
                            //遍历_eventsStore数组，如果有target为null的元素，则利用起来
                            var isStored = false;
                            for(var j=0; j<state._eventsStore.length; j++){
                                var itemData = state._eventsStore[j];
                                if(itemData.target==null){
                                    isStored = true;
                                    state._eventsStore[j] = backStore;
                                }
                            }
                            //没有现成的，则push进去
                            if(isStored==false){
                                state._eventsStore[state._eventsStore.length] = backStore;
                            }
                            $(this).addClass('menu-item-disabled');
                        }
                    });
                }
            });
        }
    });*/

    //扩展编辑器增加和删除的方法
    $.extend($.fn.datagrid.methods, {
        addEditor : function(jq, param) {
            if (param instanceof Array) {
                $.each(param, function(index, item) {
                    var e = $(jq).datagrid('getColumnOption', item.field);
                    e.editor = item.editor;
                });
            } else {
                var e = $(jq).datagrid('getColumnOption', param.field);
                e.editor = param.editor;
            }
        },
        removeEditor : function(jq, param) {
            if (param instanceof Array) {
                $.each(param, function(index, item) {
                    var e = $(jq).datagrid('getColumnOption', item);
                    e.editor = {};
                });
            } else {
                var e = $(jq).datagrid('getColumnOption', param);
                e.editor = {};
            }
        }
    });
})(jQuery);

