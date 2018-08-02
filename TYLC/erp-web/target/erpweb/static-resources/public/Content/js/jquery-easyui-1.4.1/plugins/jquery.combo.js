/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(e){function o(o){var t=e.data(o,"combo"),i=t.options;t.panel||(t.panel=e('<div class="combo-panel"></div>').appendTo("body"),t.panel.panel({minWidth:i.panelMinWidth,maxWidth:i.panelMaxWidth,minHeight:i.panelMinHeight,maxHeight:i.panelMaxHeight,doSize:!1,closed:!0,cls:"combo-p",style:{position:"absolute",zIndex:10},onOpen:function(){var o=e(this).panel("options").comboTarget,t=e.data(o,"combo");t&&t.options.onShowPanel.call(o)},onBeforeClose:function(){a(this)},onClose:function(){var o=e(this).panel("options").comboTarget,t=e.data(o,"combo");t&&t.options.onHidePanel.call(o)}}));var l=e.extend(!0,[],i.icons);i.hasDownArrow&&l.push({iconCls:"combo-arrow",handler:function(e){n(e.data.target)}}),e(o).addClass("combo-f").textbox(e.extend({},i,{icons:l,onChange:function(){}})),e(o).attr("comboName",e(o).attr("textboxName")),t.combo=e(o).next(),t.combo.addClass("combo")}function t(o){var t=e.data(o,"combo"),n=t.options,a=t.panel;a.is(":visible")&&a.panel("close"),n.cloned||a.panel("destroy"),e(o).textbox("destroy")}function n(o){var t=e.data(o,"combo").panel;if(t.is(":visible"))r(o);else{var n=e(o).closest("div.combo-panel");e("div.combo-panel:visible").not(t).not(n).panel("close"),e(o).combo("showPanel")}e(o).combo("textbox").focus()}function a(o){e(o).find(".combo-f").each(function(){var o=e(this).combo("panel");o.is(":visible")&&o.panel("close")})}function i(o){var t=o.data.target,a=e.data(t,"combo"),i=a.options,l=a.panel;if(i.editable){var c=e(t).closest("div.combo-panel");e("div.combo-panel:visible").not(l).not(c).panel("close")}else n(t)}function l(o){var t=o.data.target,n=e(t),a=n.data("combo"),i=n.combo("options");switch(o.keyCode){case 38:i.keyHandler.up.call(t,o);break;case 40:i.keyHandler.down.call(t,o);break;case 37:i.keyHandler.left.call(t,o);break;case 39:i.keyHandler.right.call(t,o);break;case 13:return o.preventDefault(),i.keyHandler.enter.call(t,o),!1;case 9:case 27:r(t);break;default:i.editable&&(a.timer&&clearTimeout(a.timer),a.timer=setTimeout(function(){var e=n.combo("getText");a.previousText!=e&&(a.previousText=e,n.combo("showPanel"),i.keyHandler.query.call(t,e,o),n.combo("validate"))},i.delay))}}function c(o){function t(){var o=i.offset().left;return"right"==c.panelAlign&&(o+=i._outerWidth()-l._outerWidth()),o+l._outerWidth()>e(window)._outerWidth()+e(document).scrollLeft()&&(o=e(window)._outerWidth()+e(document).scrollLeft()-l._outerWidth()),o<0&&(o=0),o}function n(){var o=i.offset().top+i._outerHeight();return o+l._outerHeight()>e(window)._outerHeight()+e(document).scrollTop()&&(o=i.offset().top-l._outerHeight()),o<e(document).scrollTop()&&(o=i.offset().top+i._outerHeight()),o}var a=e.data(o,"combo"),i=a.combo,l=a.panel,c=e(o).combo("options"),r=l.panel("options");r.comboTarget=o,r.closed&&(l.panel("panel").show().css({zIndex:e.fn.menu?e.fn.menu.defaults.zIndex++:e.fn.window.defaults.zIndex++,left:-999999}),l.panel("resize",{width:c.panelWidth?c.panelWidth:i._outerWidth(),height:c.panelHeight}),l.panel("panel").hide(),l.panel("open")),function(){l.is(":visible")&&(l.panel("move",{left:t(),top:n()}),setTimeout(arguments.callee,200))}()}function r(o){e.data(o,"combo").panel.panel("close")}function s(o){var t=e.data(o,"combo"),n=t.options,a=t.combo;e(o).textbox("clear"),n.multiple?a.find(".textbox-value").remove():a.find(".textbox-value").val("")}function u(o,t){var n=e.data(o,"combo");e(o).textbox("getText")!=t&&(e(o).textbox("setText",t),n.previousText=t)}function d(o){var t=[];return e.data(o,"combo").combo.find(".textbox-value").each(function(){t.push(e(this).val())}),t}function p(o,t){var n=e.data(o,"combo"),a=n.options,i=n.combo;e.isArray(t)||(t=t.split(a.separator));var l=d(o);i.find(".textbox-value").remove();for(var c=e(o).attr("textboxName")||"",r=0;r<t.length;r++){var s=e('<input type="hidden" class="textbox-value">').appendTo(i);s.attr("name",c),a.disabled&&s.attr("disabled","disabled"),s.val(t[r])}(function(){if(l.length!=t.length)return!0;var o=e.extend(!0,[],l),n=e.extend(!0,[],t);o.sort(),n.sort();for(var a=0;a<o.length;a++)if(o[a]!=n[a])return!0;return!1})()&&(a.multiple?a.onChange.call(o,t,l):a.onChange.call(o,t[0],l[0]))}function b(e){return d(e)[0]}function h(e,o){p(e,[o])}function f(o){var t=e.data(o,"combo").options,n=t.onChange;t.onChange=function(){},t.multiple?p(o,t.value?t.value:[]):h(o,t.value),t.onChange=n}e(function(){e(document).unbind(".combo").bind("mousedown.combo mousewheel.combo",function(o){var t=e(o.target).closest("span.combo,div.combo-p");if(t.length)return void a(t);e("body>div.combo-p>div.combo-panel:visible").panel("close")})}),e.fn.combo=function(t,n){if("string"==typeof t){var a=e.fn.combo.methods[t];return a?a(this,n):this.textbox(t,n)}return t=t||{},this.each(function(){var n=e.data(this,"combo");n?(e.extend(n.options,t),void 0!=t.value&&(n.options.originalValue=t.value)):(n=e.data(this,"combo",{options:e.extend({},e.fn.combo.defaults,e.fn.combo.parseOptions(this),t),previousText:""}),n.options.originalValue=n.options.value),o(this),f(this)})},e.fn.combo.methods={options:function(o){var t=o.textbox("options");return e.extend(e.data(o[0],"combo").options,{width:t.width,height:t.height,disabled:t.disabled,readonly:t.readonly})},cloneFrom:function(o,t){return o.each(function(){e(this).textbox("cloneFrom",t),e.data(this,"combo",{options:e.extend(!0,{cloned:!0},e(t).combo("options")),combo:e(this).next(),panel:e(t).combo("panel")}),e(this).addClass("combo-f").attr("comboName",e(this).attr("textboxName"))})},panel:function(o){return e.data(o[0],"combo").panel},destroy:function(e){return e.each(function(){t(this)})},showPanel:function(e){return e.each(function(){c(this)})},hidePanel:function(e){return e.each(function(){r(this)})},clear:function(e){return e.each(function(){s(this)})},reset:function(o){return o.each(function(){var o=e.data(this,"combo").options;o.multiple?e(this).combo("setValues",o.originalValue):e(this).combo("setValue",o.originalValue)})},setText:function(e,o){return e.each(function(){u(this,o)})},getValues:function(e){return d(e[0])},setValues:function(e,o){return e.each(function(){p(this,o)})},getValue:function(e){return b(e[0])},setValue:function(e,o){return e.each(function(){h(this,o)})}},e.fn.combo.parseOptions=function(o){var t=e(o);return e.extend({},e.fn.textbox.parseOptions(o),e.parser.parseOptions(o,["separator","panelAlign",{panelWidth:"number",hasDownArrow:"boolean",delay:"number",selectOnNavigation:"boolean"},{panelMinWidth:"number",panelMaxWidth:"number",panelMinHeight:"number",panelMaxHeight:"number"}]),{panelHeight:"auto"==t.attr("panelHeight")?"auto":parseInt(t.attr("panelHeight"))||void 0,multiple:!!t.attr("multiple")||void 0})},e.fn.combo.defaults=e.extend({},e.fn.textbox.defaults,{inputEvents:{click:i,keydown:l,paste:l,drop:l},panelWidth:null,panelHeight:200,panelMinWidth:null,panelMaxWidth:null,panelMinHeight:null,panelMaxHeight:null,panelAlign:"left",multiple:!1,selectOnNavigation:!0,separator:",",hasDownArrow:!0,delay:200,keyHandler:{up:function(e){},down:function(e){},left:function(e){},right:function(e){},enter:function(e){},query:function(e,o){}},onShowPanel:function(){},onHidePanel:function(){},onChange:function(e,o){}})}(jQuery);
//# sourceMappingURL=jquery.combo.js.map