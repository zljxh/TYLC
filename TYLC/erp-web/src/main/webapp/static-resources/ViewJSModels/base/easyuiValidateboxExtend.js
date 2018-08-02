$(function () {
    $.extend($.fn.validatebox.defaults.rules, {
        cRemote: {
                validator: function (value, param) {
                    var url = param[0];//uril
                    var name = param[1];//
                    var modelInfo = [];
                    if (param[2]) {//选择器
                       var context= $(this).parents(".c8myform")
                        modelInfo = ko.c8GetFormModel({selector: param[2],context:context});
                    }
                    var p='';
                    if(modelInfo) {
                        for (var i in modelInfo) {
                            p += "&" + i + "=" + modelInfo[i];
                        }
                    }
                    var result = false;//encodeURI/encodeURIComponent
                    var  urlNew=url + '?'+name + '=' + value +p+ "&randomid=" + Math.random();
                    $.ajax({
                        type: "GET",
                        url:encodeURI(urlNew) ,
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
            }
    });
    $.extend($.fn.validatebox.defaults.rules, {
        equals: {
            validator: function(value,param){
                return value == $(param[0]).val();
            },
            message: '两次输入不一致'
        }
    });
    $.extend($.fn.validatebox.defaults.rules, {
        notequals: {
            validator: function(value,param){
                return value != $(param[0]).val();
            },
            message: '两次输入不一致'
        }
    });

});