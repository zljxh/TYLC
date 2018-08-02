/**
 * jQuery EasyUI 1.4.2
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(e){function t(t){var i=e.data(t,"filebox"),l=i.options,n="filebox_file_id_"+ ++o;e(t).addClass("filebox-f").textbox(l),e(t).textbox("textbox").attr("readonly","readonly"),i.filebox=e(t).next().addClass("filebox"),i.filebox.find(".textbox-value").remove(),l.oldValue="";var a=e('<input type="file" class="textbox-value">').appendTo(i.filebox);a.attr("id",n).attr("name",e(t).attr("textboxName")||""),a.change(function(){e(t).filebox("setText",this.value),l.onChange.call(t,this.value,l.oldValue),l.oldValue=this.value});var x=e(t).filebox("button");x.length&&(e('<label class="filebox-label" for="'+n+'"></label>').appendTo(x),x.linkbutton("options").disabled?a.attr("disabled","disabled"):a.removeAttr("disabled"))}var o=0;e.fn.filebox=function(o,i){if("string"==typeof o){var l=e.fn.filebox.methods[o];return l?l(this,i):this.textbox(o,i)}return o=o||{},this.each(function(){var i=e.data(this,"filebox");i?e.extend(i.options,o):e.data(this,"filebox",{options:e.extend({},e.fn.filebox.defaults,e.fn.filebox.parseOptions(this),o)}),t(this)})},e.fn.filebox.methods={options:function(t){var o=t.textbox("options");return e.extend(e.data(t[0],"filebox").options,{width:o.width,value:o.value,originalValue:o.originalValue,disabled:o.disabled,readonly:o.readonly})}},e.fn.filebox.parseOptions=function(t){return e.extend({},e.fn.textbox.parseOptions(t),{})},e.fn.filebox.defaults=e.extend({},e.fn.textbox.defaults,{buttonIcon:null,buttonText:"Choose File",buttonAlign:"right",inputEvents:{}})}(jQuery);
//# sourceMappingURL=jquery.filebox.js.map