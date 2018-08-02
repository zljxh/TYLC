(function ($, ko) {
    var jqElement = function (element) {
        var jq = $(element);
        if ($(document).find(element).length == 0) {  //处理元素在父页面执行的情况
            if ($(parent.document).find(element).length > 0)
                jq = parent.$(element);
        }
        return jq;
    };
    //bindingViewModel
    ko.bindingViewModel = function (viewModelInstance, node, callback) {
        //using('parser', function () {
        $.parser.onComplete = function () {
            ko.applyBindings(viewModelInstance, node || document.body);
            if (callback) callback();
        };
        // });
    };
    ko.bindingHandlers.cdatagrid = {
        init: function (element, valueAccessor) {
            var valueUnwrapped = ko.utils.unwrapObservable(valueAccessor());
            // Get the current value of the current property we're bound to
            // debugger;
            $(element).datagrid(valueUnwrapped.dataoptions);
            var p = $(element).datagrid("getPager");
            $(p).pagination(valueUnwrapped.paginationoptions);
            valueUnwrapped.grid = element;
            valueUnwrapped.pagination = p;
        },
        update: function (element, valueAccessor, allBindingsAccessor) {
            //// First get the latest data that we're bound to
            //var value = valueAccessor(), allBindings = allBindingsAccessor();

            //// Next, whether or not the supplied model property is observable, get its current value
            //var valueUnwrapped = ko.utils.unwrapObservable(value);

            //// Grab some more data from another binding property
            //var pagination = allBindings.pagination || {};

            //// 400ms is default duration unless otherwise specified

            //// Now manipulate the DOM element

            //$(element).datagrid(valueUnwrapped.dataoptions);
            //var p = $(element).datagrid("getPager");
            //$(p).pagination(valueUnwrapped.paginationoptions);
            //valueUnwrapped.grid = element;
            //valueUnwrapped.pagination = p;
        }
    };
    ko.bindingHandlers['esValue'] = {
        'after': ['options', 'foreach'],
        'init': function (element, valueAccessor, allBindings) {
            // Always catch "change" event; possibly other events too if asked
            var eventsToCatch = ["change"];
            var requestedEventsToCatch = allBindings.get("valueUpdate");
            var propertyChangedFired = false;
            if (requestedEventsToCatch) {
                if (typeof requestedEventsToCatch == "string") // Allow both individual event names, and arrays of event names
                    requestedEventsToCatch = [requestedEventsToCatch];
                ko.utils.arrayPushAll(eventsToCatch, requestedEventsToCatch);
                eventsToCatch = ko.utils.arrayGetDistinctValues(eventsToCatch);
            }

            var valueUpdateHandler = function () {
                propertyChangedFired = false;
                var modelValue = valueAccessor();
                // var elementValue = ko.selectExtensions.readValue(element);
                var elementValue = jq[o.type](element.getter);
                ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'value', elementValue);
            }

            // Workaround for https://github.com/SteveSanderson/knockout/issues/122
            // IE doesn't fire "change" events on textboxes if the user selects a value from its autocomplete list
            var ieAutoCompleteHackNeeded = ko.utils.ieVersion && element.tagName.toLowerCase() == "input" && element.type == "text"
                && element.autocomplete != "off" && (!element.form || element.form.autocomplete != "off");
            if (ieAutoCompleteHackNeeded && ko.utils.arrayIndexOf(eventsToCatch, "propertychange") == -1) {
                ko.utils.registerEventHandler(element, "propertychange", function () {
                    propertyChangedFired = true
                });
                ko.utils.registerEventHandler(element, "focus", function () {
                    propertyChangedFired = false
                });
                ko.utils.registerEventHandler(element, "blur", function () {
                    if (propertyChangedFired) {
                        valueUpdateHandler();
                    }
                });
            }

            ko.utils.arrayForEach(eventsToCatch, function (eventName) {
                // The syntax "after<eventname>" means "run the handler asynchronously after the event"
                // This is useful, for example, to catch "keydown" events after the browser has updated the control
                // (otherwise, ko.selectExtensions.readValue(this) will receive the control's value *before* the key event)
                var handler = valueUpdateHandler;
                if (ko.utils.stringStartsWith(eventName, "after")) {
                    handler = function () {
                        setTimeout(valueUpdateHandler, 0)
                    };
                    eventName = eventName.substring("after".length);
                }
                ko.utils.registerEventHandler(element, eventName, handler);
            });
        },
        'update': function (element, valueAccessor, allBindings) {
            var newValue = ko.utils.unwrapObservable(valueAccessor());
            var elementValue = ko.selectExtensions.readValue(element);
            var valueHasChanged = (newValue !== elementValue);

            if (valueHasChanged) {
                if (ko.utils.tagNameLower(element) === "select") {
                    var allowUnset = allBindings.get('valueAllowUnset');
                    var applyValueAction = function () {
                        ko.selectExtensions.writeValue(element, newValue, allowUnset);
                    };
                    applyValueAction();

                    if (!allowUnset && newValue !== ko.selectExtensions.readValue(element)) {
                        // If you try to set a model value that can't be represented in an already-populated dropdown, reject that change,
                        // because you're not allowed to have a model value that disagrees with a visible UI selection.
                        ko.dependencyDetection.ignore(ko.utils.triggerEvent, null, [element, "change"]);
                    } else {
                        // Workaround for IE6 bug: It won't reliably apply values to SELECT nodes during the same execution thread
                        // right after you've changed the set of OPTION nodes on it. So for that node type, we'll schedule a second thread
                        // to apply the value as well.
                        setTimeout(applyValueAction, 0);
                    }
                } else {
                    ko.selectExtensions.writeValue(element, newValue);
                }
            }
        }
    };
    //value
    ko.creatEasyuiValueBindings = function (o) {
        o = $.extend({
            type: '',
            event: '',
            getter: 'getValue',
            setter: 'setValue',
            fix: $.noop,
            formatter: function (v) {
                return v;
            }
        }, o);
        var writeValueToProperty = function (property, allBindings, key, value, checkIfDifferent) {
            if (!property || !ko.isObservable(property)) {
                var propWriters = allBindings.get('_ko_property_writers');
                if (propWriters && propWriters[key])
                    propWriters[key](value);
            } else if (ko.isWriteableObservable(property) && (!checkIfDifferent || property.peek() !== value)) {
                property(value);
            }
        }
        var customBinding = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var jq = jqElement(element), handler = jq[o.type]('options')[o.event], opt = {};

                //debugger;
                //handle the field changing
                opt[o.event] = function () {
                    handler.apply(element, arguments);
                    var elementValue = jq[o.type](o.getter);
                    if (valueAccessor() == null) throw "viewModel中没有页面绑定的字段";
                    valueAccessor()(elementValue);
                    //var modelValue = valueAccessor();;
                    //writeValueToProperty(modelValue, allBindingsAccessor,o.type+"Value", elementValue);
                };

                //handle disposal (if KO removes by the template binding)
                ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                    jq[o.type]("destroy");
                });

                o.fix(element, valueAccessor);
                jq[o.type](opt);
            },
            update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

                value = ko.utils.unwrapObservable(valueAccessor());
                jqElement(element)[o.type](o.setter, o.formatter(value));
            }
        };
        ko.bindingHandlers[o.type + 'Value'] = customBinding;
    };
