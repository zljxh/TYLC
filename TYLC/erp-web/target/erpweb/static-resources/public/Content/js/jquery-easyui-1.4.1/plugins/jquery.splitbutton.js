/**
 * jQuery EasyUI 1.4.1
 * 
 * Copyright (c) 2009-2014 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(t){function n(n){var i=t.data(n,"splitbutton").options;t(n).menubutton(i),t(n).addClass("s-btn")}t.fn.splitbutton=function(i,e){if("string"==typeof i){var o=t.fn.splitbutton.methods[i];return o?o(this,e):this.menubutton(i,e)}return i=i||{},this.each(function(){var e=t.data(this,"splitbutton");e?t.extend(e.options,i):(t.data(this,"splitbutton",{options:t.extend({},t.fn.splitbutton.defaults,t.fn.splitbutton.parseOptions(this),i)}),t(this).removeAttr("disabled")),n(this)})},t.fn.splitbutton.methods={options:function(n){var i=n.menubutton("options"),e=t.data(n[0],"splitbutton").options;return t.extend(e,{disabled:i.disabled,toggle:i.toggle,selected:i.selected}),e}},t.fn.splitbutton.parseOptions=function(n){t(n);return t.extend({},t.fn.linkbutton.parseOptions(n),t.parser.parseOptions(n,["menu",{plain:"boolean",duration:"number"}]))},t.fn.splitbutton.defaults=t.extend({},t.fn.linkbutton.defaults,{plain:!0,menu:null,duration:100,cls:{btn1:"m-btn-active s-btn-active",btn2:"m-btn-plain-active s-btn-plain-active",arrow:"m-btn-downarrow",trigger:"m-btn-line"}})}(jQuery);
//# sourceMappingURL=jquery.splitbutton.js.map