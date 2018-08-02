/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(r){function s(s){return r(s).addClass("progressbar"),r(s).html('<div class="progressbar-text"></div><div class="progressbar-value"><div class="progressbar-text"></div></div>'),r(s).bind("_resize",function(e,a){return(r(this).hasClass("easyui-fluid")||a)&&t(s),!1}),r(s)}function t(s,t){var e=r.data(s,"progressbar").options,a=r.data(s,"progressbar").bar;t&&(e.width=t),a._size(e),a.find("div.progressbar-text").css("width",a.width()),a.find("div.progressbar-text,div.progressbar-value").css({height:a.height()+"px",lineHeight:a.height()+"px"})}r.fn.progressbar=function(e,a){if("string"==typeof e){var i=r.fn.progressbar.methods[e];if(i)return i(this,a)}return e=e||{},this.each(function(){var a=r.data(this,"progressbar");a?r.extend(a.options,e):a=r.data(this,"progressbar",{options:r.extend({},r.fn.progressbar.defaults,r.fn.progressbar.parseOptions(this),e),bar:s(this)}),r(this).progressbar("setValue",a.options.value),t(this)})},r.fn.progressbar.methods={options:function(s){return r.data(s[0],"progressbar").options},resize:function(r,s){return r.each(function(){t(this,s)})},getValue:function(s){return r.data(s[0],"progressbar").options.value},setValue:function(s,t){return t<0&&(t=0),t>100&&(t=100),s.each(function(){var s=r.data(this,"progressbar").options,e=s.text.replace(/{value}/,t),a=s.value;s.value=t,r(this).find("div.progressbar-value").width(t+"%"),r(this).find("div.progressbar-text").html(e),a!=t&&s.onChange.call(this,t,a)})}},r.fn.progressbar.parseOptions=function(s){return r.extend({},r.parser.parseOptions(s,["width","height","text",{value:"number"}]))},r.fn.progressbar.defaults={width:"auto",height:22,value:0,text:"{value}%",onChange:function(r,s){}}}(jQuery);
//# sourceMappingURL=jquery.progressbar.js.map