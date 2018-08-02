/**
 * jQuery EasyUI 1.4.1
 *
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(e){function t(t){var n=e(t);return n.addClass("tree"),n}function n(t){var n=e.data(t,"tree").options;e(t).unbind().bind("mouseover",function(t){var n=e(t.target),r=n.closest("div.tree-node");r.length&&(r.addClass("tree-node-hover"),n.hasClass("tree-hit")&&(n.hasClass("tree-expanded")?n.addClass("tree-expanded-hover"):n.addClass("tree-collapsed-hover")),t.stopPropagation())}).bind("mouseout",function(t){var n=e(t.target),r=n.closest("div.tree-node");r.length&&(r.removeClass("tree-node-hover"),n.hasClass("tree-hit")&&(n.hasClass("tree-expanded")?n.removeClass("tree-expanded-hover"):n.removeClass("tree-collapsed-hover")),t.stopPropagation())}).bind("click",function(r){var o=e(r.target),i=o.closest("div.tree-node");if(i.length){if(o.hasClass("tree-hit"))return f(t,i[0]),!1;if(o.hasClass("tree-checkbox"))return a(t,i[0],!o.hasClass("tree-checkbox1")),!1;N(t,i[0]),n.onClick.call(t,w(t,i[0])),r.stopPropagation()}}).bind("dblclick",function(r){var o=e(r.target).closest("div.tree-node");o.length&&(N(t,o[0]),n.onDblClick.call(t,w(t,o[0])),r.stopPropagation())}).bind("contextmenu",function(r){var o=e(r.target).closest("div.tree-node");o.length&&(n.onContextMenu.call(t,r,w(t,o[0])),r.stopPropagation())})}function r(t){e.data(t,"tree").options.dnd=!1;var n=e(t).find("div.tree-node");n.draggable("disable"),n.css("cursor","pointer")}function o(t){function n(t,n){return e(t).closest("ul.tree").tree(n?"pop":"getData",t)}function r(t,n){e(t).draggable("proxy").find("span.tree-dnd-icon").removeClass("tree-dnd-yes tree-dnd-no").addClass(n?"tree-dnd-yes":"tree-dnd-no")}function o(r,o){function a(){var a=n(r,!0);e(t).tree("append",{parent:o,data:[a]}),s.onDrop.call(t,o,a,"append")}"closed"==w(t,o).state?l(t,o,function(){a()}):a()}function a(r,o,a){var i={};"top"==a?i.before=o:i.after=o;var c=n(r,!0);i.data=c,e(t).tree("insert",i),s.onDrop.call(t,o,c,a)}var i=e.data(t,"tree"),s=i.options,c=i.tree;i.disabledNodes=[],s.dnd=!0,c.find("div.tree-node").draggable({disabled:!1,revert:!0,cursor:"pointer",proxy:function(t){var n=e('<div class="tree-node-proxy"></div>').appendTo("body");return n.html('<span class="tree-dnd-icon tree-dnd-no">&nbsp;</span>'+e(t).find(".tree-title").html()),n.hide(),n},deltaX:15,deltaY:15,onBeforeDrag:function(n){if(0==s.onBeforeDrag.call(t,w(t,this)))return!1;if(e(n.target).hasClass("tree-hit")||e(n.target).hasClass("tree-checkbox"))return!1;if(1!=n.which)return!1;e(this).next("ul").find("div.tree-node").droppable({accept:"no-accept"});var r=e(this).find("span.tree-indent");r.length&&(n.data.offsetWidth-=r.length*r.width())},onStartDrag:function(){e(this).draggable("proxy").css({left:-1e4,top:-1e4}),s.onStartDrag.call(t,w(t,this));var n=w(t,this);void 0==n.id&&(n.id="easyui_tree_node_id_temp",m(t,n)),i.draggingNodeId=n.id},onDrag:function(t){var n=t.pageX,r=t.pageY,o=t.data.startX,a=t.data.startY;Math.sqrt((n-o)*(n-o)+(r-a)*(r-a))>3&&e(this).draggable("proxy").show(),this.pageY=t.pageY},onStopDrag:function(){e(this).next("ul").find("div.tree-node").droppable({accept:"div.tree-node"});for(var n=0;n<i.disabledNodes.length;n++)e(i.disabledNodes[n]).droppable("enable");i.disabledNodes=[];var r=A(t,i.draggingNodeId);r&&"easyui_tree_node_id_temp"==r.id&&(r.id="",m(t,r)),s.onStopDrag.call(t,r)}}).droppable({accept:"div.tree-node",onDragEnter:function(o,a){0==s.onDragEnter.call(t,this,n(a))&&(r(a,!1),e(this).removeClass("tree-node-append tree-node-top tree-node-bottom"),e(this).droppable("disable"),i.disabledNodes.push(this))},onDragOver:function(o,a){if(!e(this).droppable("options").disabled){var c=a.pageY,d=e(this).offset().top,l=d+e(this).outerHeight();r(a,!0),e(this).removeClass("tree-node-append tree-node-top tree-node-bottom"),c>d+(l-d)/2?l-c<5?e(this).addClass("tree-node-bottom"):e(this).addClass("tree-node-append"):c-d<5?e(this).addClass("tree-node-top"):e(this).addClass("tree-node-append"),0==s.onDragOver.call(t,this,n(a))&&(r(a,!1),e(this).removeClass("tree-node-append tree-node-top tree-node-bottom"),e(this).droppable("disable"),i.disabledNodes.push(this))}},onDragLeave:function(o,a){r(a,!1),e(this).removeClass("tree-node-append tree-node-top tree-node-bottom"),s.onDragLeave.call(t,this,n(a))},onDrop:function(r,i){var c,d,l=this;if(e(this).hasClass("tree-node-append")?(c=o,d="append"):(c=a,d=e(this).hasClass("tree-node-top")?"top":"bottom"),0==s.onBeforeDrop.call(t,l,n(i),d))return void e(this).removeClass("tree-node-append tree-node-top tree-node-bottom");c(i,l,d),e(this).removeClass("tree-node-append tree-node-top tree-node-bottom")}})}function a(t,n,r){function o(n){var r=B(t,n[0]);if(r){var a=e(r.target).find(".tree-checkbox");a.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2"),!function(t){var n=t.find(".tree-checkbox");if(n.hasClass("tree-checkbox0")||n.hasClass("tree-checkbox2"))return!1;var r=!0;return t.parent().siblings().each(function(){e(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")||(r=!1)}),r}(n)?!function(t){var n=t.find(".tree-checkbox");if(n.hasClass("tree-checkbox1")||n.hasClass("tree-checkbox2"))return!1;var r=!0;return t.parent().siblings().each(function(){e(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")||(r=!1)}),r}(n)?a.addClass("tree-checkbox2"):a.addClass("tree-checkbox0"):a.addClass("tree-checkbox1"),o(e(r.target))}}var a=e.data(t,"tree").options;if(a.checkbox){var i=w(t,n);if(0!=a.onBeforeCheck.call(t,i,r)){var s=e(n),c=s.find(".tree-checkbox");c.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2"),r?c.addClass("tree-checkbox1"):c.addClass("tree-checkbox0"),a.cascadeCheck&&(o(s),function(e){var t=e.next().find(".tree-checkbox");t.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2"),e.find(".tree-checkbox").hasClass("tree-checkbox1")?t.addClass("tree-checkbox1"):t.addClass("tree-checkbox0")}(s)),a.onCheck.call(t,i,r)}}}function i(t,n){var r=e.data(t,"tree").options;if(r.checkbox){var o=e(n);if(P(t,n)){var i=o.find(".tree-checkbox");i.length?i.hasClass("tree-checkbox1")?a(t,n,!0):a(t,n,!1):r.onlyLeafCheck&&e('<span class="tree-checkbox tree-checkbox0"></span>').insertBefore(o.find(".tree-title"))}else{var i=o.find(".tree-checkbox");if(r.onlyLeafCheck)i.remove();else if(i.hasClass("tree-checkbox1"))a(t,n,!0);else if(i.hasClass("tree-checkbox2")){for(var s=!0,c=!0,d=D(t,n),l=0;l<d.length;l++)d[l].checked?c=!1:s=!1;s&&a(t,n,!0),c&&a(t,n,!1)}}}}function s(t,n,r,i){var s=e.data(t,"tree"),d=s.options,l=e(n).prevAll("div.tree-node:first");r=d.loadFilter.call(t,r,l[0]);var h=I(t,"domId",l.attr("id"));i?h?h.children?h.children=h.children.concat(r):h.children=r:s.data=s.data.concat(r):(h?h.children=r:s.data=r,e(n).empty()),d.view.render.call(d.view,t,n,r),d.dnd&&o(t),h&&m(t,h);for(var f=[],u=[],p=0;p<r.length;p++){var v=r[p];v.checked||f.push(v)}j(r,function(e){e.checked&&u.push(e)});var g=d.onCheck;d.onCheck=function(){},f.length&&a(t,e("#"+f[0].domId)[0],!1);for(var p=0;p<u.length;p++)a(t,e("#"+u[p].domId)[0],!0);d.onCheck=g,setTimeout(function(){c(t,t)},0),d.onLoadSuccess.call(t,h,r)}function c(t,n,r){function o(e,t){e.find("span.tree-icon").prev("span.tree-indent").addClass("tree-join")}function a(t){var n=t.find("span.tree-indent, span.tree-hit").length;t.next().find("div.tree-node").each(function(){e(this).children("span:eq("+(n-1)+")").addClass("tree-line")})}if(!e.data(t,"tree").options.lines)return void e(t).removeClass("tree-lines");if(e(t).addClass("tree-lines"),!r){r=!0,e(t).find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom"),e(t).find("div.tree-node").removeClass("tree-node-last tree-root-first tree-root-one");var i=e(t).tree("getRoots");i.length>1?e(i[0].target).addClass("tree-root-first"):1==i.length&&e(i[0].target).addClass("tree-root-one")}e(n).children("li").each(function(){var n=e(this).children("div.tree-node"),i=n.next("ul");i.length?(e(this).next().length&&a(n),c(t,i,r)):o(n)}),e(n).children("li:last").children("div.tree-node").addClass("tree-node-last").children("span.tree-join").removeClass("tree-join").addClass("tree-joinbottom")}function d(t,n,r,o){var a=e.data(t,"tree").options;r=e.extend({},a.queryParams,r||{});var i=null;if(t!=n){var c=e(n).prev();i=w(t,c[0])}if(0!=a.onBeforeLoad.call(t,i,r)){var d=e(n).prev().children("span.tree-folder");d.addClass("tree-loading");0==a.loader.call(t,r,function(e){d.removeClass("tree-loading"),s(t,n,e),o&&o()},function(){d.removeClass("tree-loading"),a.onLoadError.apply(t,arguments),o&&o()})&&d.removeClass("tree-loading")}}function l(t,n,r){var o=e.data(t,"tree").options,a=e(n).children("span.tree-hit");if(0!=a.length&&!a.hasClass("tree-expanded")){var i=w(t,n);if(0!=o.onBeforeExpand.call(t,i)){a.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded"),a.next().addClass("tree-folder-open");var s=e(n).next();if(s.length)o.animate?s.slideDown("normal",function(){i.state="open",o.onExpand.call(t,i),r&&r()}):(s.css("display","block"),i.state="open",o.onExpand.call(t,i),r&&r());else{var c=e('<ul style="display:none"></ul>').insertAfter(n);d(t,c[0],{id:i.id},function(){c.is(":empty")&&c.remove(),o.animate?c.slideDown("normal",function(){i.state="open",o.onExpand.call(t,i),r&&r()}):(c.css("display","block"),i.state="open",o.onExpand.call(t,i),r&&r())})}}}}function h(t,n){var r=e.data(t,"tree").options,o=e(n).children("span.tree-hit");if(0!=o.length&&!o.hasClass("tree-collapsed")){var a=w(t,n);if(0!=r.onBeforeCollapse.call(t,a)){o.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed"),o.next().removeClass("tree-folder-open");var i=e(n).next();r.animate?i.slideUp("normal",function(){a.state="closed",r.onCollapse.call(t,a)}):(i.css("display","none"),a.state="closed",r.onCollapse.call(t,a))}}}function f(t,n){var r=e(n).children("span.tree-hit");0!=r.length&&(r.hasClass("tree-expanded")?h(t,n):l(t,n))}function u(e,t){var n=D(e,t);t&&n.unshift(w(e,t));for(var r=0;r<n.length;r++)l(e,n[r].target)}function p(e,t){for(var n=[],r=B(e,t);r;)n.unshift(r),r=B(e,r.target);for(var o=0;o<n.length;o++)l(e,n[o].target)}function v(t,n){for(var r=e(t).parent();"BODY"!=r[0].tagName&&"auto"!=r.css("overflow-y");)r=r.parent();var o=e(n),a=o.offset().top;if("BODY"!=r[0].tagName){var i=r.offset().top;a<i?r.scrollTop(r.scrollTop()+a-i):a+o.outerHeight()>i+r.outerHeight()-18&&r.scrollTop(r.scrollTop()+a+o.outerHeight()-i-r.outerHeight()+18)}else r.scrollTop(a)}function g(e,t){var n=D(e,t);t&&n.unshift(w(e,t));for(var r=0;r<n.length;r++)h(e,n[r].target)}function C(t,n){var r=e(n.parent),o=n.data;if(o&&(o=e.isArray(o)?o:[o],o.length)){var a;if(0==r.length)a=e(t);else{if(P(t,r[0])){var c=r.find("span.tree-icon");c.removeClass("tree-file").addClass("tree-folder tree-folder-open");var d=e('<span class="tree-hit tree-expanded"></span>').insertBefore(c);d.prev().length&&d.prev().remove()}a=r.next(),a.length||(a=e("<ul></ul>").insertAfter(r))}s(t,a[0],o,!0),i(t,a.prev())}}function b(t,n){var r=n.before||n.after,o=B(t,r),a=n.data;if(a&&(a=e.isArray(a)?a:[a],a.length)){C(t,{parent:o?o.target:null,data:a});for(var i=o?o.children:e(t).tree("getRoots"),s=0;s<i.length;s++)if(i[s].domId==e(r).attr("id")){for(var c=a.length-1;c>=0;c--)i.splice(n.before?s:s+1,0,a[c]);i.splice(i.length-a.length,a.length);break}for(var d=e(),s=0;s<a.length;s++)d=d.add(e("#"+a[s].domId).parent());n.before?d.insertBefore(e(r).parent()):d.insertAfter(e(r).parent())}}function x(t,n){var r=function(n){for(var r=e(n).attr("id"),o=B(t,n),a=o?o.children:e.data(t,"tree").data,i=0;i<a.length;i++)if(a[i].domId==r){a.splice(i,1);break}return o}(n);if(e(n).parent().remove(),r){if(!r.children||!r.children.length){var o=e(r.target);o.find(".tree-icon").removeClass("tree-folder").addClass("tree-file"),o.find(".tree-hit").remove(),e('<span class="tree-indent"></span>').prependTo(o),o.next().remove()}m(t,r),i(t,r.target)}c(t,t)}function m(t,n){var r=e.data(t,"tree").options,o=e(n.target),i=w(t,n.target),s=i.checked;i.iconCls&&o.find(".tree-icon").removeClass(i.iconCls),e.extend(i,n),o.find(".tree-title").html(r.formatter.call(t,i)),i.iconCls&&o.find(".tree-icon").addClass(i.iconCls),s!=i.checked&&a(t,n.target,i.checked)}function k(e,t){if(t){for(var n=B(e,t);n;)t=n.target,n=B(e,t);return w(e,t)}var r=y(e);return r.length?r[0]:null}function y(t){for(var n=e.data(t,"tree").data,r=0;r<n.length;r++)T(n[r]);return n}function D(t,n){var r=[],o=w(t,n);return j(o?o.children||[]:e.data(t,"tree").data,function(e){r.push(T(e))}),r}function B(t,n){return w(t,e(n).closest("ul").prevAll("div.tree-node:first")[0])}function E(t,n){n=n||"checked",e.isArray(n)||(n=[n]);for(var r=[],o=0;o<n.length;o++){var a=n[o];"checked"==a?r.push("span.tree-checkbox1"):"unchecked"==a?r.push("span.tree-checkbox0"):"indeterminate"==a&&r.push("span.tree-checkbox2")}var i=[];return e(t).find(r.join(",")).each(function(){var n=e(this).parent();i.push(w(t,n[0]))}),i}function L(t){var n=e(t).find("div.tree-node-selected");return n.length?w(t,n[0]):null}function S(e,t){var n=w(e,t);return n&&n.children&&j(n.children,function(e){T(e)}),n}function w(t,n){return I(t,"domId",e(n).attr("id"))}function A(e,t){return I(e,"id",t)}function I(t,n,r){var o=e.data(t,"tree").data,a=null;return j(o,function(e){if(e[n]==r)return a=T(e),!1}),a}function T(t){var n=e("#"+t.domId);return t.target=n[0],t.checked=n.find(".tree-checkbox").hasClass("tree-checkbox1"),t}function j(e,t){for(var n=[],r=0;r<e.length;r++)n.push(e[r]);for(;n.length;){var o=n.shift();if(0==t(o))return;if(o.children)for(var r=o.children.length-1;r>=0;r--)n.unshift(o.children[r])}}function N(t,n){var r=e.data(t,"tree").options,o=w(t,n);0!=r.onBeforeSelect.call(t,o)&&(e(t).find("div.tree-node-selected").removeClass("tree-node-selected"),e(n).addClass("tree-node-selected"),r.onSelect.call(t,o))}function P(t,n){return 0==e(n).children("span.tree-hit").length}function _(t,n){var r=e.data(t,"tree").options,o=w(t,n);if(0!=r.onBeforeEdit.call(t,o)){e(n).css("position","relative");var a=e(n).find(".tree-title"),i=a.outerWidth();a.empty();var s=e('<input class="tree-editor">').appendTo(a);s.val(o.text).focus(),s.width(i+20),s.height("CSS1Compat"==document.compatMode?18-(s.outerHeight()-s.height()):18),s.bind("click",function(e){return!1}).bind("mousedown",function(e){e.stopPropagation()}).bind("mousemove",function(e){e.stopPropagation()}).bind("keydown",function(e){return 13==e.keyCode?(O(t,n),!1):27==e.keyCode?(Y(t,n),!1):void 0}).bind("blur",function(e){e.stopPropagation(),O(t,n)})}}function O(t,n){var r=e.data(t,"tree").options;e(n).css("position","");var o=e(n).find("input.tree-editor"),a=o.val();o.remove();var i=w(t,n);i.text=a,m(t,i),r.onAfterEdit.call(t,i)}function Y(t,n){var r=e.data(t,"tree").options;e(n).css("position",""),e(n).find("input.tree-editor").remove();var o=w(t,n);m(t,o),r.onCancelEdit.call(t,o)}e.fn.tree=function(r,o){if("string"==typeof r)return e.fn.tree.methods[r](this,o);var r=r||{};return this.each(function(){var o,a=e.data(this,"tree");if(a)o=e.extend(a.options,r),a.options=o;else{o=e.extend({},e.fn.tree.defaults,e.fn.tree.parseOptions(this),r),e.data(this,"tree",{options:o,tree:t(this),data:[]});var i=e.fn.tree.parseData(this);i.length&&s(this,this,i)}n(this),o.data&&s(this,this,e.extend(!0,[],o.data)),d(this,this)})},e.fn.tree.methods={options:function(t){return e.data(t[0],"tree").options},loadData:function(e,t){return e.each(function(){s(this,this,t)})},getNode:function(e,t){return w(e[0],t)},getData:function(e,t){return S(e[0],t)},reload:function(t,n){return t.each(function(){if(n){var t=e(n);t.children("span.tree-hit").removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed"),t.next().remove(),l(this,n)}else e(this).empty(),d(this,this)})},getRoot:function(e,t){return k(e[0],t)},getRoots:function(e){return y(e[0])},getParent:function(e,t){return B(e[0],t)},getChildren:function(e,t){return D(e[0],t)},getChecked:function(e,t){return E(e[0],t)},getSelected:function(e){return L(e[0])},isLeaf:function(e,t){return P(e[0],t)},find:function(e,t){return A(e[0],t)},select:function(e,t){return e.each(function(){N(this,t)})},check:function(e,t){return e.each(function(){a(this,t,!0)})},uncheck:function(e,t){return e.each(function(){a(this,t,!1)})},collapse:function(e,t){return e.each(function(){h(this,t)})},expand:function(e,t){return e.each(function(){l(this,t)})},collapseAll:function(e,t){return e.each(function(){g(this,t)})},expandAll:function(e,t){return e.each(function(){u(this,t)})},expandTo:function(e,t){return e.each(function(){p(this,t)})},scrollTo:function(e,t){return e.each(function(){v(this,t)})},toggle:function(e,t){return e.each(function(){f(this,t)})},append:function(e,t){return e.each(function(){C(this,t)})},insert:function(e,t){return e.each(function(){b(this,t)})},remove:function(e,t){return e.each(function(){x(this,t)})},pop:function(e,t){var n=e.tree("getData",t);return e.tree("remove",t),n},update:function(e,t){return e.each(function(){m(this,t)})},enableDnd:function(e){return e.each(function(){o(this)})},disableDnd:function(e){return e.each(function(){r(this)})},beginEdit:function(e,t){return e.each(function(){_(this,t)})},endEdit:function(e,t){return e.each(function(){O(this,t)})},cancelEdit:function(e,t){return e.each(function(){Y(this,t)})}},e.fn.tree.parseOptions=function(t){e(t);return e.extend({},e.parser.parseOptions(t,["url","method",{checkbox:"boolean",cascadeCheck:"boolean",onlyLeafCheck:"boolean"},{animate:"boolean",lines:"boolean",dnd:"boolean"}]))},e.fn.tree.parseData=function(t){function n(t,r){r.children("li").each(function(){var r=e(this),o=e.extend({},e.parser.parseOptions(this,["id","iconCls","state"]),{checked:!!r.attr("checked")||void 0});o.text=r.children("span").html(),o.text||(o.text=r.html());var a=r.children("ul");a.length&&(o.children=[],n(o.children,a)),t.push(o)})}var r=[];return n(r,e(t)),r};var H=1,q={render:function(t,n,r){function o(e,n){for(var r=[],i=0;i<n.length;i++){var s=n[i];"open"!=s.state&&"closed"!=s.state&&(s.state="open"),s.domId="_easyui_tree_"+H++,r.push("<li>"),r.push('<div id="'+s.domId+'" class="tree-node">');for(var c=0;c<e;c++)r.push('<span class="tree-indent"></span>');var d=!1;if("closed"==s.state?(r.push('<span class="tree-hit tree-collapsed"></span>'),r.push('<span class="tree-icon tree-folder '+(s.iconCls?s.iconCls:"")+'"></span>')):s.children&&s.children.length?(r.push('<span class="tree-hit tree-expanded"></span>'),r.push('<span class="tree-icon tree-folder tree-folder-open '+(s.iconCls?s.iconCls:"")+'"></span>')):(r.push('<span class="tree-indent"></span>'),r.push('<span class="tree-icon tree-file '+(s.iconCls?s.iconCls:"")+'"></span>'),d=!0),a.checkbox&&(a.onlyLeafCheck&&!d||r.push('<span class="tree-checkbox tree-checkbox0"></span>')),r.push('<span class="tree-title">'+a.formatter.call(t,s)+"</span>"),r.push("</div>"),s.children&&s.children.length){var l=o(e+1,s.children);r.push('<ul style="display:'+("closed"==s.state?"none":"block")+'">'),r=r.concat(l),r.push("</ul>")}r.push("</li>")}return r}var a=e.data(t,"tree").options,i=e(n).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length,s=o(i,r);e(n).append(s.join(""))}};e.fn.tree.defaults={url:null,method:"post",animate:!1,checkbox:!1,cascadeCheck:!0,onlyLeafCheck:!1,lines:!1,dnd:!1,data:null,queryParams:{},formatter:function(e){return e.text},loader:function(t,n,r){var o=e(this).tree("options");if(!o.url)return!1;e.ajax({type:o.method,url:o.url,data:t,dataType:"json",success:function(e){n(e)},error:function(){r.apply(this,arguments)}})},loadFilter:function(e,t){return e},view:q,onBeforeLoad:function(e,t){},onLoadSuccess:function(e,t){},onLoadError:function(){},onClick:function(e){},onDblClick:function(e){},onBeforeExpand:function(e){},onExpand:function(e){},onBeforeCollapse:function(e){},onCollapse:function(e){},onBeforeCheck:function(e,t){},onCheck:function(e,t){},onBeforeSelect:function(e){},onSelect:function(e){},onContextMenu:function(e,t){},onBeforeDrag:function(e){},onStartDrag:function(e){},onStopDrag:function(e){},onDragEnter:function(e,t){},onDragOver:function(e,t){},onDragLeave:function(e,t){},onBeforeDrop:function(e,t,n){},onDrop:function(e,t,n){},onBeforeEdit:function(e){},onAfterEdit:function(e){},onCancelEdit:function(e){}}}(jQuery);
//# sourceMappingURL=jquery.tree.js.map