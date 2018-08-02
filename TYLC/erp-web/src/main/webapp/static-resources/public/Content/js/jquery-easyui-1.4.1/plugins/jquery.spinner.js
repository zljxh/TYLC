/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(n){function e(e){var i=n.data(e,"spinner"),a=i.options,s=n.extend(!0,[],a.icons);s.push({iconCls:"spinner-arrow",handler:function(n){t(n)}}),n(e).addClass("spinner-f").textbox(n.extend({},a,{icons:s}));var r=n(e).textbox("getIcon",s.length-1);r.append('<a href="javascript:void(0)" class="spinner-arrow-up" tabindex="-1"></a>'),r.append('<a href="javascript:void(0)" class="spinner-arrow-down" tabindex="-1"></a>'),n(e).attr("spinnerName",n(e).attr("textboxName")),i.spinner=n(e).next(),i.spinner.addClass("spinner")}function t(e){var t=e.data.target,i=n(t).spinner("options");n(e.target).closest("a.spinner-arrow-up").length&&(i.spin.call(t,!1),i.onSpinUp.call(t),n(t).spinner("validate")),n(e.target).closest("a.spinner-arrow-down").length&&(i.spin.call(t,!0),i.onSpinDown.call(t),n(t).spinner("validate"))}n.fn.spinner=function(t,i){if("string"==typeof t){var a=n.fn.spinner.methods[t];return a?a(this,i):this.textbox(t,i)}return t=t||{},this.each(function(){var i=n.data(this,"spinner");i?n.extend(i.options,t):i=n.data(this,"spinner",{options:n.extend({},n.fn.spinner.defaults,n.fn.spinner.parseOptions(this),t)}),e(this)})},n.fn.spinner.methods={options:function(e){var t=e.textbox("options");return n.extend(n.data(e[0],"spinner").options,{width:t.width,value:t.value,originalValue:t.originalValue,disabled:t.disabled,readonly:t.readonly})}},n.fn.spinner.parseOptions=function(e){return n.extend({},n.fn.textbox.parseOptions(e),n.parser.parseOptions(e,["min","max",{increment:"number"}]))},n.fn.spinner.defaults=n.extend({},n.fn.textbox.defaults,{min:null,max:null,increment:1,spin:function(n){},onSpinUp:function(){},onSpinDown:function(){}})}(jQuery);
//# sourceMappingURL=jquery.spinner.js.map