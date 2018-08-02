/**
 * jQuery EasyUI 1.4.2
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(e){function t(t){var n=e.data(t,"datetimespinner").options;e(t).addClass("datetimespinner-f").timespinner(n)}e.fn.datetimespinner=function(n,i){if("string"==typeof n){var r=e.fn.datetimespinner.methods[n];return r?r(this,i):this.timespinner(n,i)}return n=n||{},this.each(function(){var i=e.data(this,"datetimespinner");i?e.extend(i.options,n):e.data(this,"datetimespinner",{options:e.extend({},e.fn.datetimespinner.defaults,e.fn.datetimespinner.parseOptions(this),n)}),t(this)})},e.fn.datetimespinner.methods={options:function(t){var n=t.timespinner("options");return e.extend(e.data(t[0],"datetimespinner").options,{width:n.width,value:n.value,originalValue:n.originalValue,disabled:n.disabled,readonly:n.readonly})}},e.fn.datetimespinner.parseOptions=function(t){return e.extend({},e.fn.timespinner.parseOptions(t),e.parser.parseOptions(t,[]))},e.fn.datetimespinner.defaults=e.extend({},e.fn.timespinner.defaults,{formatter:function(t){return t?e.fn.datebox.defaults.formatter.call(this,t)+" "+e.fn.timespinner.defaults.formatter.call(this,t):""},parser:function(t){if(!(t=e.trim(t)))return null;var n=t.split(" "),i=e.fn.datebox.defaults.parser.call(this,n[0]);if(n.length<2)return i;var r=e.fn.timespinner.defaults.parser.call(this,n[1]);return new Date(i.getFullYear(),i.getMonth(),i.getDate(),r.getHours(),r.getMinutes(),r.getSeconds())},selections:[[0,2],[3,5],[6,10],[11,13],[14,16],[17,19]]})}(jQuery);
//# sourceMappingURL=jquery.datetimespinner.js.map