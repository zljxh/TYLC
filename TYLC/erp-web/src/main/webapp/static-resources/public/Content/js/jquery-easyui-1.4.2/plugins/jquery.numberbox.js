/**
 * jQuery EasyUI 1.4.2
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(e){function t(t){var r=e.data(t,"numberbox"),n=r.options;e(t).addClass("numberbox-f").textbox(n),e(t).textbox("textbox").css({imeMode:"disabled"}),e(t).attr("numberboxName",e(t).attr("textboxName")),r.numberbox=e(t).next(),r.numberbox.addClass("numberbox");var o=n.parser.call(t,n.value),a=n.formatter.call(t,o);e(t).numberbox("initValue",o).numberbox("setText",a)}function r(t,r){var n=e.data(t,"numberbox"),o=n.options,r=o.parser.call(t,r),a=o.formatter.call(t,r);o.value=r,e(t).textbox("setText",a).textbox("setValue",r),a=o.formatter.call(t,e(t).textbox("getValue")),e(t).textbox("setText",a)}e.fn.numberbox=function(r,n){if("string"==typeof r){var o=e.fn.numberbox.methods[r];return o?o(this,n):this.textbox(r,n)}return r=r||{},this.each(function(){var n=e.data(this,"numberbox");n?e.extend(n.options,r):n=e.data(this,"numberbox",{options:e.extend({},e.fn.numberbox.defaults,e.fn.numberbox.parseOptions(this),r)}),t(this)})},e.fn.numberbox.methods={options:function(t){var r=t.data("textbox")?t.textbox("options"):{};return e.extend(e.data(t[0],"numberbox").options,{width:r.width,originalValue:r.originalValue,disabled:r.disabled,readonly:r.readonly})},fix:function(t){return t.each(function(){e(this).numberbox("setValue",e(this).numberbox("getText"))})},setValue:function(e,t){return e.each(function(){r(this,t)})},clear:function(t){return t.each(function(){e(this).textbox("clear"),e(this).numberbox("options").value=""})},reset:function(t){return t.each(function(){e(this).textbox("reset"),e(this).numberbox("setValue",e(this).numberbox("getValue"))})}},e.fn.numberbox.parseOptions=function(t){var r=e(t);return e.extend({},e.fn.textbox.parseOptions(t),e.parser.parseOptions(t,["decimalSeparator","groupSeparator","suffix",{min:"number",max:"number",precision:"number"}]),{prefix:r.attr("prefix")?r.attr("prefix"):void 0})},e.fn.numberbox.defaults=e.extend({},e.fn.textbox.defaults,{inputEvents:{keypress:function(t){var r=t.data.target;return e(r).numberbox("options").filter.call(r,t)},blur:function(t){var r=t.data.target;e(r).numberbox("setValue",e(r).numberbox("getText"))},keydown:function(t){if(13==t.keyCode){var r=t.data.target;e(r).numberbox("setValue",e(r).numberbox("getText"))}}},min:null,max:null,precision:0,decimalSeparator:".",groupSeparator:"",prefix:"",suffix:"",filter:function(t){var r=e(this).numberbox("options"),n=e(this).numberbox("getText");if(13==t.which)return!0;if(45==t.which)return-1==n.indexOf("-");var o=String.fromCharCode(t.which);return o==r.decimalSeparator?-1==n.indexOf(o):o==r.groupSeparator||(t.which>=48&&t.which<=57&&0==t.ctrlKey&&0==t.shiftKey||0==t.which||8==t.which||1==t.ctrlKey&&(99==t.which||118==t.which))},formatter:function(t){if(!t)return t;t+="";var r=e(this).numberbox("options"),n=t,o="",a=t.indexOf(".");if(a>=0&&(n=t.substring(0,a),o=t.substring(a+1,t.length)),r.groupSeparator)for(var i=/(\d+)(\d{3})/;i.test(n);)n=n.replace(i,"$1"+r.groupSeparator+"$2");return o?r.prefix+n+r.decimalSeparator+o+r.suffix:r.prefix+n+r.suffix},parser:function(t){t+="";var r=e(this).numberbox("options");parseFloat(t)!=t&&(r.prefix&&(t=e.trim(t.replace(new RegExp("\\"+e.trim(r.prefix),"g"),""))),r.suffix&&(t=e.trim(t.replace(new RegExp("\\"+e.trim(r.suffix),"g"),""))),r.groupSeparator&&(t=e.trim(t.replace(new RegExp("\\"+r.groupSeparator,"g"),""))),r.decimalSeparator&&(t=e.trim(t.replace(new RegExp("\\"+r.decimalSeparator,"g"),"."))),t=t.replace(/\s/g,""));var n=parseFloat(t).toFixed(r.precision);return isNaN(n)?n="":"number"==typeof r.min&&n<r.min?n=r.min.toFixed(r.precision):"number"==typeof r.max&&n>r.max&&(n=r.max.toFixed(r.precision)),n}})}(jQuery);
//# sourceMappingURL=jquery.numberbox.js.map