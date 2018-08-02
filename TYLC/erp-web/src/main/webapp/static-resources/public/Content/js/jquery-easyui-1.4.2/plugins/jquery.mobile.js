/**
 * jQuery EasyUI 1.4.2
 * 
 * Copyright (c) 2009-2015 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the GPL license: http://www.gnu.org/licenses/gpl.txt
 * To use it on other terms please contact us at info@jeasyui.com
 *
 */


!function(n){n.fn.navpanel=function(e,i){if("string"==typeof e){var a=n.fn.navpanel.methods[e];return a?a(this,i):this.panel(e,i)}return e=e||{},this.each(function(){var i=n.data(this,"navpanel");i?n.extend(i.options,e):i=n.data(this,"navpanel",{options:n.extend({},n.fn.navpanel.defaults,n.fn.navpanel.parseOptions(this,e))}),n(this).panel(i.options)})},n.fn.navpanel.methods={options:function(e){return n.data(e[0],"navpanel").options}},n.fn.navpanel.parseOptions=function(e){return n.extend({},n.fn.panel.parseOptions(e),n.parser.parseOptions(e,[]))},n.fn.navpanel.defaults=n.extend({},n.fn.panel.defaults,{fit:!0,border:!1,cls:"navpanel"}),n.parser.plugins.push("navpanel")}(jQuery),function(n){n(function(){n.mobile.init()}),n.mobile={defaults:{animation:"slide",direction:"left",reverseDirections:{up:"down",down:"up",left:"right",right:"left"}},panels:[],init:function(e){n.mobile.panels=[];var i=n(e||"body").children(".navpanel:visible");if(i.length){i.not(":first").children(".panel-body").navpanel("close");var a=i.eq(0).children(".panel-body");n.mobile.panels.push({panel:a,animation:n.mobile.defaults.animation,direction:n.mobile.defaults.direction})}n(document).unbind(".mobile").bind("click.mobile",function(e){var i=n(e.target).closest("a");if(i.length){var a=n.parser.parseOptions(i[0],["animation","direction",{back:"boolean"}]);if(a.back)n.mobile.back(),e.preventDefault();else{var t=n.trim(i.attr("href"));if(/^#/.test(t)){var o=n(t);o.length&&o.hasClass("panel-body")&&(n.mobile.go(o,a.animation,a.direction),e.preventDefault())}}}}),n(window).unbind(".mobile").bind("hashchange.mobile",function(){var e=n.mobile.panels.length;if(e>1){var i=location.hash,a=n.mobile.panels[e-2];i&&i!="#&"+a.panel.attr("id")||n.mobile._back()}})},nav:function(e,i,a,t){if(window.WebKitAnimationEvent){a=void 0!=a?a:n.mobile.defaults.animation,t=void 0!=t?t:n.mobile.defaults.direction;var o="m-"+a+(t?"-"+t:""),l=n(e).panel("open").panel("resize").panel("panel"),s=n(i).panel("open").panel("resize").panel("panel");l.add(s).bind("webkitAnimationEnd",function(){n(this).unbind("webkitAnimationEnd");var e=n(this).children(".panel-body");n(this).hasClass("m-in")?e.panel("open").panel("resize"):e.panel("close"),n(this).removeClass(o+" m-in m-out")}),s.addClass(o+" m-in"),l.addClass(o+" m-out")}else n(i).panel("open").panel("resize"),n(e).panel("close")},_go:function(e,i,a){i=void 0!=i?i:n.mobile.defaults.animation,a=void 0!=a?a:n.mobile.defaults.direction;var t=n.mobile.panels[n.mobile.panels.length-1].panel,o=n(e);t[0]!=o[0]&&(n.mobile.nav(t,o,i,a),n.mobile.panels.push({panel:o,animation:i,direction:a}))},_back:function(){if(!(n.mobile.panels.length<2)){var e=n.mobile.panels.pop(),i=n.mobile.panels[n.mobile.panels.length-1],a=e.animation,t=n.mobile.defaults.reverseDirections[e.direction]||"";n.mobile.nav(e.panel,i.panel,a,t)}},go:function(e,i,a){i=void 0!=i?i:n.mobile.defaults.animation,a=void 0!=a?a:n.mobile.defaults.direction,location.hash="#&"+n(e).attr("id"),n.mobile._go(e,i,a)},back:function(){history.go(-1)}},n.map(["validatebox","textbox","filebox","searchbox","combo","combobox","combogrid","combotree","datebox","datetimebox","numberbox","spinner","numberspinner","timespinner","datetimespinner"],function(e){n.fn[e]&&n.extend(n.fn[e].defaults,{height:32,iconWidth:28,tipPosition:"bottom"})}),n.map(["spinner","numberspinner","timespinner","datetimespinner"],function(e){n.extend(n.fn[e].defaults,{height:32,iconWidth:56})}),n.extend(n.fn.menu.defaults,{itemHeight:30,noline:!0})}(jQuery);
//# sourceMappingURL=jquery.mobile.js.map