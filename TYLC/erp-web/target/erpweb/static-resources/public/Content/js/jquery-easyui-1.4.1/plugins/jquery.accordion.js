/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(n){function e(e,o){function a(n,e){for(var o=0,a=0;a<c.length;a++){var t=c[a],i=t.panel("header")._outerHeight(l);if(t.panel("options").collapsible==n){var d=isNaN(e)?void 0:e+l*i.length;t.panel("resize",{width:r.width(),height:n?d:void 0}),o+=t.panel("panel").outerHeight()-l*i.length}}return o}var t=n.data(e,"accordion"),i=t.options,c=t.panels,r=n(e);o&&n.extend(i,{width:o.width,height:o.height}),r._size(i);var l=0,d="auto",s=r.find(">div.panel>div.accordion-header");s.length&&(l=n(s[0]).css("height","")._outerHeight()),isNaN(parseInt(i.height))||(d=r.height()-l*s.length),a(!0,d-a(!1)+1)}function o(e,o,a,t){for(var i=n.data(e,"accordion").panels,c=[],r=0;r<i.length;r++){var l=i[r];if(o)l.panel("options")[o]==a&&c.push(l);else if(l[0]==n(a)[0])return r}return o?t?c:c.length?c[0]:null:-1}function a(n){return o(n,"collapsed",!1,!0)}function t(n){var e=a(n);return e.length?e[0]:null}function i(n,e){return o(n,null,e)}function c(e,a){var t=n.data(e,"accordion").panels;return"number"==typeof a?a<0||a>=t.length?null:t[a]:o(e,"title",a)}function r(e){var o=n.data(e,"accordion").options,a=n(e);o.border?a.removeClass("accordion-noborder"):a.addClass("accordion-noborder")}function l(o){var a=n.data(o,"accordion"),t=n(o);t.addClass("accordion"),a.panels=[],t.children("div").each(function(){var e=n.extend({},n.parser.parseOptions(this),{selected:!!n(this).attr("selected")||void 0}),t=n(this);a.panels.push(t),d(o,t,e)}),t.bind("_resize",function(a,t){return(n(this).hasClass("easyui-fluid")||t)&&e(o),!1})}function d(e,o,t){var c=n.data(e,"accordion").options;o.panel(n.extend({},{collapsible:!0,minimizable:!1,maximizable:!1,closable:!1,doSize:!1,collapsed:!0,headerCls:"accordion-header",bodyCls:"accordion-body"},t,{onBeforeExpand:function(){if(t.onBeforeExpand&&0==t.onBeforeExpand.call(this))return!1;if(!c.multiple)for(var o=n.grep(a(e),function(n){return n.panel("options").collapsible}),r=0;r<o.length;r++)p(e,i(e,o[r]));var l=n(this).panel("header");l.addClass("accordion-header-selected"),l.find(".accordion-collapse").removeClass("accordion-expand")},onExpand:function(){t.onExpand&&t.onExpand.call(this),c.onSelect.call(e,n(this).panel("options").title,i(e,this))},onBeforeCollapse:function(){if(t.onBeforeCollapse&&0==t.onBeforeCollapse.call(this))return!1;var e=n(this).panel("header");e.removeClass("accordion-header-selected"),e.find(".accordion-collapse").addClass("accordion-expand")},onCollapse:function(){t.onCollapse&&t.onCollapse.call(this),c.onUnselect.call(e,n(this).panel("options").title,i(e,this))}}));var r=o.panel("header"),l=r.children("div.panel-tool");l.children("a.panel-tool-collapse").hide();var d=n('<a href="javascript:void(0)"></a>').addClass("accordion-collapse accordion-expand").appendTo(l);d.bind("click",function(){var n=i(e,o);return o.panel("options").collapsed?s(e,n):p(e,n),!1}),o.panel("options").collapsible?d.show():d.hide(),r.click(function(){return n(this).find("a.accordion-collapse:visible").triggerHandler("click"),!1})}function s(e,o){var a=c(e,o);if(a){h(e);var t=n.data(e,"accordion").options;a.panel("expand",t.animate)}}function p(e,o){var a=c(e,o);if(a){h(e);var t=n.data(e,"accordion").options;a.panel("collapse",t.animate)}}function u(e){function a(n){var o=t.animate;t.animate=!1,s(e,n),t.animate=o}var t=n.data(e,"accordion").options,c=o(e,"selected",!0);a(c?i(e,c):t.selected)}function h(e){for(var o=n.data(e,"accordion").panels,a=0;a<o.length;a++)o[a].stop(!0,!0)}function f(o,a){var t=n.data(o,"accordion"),i=t.options,c=t.panels;void 0==a.selected&&(a.selected=!0),h(o);var r=n("<div></div>").appendTo(o);c.push(r),d(o,r,a),e(o),i.onAdd.call(o,a.title,c.length-1),a.selected&&s(o,c.length-1)}function v(o,a){var r=n.data(o,"accordion"),l=r.options,d=r.panels;h(o);var p=c(o,a),u=p.panel("options").title,f=i(o,p);if(p&&0!=l.onBeforeRemove.call(o,u,f)){if(d.splice(f,1),p.panel("destroy"),d.length){e(o);t(o)||s(o,0)}l.onRemove.call(o,u,f)}}n.fn.accordion=function(o,a){return"string"==typeof o?n.fn.accordion.methods[o](this,a):(o=o||{},this.each(function(){var a=n.data(this,"accordion");a?n.extend(a.options,o):(n.data(this,"accordion",{options:n.extend({},n.fn.accordion.defaults,n.fn.accordion.parseOptions(this),o),accordion:n(this).addClass("accordion"),panels:[]}),l(this)),r(this),e(this),u(this)}))},n.fn.accordion.methods={options:function(e){return n.data(e[0],"accordion").options},panels:function(e){return n.data(e[0],"accordion").panels},resize:function(n,o){return n.each(function(){e(this,o)})},getSelections:function(n){return a(n[0])},getSelected:function(n){return t(n[0])},getPanel:function(n,e){return c(n[0],e)},getPanelIndex:function(n,e){return i(n[0],e)},select:function(n,e){return n.each(function(){s(this,e)})},unselect:function(n,e){return n.each(function(){p(this,e)})},add:function(n,e){return n.each(function(){f(this,e)})},remove:function(n,e){return n.each(function(){v(this,e)})}},n.fn.accordion.parseOptions=function(e){n(e);return n.extend({},n.parser.parseOptions(e,["width","height",{fit:"boolean",border:"boolean",animate:"boolean",multiple:"boolean",selected:"number"}]))},n.fn.accordion.defaults={width:"auto",height:"auto",fit:!1,border:!0,animate:!0,multiple:!1,selected:0,onSelect:function(n,e){},onUnselect:function(n,e){},onAdd:function(n,e){},onBeforeRemove:function(n,e){},onRemove:function(n,e){}}}(jQuery);
//# sourceMappingURL=jquery.accordion.js.map