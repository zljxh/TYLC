/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function($){function setScrollers(t){var e=$.data(t,"tabs").options;if("left"!=e.tabPosition&&"right"!=e.tabPosition&&e.showHeader){var a=$(t).children("div.tabs-header"),s=a.children("div.tabs-tool"),i=a.children("div.tabs-scroller-left"),o=a.children("div.tabs-scroller-right"),n=a.children("div.tabs-wrap"),r=a.outerHeight();e.plain&&(r-=r-a.height()),s._outerHeight(r);var l=0;$("ul.tabs li",a).each(function(){l+=$(this).outerWidth(!0)});var d=a.width()-s._outerWidth();l>d?(i.add(o).show()._outerHeight(r),"left"==e.toolPosition?(s.css({left:i.outerWidth(),right:""}),n.css({marginLeft:i.outerWidth()+s._outerWidth(),marginRight:o._outerWidth(),width:d-i.outerWidth()-o.outerWidth()})):(s.css({left:"",right:o.outerWidth()}),n.css({marginLeft:i.outerWidth(),marginRight:o.outerWidth()+s._outerWidth(),width:d-i.outerWidth()-o.outerWidth()}))):(i.add(o).hide(),"left"==e.toolPosition?(s.css({left:0,right:""}),n.css({marginLeft:s._outerWidth(),marginRight:0,width:d})):(s.css({left:"",right:0}),n.css({marginLeft:0,marginRight:s._outerWidth(),width:d})))}}function addTools(container){var opts=$.data(container,"tabs").options,header=$(container).children("div.tabs-header");if(opts.tools)if("string"==typeof opts.tools)$(opts.tools).addClass("tabs-tool").appendTo(header),$(opts.tools).show();else{header.children("div.tabs-tool").remove();for(var tools=$('<div class="tabs-tool"><table cellspacing="0" cellpadding="0" style="height:100%"><tr></tr></table></div>').appendTo(header),tr=tools.find("tr"),i=0;i<opts.tools.length;i++){var td=$("<td></td>").appendTo(tr),tool=$('<a href="javascript:void(0);"></a>').appendTo(td);tool[0].onclick=eval(opts.tools[i].handler||function(){}),tool.linkbutton($.extend({},opts.tools[i],{plain:!0}))}}else header.children("div.tabs-tool").remove()}function setSize(t,e){var a=$.data(t,"tabs"),s=a.options,i=$(t);e&&$.extend(s,{width:e.width,height:e.height}),i._size(s);for(var o=i.children("div.tabs-header"),n=i.children("div.tabs-panels"),r=o.find("div.tabs-wrap"),l=r.find(".tabs"),d=0;d<a.tabs.length;d++){var h=a.tabs[d].panel("options"),c=h.tab.find("a.tabs-inner"),b=parseInt(h.tabWidth||s.tabWidth)||void 0;b?c._outerWidth(b):c.css("width",""),c._outerHeight(s.tabHeight),c.css("lineHeight",c.height()+"px")}if("left"==s.tabPosition||"right"==s.tabPosition)o._outerWidth(s.showHeader?s.headerWidth:0),n._outerWidth(i.width()-o.outerWidth()),o.add(n)._outerHeight(s.height),r._outerWidth(o.width()),l._outerWidth(r.width()).css("height","");else{var p=o.children("div.tabs-scroller-left,div.tabs-scroller-right,div.tabs-tool");o._outerWidth(s.width).css("height",""),s.showHeader?(o.css("background-color",""),r.css("height",""),p.show()):(o.css("background-color","transparent"),o._outerHeight(0),r._outerHeight(0),p.hide()),l._outerHeight(s.tabHeight).css("width",""),setScrollers(t),n._size("height",isNaN(s.height)?"":s.height-o.outerHeight()),n._size("width",isNaN(s.width)?"":s.width)}}function setSelectedSize(t){var e=$.data(t,"tabs").options,a=getSelectedTab(t);if(a){var s=$(t).children("div.tabs-panels"),i="auto"==e.width?"auto":s.width(),o="auto"==e.height?"auto":s.height();a.panel("resize",{width:i,height:o})}}function wrapTabs(t){var e=$.data(t,"tabs").tabs,a=$(t);a.addClass("tabs-container");var s=$('<div class="tabs-panels"></div>').insertBefore(a);a.children("div").each(function(){s[0].appendChild(this)}),a[0].appendChild(s[0]),$('<div class="tabs-header"><div class="tabs-scroller-left"></div><div class="tabs-scroller-right"></div><div class="tabs-wrap"><ul class="tabs"></ul></div></div>').prependTo(t),a.children("div.tabs-panels").children("div").each(function(a){var s=$.extend({},$.parser.parseOptions(this),{selected:!!$(this).attr("selected")||void 0}),i=$(this);e.push(i),createTab(t,i,s)}),a.children("div.tabs-header").find(".tabs-scroller-left, .tabs-scroller-right").hover(function(){$(this).addClass("tabs-scroller-over")},function(){$(this).removeClass("tabs-scroller-over")}),a.bind("_resize",function(e,a){return($(this).hasClass("easyui-fluid")||a)&&(setSize(t),setSelectedSize(t)),!1})}function bindEvents(t){function e(t){var e=0;return t.parent().children("li").each(function(a){if(t[0]==this)return e=a,!1}),e}var a=$.data(t,"tabs"),s=a.options;$(t).children("div.tabs-header").unbind().bind("click",function(i){if($(i.target).hasClass("tabs-scroller-left"))$(t).tabs("scrollBy",-s.scrollIncrement);else if($(i.target).hasClass("tabs-scroller-right"))$(t).tabs("scrollBy",s.scrollIncrement);else{var o=$(i.target).closest("li");if(o.hasClass("tabs-disabled"))return;var n=$(i.target).closest("a.tabs-close");if(n.length)closeTab(t,e(o));else if(o.length){var r=e(o),l=a.tabs[r].panel("options");l.collapsible?l.closed?selectTab(t,r):unselectTab(t,r):selectTab(t,r)}}}).bind("contextmenu",function(a){var i=$(a.target).closest("li");i.hasClass("tabs-disabled")||i.length&&s.onContextMenu.call(t,a,i.find("span.tabs-title").html(),e(i))})}function setProperties(t){var e=$.data(t,"tabs").options,a=$(t).children("div.tabs-header"),s=$(t).children("div.tabs-panels");a.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right"),s.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right"),"top"==e.tabPosition?a.insertBefore(s):"bottom"==e.tabPosition?(a.insertAfter(s),a.addClass("tabs-header-bottom"),s.addClass("tabs-panels-top")):"left"==e.tabPosition?(a.addClass("tabs-header-left"),s.addClass("tabs-panels-right")):"right"==e.tabPosition&&(a.addClass("tabs-header-right"),s.addClass("tabs-panels-left")),1==e.plain?a.addClass("tabs-header-plain"):a.removeClass("tabs-header-plain"),1==e.border?(a.removeClass("tabs-header-noborder"),s.removeClass("tabs-panels-noborder")):(a.addClass("tabs-header-noborder"),s.addClass("tabs-panels-noborder"))}function createTab(t,e,a){var s=$.data(t,"tabs");a=a||{},e.panel($.extend({},a,{border:!1,noheader:!0,closed:!0,doSize:!1,iconCls:a.icon?a.icon:void 0,onLoad:function(){a.onLoad&&a.onLoad.call(this,arguments),s.options.onLoad.call(t,$(this))}}));var i=e.panel("options"),o=$(t).children("div.tabs-header").find("ul.tabs");i.tab=$("<li></li>").appendTo(o),i.tab.append('<a href="javascript:void(0)" class="tabs-inner"><span class="tabs-title"></span><span class="tabs-icon"></span></a>'),$(t).tabs("update",{tab:e,options:i,type:"header"})}function addTab(t,e){var a=$.data(t,"tabs"),s=a.options,i=a.tabs;void 0==e.selected&&(e.selected=!0);var o=$("<div></div>").appendTo($(t).children("div.tabs-panels"));i.push(o),createTab(t,o,e),s.onAdd.call(t,e.title,i.length-1),setSize(t),e.selected&&selectTab(t,i.length-1)}function updateTab(t,e){e.type=e.type||"all";var a=$.data(t,"tabs").selectHis,s=e.tab,i=s.panel("options").title;if("all"!=e.type&&"body"!=e||s.panel($.extend({},e.options,{iconCls:e.options.icon?e.options.icon:void 0})),"all"==e.type||"header"==e.type){var o=s.panel("options"),n=o.tab,r=n.find("span.tabs-title"),l=n.find("span.tabs-icon");if(r.html(o.title),l.attr("class","tabs-icon"),n.find("a.tabs-close").remove(),o.closable?(r.addClass("tabs-closable"),$('<a href="javascript:void(0)" class="tabs-close"></a>').appendTo(n)):r.removeClass("tabs-closable"),o.iconCls?(r.addClass("tabs-with-icon"),l.addClass(o.iconCls)):r.removeClass("tabs-with-icon"),i!=o.title)for(var d=0;d<a.length;d++)a[d]==i&&(a[d]=o.title);if(n.find("span.tabs-p-tool").remove(),o.tools){var h=$('<span class="tabs-p-tool"></span>').insertAfter(n.find("a.tabs-inner"));if($.isArray(o.tools))for(var d=0;d<o.tools.length;d++){var c=$('<a href="javascript:void(0)"></a>').appendTo(h);c.addClass(o.tools[d].iconCls),o.tools[d].handler&&c.bind("click",{handler:o.tools[d].handler},function(t){$(this).parents("li").hasClass("tabs-disabled")||t.data.handler.call(this)})}else $(o.tools).children().appendTo(h);var b=12*h.children().length;o.closable?b+=8:(b-=3,h.css("right","5px")),r.css("padding-right",b+"px")}}setSize(t),$.data(t,"tabs").options.onUpdate.call(t,o.title,getTabIndex(t,s))}function closeTab(t,e){var a=$.data(t,"tabs").options,s=$.data(t,"tabs").tabs,i=$.data(t,"tabs").selectHis;if(exists(t,e)){var o=getTab(t,e),n=o.panel("options").title,r=getTabIndex(t,o);if(0!=a.onBeforeClose.call(t,n,r)){var o=getTab(t,e,!0);o.panel("options").tab.remove(),o.panel("destroy"),a.onClose.call(t,n,r),setSize(t);for(var l=0;l<i.length;l++)i[l]==n&&(i.splice(l,1),l--);var d=i.pop();d?selectTab(t,d):s.length&&selectTab(t,0)}}}function getTab(t,e,a){var s=$.data(t,"tabs").tabs;if("number"==typeof e){if(e<0||e>=s.length)return null;var i=s[e];return a&&s.splice(e,1),i}for(var o=0;o<s.length;o++){var i=s[o];if(i.panel("options").title==e)return a&&s.splice(o,1),i}return null}function getTabIndex(t,e){for(var a=$.data(t,"tabs").tabs,s=0;s<a.length;s++)if(a[s][0]==$(e)[0])return s;return-1}function getSelectedTab(t){for(var e=$.data(t,"tabs").tabs,a=0;a<e.length;a++){var s=e[a];if(0==s.panel("options").closed)return s}return null}function doFirstSelect(t){for(var e=$.data(t,"tabs"),a=e.tabs,s=0;s<a.length;s++)if(a[s].panel("options").selected)return void selectTab(t,s);selectTab(t,e.options.selected)}function selectTab(t,e){var a=$.data(t,"tabs"),s=a.options,i=a.tabs,o=a.selectHis;if(0!=i.length){var n=getTab(t,e);if(n){var r=getSelectedTab(t);if(r){if(n[0]==r[0])return void setSelectedSize(t);if(unselectTab(t,getTabIndex(t,r)),!r.panel("options").closed)return}n.panel("open");var l=n.panel("options").title;o.push(l);var d=n.panel("options").tab;d.addClass("tabs-selected");var h=$(t).find(">div.tabs-header>div.tabs-wrap"),c=d.position().left,b=c+d.outerWidth();if(c<0||b>h.width()){var p=c-(h.width()-d.width())/2;$(t).tabs("scrollBy",p)}else $(t).tabs("scrollBy",0);setSelectedSize(t),s.onSelect.call(t,l,getTabIndex(t,n))}}}function unselectTab(t,e){var a=$.data(t,"tabs"),s=getTab(t,e);if(s){var i=s.panel("options");i.closed||(s.panel("close"),i.closed&&(i.tab.removeClass("tabs-selected"),a.options.onUnselect.call(t,i.title,getTabIndex(t,s))))}}function exists(t,e){return null!=getTab(t,e)}function showHeader(t,e){$.data(t,"tabs").options.showHeader=e,$(t).tabs("resize")}$.fn.tabs=function(t,e){return"string"==typeof t?$.fn.tabs.methods[t](this,e):(t=t||{},this.each(function(){var e=$.data(this,"tabs");e?$.extend(e.options,t):($.data(this,"tabs",{options:$.extend({},$.fn.tabs.defaults,$.fn.tabs.parseOptions(this),t),tabs:[],selectHis:[]}),wrapTabs(this)),addTools(this),setProperties(this),setSize(this),bindEvents(this),doFirstSelect(this)}))},$.fn.tabs.methods={options:function(t){var e=t[0],a=$.data(e,"tabs").options,s=getSelectedTab(e);return a.selected=s?getTabIndex(e,s):-1,a},tabs:function(t){return $.data(t[0],"tabs").tabs},resize:function(t,e){return t.each(function(){setSize(this,e),setSelectedSize(this)})},add:function(t,e){return t.each(function(){addTab(this,e)})},close:function(t,e){return t.each(function(){closeTab(this,e)})},getTab:function(t,e){return getTab(t[0],e)},getTabIndex:function(t,e){return getTabIndex(t[0],e)},getSelected:function(t){return getSelectedTab(t[0])},select:function(t,e){return t.each(function(){selectTab(this,e)})},unselect:function(t,e){return t.each(function(){unselectTab(this,e)})},exists:function(t,e){return exists(t[0],e)},update:function(t,e){return t.each(function(){updateTab(this,e)})},enableTab:function(t,e){return t.each(function(){$(this).tabs("getTab",e).panel("options").tab.removeClass("tabs-disabled")})},disableTab:function(t,e){return t.each(function(){$(this).tabs("getTab",e).panel("options").tab.addClass("tabs-disabled")})},showHeader:function(t){return t.each(function(){showHeader(this,!0)})},hideHeader:function(t){return t.each(function(){showHeader(this,!1)})},scrollBy:function(t,e){return t.each(function(){var t=$(this).tabs("options"),a=$(this).find(">div.tabs-header>div.tabs-wrap"),s=Math.min(a._scrollLeft()+e,function(){var t=0,e=a.children("ul");return e.children("li").each(function(){t+=$(this).outerWidth(!0)}),t-a.width()+(e.outerWidth()-e.width())}());a.animate({scrollLeft:s},t.scrollDuration)})}},$.fn.tabs.parseOptions=function(t){return $.extend({},$.parser.parseOptions(t,["tools","toolPosition","tabPosition",{fit:"boolean",border:"boolean",plain:"boolean",headerWidth:"number",tabWidth:"number",tabHeight:"number",selected:"number",showHeader:"boolean"}]))},$.fn.tabs.defaults={width:"auto",height:"auto",headerWidth:150,tabWidth:"auto",tabHeight:27,selected:0,showHeader:!0,plain:!1,fit:!1,border:!0,tools:null,toolPosition:"right",tabPosition:"top",scrollIncrement:100,scrollDuration:400,onLoad:function(t){},onSelect:function(t,e){},onUnselect:function(t,e){},onBeforeClose:function(t,e){},onClose:function(t,e){},onAdd:function(t,e){},onUpdate:function(t,e){},onContextMenu:function(t,e,a){}}}(jQuery);
//# sourceMappingURL=jquery.tabs.js.map