/**
 * jQuery EasyUI 1.4.2
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(t){function e(e,n){function a(){var e=t("#"+f);if(e.length)try{var n=e.contents()[0].readyState;n&&"uninitialized"==n.toLowerCase()&&setTimeout(a,100)}catch(t){i()}}function i(){var e=t("#"+f);if(e.length){e.unbind();var n="";try{var a=e.contents().find("body");if(""==(n=a.html())&&--d)return void setTimeout(i,100);var r=a.find(">textarea");if(r.length)n=r.val();else{var s=a.find(">pre");s.length&&(n=s.html())}}catch(t){}o.success(n),setTimeout(function(){e.unbind(),e.remove()},100)}}var o=t.data(e,"form").options;t.extend(o,n||{});var r=t.extend({},o.queryParams);if(0!=o.onSubmit.call(e,r)){t(e).find(".textbox-text:focus").blur();var f="easyui_frame_"+(new Date).getTime(),s=t("<iframe id="+f+" name="+f+"></iframe>").appendTo("body");s.attr("src",window.ActiveXObject?"javascript:false":"about:blank"),s.css({position:"absolute",top:-1e3,left:-1e3}),s.bind("load",i),function(n){var i=t(e);o.url&&i.attr("action",o.url);var r=i.attr("target"),s=i.attr("action");i.attr("target",f);var d=t();try{for(var c in n){var u=t('<input type="hidden" name="'+c+'">').val(n[c]).appendTo(i);d=d.add(u)}a(),i[0].submit()}finally{i.attr("action",s),r?i.attr("target",r):i.removeAttr("target"),d.remove()}}(r);var d=10}}function n(e,n){function a(n){var a=t(e);for(var f in n){var s=n[f];i(f,s)||o(f,s)||(a.find('input[name="'+f+'"]').val(s),a.find('textarea[name="'+f+'"]').val(s),a.find('select[name="'+f+'"]').val(s))}r.onLoadSuccess.call(e,n),a.form("validate")}function i(n,a){var i=t(e).find('input[name="'+n+'"][type=radio], input[name="'+n+'"][type=checkbox]');return!!i.length&&(i._propAttr("checked",!1),i.each(function(){var e=t(this);(e.val()==String(a)||t.inArray(e.val(),t.isArray(a)?a:[a])>=0)&&e._propAttr("checked",!0)}),!0)}function o(n,a){var i=t(e).find('[textboxName="'+n+'"],[sliderName="'+n+'"]');if(i.length)for(var o=0;o<r.fieldTypes.length;o++){var f=r.fieldTypes[o],s=i.data(f);if(s)return s.options.multiple||s.options.range?i[f]("setValues",a):i[f]("setValue",a),!0}return!1}var r=t.data(e,"form").options;if("string"==typeof n){var f={};if(0==r.onBeforeLoad.call(e,f))return;t.ajax({url:n,data:f,dataType:"json",success:function(t){a(t)},error:function(){r.onLoadError.apply(e,arguments)}})}else a(n)}function a(e){t("input,select,textarea",e).each(function(){var e=this.type,n=this.tagName.toLowerCase();if("text"==e||"hidden"==e||"password"==e||"textarea"==n)this.value="";else if("file"==e){var a=t(this);if(!a.hasClass("textbox-value")){var i=a.clone().val("");i.insertAfter(a),a.data("validatebox")?(a.validatebox("destroy"),i.validatebox()):a.remove()}}else"checkbox"==e||"radio"==e?this.checked=!1:"select"==n&&(this.selectedIndex=-1)});for(var n=t(e),a=t.data(e,"form").options,i=a.fieldTypes.length-1;i>=0;i--){var o=a.fieldTypes[i],r=n.find("."+o+"-f");r.length&&r[o]&&r[o]("clear")}n.form("validate")}function i(e){e.reset();for(var n=t(e),a=t.data(e,"form").options,i=a.fieldTypes.length-1;i>=0;i--){var o=a.fieldTypes[i],r=n.find("."+o+"-f");r.length&&r[o]&&r[o]("reset")}n.form("validate")}function o(n){var a=t.data(n,"form").options;t(n).unbind(".form"),a.ajax&&t(n).bind("submit.form",function(){return setTimeout(function(){e(n,a)},0),!1}),t(n).bind("_change.form",function(t,e){a.onChange.call(this,e)}).bind("change.form",function(e){var n=e.target;t(n).hasClass("textbox-text")||a.onChange.call(this,n)}),s(n,a.novalidate)}function r(e,n){n=n||{};var a=t.data(e,"form");a?t.extend(a.options,n):t.data(e,"form",{options:t.extend({},t.fn.form.defaults,t.fn.form.parseOptions(e),n)})}function f(e){if(t.fn.validatebox){var n=t(e);n.find(".validatebox-text:not(:disabled)").validatebox("validate");var a=n.find(".validatebox-invalid");return a.filter(":not(:disabled):first").focus(),0==a.length}return!0}function s(e,n){t.data(e,"form").options.novalidate=n,t(e).find(".validatebox-text:not(:disabled)").validatebox(n?"disableValidation":"enableValidation")}t.fn.form=function(e,n){return"string"==typeof e?(this.each(function(){r(this)}),t.fn.form.methods[e](this,n)):this.each(function(){r(this,e),o(this)})},t.fn.form.methods={options:function(e){return t.data(e[0],"form").options},submit:function(t,n){return t.each(function(){e(this,n)})},load:function(t,e){return t.each(function(){n(this,e)})},clear:function(t){return t.each(function(){a(this)})},reset:function(t){return t.each(function(){i(this)})},validate:function(t){return f(t[0])},disableValidation:function(t){return t.each(function(){s(this,!0)})},enableValidation:function(t){return t.each(function(){s(this,!1)})}},t.fn.form.parseOptions=function(e){var n=t(e);return t.extend({},t.parser.parseOptions(e,[{ajax:"boolean"}]),{url:n.attr("action")?n.attr("action"):void 0})},t.fn.form.defaults={fieldTypes:["combobox","combotree","combogrid","datetimebox","datebox","combo","datetimespinner","timespinner","numberspinner","spinner","slider","searchbox","numberbox","textbox"],novalidate:!1,ajax:!0,url:null,queryParams:{},onSubmit:function(e){return t(this).form("validate")},success:function(t){},onBeforeLoad:function(t){},onLoadSuccess:function(t){},onLoadError:function(){},onChange:function(t){}}}(jQuery);
//# sourceMappingURL=jquery.form.js.map