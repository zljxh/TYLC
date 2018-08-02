/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(n){function a(a){n(a).addClass("droppable"),n(a).bind("_dragenter",function(o,t){n.data(a,"droppable").options.onDragEnter.apply(a,[o,t])}),n(a).bind("_dragleave",function(o,t){n.data(a,"droppable").options.onDragLeave.apply(a,[o,t])}),n(a).bind("_dragover",function(o,t){n.data(a,"droppable").options.onDragOver.apply(a,[o,t])}),n(a).bind("_drop",function(o,t){n.data(a,"droppable").options.onDrop.apply(a,[o,t])})}n.fn.droppable=function(o,t){return"string"==typeof o?n.fn.droppable.methods[o](this,t):(o=o||{},this.each(function(){var t=n.data(this,"droppable");t?n.extend(t.options,o):(a(this),n.data(this,"droppable",{options:n.extend({},n.fn.droppable.defaults,n.fn.droppable.parseOptions(this),o)}))}))},n.fn.droppable.methods={options:function(a){return n.data(a[0],"droppable").options},enable:function(a){return a.each(function(){n(this).droppable({disabled:!1})})},disable:function(a){return a.each(function(){n(this).droppable({disabled:!0})})}},n.fn.droppable.parseOptions=function(a){var o=n(a);return n.extend({},n.parser.parseOptions(a,["accept"]),{disabled:!!o.attr("disabled")||void 0})},n.fn.droppable.defaults={accept:null,disabled:!1,onDragEnter:function(n,a){},onDragOver:function(n,a){},onDragLeave:function(n,a){},onDrop:function(n,a){}}}(jQuery);
//# sourceMappingURL=jquery.droppable.js.map