/**
 * jQuery EasyUI 1.4.2
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(t){function e(e){t(e).addClass("textbox-f").hide();var o=t('<span class="textbox"><input class="textbox-text" autocomplete="off"><input type="hidden" class="textbox-value"></span>').insertAfter(e),n=t(e).attr("name");return n&&(o.find("input.textbox-value").attr("name",n),t(e).removeAttr("name").attr("textboxName",n)),o}function o(e){var o=t.data(e,"textbox"),n=o.options,i=o.textbox;i.find(".textbox-text").remove(),n.multiline?t('<textarea class="textbox-text" autocomplete="off"></textarea>').prependTo(i):t('<input type="'+n.type+'" class="textbox-text" autocomplete="off">').prependTo(i),i.find(".textbox-addon").remove();var a=n.icons?t.extend(!0,[],n.icons):[];if(n.iconCls&&a.push({iconCls:n.iconCls,disabled:!0}),a.length){var x=t('<span class="textbox-addon"></span>').prependTo(i);x.addClass("textbox-addon-"+n.iconAlign);for(var l=0;l<a.length;l++)x.append('<a href="javascript:void(0)" class="textbox-icon '+a[l].iconCls+'" icon-index="'+l+'" tabindex="-1"></a>')}if(i.find(".textbox-button").remove(),n.buttonText||n.buttonIcon){t('<a href="javascript:void(0)" class="textbox-button"></a>').prependTo(i).addClass("textbox-button-"+n.buttonAlign).linkbutton({text:n.buttonText,iconCls:n.buttonIcon})}d(e,n.disabled),s(e,n.readonly)}function n(e){var o=t.data(e,"textbox").textbox;o.find(".textbox-text").validatebox("destroy"),o.remove(),t(e).remove()}function i(e,o){function n(t){return(a.iconAlign==t?u._outerWidth():0)+(a.buttonAlign==t?b._outerWidth():0)}var i=t.data(e,"textbox"),a=i.options,x=i.textbox,d=x.parent();if(o&&(a.width=o),isNaN(parseInt(a.width))){var s=t(e).clone();s.css("visibility","hidden"),s.insertAfter(e),a.width=s.outerWidth(),s.remove()}var l=x.is(":visible");l||x.appendTo("body");var r=x.find(".textbox-text"),b=x.find(".textbox-button"),u=x.find(".textbox-addon"),c=u.find(".textbox-icon");if(x._size(a,d),b.linkbutton("resize",{height:x.height()}),b.css({left:"left"==a.buttonAlign?0:"",right:"right"==a.buttonAlign?0:""}),u.css({left:"left"==a.iconAlign?"left"==a.buttonAlign?b._outerWidth():0:"",right:"right"==a.iconAlign?"right"==a.buttonAlign?b._outerWidth():0:""}),c.css({width:a.iconWidth+"px",height:x.height()+"px"}),r.css({paddingLeft:e.style.paddingLeft||"",paddingRight:e.style.paddingRight||"",marginLeft:n("left"),marginRight:n("right")}),a.multiline)r.css({paddingTop:e.style.paddingTop||"",paddingBottom:e.style.paddingBottom||""}),r._outerHeight(x.height());else{var f=Math.floor((x.height()-r.height())/2);r.css({paddingTop:f+"px",paddingBottom:f+"px"})}r._outerWidth(x.width()-c.length*a.iconWidth-b._outerWidth()),l||x.insertAfter(e),a.onResize.call(e,a.width,a.height)}function a(e){var o=t(e).textbox("options");t(e).textbox("textbox").validatebox(t.extend({},o,{deltaX:t(e).textbox("getTipX"),onBeforeValidate:function(){var e=t(this);e.is(":focus")||(o.oldInputValue=e.val(),e.val(o.value))},onValidate:function(e){var n=t(this);void 0!=o.oldInputValue&&(n.val(o.oldInputValue),o.oldInputValue=void 0);var i=n.parent();e?i.removeClass("textbox-invalid"):i.addClass("textbox-invalid")}}))}function x(e){var o=t.data(e,"textbox"),n=o.options,a=o.textbox,x=a.find(".textbox-text");if(x.attr("placeholder",n.prompt),x.unbind(".textbox"),!n.disabled&&!n.readonly){x.bind("blur.textbox",function(e){a.hasClass("textbox-focused")&&(n.value=t(this).val(),""==n.value?t(this).val(n.prompt).addClass("textbox-prompt"):t(this).removeClass("textbox-prompt"),a.removeClass("textbox-focused"))}).bind("focus.textbox",function(e){a.hasClass("textbox-focused")||(t(this).val()!=n.value&&t(this).val(n.value),t(this).removeClass("textbox-prompt"),a.addClass("textbox-focused"))});for(var d in n.inputEvents)x.bind(d+".textbox",{target:e},n.inputEvents[d])}var s=a.find(".textbox-addon");s.unbind().bind("click",{target:e},function(o){var i=t(o.target).closest("a.textbox-icon:not(.textbox-icon-disabled)");if(i.length){var a=parseInt(i.attr("icon-index")),x=n.icons[a];x&&x.handler&&(x.handler.call(i[0],o),n.onClickIcon.call(e,a))}}),s.find(".textbox-icon").each(function(e){var o=n.icons[e],i=t(this);!o||o.disabled||n.disabled||n.readonly?i.addClass("textbox-icon-disabled"):i.removeClass("textbox-icon-disabled")});var l=a.find(".textbox-button");l.unbind(".textbox").bind("click.textbox",function(){l.linkbutton("options").disabled||n.onClickButton.call(e)}),l.linkbutton(n.disabled||n.readonly?"disable":"enable"),a.unbind(".textbox").bind("_resize.textbox",function(o,n){return(t(this).hasClass("easyui-fluid")||n)&&i(e),!1})}function d(e,o){var n=t.data(e,"textbox"),i=n.options,a=n.textbox;o?(i.disabled=!0,t(e).attr("disabled","disabled"),a.addClass("textbox-disabled"),a.find(".textbox-text,.textbox-value").attr("disabled","disabled")):(i.disabled=!1,a.removeClass("textbox-disabled"),t(e).removeAttr("disabled"),a.find(".textbox-text,.textbox-value").removeAttr("disabled"))}function s(e,o){var n=t.data(e,"textbox"),i=n.options;i.readonly=void 0==o||o,n.textbox.removeClass("textbox-readonly").addClass(i.readonly?"textbox-readonly":"");var a=n.textbox.find(".textbox-text");a.removeAttr("readonly"),!i.readonly&&i.editable||a.attr("readonly","readonly")}t.fn.textbox=function(n,d){if("string"==typeof n){var s=t.fn.textbox.methods[n];return s?s(this,d):this.each(function(){t(this).textbox("textbox").validatebox(n,d)})}return n=n||{},this.each(function(){var d=t.data(this,"textbox");d?(t.extend(d.options,n),void 0!=n.value&&(d.options.originalValue=n.value)):(d=t.data(this,"textbox",{options:t.extend({},t.fn.textbox.defaults,t.fn.textbox.parseOptions(this),n),textbox:e(this)}),d.options.originalValue=d.options.value),o(this),x(this),i(this),a(this),t(this).textbox("initValue",d.options.value)})},t.fn.textbox.methods={options:function(e){return t.data(e[0],"textbox").options},cloneFrom:function(e,o){return e.each(function(){var e=t(this);if(!e.data("textbox")){t(o).data("textbox")||t(o).textbox();var n=e.attr("name")||"";e.addClass("textbox-f").hide(),e.removeAttr("name").attr("textboxName",n);var i=t(o).next().clone().insertAfter(e);i.find("input.textbox-value").attr("name",n),t.data(this,"textbox",{options:t.extend(!0,{},t(o).textbox("options")),textbox:i});var d=t(o).textbox("button");d.length&&e.textbox("button").linkbutton(t.extend(!0,{},d.linkbutton("options"))),x(this),a(this)}})},textbox:function(e){return t.data(e[0],"textbox").textbox.find(".textbox-text")},button:function(e){return t.data(e[0],"textbox").textbox.find(".textbox-button")},destroy:function(t){return t.each(function(){n(this)})},resize:function(t,e){return t.each(function(){i(this,e)})},disable:function(t){return t.each(function(){d(this,!0),x(this)})},enable:function(t){return t.each(function(){d(this,!1),x(this)})},readonly:function(t,e){return t.each(function(){s(this,e),x(this)})},isValid:function(t){return t.textbox("textbox").validatebox("isValid")},clear:function(e){return e.each(function(){t(this).textbox("setValue","")})},setText:function(e,o){return e.each(function(){var e=t(this).textbox("options"),n=t(this).textbox("textbox");t(this).textbox("getText")!=o&&(e.value=o,n.val(o)),n.is(":focus")||(o?n.removeClass("textbox-prompt"):n.val(e.prompt).addClass("textbox-prompt")),t(this).textbox("validate")})},initValue:function(e,o){return e.each(function(){var e=t.data(this,"textbox");e.options.value="",t(this).textbox("setText",o),e.textbox.find(".textbox-value").val(o),t(this).val(o)})},setValue:function(e,o){return e.each(function(){var e=t.data(this,"textbox").options,n=t(this).textbox("getValue");t(this).textbox("initValue",o),n!=o&&(e.onChange.call(this,o,n),t(this).closest("form").trigger("_change",[this]))})},getText:function(t){var e=t.textbox("textbox");return e.is(":focus")?e.val():t.textbox("options").value},getValue:function(t){return t.data("textbox").textbox.find(".textbox-value").val()},reset:function(e){return e.each(function(){var e=t(this).textbox("options");t(this).textbox("setValue",e.originalValue)})},getIcon:function(t,e){return t.data("textbox").textbox.find(".textbox-icon:eq("+e+")")},getTipX:function(t){var e=t.data("textbox"),o=e.options,n=e.textbox,i=(n.find(".textbox-text"),n.find(".textbox-addon")._outerWidth()),a=n.find(".textbox-button")._outerWidth();return"right"==o.tipPosition?("right"==o.iconAlign?i:0)+("right"==o.buttonAlign?a:0)+1:"left"==o.tipPosition?("left"==o.iconAlign?-i:0)+("left"==o.buttonAlign?-a:0)-1:i/2*("right"==o.iconAlign?1:-1)}},t.fn.textbox.parseOptions=function(e){var o=t(e);return t.extend({},t.fn.validatebox.parseOptions(e),t.parser.parseOptions(e,["prompt","iconCls","iconAlign","buttonText","buttonIcon","buttonAlign",{multiline:"boolean",editable:"boolean",iconWidth:"number"}]),{value:o.val()||void 0,type:o.attr("type")?o.attr("type"):void 0,disabled:!!o.attr("disabled")||void 0,readonly:!!o.attr("readonly")||void 0})},t.fn.textbox.defaults=t.extend({},t.fn.validatebox.defaults,{width:"auto",height:22,prompt:"",value:"",type:"text",multiline:!1,editable:!0,disabled:!1,readonly:!1,icons:[],iconCls:null,iconAlign:"right",iconWidth:18,buttonText:"",buttonIcon:null,buttonAlign:"right",inputEvents:{blur:function(e){var o=t(e.data.target),n=o.textbox("options");o.textbox("setValue",n.value)},keydown:function(e){if(13==e.keyCode){var o=t(e.data.target);o.textbox("setValue",o.textbox("getText"))}}},onChange:function(t,e){},onResize:function(t,e){},onClickButton:function(){},onClickIcon:function(t){}})}(jQuery);
//# sourceMappingURL=jquery.textbox.js.map