/**
 * jQuery EasyUI 1.4.2
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(n){function e(e){n(e).addClass("numberspinner-f");var r=n.data(e,"numberspinner").options;n(e).numberbox(r).spinner(r),n(e).numberbox("setValue",r.value)}function r(e,r){var t=n.data(e,"numberspinner").options,i=parseFloat(n(e).numberbox("getValue")||t.value)||0;r?i-=t.increment:i+=t.increment,n(e).numberbox("setValue",i)}n.fn.numberspinner=function(r,t){if("string"==typeof r){var i=n.fn.numberspinner.methods[r];return i?i(this,t):this.numberbox(r,t)}return r=r||{},this.each(function(){var t=n.data(this,"numberspinner");t?n.extend(t.options,r):n.data(this,"numberspinner",{options:n.extend({},n.fn.numberspinner.defaults,n.fn.numberspinner.parseOptions(this),r)}),e(this)})},n.fn.numberspinner.methods={options:function(e){var r=e.numberbox("options");return n.extend(n.data(e[0],"numberspinner").options,{width:r.width,value:r.value,originalValue:r.originalValue,disabled:r.disabled,readonly:r.readonly})}},n.fn.numberspinner.parseOptions=function(e){return n.extend({},n.fn.spinner.parseOptions(e),n.fn.numberbox.parseOptions(e),{})},n.fn.numberspinner.defaults=n.extend({},n.fn.spinner.defaults,n.fn.numberbox.defaults,{spin:function(n){r(this,n)}})}(jQuery);
//# sourceMappingURL=jquery.numberspinner.js.map