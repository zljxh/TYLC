/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function($){function _1(e){function n(t){var i=[];return t.addClass("menu"),i.push(t),t.hasClass("menu-content")||t.children("div").each(function(){var t=$(this).children("div");if(t.length){t.insertAfter(e),this.submenu=t;var o=n(t);i=i.concat(o)}}),i}$(e).appendTo("body"),$(e).addClass("menu-top"),$(document).unbind(".menu").bind("mousedown.menu",function(e){$(e.target).closest("div.menu,div.combo-p").length||$("body>div.menu-top:visible").menu("hide")});for(var t=n($(e)),i=0;i<t.length;i++)!function(n){var t=$.parser.parseOptions(n[0],["width","height"]);n[0].originalHeight=t.height||0,n.hasClass("menu-content")?n[0].originalWidth=t.width||n._outerWidth():(n[0].originalWidth=t.width||0,n.children("div").each(function(){var n=$(this),t=$.extend({},$.parser.parseOptions(this,["name","iconCls","href",{separator:"boolean"}]),{disabled:!!n.attr("disabled")||void 0});if(t.separator&&n.addClass("menu-sep"),!n.hasClass("menu-sep")){n[0].itemName=t.name||"",n[0].itemHref=t.href||"";var i=n.addClass("menu-item").html();n.empty().append($('<div class="menu-text"></div>').html(i)),t.iconCls&&$('<div class="menu-icon"></div>').addClass(t.iconCls).appendTo(n),t.disabled&&_d(e,n[0],!0),n[0].submenu&&$('<div class="menu-rightarrow"></div>').appendTo(n),_e(e,n)}}),$('<div class="menu-line"></div>').prependTo(n)),_f(e,n),n.hide(),_10(e,n)}(t[i])}function _f(e,n){var t=$.data(e,"menu").options,i=n.attr("style")||"";n.css({display:"block",left:-1e4,height:"auto",overflow:"hidden"});var o=n[0],s=o.originalWidth||0;s||(s=0,n.find("div.menu-text").each(function(){s<$(this)._outerWidth()&&(s=$(this)._outerWidth()),$(this).closest("div.menu-item")._outerHeight($(this)._outerHeight()+2)}),s+=40),s=Math.max(s,t.minWidth);var u=o.originalHeight||0;if(!u)if(u=n.outerHeight(),n.hasClass("menu-top")&&t.alignTo){var a=$(t.alignTo),d=a.offset().top-$(document).scrollTop(),r=$(window)._outerHeight()+$(document).scrollTop()-a.offset().top-a._outerHeight();u=Math.min(u,Math.max(d,r))}else u>$(window)._outerHeight()?(u=$(window).height(),i+=";overflow:auto"):i+=";overflow:hidden";var c=Math.max(o.originalHeight,n.outerHeight())-2;n._outerWidth(s)._outerHeight(u),n.children("div.menu-line")._outerHeight(c),i+=";width:"+o.style.width+";height:"+o.style.height,n.attr("style",i)}function _10(e,n){var t=$.data(e,"menu");n.unbind(".menu").bind("mouseenter.menu",function(){t.timer&&(clearTimeout(t.timer),t.timer=null)}).bind("mouseleave.menu",function(){t.options.hideOnUnhover&&(t.timer=setTimeout(function(){_1b(e)},t.options.duration))})}function _e(e,n){n.hasClass("menu-item")&&(n.unbind(".menu"),n.bind("click.menu",function(){if(!$(this).hasClass("menu-item-disabled")){if(!this.submenu){_1b(e);var n=this.itemHref;n&&(location.href=n)}var t=$(e).menu("getItem",this);$.data(e,"menu").options.onClick.call(e,t)}}).bind("mouseenter.menu",function(t){if(n.siblings().each(function(){this.submenu&&_22(this.submenu),$(this).removeClass("menu-active")}),n.addClass("menu-active"),$(this).hasClass("menu-item-disabled"))return void n.addClass("menu-active-disabled");var i=n[0].submenu;i&&$(e).menu("show",{menu:i,parent:n})}).bind("mouseleave.menu",function(e){n.removeClass("menu-active menu-active-disabled");var t=n[0].submenu;t?e.pageX>=parseInt(t.css("left"))?n.addClass("menu-active"):_22(t):n.removeClass("menu-active")}))}function _1b(e){var n=$.data(e,"menu");return n&&$(e).is(":visible")&&(_22($(e)),n.options.onHide.call(e)),!1}function _25(e,n){function t(e,n){return e+s.outerHeight()>$(window)._outerHeight()+$(document).scrollTop()&&(e=n?$(n).offset().top-s._outerHeight():$(window)._outerHeight()+$(document).scrollTop()-s.outerHeight()),e<0&&(e=0),e}var i,o;n=n||{};var s=$(n.menu||e);if($(e).menu("resize",s[0]),s.hasClass("menu-top")){var u=$.data(e,"menu").options;if($.extend(u,n),i=u.left,o=u.top,u.alignTo){var a=$(u.alignTo);i=a.offset().left,o=a.offset().top+a._outerHeight(),"right"==u.align&&(i+=a.outerWidth()-s.outerWidth())}i+s.outerWidth()>$(window)._outerWidth()+$(document)._scrollLeft()&&(i=$(window)._outerWidth()+$(document).scrollLeft()-s.outerWidth()-5),i<0&&(i=0),o=t(o,u.alignTo)}else{var d=n.parent;i=d.offset().left+d.outerWidth()-2,i+s.outerWidth()+5>$(window)._outerWidth()+$(document).scrollLeft()&&(i=d.offset().left-s.outerWidth()+2),o=t(d.offset().top-3)}s.css({left:i,top:o}),s.show(0,function(){s[0].shadow||(s[0].shadow=$('<div class="menu-shadow"></div>').insertAfter(s)),s[0].shadow.css({display:"block",zIndex:$.fn.menu.defaults.zIndex++,left:s.css("left"),top:s.css("top"),width:s.outerWidth(),height:s.outerHeight()}),s.css("z-index",$.fn.menu.defaults.zIndex++),s.hasClass("menu-top")&&$.data(s[0],"menu").options.onShow.call(s[0])})}function _22(e){e&&(!function(e){e.stop(!0,!0),e[0].shadow&&e[0].shadow.hide(),e.hide()}(e),e.find("div.menu-item").each(function(){this.submenu&&_22(this.submenu),$(this).removeClass("menu-active")}))}function _30(e,n){function t(s){s.children("div.menu-item").each(function(){var s=$(e).menu("getItem",this),u=o.empty().html(s.text).text();n==$.trim(u)?i=s:this.submenu&&!i&&t(this.submenu)})}var i=null,o=$("<div></div>");return t($(e)),o.remove(),i}function _d(e,n,t){var i=$(n);i.hasClass("menu-item")&&(t?(i.addClass("menu-item-disabled"),n.onclick&&(n.onclick1=n.onclick,n.onclick=null)):(i.removeClass("menu-item-disabled"),n.onclick1&&(n.onclick=n.onclick1,n.onclick1=null)))}function _3a(_3b,_3c){var _3d=$(_3b);if(_3c.parent){if(!_3c.parent.submenu){var _3e=$('<div class="menu"><div class="menu-line"></div></div>').appendTo("body");_3e.hide(),_3c.parent.submenu=_3e,$('<div class="menu-rightarrow"></div>').appendTo(_3c.parent)}_3d=_3c.parent.submenu}if(_3c.separator)var _3f=$('<div class="menu-sep"></div>').appendTo(_3d);else{var _3f=$('<div class="menu-item"></div>').appendTo(_3d);$('<div class="menu-text"></div>').html(_3c.text).appendTo(_3f)}_3c.iconCls&&$('<div class="menu-icon"></div>').addClass(_3c.iconCls).appendTo(_3f),_3c.id&&_3f.attr("id",_3c.id),_3c.name&&(_3f[0].itemName=_3c.name),_3c.href&&(_3f[0].itemHref=_3c.href),_3c.onclick&&("string"==typeof _3c.onclick?_3f.attr("onclick",_3c.onclick):_3f[0].onclick=eval(_3c.onclick)),_3c.handler&&(_3f[0].onclick=eval(_3c.handler)),_3c.disabled&&_d(_3b,_3f[0],!0),_e(_3b,_3f),_10(_3b,_3d),_f(_3b,_3d)}function _40(e,n){function t(e){if(e.submenu){e.submenu.children("div.menu-item").each(function(){t(this)});var n=e.submenu[0].shadow;n&&n.remove(),e.submenu.remove()}$(e).remove()}var i=$(n).parent();t(n),_f(e,i)}function _46(e,n,t){var i=$(n).parent();t?$(n).show():$(n).hide(),_f(e,i)}function _4b(e){$(e).children("div.menu-item").each(function(){_40(e,this)}),e.shadow&&e.shadow.remove(),$(e).remove()}$.fn.menu=function(e,n){return"string"==typeof e?$.fn.menu.methods[e](this,n):(e=e||{},this.each(function(){var n=$.data(this,"menu");n?$.extend(n.options,e):(n=$.data(this,"menu",{options:$.extend({},$.fn.menu.defaults,$.fn.menu.parseOptions(this),e)}),_1(this)),$(this).css({left:n.options.left,top:n.options.top})}))},$.fn.menu.methods={options:function(e){return $.data(e[0],"menu").options},show:function(e,n){return e.each(function(){_25(this,n)})},hide:function(e){return e.each(function(){_1b(this)})},destroy:function(e){return e.each(function(){_4b(this)})},setText:function(e,n){return e.each(function(){$(n.target).children("div.menu-text").html(n.text)})},setIcon:function(e,n){return e.each(function(){$(n.target).children("div.menu-icon").remove(),n.iconCls&&$('<div class="menu-icon"></div>').addClass(n.iconCls).appendTo(n.target)})},getItem:function(e,n){var t=$(n),i={target:n,id:t.attr("id"),text:$.trim(t.children("div.menu-text").html()),disabled:t.hasClass("menu-item-disabled"),name:n.itemName,href:n.itemHref,onclick:n.onclick},o=t.children("div.menu-icon");if(o.length){for(var s=[],u=o.attr("class").split(" "),a=0;a<u.length;a++)"menu-icon"!=u[a]&&s.push(u[a]);i.iconCls=s.join(" ")}return i},findItem:function(e,n){return _30(e[0],n)},appendItem:function(e,n){return e.each(function(){_3a(this,n)})},removeItem:function(e,n){return e.each(function(){_40(this,n)})},enableItem:function(e,n){return e.each(function(){_d(this,n,!1)})},disableItem:function(e,n){return e.each(function(){_d(this,n,!0)})},showItem:function(e,n){return e.each(function(){_46(this,n,!0)})},hideItem:function(e,n){return e.each(function(){_46(this,n,!1)})},resize:function(e,n){return e.each(function(){_f(this,$(n))})}},$.fn.menu.parseOptions=function(e){return $.extend({},$.parser.parseOptions(e,[{minWidth:"number",duration:"number",hideOnUnhover:"boolean"}]))},$.fn.menu.defaults={zIndex:11e4,left:0,top:0,alignTo:null,align:"left",minWidth:120,duration:100,hideOnUnhover:!0,onShow:function(){},onHide:function(){},onClick:function(e){}}}(jQuery);
//# sourceMappingURL=jquery.menu.js.map