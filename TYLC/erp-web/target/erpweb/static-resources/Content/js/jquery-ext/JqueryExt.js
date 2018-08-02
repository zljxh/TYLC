(function ($) {
    $.fn.c8Grid = function (gridmodel, data) {
        if (!gridmodel.c8type || gridmodel.c8type != "c8Grid") {
            alert("绑定类型不是c8Grid");
            debugger;
            return;
        }
        gridmodel.grid = this;
        if (data && data.model && data.model.c8win) {
            if (gridmodel.dataoptions.toolbar) {
                gridmodel.dataoptions.toolbar = "#" + data.model.c8win.c8GetWinId() + " " + gridmodel.dataoptions.toolbar;
            }
        }
        $(this).datagrid(gridmodel.dataoptions);
        $(this).datagrid("keyCtr");
        gridmodel.setWindowContext(window);
        gridmodel.pLoadData([]);
    }
    $.fn.c8TreeGrid = function (gridmodel, data) {
        if (!gridmodel.c8type || gridmodel.c8type != "c8TreeGrid") {
            alert("绑定类型不是c8TreeGrid");
            debugger;
            return;
        }
        gridmodel.grid = this;
        if (data && data.model && data.model.c8win) {
            if (gridmodel.dataoptions.toolbar) {
                gridmodel.dataoptions.toolbar = "#" + data.model.c8win.c8GetWinId() + " " + gridmodel.dataoptions.toolbar;
            }
        }
        $(this).treegrid(gridmodel.dataoptions);
        gridmodel.setWindowContext(window);
        gridmodel.pLoadData([]);
    }
    $.fn.c8Value = function (value) {
        $(this).val(value);
    }
    $.fn.c8GridPagination = function (gridmodel, data) {
        if (!gridmodel.c8type || gridmodel.c8type != "c8GridPagination") {
            alert("绑定类型不是c8GridPagination");
            debugger;
            return;
        }
        if (data && data.model && data.model.c8win) {
            if (gridmodel.dataoptions.toolbar) {
                var winid = "#" + data.model.c8win.c8GetWinId();
                if (gridmodel.dataoptions.toolbar.indexOf(winid) < 0) {
                    gridmodel.dataoptions.toolbar = winid + " " + gridmodel.dataoptions.toolbar;
                }
            }
        }
        $(this).datagrid(gridmodel.dataoptions);
        $(this).datagrid("keyCtr");
        var p = $(this).datagrid("getPager");
        $(p).pagination(gridmodel.paginationoptions);
        gridmodel.grid = this;
        gridmodel.pagination = p;
        gridmodel.setWindowContext(window);
        //gridmodel.pLoadData([]);
    }
    $.fn.bootstrapTableModel = function (gridmodel, data) {
        if (!gridmodel.c8type || gridmodel.c8type != "BootstrapTableModel") {
            alert("绑定类型不是bootstrapTableModel");
            debugger;
            return;
        }
        $(this).bootstrapTable(gridmodel.dataoptions);
        gridmodel.grid = this;
        gridmodel.setWindowContext(window);
    };
    $.fn.bootstrapTableNoPaginationModel = function (gridmodel, data) {
        if (!gridmodel.c8type || gridmodel.c8type != "BootstrapTableNoPaginationModel") {
            alert("绑定类型不是bootstrapTableNoPaginationModel");
            debugger;
            return;
        }
        $(this).bootstrapTable(gridmodel.dataoptions);
        gridmodel.grid = this;
        gridmodel.setWindowContext(window);
    };
    $.fn.customUniqueIdBootstrapTableModel = function (gridmodel, data) {
        if (!gridmodel.c8type || gridmodel.c8type != "CustomUniqueIdBootstrapTableModel") {
            alert("绑定类型不是bustomUniqueIdBootstrapTableModel");
            debugger;
            return;
        }
        $(this).bootstrapTable(gridmodel.dataoptions);
        gridmodel.grid = this;
        gridmodel.setWindowContext(window);
    };
    $.fn._click = $.fn.click;
    $.fn.c8click = function (f) {
        if ($(this).length == 1) {
            $(this).attr("c8Text", $.trim($(this).text()))
        }
        $(this).unbind("click");
        var result = $(this).attr("c8disabled");
        if (result == "true") {
            return $(this).c8disabled();
        }
        else {
            var butClass = $(this).attr("class");
            if (butClass && butClass.indexOf('easyui-linkbutton') > -1) {
                //是否自动禁用启用按钮
                var autoDisabledAttr = $(this).attr("auto-disabled");
                var autoDisabled = true;
                if (autoDisabledAttr != null && autoDisabledAttr == "false") {
                    autoDisabled = false;
                }
                return $(this)._click(function () {
                    try {
                        if (autoDisabled) {
                            setTimeout($.proxy(function () {
                                $(this).linkbutton("disable");
                            }, this), 0);
                        }
                        f.call();
                    } catch (err) {
                        $.customerAlert('前端错误：[' + err.name + ']' + err.message, false);
                    } finally {
                        if (autoDisabled) {
                            setTimeout($.proxy(function () {
                                $(this).linkbutton("enable");
                            }, this), 500);
                        }
                    }

                });
            }else if (butClass && butClass.indexOf('btn-customer') > -1) {
                //是否自动禁用启用按钮
                var autoDisabledAttr = $(this).attr("auto-disabled");
                var autoDisabled = true;
                if (autoDisabledAttr != null && autoDisabledAttr == "false") {
                    autoDisabled = false;
                }
                return $(this)._click(function () {
                    try {
                        if (autoDisabled) {
                            setTimeout($.proxy(function () {
                                $(this).attr("disabled","disabled");
                            }, this), 0);
                        }
                        f.call();
                    } catch (err) {
                        $.customerAlert('前端错误：[' + err.name + ']' + err.message, false);
                    } finally {
                        if (autoDisabled) {
                            setTimeout($.proxy(function () {
                                $(this).removeAttr("disabled");
                            }, this), 500);
                        }
                    }

                });
            }
            else {
                return $(this)._click(f);
            }
        }
    }
    $.fn.c8enter = function (f) {
        return $(this).bind('keydown', function (e) {
            if (e.keyCode == 13) {	// when press ENTER key, accept the inputed value.
                f.call(this, e);
            }
        });
    }

    $.fn.click = function (f) {
        return $(this).c8click(f);
    }
    $.fn.c8disabled = function () {
        var className = $(this).attr("class");
        if (!className) return;
        if (className.indexOf("menu-item") >= 0) {
            return $(this).parent().menu("disableItem", this);
        }else if (className.indexOf("btn-customer") >= 0) {
            if($(this).prop('tagName')=="A") {
                $(this).css("pointer-events","none");
                return $(this).parent().addClass("disabled");
            }else if($(this).prop('tagName')=="BUTTON") {
                return $(this).prop("disabled","disabled");
            }
        }
        else {
            return $(this).linkbutton("disable");
        }
    }
    $.fn.c8enable = function (isEnable) {
        var result = $(this).attr("c8disabled");

        if (result == "true") {
            return;
        }
        if (!isEnable) {
            $(this).c8disabled();
            return
        }
        var className = $(this).attr("class");
        if (!className) return;
        if (className.indexOf("menu-item") >= 0) {
            return $(this).parent().menu("enableItem", this);
        }else if (className.indexOf("btn-customer") >= 0) {
            if($(this).prop('tagName')=="A") {
                $(this).css("pointer-events","auto");
                return $(this).parent().removeClass("disabled");
            }else if($(this).prop('tagName')=="BUTTON") {
                return $(this).removeProp("disabled");
            }
        }else {
            return $(this).linkbutton("enable");
        }
    }

    $.fn.c8FormBox = function (p) {
        var element = $(this)
        if (!element.attr("c8ECName")) {
            ko.c8LoadFormBox(element);
        }
        if (!element.attr("c8ECName")) return null;
        return element[element.attr("c8ECName")](p);
    }
    $.fn.c8ReadonlyFormBox = function (readonly) {
        return $(this).c8FormBox({readonly: readonly});
    }
    $.fn.c8EnterFormBox = function (f) {
        var txt = $(this).c8FormBox("textbox");
        txt.c8enter(f);
    }
    $.fn.c8FocusFormBox = function () {
        var txt = $(this).c8FormBox("textbox");
        if (txt) {
            txt.focus();
        }
        else {
            $(this).focus();
        }
    }
    $.fn.getMenuContent = function () {
        var url = window.location.href;
        url = url.substring(url.lastIndexOf('/') + 1, url.length).replace("#", "");
        var result = null;
        $.ajax({
            type: "get",
            url: "/OperatorMenuDefaultQuery/getByMenuName?MenuName=" + url + "&randomid=" + Math.random(),
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                return null;
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result
    }
    $._ajax = $.ajax;
    $.ajax = function (p) {
        /*var error = p.error;
        p.error = function (e) {
            alert(e);
        };*/
        return $._ajax(p);
    }
    $.fn.threeStateCheckbox = function (state) {
        //default,check,uncheck
        $.each(this, function (i, item) {
            $(item).prop('readonly', 'readonly');
            var state1 = state;
            if (state1 == undefined) {
                state1 = $(item).attr('check');
            }
            state1 = state1 || 'default';
            if (state1 == 'default') {
                $(item).attr('class', 'default-checkbox');
            } else if (state1 == 'check') {
                $(item).attr('class', 'check-checkbox');
            } else if (state1 == 'uncheck') {
                $(item).attr('class', 'unchk-checkbox');
            }
            $(item).click(function () {
                var cla = $(this).attr('class');
                if (cla.indexOf('default-checkbox') > -1) {
                    $(item).addClass('check-checkbox');
                    $(this).removeClass('default-checkbox');
                } else if (cla.indexOf('check-checkbox') > -1) {
                    $(this).addClass('unchk-checkbox');
                    $(this).removeClass('check-checkbox');
                } else if (cla.indexOf('unchk-checkbox') > -1) {
                    $(this).addClass('default-checkbox');
                    $(this).removeClass('unchk-checkbox');
                }
            })
        });

    }
    $.myBrowser = function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            return "Op"
        }
        ; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            return "FF";
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1) {
            return "Ch";
        }
        if (userAgent.indexOf("Safari") > -1) {
            return "Sf";
        } //判断是否Safari浏览器
        if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
            return "IE";
        }
        if (userAgent.indexOf("/Trident/i")) {
            return "IE";
        }
        ; //判断是否IE浏览器
    }
    var dynamicLoading = {
        css: function (path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.href = path;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            head.appendChild(link);
        },
        js: function (path) {
            if (!path || path.length === 0) {
                throw new Error('argument "path" is required !');
            }
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.src = path;
            script.type = 'text/javascript';
            head.appendChild(script);
        }
    };
    $.dynamicLoading = dynamicLoading;

    //上传预览
    $.uploadPreview = function (setting) {
        new uploadPreview(setting);
    }
    //js导出txt文件
    $.jsExprotTxt = function (data, fileName) {
        var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        saveAs(blob, fileName + ".txt");
    }

    //jquery-confirm插件默认设置
    if (!jconfirm.defaults) {
        jconfirm.defaults = {};
    }
    $.extend(jconfirm.defaults, {
        title: false,
        confirmButton: '确定',
        cancelButton: '取消',
        confirmButtonClass: 'btn-primary',
        cancelButtonClass: 'btn-default',
        keyboardEnabled: true,
        closeIcon: true,
        theme: 'white'
    });
    /*alert提示框
     *content:内容
     *backgroudClick：点击背景是否关闭窗口，默认关闭
     *也可以只传入一个参数，直接传入json对象：{title:'提示',confirmButton: 'ok',content:'请选择行'},具体参考confirm插件的option*/
    $.customerAlert = function (content, backgroudClick) {
        var options;
        if (typeof content === 'undefined') {
            options = {backgroundDismiss: true};
        } else if (typeof content === 'string') {
            options = {
                content: content,
                backgroundDismiss: (typeof backgroudClick === 'undefined') ? true : backgroudClick
            };
        } else {
            options = content;
        }
        var customerWindow = window;
        //if (window.parent)customerWindow = window.parent;
       return customerWindow.$.alert(options);
    }

    /*confirm提示框
     *content：内容
     *confirmCallback：点击确定按钮的回调函数
     *cancelCallback：点击取消按钮的回调函数
     *也可以只传入一个参数，直接传入json对象：{title:'提示',confirmButton: 'ok',content:'请选择行'},具体参考confirm插件的option*/
    $.customerConfirm = function (content, confirmCallback, cancelCallback) {
        var options;
        if (typeof content === 'undefined') {
            options = {backgroundDismiss: true};
        } else if (typeof content === 'string') {
            options = {
                content: content,
                confirm: confirmCallback,
                cancel: cancelCallback
            };
        } else {
            options = content;
        }
        var customerWindow = window;
        //if (window.parent)customerWindow = window.parent;
        customerWindow.$.confirm(options);
    }

    /*弹出js框*/
    $.customerDialog = function (title,content, confirmCallback , cancelCallback,openCallback) {
        var options;
        if (typeof title === 'undefined') {
            options = {backgroundDismiss: true};
        } else if (typeof title === 'string') {
            options = {
                title:title,
                content: content,
                confirm: confirmCallback,
                cancel: cancelCallback,
                onOpen: openCallback,

            };
        } else {
            options = title;
        }
        var customerWindow = window;
        //if (window.parent)customerWindow = window.parent;
        customerWindow.$.confirm(options);
    }

    /*弹出进度条*/
    var currentProgress;
    $.alertProgress=function(content,handler){
        currentProgress= $.customerAlert({
            title: false,
            keyboardEnabled: false,
            closeIcon: false,
            backgroundDismiss: false,
            cancelButton: false,
            confirmButton: false,
            columnClass: 'col-md-4 col-md-offset-4',
            theme: 'white',
            content: '<div class="media"><div class="media-body"><h5 class="media-heading">'+content+'</h5><div class="progress" style="width: 350px;"><div class="progress-bar progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%"> </div></div></div></div>'
        });
        if(handler) {
            setTimeout(handler, 50);
        }
        return currentProgress;
    }
    $.closeProgress=function(){
        if(currentProgress){
            currentProgress.close();
            currentProgress=null;
        }
    }

    /*
    *labelList 对象集合
    * labelStr 作为单选按钮描述的属性
    * valueStr 作为单选按钮返回值的属性
    * clickCallbackFullName 方法全名（例子：opModel.testClass.testFuction）
    * checkValue 初始化时单选按钮组被选中的返回值
    * defaultName 默认单选按钮的描述
    * defaultValue 默认单选按钮的返回值
     */
    $.customerRadioDialog = function(labelList, labelStr, valueStr, clickCallbackFullName, checkValue, defaultName, defaultValue){
        var content = "";
        var unCheck = true;
        if(labelList instanceof Array && labelList.length > 0 && typeof clickCallbackFullName === "string"){
            var isFirst = true;
            labelList.forEach(function(item, index, array){
                if(labelStr in item && valueStr in item){
                    content += "<label style='width: 100%;padding:2px;'><input type='radio' class='checkbox-customer' onClick='" + clickCallbackFullName + "( " + index + ", \"" + item[valueStr] + "\");'";
                    if(checkValue){
                        if(checkValue == item[valueStr]){
                            content += "checked";
                            unCheck = false;
                        }
                    } else if(!checkValue && !defaultName && isFirst) {
                        content += "checked";
                        unCheck = false;
                        isFirst = false;
                    }
                    content += ">" + item[labelStr] + "</label>";
                }
            });
            if(defaultName){
                var defaultHtmlStr = "<label style='width: 100%;padding:2px;'><input type='radio' class='checkbox-customer' onClick='" + clickCallbackFullName + "(-1, \"" + defaultValue + "\");'";
                if(unCheck){
                    defaultHtmlStr += "checked";
                }
                defaultHtmlStr += ">" + defaultName + "</label>";
                content = defaultHtmlStr + content;
            }
            content = "<div>" + content + "</div>";
            return $.confirm({
                columnClass: 'col-md-2 col-md-offset-5',
                confirmButton: false,
                cancelButton: false,
                content:content
            });
        }
    };
})(jQuery);
