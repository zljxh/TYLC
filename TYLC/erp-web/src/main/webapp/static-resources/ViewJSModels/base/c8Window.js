c8.c8Window = function (winParemater) {
    /*{isShowParent=true,//是否在父窗体显示
     // url=""  窗体地址
     windowId=""  窗体唯一标识
     c8IsBindEnter  表单控件是否绑定回车时间 自动跳转
     c8OnOpen 打开页面后
     c8OnClose 关闭页面后
     }*/

    var winContext = window;
    if (winParemater.isShowParent) {
        //winContext = window.parent;
    }
    this.saveCallBack = null;//关闭后触发。
    this.c8OnOpen = winParemater["c8OnOpen"];
    this.c8OnClose = winParemater["c8OnClose"];
    //解析完成事件
    this.c8OnComplete = winParemater["c8OnComplete"];
    this.c8IsBindEnter = winParemater["c8IsBindEnter"];
    if (!winParemater.url) {
        alert("url不能为空");
    }
    var isLoadEdit = false;
    winParemater.windowId = winParemater.windowId || "c8";
    this.winParemater = winParemater;
    var regS = new RegExp("/", "gi");
    var urlstr1 = winParemater.url.replace(regS, "");
    var index = urlstr1.indexOf("?");
    if (index > 0) urlstr1 = urlstr1.substr(0, index);
    var parentWinDivId = "_c8Win" + urlstr1 + winParemater.windowId + $.c8help.mathRand();
    var winId = parentWinDivId + "dialog";

    var getParentWinDivId = function () {
        return parentWinDivId;
    }
    var base = this;
    var createDiv = function (divId, parentDiv) {
        var div = base.c8GetWindowContext().$("#" + divId, parentDiv);
        if (!div[0]) {
            base.c8GetWindowContext().$(parentDiv).append("<div style='display: none'  id='" + divId + "'/>");
        }
    }

    this.openWin = function (callback) {
        this.saveCallBack = callback;
        loadWin();
        base.c8GetWindowContext().$("#" + getWinId()).dialog('open');
        resize();
        if (this.c8OnOpen)this.c8OnOpen(winParemater.model);
    }
    var IsResize = false;

    function resize() {
        if (IsResize) return;
        resizelabel();
        resizec8colspan();
        resizeWin();
        IsResize = true;
    }

    function resizelabel() {
        base.c8GetWindowContext().ko.c8resizelabel(".c8myform .fitem label", base.c8GetContext());
        //label begin
        //var labelList = base.c8GetElementListBySelector(".c8myform .fitem label");
        //var width = 0;
        //var count = labelList.length;
        //for (var i = 0; i < count; i++) {
        //    var w = $(labelList[i]).width();
        //    if (w > width) width = w;
        //}
        //labelList.width(width);
        //label  end
    }

    function resizec8colspan() {
        //c8colspan begin
        var inputList = base.c8GetElementListBySelector(".c8myform .fitem [c8colspan]");
        var inputCount = inputList.length;
        var item = base.c8GetElementListBySelector('.c8myform .fitem:first');
        var itemWidth = item.outerWidth(true);
        for (var i = 0; i < inputCount; i++) {
            var txt = base.c8GetWindowContext().$(inputList[i]);//.attr("c8colspan")
            var c8colspan = txt.attr("c8colspan");
            if (c8colspan) {
                txt.textbox("resize", txt.width() + (c8colspan - 1) * itemWidth);
            }
        }
        //c8colspan end
    }

    function resizeWin() {
        //win begin
        var pWin = base.c8GetContext();
        var c8columnsElement = base.c8GetElementListBySelector("[c8columns]:first")
        var c8columns = c8columnsElement.attr("c8columns");
        if (c8columns) {
            var item = base.c8GetElementListBySelector('.c8myform .fitem:first');
            var pwinWidth = item.outerWidth(true) * c8columns + 15;
            var win = base.c8GetElementListBySelector("#" + getWinId());
            win.window('resize', {width: pwinWidth, height: 'auto'});
            win.window("center");
        }
        //win end
    }

    this.setTitle = function (title) {
        base.c8GetWindowContext().$("#" + getWinId()).dialog('setTitle', title);
    }
    this.getWinContext = function () {
        return winContext;
    }


    this.closeWin = function (data) {
        formModel = {};
        if (this.saveCallBack)this.saveCallBack(data);
        base.c8SetFormModel({model: formModel});
        // base.closeProgress();
        base.getWinContext().$("#" + getWinId()).dialog('close');
        if (this.c8OnClose)this.c8OnClose(data);
    }
    this.validate = function () {
        var isValid = base.c8GetWindowContext().$("#" + getWinId() + " form").form('validate');
        return isValid && base.c8CustomerValidate($("#" + getWinId() + " form"));
    }
    var getWinId = function () {
        return winId;
    }
    this.c8GetWinId = function () {
        return getWinId();
    }
    this.c8BindingWin = function (model) {
        if (!model) {
            return;
        }
        model.c8win = this;
        if (isLoadEdit) {
            this._c8BindingWin(model);
        }
        else {
            winParemater.model = model;
            loadWin();
            // this._c8BindingWin(model);
        }

    }
    this._c8BindingWin = function (model) {
        if (!model) return;
        model.c8win = this;
        if (!model.closeDialog) {
            model.closeDialog = this.closeWin;
        }
        model.c8WindowId = getWinId();
        base.c8GetWindowContext().ko.c8BindingViewModel(model, this.c8GetContext());//绑定模型
    }
    var loadElement = function () {
        if (base.c8GetWindowContext().$("#" + getWinId()).length <= 0) {
            createDiv("parentWin", base.c8GetWindowContext().document.body);
            createDiv(getParentWinDivId(), base.c8GetWindowContext().$("#parentWin"));
            loadUrl();
            base.c8GetWindowContext().$("#" + getParentWinDivId() + " .easyui-dialog").attr('id', getWinId());
            base.c8GetWindowContext().$.parser.onComplete = function () {
                if (base.c8OnComplete) {
                    base.c8OnComplete(base);
                }

            };
            base.c8GetWindowContext().$.parser.parse("#" + getParentWinDivId());
        }
        else {
            base.c8GetWindowContext().$("#" + getWinId()).parent().empty();
            loadElement();
        }
    }
    var getIsLoadEdit = function () {
        return isLoadEdit;
    }
    var loadWin = function () {
        LoadWindowContext();
        if (!getIsLoadEdit()) {
            isLoadEdit = true;
            loadElement();
            base.c8BindingWin(winParemater.model);
            base.c8GetWindowContext().ko.c8LoadControl(base.c8GetContext());
            base.c8GetWindowContext().ko.c8LoadSelect2Control(base.c8GetContext());
            if (base.c8IsBindEnter) {
                base.c8BindEnter();
            }
        }
    }
    //var formModel={};
    this.c8SetFormModel = function (p) {
        loadWin();
        p.context = p.context || base.c8GetContext();//  base.c8GetWindowContext().$("#"+getWinId());
        //formModel= p.model||{};
        base.c8GetWindowContext().ko.c8SetFormModel(p);
    }
    this.c8GetFormModel = function (p) {
        p = p || {};
        p.context = p.context || base.c8GetContext();
        p.model = p.model || {};
        var g = base.c8GetWindowContext().ko.c8GetFormModel(p);
        var delArr = new Array();
        for (var p in  g) {

            if (g[p]  instanceof Array) {
                if (g[p].length == 1 && g[p][0] == "") {
                    delArr.push(p);
                }
            }

        }
        if (delArr != null && delArr.length > 0) {
            for (var a in delArr) {
                g[delArr[a]] = undefined;
            }
        }
        return g;
    }
    this.c8SetViewTextModel = function (p) {
        p = p || {};
        p.context = p.context || base.c8GetWindowContext().$("#" + getWinId());
        return base.c8GetWindowContext().ko.c8SetViewTextModel(p);
    }
    this.c8SetElementsAttr = function (p) {
        p = p || {};
        p.context = p.context || base.c8GetContext();
        return base.c8GetWindowContext().ko.c8SetElementsAttr(p);
    }
    this.c8hide = function (selector) {
        selector = selector || "[c8hide]";
        this.c8SetElementsAttr({
            selector: selector, callBack: function (element) {
                base.getWinContext().$(element).hide();
            }
        });
    };
    this.c8show = function (selector) {
        selector = selector || "[c8hide]";
        this.c8SetElementsAttr({
            selector: selector, callBack: function (element) {
                base.getWinContext().$(element).show();
            }
        });
    };
    this.openProgress = function () {
        base.c8GetWindowContext().$.messager.progress({
            title: '请稍等...',
            msg: '正在努力加载...'
        });
    }
    this.closeProgress = function () {
        base.c8GetWindowContext().$.messager.progress('close');
    }

    var loadUrl = function (callback) {
        $.ajax({
            type: "get",
            url: winParemater.url,
            async: false,
            contentType: "text/html",
            success: function (data) {
                //  base.closeProgress();
                base.c8GetWindowContext().$("#" + getWinId()).parents(".window").remove().remove(".window");
                var dlgO = base.c8GetWindowContext().$("#" + getParentWinDivId())
                base.c8GetWindowContext().$(dlgO).html(data);
                if (callback) {
                    callback();
                }
            },
            error: function (e) {
                // base.closeProgress();
                alert(e.responseText);
            },
            beforeSend: function () {
                // base.openProgress();
            },
            complete: function () {
                // base.closeProgress();
            }
        });
    }
    this.c8GetContext = function () {
        return base.c8GetWindowContext().$("#" + getWinId()).parent();
    }
    var IsParentOpen = false;
    var LoadWindowContext = function () {
        var globalInfo = null;
        if (window.parent) {
            if (window.parent.getGlobalInfo) {
                globalInfo = window.parent.getGlobalInfo();
            }
        }
        if (!globalInfo || globalInfo.IsFullScreen) {
            if (IsParentOpen) isLoadEdit = false;
            winContext = window;
            IsParentOpen = false;
        }
        else {
            if (winParemater.isShowParent) {
                if (!IsParentOpen) isLoadEdit = false;
                winContext = window;
                //winContext = window.parent;
                IsParentOpen = true;
            }
        }
    }
    this.c8GetWindowContext = function () {
        return winContext;
    }
    this.c8GetElementListBySelector = function (selector, context) {
        context = context || this.c8GetContext();
        return base.c8GetWindowContext().$(selector, context);
    }
    this.c8OpenWin = function (callback) {
        this.openWin(callback);
    };
    this.c8CloseWin = function (data) {
        this.closeWin(data);
    };
    this.c8messager = function () {
        return base.c8GetWindowContext().$.messager;
    }
    this.alert = function (msg) {
        alert(msg);
    }
    //回车自动跳转的下一个控件
    this.c8BindEnter = function (inputList, context) {
        inputList = inputList || this.c8GetElementListBySelector(ko.c8GetFormDefaultSelector(), context).not("input[type='hidden']");
        base.c8GetWindowContext().ko.c8BindEnterWrap(inputList);
    }
    //设置只读inputList= {c8name1:true,c8name2:true}
    this.c8SetReadonly = function (inputList, context) {
        context = context || base.c8GetContext();
        base.c8GetWindowContext().ko.c8SetReadonly(inputList, context);
    }
    this.c8formvalidateBySelector = function (selector, context) {
        context = context || this.c8GetContext();
        var form = base.c8GetWindowContext().$(selector, context);
        var valie = form.form('validate') && base.c8CustomerValidate(context);
        if (!valie) {
            ko.c8showMessage('warn', '信息填写不完整!');
            return false;
        }
        return true;
    }
    this.getBase = function () {
        return base;
    };

    this.c8CustomerValidate = function (context) {
        var list = $('.select2-hidden-accessible', context);
        var valid = true;
        $.each(list, function (i, item) {
            var $item = $(item);
            if ("required" == $item.attr("required")) {
                var val = $item.val();
                var selection = $item.next().find('.select2-selection');
                if (undefined == val || "" == val) {
                    valid = false;
                    selection.addClass('select2-error');
                } else {
                    selection.removeClass('select2-error');
                }
            }
        });
        return valid;
    }
};
c8.c8Window.prototype.c8FormBox = function (c8Name, p, context) {
    context = context || this.c8GetContext();
    var inputElemetet = this.c8GetElementByC8Name(c8Name, context);
    return this.c8GetWindowContext().$(inputElemetet).c8FormBox(p);
}
c8.c8Window.prototype.c8GetElementByC8Name = function (c8Name, context) {
    context = context || this.c8GetContext();
    var inputElemetet = this.c8GetElementListBySelector("input[c8name='" + c8Name + "']", context);
    return inputElemetet;
}