//    ko.creatEasyuiValueBindings({ type: 'combogrid', event: 'onChange' });
//    ko.creatEasyuiValueBindings({ type: 'combobox', event: 'onChange' });
//    ko.creatEasyuiValueBindings({ type: 'combotree', event: 'onChange' });
//    ko.creatEasyuiValueBindings({ type: 'datebox', event: 'onChange' });
//    ko.creatEasyuiValueBindings({ type: 'lookup', event: 'onChange' });
//    ko.creatEasyuiValueBindings({ type: 'numberbox', event: 'onChange' });
//    ko.creatEasyuiValueBindings({ type: 'textbox', event: 'onChange' });
//    ko.creatEasyuiValueBindings({ type: 'numberspinner', event: 'onChange', fix: function (element) { $(element).width($(element).width() + 20); } });
    ko.c8LoadControl = function (context) {
        var c = new com.qiansheng.control();
        c.loadControl(context);
    }
    ko.c8LoadSelect2Control = function (context) {
        var select2=new com.select2.control();
        select2.loadControl(context);
    }
    ko.c8RefreshControl = function (el) {
        var c = new com.qiansheng.control();
        c.c8refreshControl(el);
        var select2=new com.select2.control();
        select2.c8refreshControl(el);
    }
    ko.c8GetFormDefaultSelector = function () {
        return "a[c8name],input[c8name],select[c8name],textarea[c8name],label[c8name]";
    };
    ko.c8GetFormName = function (element) {
        var name = $(element).attr("c8name");
        if (!name) {
            name = $(element).attr("name");
        }
        return name;
    };
    ko.c8GetFormModel = function (p) {
        if (!p.context) {
            p.context = $(".c8myform");
        }
        return ko.c8GetModel(p);
    }

    ko.c8SetFormModel = function (p) {
        if (!p.context) {
            p.context = $(".c8myform");
        }
        return ko.c8SetModel(p);
    }
    ko.c8SetFormQueryModel = function (p) {
        if (!p.context) {
            p.context = $(".filterclass");
        }
        return ko.c8SetModel(p);
    }
    ko.c8GetModel = function (p) {
        //p={model:null,selector:null,context:null}
        var modelInfo = {};
        var selector = ko.c8GetFormDefaultSelector();
        var context = null;
        var isreturnnull = false;//是否返回空字符串
        if (p) {
            modelInfo = p["model"] || modelInfo;
            selector = p["selector"] || selector;
            context = p["context"] || context;
            isreturnnull = p["isreturnnull"] || isreturnnull;
        }
        var elementList = null;
        if (context) {
            elementList = $(selector, context);
        }
        else {
            elementList = $(selector);
        }

        for (var i = 0; i < elementList.length; i++) {
            var element = elementList[i];
            if (element) {
                var inputValue = null;
                var c = $(element).attr("class");
                var name = ko.c8GetFormName(element);
                if (!c) {
                    inputValue = $(element).val();
                    if (inputValue != undefined && inputValue != '') {
                        inputValue = $.trim(inputValue);
                    }
                    if ($(element).prop("type") == 'checkbox') {
                        if ($(element).prop("checked")) {
                            inputValue = 1;
                        }
                        else {
                            inputValue = 0;
                        }
                    }
                }
                else if (c.indexOf("easyui-textbox") > -1) {
                    inputValue = $(element).textbox("getValue");
                    if (inputValue != undefined && inputValue != '') {
                        inputValue = $.trim(inputValue);
                    }
                }
                else if (c.indexOf("easyui-combobox") > -1) {
                    inputValue = $(element).combobox("getValue");
                }
                else if (c.indexOf("c8combogrid") > -1) {
                    if ($(element).combogrid("options").multiple) {
                        inputValue = $(element).combogrid("getValues");
                        if (inputValue.length == 0)inputValue = null;
                    } else {
                        inputValue = $(element).combogrid("getValue");
                    }
                }
                else if (c.indexOf("easyui-datetimebox") > -1) {
                    inputValue = $(element).datetimebox("getValue");
                }
                else if (c.indexOf("easyui-numberspinner") > -1) {
                    inputValue = $(element).numberspinner("getValue");
                }
                else if (c.indexOf("easyui-numberbox") > -1) {
                    inputValue = $(element).numberbox("getValue");
                }
                else if (c.indexOf("easyui-datebox") > -1) {
                    inputValue = $(element).datebox("getValue");
                }
                else if (c.indexOf("c8combotree") > -1) {
                    inputValue = $(element).combotree("getValue");
                }
                else if (c.indexOf("select2") > -1) {
                    if ($(element).attr("multiple")=="multiple") {
                        inputValue = $(element).val();
                        if (inputValue==null||inputValue.length == 0)inputValue = null;
                    } else {
                        inputValue = $(element).val();
                    }
                }
                else if (c.indexOf("default-checkbox") > -1) {
                    inputValue = '';
                } else if (c.indexOf("check-checkbox") > -1) {
                    inputValue = 1;
                } else if (c.indexOf("unchk-checkbox") > -1) {
                    inputValue = 0;
                }
                else {
                    inputValue = $(element).val();
                    if (inputValue != undefined && inputValue != '') {
                        inputValue = $.trim(inputValue);
                    }
                    if ($(element).prop("type") == 'checkbox') {
                        if ($(element).prop("checked")) {
                            inputValue = 1;
                        }
                        else {
                            inputValue = 0;
                        }
                    }
                }
                if (inputValue != undefined) {
                    if (isreturnnull == false) {
                        if (typeof(inputValue) == "string" && inputValue == '') {
                            continue;
                        }
                    }
                    modelInfo[name] = inputValue;
                }
            }
        }
        return modelInfo;
    }

    ko.c8SetModel = function (p) {
        //p={model:null,context:null,selector:null};
        var modelInfo = {};
        var selector = ko.c8GetFormDefaultSelector();
        var context = null;
        if (p) {
            modelInfo = p["model"] || modelInfo;
            selector = p["selector"] || selector;
            context = p["context"] || context;
        }
        var elementList = null;

        if (context) {
            elementList = $(selector, context);
        } else {
            elementList = $(selector);
        }
        for (var i = 0; i < elementList.length; i++) {
            var element = elementList[i];
            if (element) {
                var c = $(element).attr("class");
                var name = ko.c8GetFormName(element);
                var value = modelInfo[name] == null ? "" : modelInfo[name];
                if (!c) {
                    if ($(element).prop("tagName") == 'SPAN') {
                        $(element).text(value);
                        $(element).attr('title', value);
                    } else {
                        $(element).val(value);
                    }
                    if ($(element).prop("type") == 'checkbox') {
                        if (modelInfo[name] == 1) {
                            $(element).prop("checked", true);
                        }
                        else {
                            $(element).prop("checked", false);
                        }
                    }
                }
                else if (c.indexOf("easyui-textbox") > -1) {
                    $(element).textbox("setValue", value);
                }
                else if (c.indexOf("easyui-combobox") > -1) {
                    //if ($(element).combogrid("options").multiple) {
                    //    $(element).combogrid("setValues", value + "");
                    //} else {
                    //    $(element).combogrid("setValue", value + "");
                    //}

                    $(element).combobox("setValue", value + "");
                }
                else if (c.indexOf("c8combogrid") > -1) {
                    if ($(element).combogrid("options").multiple) {
                        $(element).combogrid("setValues", value + "");
                    } else {
                        $(element).combogrid("setValue", value + "");
                    }


                    // $(element).combogrid("setValue", value + "");
                }
                else if (c.indexOf("easyui-datetimebox") > -1) {
                    $(element).datetimebox("setValue", value);
                }
                else if (c.indexOf("easyui-numberspinner") > -1) {
                    $(element).numberspinner("setValue", value);
                }
                else if (c.indexOf("easyui-numberbox") > -1) {
                    $(element).numberbox("setValue", value);
                }
                else if (c.indexOf("easyui-datebox") > -1) {
                    $(element).datebox("setValue", value);
                }
                else if (c.indexOf("c8combotree") > -1) {
                    $(element).combotree("setValue", value);
                }
                else if (c.indexOf("easyui-searchbox") > -1) {
                    $(element).searchbox("setValue", value);
                }
                else if (c.indexOf("easyui-filebox") > -1) {
                    $(element).filebox("setValue", value);
                }
                else if (c.indexOf("c8lable") > -1) {
                    $(element).text(value);
                }
                else if (c.indexOf("easyui-tooltip") > -1) {
                    $(element).text(value);
                    $(element).tooltip({content: value});
                }
                else if (c.indexOf("select2") > -1) {
                    $(element).val(value+"").trigger("change");
                }
                else if (c.indexOf("default-checkbox") > -1 || c.indexOf("check-checkbox") > -1 || c.indexOf("unchk-checkbox") > -1) {
                    if (value == 1) {
                        $(element).attr('class', 'check-checkbox');
                    } else if ($.isNumeric(value) && value == 0) {
                        $(element).attr('class', 'unchk-checkbox');
                    } else if (value == '') {
                        $(element).attr('class', 'default-checkbox');
                    }
                }
                else {
                    $(element).val(value);
                    if ($(element).prop("type") == 'checkbox') {
                        if (modelInfo[name] == 1) {
                            $(element).prop("checked", true);
                        }
                        else {
                            $(element).prop("checked", false);
                        }
                    }
                }
            }
        }
    }
    ko.c8BindEnterWrap = function (inputList) {
        var length = inputList.length;
        for (var i = 0; i < length - 1; i++) {

            var txt = $(inputList[i]).c8FormBox("textbox");
            if (txt) {
                var next = inputList[i + 1];
                txt[0]._nextEnter = next;
                txt.c8enter(function () {
                    $(this._nextEnter).c8FocusFormBox();//设置控件焦点
                    if ($(this._nextEnter).attr("c8IsShowPanel") == "true") {
                        $(this._nextEnter).c8FormBox("showPanel");//弹出编辑框
                    }
                });
            }
        }
    }

    ko.c8BindEnter = function (inputList, fn) {
        var length = inputList.length;
        for (var i = 0; i < length - 1; i++) {
            var txt = $(inputList[i]).c8FormBox("textbox");
            if (txt) {
                txt.c8enter(fn);
            }
        }
    }
    ko.c8LoadFormBox = function (element) {
        var easyuiControlName = undefined;
        if (!element) return;
        var inputValue = null;
        var c = $(element).attr("class");
        var name = ko.c8GetFormName(element);
        var c8IsShowPanel = false;
        if (!c) {
            easyuiControlName = undefined;
        }
        else if (c.indexOf("easyui-textbox") > -1) {
            easyuiControlName = "textbox";
            c8IsShowPanel = false;
        }
        else if (c.indexOf("easyui-combobox") > -1) {
            easyuiControlName = "combobox";
            c8IsShowPanel = true;
        }
        else if (c.indexOf("c8combogrid") > -1) {
            easyuiControlName = "combogrid";
            c8IsShowPanel = true;
        }
        else if (c.indexOf("easyui-datetimebox") > -1) {
            easyuiControlName = "datetimebox";
            c8IsShowPanel = true;
        }
        else if (c.indexOf("easyui-numberspinner") > -1) {
            easyuiControlName = "numberspinner";
            c8IsShowPanel = false;
        }
        else if (c.indexOf("easyui-numberbox") > -1) {
            easyuiControlName = "numberbox";
            c8IsShowPanel = false;
        }
        else if (c.indexOf("easyui-datebox") > -1) {
            easyuiControlName = "datebox";
            c8IsShowPanel = true;
        }
        else if (c.indexOf("c8combotree") > -1) {
            easyuiControlName = "combotree";
            c8IsShowPanel = true;
        }
        $(element).attr("c8IsShowPanel", c8IsShowPanel);
        //element.c8IsShowPanel=c8IsShowPanel;
        $(element).attr("c8ECName", easyuiControlName);
        return element.c8ECName;
    }
    ko.c8GetViewTextDefaultSelector = function () {
        return "span[c8name]";
    };
    ko.c8SetViewTextModel = function (p) {
        //p={model:null,context:null,selector:null};
        var modelInfo = {};
        var selector = ko.c8GetViewTextDefaultSelector();
        var context = null;
        if (p) {
            modelInfo = p["model"] || p;
            selector = p["selector"] || selector;
            context = p["context"] || context;
        }
        var elementList = null;

        if (context) {
            elementList = $(selector, context);
        } else {
            elementList = $(selector);
        }
        for (var i = 0; i < elementList.length; i++) {
            var element = elementList[i];
            if (element) {
                var c = $(element).attr("class");
                var name = ko.c8GetFormName(element);
                $(element).text(modelInfo[name]);
                $(element).attr('title', modelInfo[name]);
            }
        }
    }
    ko.c8SetElementsAttr = function (p) {
        var selector = null;
        var context = null;
        var callBack = null;
        if (p) {
            callBack = p["callBack"] || callBack;
            selector = p["selector"] || selector;
            context = p["context"] || context;
        }
        var elementList = $(selector, context);
        for (var i = 0; i < elementList.length; i++) {
            var element = elementList[i];
            if (callBack) {
                callBack(element);
            }
        }
        return elementList;
    }
    ko._c8BindingViewModelByParserComplete = function (model, context) {
        $.parser.onComplete = function () {
            ko.c8BindingViewModel(model, context);
        }
    }
    ko._c8BindingViewByc8DataBindModel = function (model, context) {
        var elementlist = $("[c8data-model]", context)
        var length = elementlist.length;
        for (var i = 0; i < length; i++) {
            var element = elementlist[i];
            var modelKey = $(element).attr("c8data-model")
            var m = model[modelKey];
            if (m) {
                ko._c8BindingViewByParameter({
                    model: m,
                    context: element,
                    selector: "[c8data-m-bind]",
                    bindName: "c8data-m-bind"
                });
            }
            else {
                alert("属性" + modelKey + "为null;");
            }
        }
    }


    ko.c8BindingViewModel = function (model, context, selector) {
        // context=context|| $("#mainBody");
        ko._c8BindingViewByc8DataBindModel(model, context);
        ko._c8BindingViewByParameter({model: model, context: context, selector: selector});

    }
    ko._c8BindingViewByParameter = function (parameter) {
        var model = parameter.model;
        var context = parameter.context;
        var selector = parameter.selector || "[c8data-bind]";
        var bindName = parameter.bindName || "c8data-bind";
        var elementlist = $(selector, context)
        var length = elementlist.length;
        for (var i = 0; i < length; i++) {
            var element = elementlist[i];
            var dataBindStr = $(element).attr(bindName);
            //var dataoption = ko.c8ConvertStrToObject(dataBindStr);
            var dataoption = $.c8help.c8parseJSON(model, dataBindStr);
            for (var key in dataoption) {
                // var modelKey = dataoption[key];
                var bValue = dataoption[key];
                //var modelKey=bValue.prototype;
                var method = $(element)[key];
                if (method) {
                    if (typeof bValue == "function") {
                        $(element)[key]((function () {
                            // var methodName = modelKey;
                            var fn = bValue;
                            return function () {
                                fn.call(model, this);
                            };
                        })());
                    }
                    else {
                        $(element)[key](bValue, {model: model, c8WindowId: model.c8WindowId});
                    }
                }
                else {
                    alert("c8data-bind:" + key + "不存在");
                    debugger;
                }
            }


        }
    }

    //aa="a:b,c:d"
    ko.c8ConvertStrToObject = function (str) {
        if (!str) return null;
        //return (new Function("return {"+str+"}"))();
        var elementOption = {};
        var keyvalueList = str.split(",");
        if (!keyvalueList) return null;
        var keyValueLength = keyvalueList.length;
        if (keyValueLength <= 0) return null;
        for (var j = 0; j < keyValueLength; j++) {
            var keyvalueStr = keyvalueList[j];
            var keyvalue = keyvalueStr.split(":");
            if (!keyvalue) continue;
            if (keyvalue.length == 2) {
                elementOption[keyvalue[0]] = keyvalue[1];
            }
        }
        return elementOption
    };

    ko.c8SetEnable = function (buttonTextList, context) {
        for (var key in buttonTextList) {
            $("[c8Text='" + key + "']", context).c8enable(buttonTextList[key]);
        }
    }
    ko.c8SetReadonly = function (buttonTextList, context) {
        for (var key in buttonTextList) {
            $("[c8name='" + key + "']", context).c8ReadonlyFormBox(buttonTextList[key]);
        }
    }
    ko.c8Ajax = function (p) {
        $.ajax(p);
    }
    ko.c8GetParentWindow = function () {
        var win = window;
        while (win.parent && win != win.parent) {
            win = win.parent;
        }
        return win;
    }
    ko.c8GetIsBatch = function () {
        return $.c8help.getIsBatch();
    }


    ko.getSkuRowIdByBarCode = function (barCode) {
        var result = null;
        ko.c8Ajax({
            type: "get",
            url: '/ProductBarcode/getSkuRowIdByBarCode?BarCode=' + barCode + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
                return result;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    }

    ko.getExpressByRowId = function (RowId) {
        var result = null;
        ko.c8Ajax({
            type: "get",
            url: '/Express/get?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
                return result;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    }
    ko.getPrintTemplateCaiNiaoListByTypeRowId = function (TypeRowId) {
        var result = null;
        ko.c8Ajax({
            type: "get",
            url: '/PrintTemplateCaiNiao/getListByTypeRowId?TypeRowId=' + TypeRowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
                return result;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    }
    ko.errorToLogin = function (e, callbackError) {
        if (e.getResponseHeader("showLogin") == 168168) {
            var win = ko.c8GetParentWindow();
            win.location.href = "/login";
            //win.openShowLogin();
        }
        else {
            if (callbackError) {
                callbackError(e);
            }
        }
    }
//    url,[data],[callback],[type]String,Map,Function,StringV1.0
//    url:待载入页面的URL地址
//    data:待发送 Key/value 参数。
//callback:载入成功时回调函数。
//type:返回内容格式，xml, html, script, json, text, _default。
    ko.c8Get = function (url, data, callback, type) {
        $.get(url, data, callback, type);
    }
    ko.c8Post = function (url, data, callback, type) {
        $.post(url, data, callback, type);
    }
    ko.c8resizelabel = function (selector, context) {
        //".c8myform .fitem label"
        //label begin
        var labelList = $(selector, context);
        var c8columnsElement = $("[c8columns]:first", context);
        var c8columns = c8columnsElement.attr("c8columns");
        if (!c8columns) return;
        var columnCount = parseInt(c8columns);
        var columnList = new Array(columnCount);
        for (var j = 0; j < columnCount; j++) {
            columnList[j] = {labList: [], width: 0};
        }
        var width = 0;
        var count = labelList.length;
        for (var i = 0; i < count; i++) {
            var w = $(labelList[i]).width();
            var index = i % columnCount;
            columnList[index].labList.push(labelList[i]);
            if (w > columnList[index].width) columnList[index].width = w;
        }
        var formwidth = 0;
        for (var j = 0; j < columnCount; j++) {
            formwidth += columnList[j].width;
            $(columnList[j].labList).width(columnList[j].width);
        }
        //label  end
    }
    ko.c8GetScript = function (url, callback) {
        $.getScript(url, callback);
    }
//    url:发送请求地址。
//data:待发送 Key/value 参数。
//callback:载入成功时回调函数。
    ko.c8PostJSON = function (url, data, callback, async) {
        async = async || false;
        ko.c8Ajax({
            type: "Post",
            url: url,
            data: ko.toJSON(data),
            async: async,
            dataType: "json",
            contentType: "application/json",
            success: function (d) {
                if (callback) {
                    callback(d);
                }
                else {
                    return data;
                }
            },
            error: function (e) {
                throw e;
            },
            beforeSend: function () {

            },
            complete: function () {

            }
        });
    }
//    url:待装入 HTML 网页网址。
//data:发送至服务器的 key/value 数据。在jQuery 1.3中也可以接受一个字符串了。
//callback:载入成功时回调函数。
    ko.c8Load = function (url, data, callback) {
        $.load(url, data, callback);
    }
    ko.c8GetDefaultDate = function () {
        return "1949-10-01 00:00:00";
    };
    ko.c8messager = function () {
        return ko.c8GetParentWindow().$.messager;
    }
    ko.c8showMessage = function (strtype, msg) {
        return ko.c8GetParentWindow().showMessage(strtype, msg);
    }
    ko.getIsRepeatPrintExpressOrder = function () {
        return $.c8help.getIsRepeatPrintExpressOrder();
    }
    ko.getIsRepeatPrintDeliveryOrder = function () {
        return $.c8help.getIsRepeatPrintDeliveryOrder();
    }
    ko.getChineseDistricts = function (init) {
        return $.c8help.getChineseDistricts(init);
    }
    ko.c8GetIsJcjm = function () {
        return $.c8help.getIsJcjm();
    }
    ko.c8IsPurchaseCodePurchase = function () {
        return $.c8help.getIsPurchaseCodePurchase();
    }
    ko.c8IsRebindPurchaseCode = function () {
        return $.c8help.getIsRebindPurchaseCode();
    }
    ko.c8GetHoldUpPlatDelivery = function () {
        return $.c8help.getHoldUpPlatDelivery();
    }   
    ko.c8GetIsInterceptEd = function (tagTypeRowId) {
        return $.c8help.getIsInterceptEd(tagTypeRowId);
    }
    ko.c8getDefaultDefectWreRowId = function () {
        return $.c8help.getDefaultDefectWreRowId();
    }
    ko.c8GetIsQMDJ = function () {
        return $.c8help.getIsQMDJ();
    }
    ko.c8GetIsPostPrintScan = function () {
        return $.c8help.getIsPostPrintScan();
    }
    ko.c8GetIsLackDelivery = function () {
        return $.c8help.getIsLackDelivery();
    }
    ko.c8GetIsWavePrintRefund = function () {
        return $.c8help.getIsWavePrintRefund();
    }
    ko.c8GetIsBackInStorageAutoPrintBarCode = function () {
        return $.c8help.getIsBackInStorageAutoPrintBarCode();
    }
    ko.addTab = function (subtitle, url, icon, data) {
        var mywindows = ko.c8GetParentWindow();
        if (data) {
            mywindows.$('#tempdata').val(ko.toJSON(data));
        }
        if (!url || url == '#') return false;
        var $tab = mywindows.$('#mainTabs');
        var tabCount = $tab.tabs('tabs').length;
        var hasTab = $tab.tabs('exists', subtitle);
        if ((tabCount <= 10) || hasTab)
            ko.openTabHandler($tab, hasTab, subtitle, url, icon);
        else
            mywindows.$.messager.confirm("系统提示", '<b>标签页太多,会造成程序运行缓慢，无法流畅操作,是否继续打开？</b>', function (b) {
                if (b)
                    mainWindow.openTabHandler($tab, hasTab, subtitle, url, icon);
            });
    }
    ko.openTabHandler = function ($tab, hasTab, subtitle, url, icon) {
        var mywindows = ko.c8GetParentWindow();
        if (!hasTab) {
            $tab.tabs('add', {
                title: subtitle,
                content: '<iframe scrolling="auto" frameborder="0"  style="width:100%;height:100%;" src="' + url + '" ></iframe>',
                closable: true, icon: icon, tools: [{
                    iconCls: 'icon-mini-refresh',
                    handler: function () {
                        var $tab = mywindows.$("#mainTabs");
                        var title = $(this).parents("li").find(".tabs-title").text();
                        if (!title) return;
                        $tab.tabs('select', title);
                        var currentTab = $tab.tabs('getSelected');
                        var src = $(currentTab.panel('options').content).attr('src');                   //if (typeof src === 'string') src = url;
                        $tab.tabs('update', {
                            tab: currentTab,
                            options: {content: '<iframe scrolling="auto" frameborder="0"  style="width:100%;height:100%;" src="' + src + '" ></iframe>'}
                        })
                    }
                }]
            });
        } else {
            $tab.tabs('select', subtitle);
            var currentTab = $tab.tabs('getSelected');
            $tab.tabs('update', {
                tab: currentTab,
                options: {content: '<iframe scrolling="auto" frameborder="0"  style="width:100%;height:100%;" src="' + url + '" ></iframe>'}
            })
        }
    };
})(jQuery, ko);
var vm = vm || {};
var com = com || {};
var c8 = c8 || {};