/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(t){function e(e){var n=t.data(e,"filebox"),i=n.options,l="filebox_file_id_"+ ++o;t(e).addClass("filebox-f").textbox(t.extend({},i,{buttonText:i.buttonText?'<label for="'+l+'">'+i.buttonText+"</label>":""})),t(e).textbox("textbox").attr("readonly","readonly"),n.filebox=t(e).next().addClass("filebox"),n.filebox.find(".textbox-value").remove(),i.oldValue="";var a=t('<input type="file" class="textbox-value">').appendTo(n.filebox);a.attr("id",l).attr("name",t(e).attr("textboxName")||""),a.change(function(){t(e).filebox("setText",this.value),i.onChange.call(e,this.value,i.oldValue),i.oldValue=this.value});var x=t(e).filebox("button");x.length&&(x.linkbutton("options").disabled?a.attr("disabled","disabled"):a.removeAttr("disabled"))}var o=0;t.fn.filebox=function(o,n){if("string"==typeof o){var i=t.fn.filebox.methods[o];return i?i(this,n):this.textbox(o,n)}return o=o||{},this.each(function(){var n=t.data(this,"filebox");n?t.extend(n.options,o):t.data(this,"filebox",{options:t.extend({},t.fn.filebox.defaults,t.fn.filebox.parseOptions(this),o)}),e(this)})},t.fn.filebox.methods={options:function(e){var o=e.textbox("options");return t.extend(t.data(e[0],"filebox").options,{width:o.width,value:o.value,originalValue:o.originalValue,disabled:o.disabled,readonly:o.readonly})}},t.fn.filebox.parseOptions=function(e){return t.extend({},t.fn.textbox.parseOptions(e),{})},t.fn.filebox.defaults=t.extend({},t.fn.textbox.defaults,{buttonIcon:null,buttonText:"Choose File",buttonAlign:"right",inputEvents:{}})}(jQuery);
//# sourceMappingURL=jquery.filebox.js.map