/*
 * Poshy Tip jQuery plugin v1.0
 * http://vadikom.com/tools/poshy-tip-jquery-plugin-for-stylish-tooltips/
 * Copyright 2010, Vasil Dinkov, http://vadikom.com/
 *
 * // 提示内容默认为元素的标题，可以使指定的字符串、元素、回调函数、jquery对象
 content:'[title]',
 // 指定的tips class样式
 className:'tip-yellow',
 //按照像素计算背景图片和显示内容的内边距
 bgImageFrameSize:10,
 showTimeout:500,// 延时多久开始显示
 hideTimeout:100,// 延时多久开始隐藏
 timeOnScreen:0,// 自动隐藏之前延时多久
 //显示方式 支持'hover'鼠标划入、'focus' 获取焦点、'none'手动显式调用
 showOn:'hover',
 liveEvents:false,// 支持live  事件  同样可以对未来元素进行影响
 alignTo:'cursor',// 和谁进行对齐 ('cursor' 鼠标, 'target' 目标元素)
 // 水平方向对齐方式 可选参数：
 //('right', 'center', 'left', 'inner-left', 'inner-right')
 alignX:'right',
 // 垂直方向对齐方式 可选参数：
 //('bottom', 'center', 'top', 'inner-bottom', 'inner-top')
 alignY:'top',
 offsetX:-22,// 水平偏移量
 offsetY:18,// 垂直方向偏移量
 //hover显示方式下，允许鼠标离开元素仍然显示提示信息
 allowTipHover:true,
 // 提示信息随着鼠标移动  只在满足hover显示方式下，对齐方式为alignTo:'cursor' 才有效
 followCursor:false,
 fade:true,// 使用动画
 slide:true,// 使用slie效果
 slideOffset:8,// slide 动画的偏移量
 // 动画显示的时间间隔 如果不想动画效果，设置为0即可
 showAniDuration:300,
 // 动画隐藏的时间间隔 如果不想动画效果，设置为0即可
 hideAniDuration:300
 */


!function(t){function i(){t.each(s,function(){this.refresh(!0)})}var s=[],e=/^url\(["']?([^"'\)]*)["']?\);?$/i,o=/\.png$/i,a=!t.support.leadingWhitespace;t(window).resize(i),t.Poshytip=function(i,s){this.$elm=t(i),this.opts=t.extend({},t.fn.poshytip.defaults,s),this.$tip=t(['<div class="',this.opts.className,'">','<div class="tip-inner tip-bg-image"></div>','<div class="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"></div>',"</div>"].join("")),this.$arrow=this.$tip.find("div.tip-arrow"),this.$inner=this.$tip.find("div.tip-inner"),this.disabled=!1,this.init()},t.Poshytip.prototype={init:function(){switch(s.push(this),this.$elm.data("title.poshytip",this.$elm.attr("title")).data("poshytip",this),this.opts.showOn){case"hover":this.$elm.bind({"mouseenter.poshytip":t.proxy(this.mouseenter,this),"mouseleave.poshytip":t.proxy(this.mouseleave,this)}),"cursor"==this.opts.alignTo&&this.$elm.bind("mousemove.poshytip",t.proxy(this.mousemove,this)),this.opts.allowTipHover&&this.$tip.hover(t.proxy(this.clearTimeouts,this),t.proxy(this.hide,this));break;case"focus":this.$elm.bind({"focus.poshytip":t.proxy(this.show,this),"blur.poshytip":t.proxy(this.hide,this)})}},mouseenter:function(i){if(this.disabled)return!0;this.clearTimeouts(),this.$elm.attr("title",""),this.showTimeout=setTimeout(t.proxy(this.show,this),this.opts.showTimeout)},mouseleave:function(){if(this.disabled)return!0;this.clearTimeouts(),this.$elm.attr("title",this.$elm.data("title.poshytip")),this.hideTimeout=setTimeout(t.proxy(this.hide,this),this.opts.hideTimeout)},mousemove:function(t){if(this.disabled)return!0;this.eventX=t.pageX,this.eventY=t.pageY,this.opts.followCursor&&this.$tip.data("active")&&(this.calcPos(),this.$tip.css({left:this.pos.l,top:this.pos.t}),this.pos.arrow&&(this.$arrow[0].className="tip-arrow tip-arrow-"+this.pos.arrow))},show:function(){this.disabled||this.$tip.data("active")||(this.reset(),this.update(),this.display())},hide:function(){!this.disabled&&this.$tip.data("active")&&this.display(!0)},reset:function(){this.$tip.queue([]).detach().css("visibility","hidden").data("active",!1),this.$inner.find("*").poshytip("hide"),this.opts.fade&&this.$tip.css("opacity",this.opacity),this.$arrow[0].className="tip-arrow tip-arrow-top tip-arrow-right tip-arrow-bottom tip-arrow-left"},update:function(t){if(!this.disabled){var i=void 0!==t;if(i){if(!this.$tip.data("active"))return}else t=this.opts.content;this.$inner.contents().detach();var s=this;this.$inner.append("function"==typeof t?t.call(this.$elm[0],function(t){s.update(t)}):"[title]"==t?this.$elm.data("title.poshytip"):t),this.refresh(i)}},refresh:function(i){if(!this.disabled){if(i){if(!this.$tip.data("active"))return;var s={left:this.$tip.css("left"),top:this.$tip.css("top")}}this.$tip.css({left:0,top:0}).appendTo(document.body),void 0===this.opacity&&(this.opacity=this.$tip.css("opacity"));var h=this.$tip.css("background-image").match(e),r=this.$arrow.css("background-image").match(e);if(h){var p=o.test(h[1]);a&&p?(this.$tip.css("background-image","none"),this.$inner.css({margin:0,border:0,padding:0}),h=p=!1):this.$tip.prepend('<table border="0" cellpadding="0" cellspacing="0"><tr><td class="tip-top tip-bg-image" colspan="2"><span></span></td><td class="tip-right tip-bg-image" rowspan="2"><span></span></td></tr><tr><td class="tip-left tip-bg-image" rowspan="2"><span></span></td><td></td></tr><tr><td class="tip-bottom tip-bg-image" colspan="2"><span></span></td></tr></table>').css({border:0,padding:0,"background-image":"none","background-color":"transparent"}).find(".tip-bg-image").css("background-image",'url("'+h[1]+'")').end().find("td").eq(3).append(this.$inner),p&&!t.support.opacity&&(this.opts.fade=!1)}r&&!t.support.opacity&&(a&&o.test(r[1])&&(r=!1,this.$arrow.css("background-image","none")),this.opts.fade=!1);var n=this.$tip.find("table");if(a){this.$tip[0].style.width="",n.width("auto").find("td").eq(3).width("auto");var l=this.$tip.width(),d=parseInt(this.$tip.css("min-width")),c=parseInt(this.$tip.css("max-width"));!isNaN(d)&&l<d?l=d:!isNaN(c)&&l>c&&(l=c),this.$tip.add(n).width(l).eq(0).find("td").eq(3).width("100%")}else n[0]&&n.width("auto").find("td").eq(3).width("auto").end().end().width(this.$tip.width()).find("td").eq(3).width("100%");this.tipOuterW=this.$tip.outerWidth(),this.tipOuterH=this.$tip.outerHeight(),this.calcPos(),r&&this.pos.arrow&&(this.$arrow[0].className="tip-arrow tip-arrow-"+this.pos.arrow,this.$arrow.css("visibility","inherit")),i?this.$tip.css(s).animate({left:this.pos.l,top:this.pos.t},200):this.$tip.css({left:this.pos.l,top:this.pos.t})}},display:function(i){var s=this.$tip.data("active");if(!(s&&!i||!s&&i)){if(this.$tip.stop(),(this.opts.slide&&this.pos.arrow||this.opts.fade)&&(i&&this.opts.hideAniDuration||!i&&this.opts.showAniDuration)){var e={},o={};if(this.opts.slide&&this.pos.arrow){var a,h;"bottom"==this.pos.arrow||"top"==this.pos.arrow?(a="top",h="bottom"):(a="left",h="right");var r=parseInt(this.$tip.css(a));e[a]=r+(i?0:this.opts.slideOffset*(this.pos.arrow==h?-1:1)),o[a]=r+(i?this.opts.slideOffset*(this.pos.arrow==h?1:-1):0)}this.opts.fade&&(e.opacity=i?this.$tip.css("opacity"):0,o.opacity=i?0:this.opacity),this.$tip.css(e).animate(o,this.opts[i?"hideAniDuration":"showAniDuration"])}i?this.$tip.queue(t.proxy(this.reset,this)):this.$tip.css("visibility","inherit"),this.$tip.data("active",!s)}},disable:function(){this.reset(),this.disabled=!0},enable:function(){this.disabled=!1},destroy:function(){this.reset(),this.$tip.remove(),this.$elm.unbind("poshytip").removeData("title.poshytip").removeData("poshytip"),s.splice(t.inArray(this,s),1)},clearTimeouts:function(){this.showTimeout&&(clearTimeout(this.showTimeout),this.showTimeout=0),this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=0)},calcPos:function(){var i,s,e,o,a,h,r={l:0,t:0,arrow:""},p=t(window),n={l:p.scrollLeft(),t:p.scrollTop(),w:p.width(),h:p.height()};if("cursor"==this.opts.alignTo)i=s=e=this.eventX,o=a=h=this.eventY;else{var l=this.$elm.offset(),d={l:l.left,t:l.top,w:this.$elm.outerWidth(),h:this.$elm.outerHeight()};i=d.l+("inner-right"!=this.opts.alignX?0:d.w),s=i+Math.floor(d.w/2),e=i+("inner-left"!=this.opts.alignX?d.w:0),o=d.t+("inner-bottom"!=this.opts.alignY?0:d.h),a=o+Math.floor(d.h/2),h=o+("inner-top"!=this.opts.alignY?d.h:0)}switch(this.opts.alignX){case"right":case"inner-left":r.l=e+this.opts.offsetX,r.l+this.tipOuterW>n.l+n.w&&(r.l=n.l+n.w-this.tipOuterW),"right"!=this.opts.alignX&&"center"!=this.opts.alignY||(r.arrow="left");break;case"center":r.l=s-Math.floor(this.tipOuterW/2),r.l+this.tipOuterW>n.l+n.w?r.l=n.l+n.w-this.tipOuterW:r.l<n.l&&(r.l=n.l);break;default:r.l=i-this.tipOuterW-this.opts.offsetX,r.l<n.l&&(r.l=n.l),"left"!=this.opts.alignX&&"center"!=this.opts.alignY||(r.arrow="right")}switch(this.opts.alignY){case"bottom":case"inner-top":r.t=h+this.opts.offsetY,r.arrow&&"cursor"!=this.opts.alignTo||(r.arrow="top"),r.t+this.tipOuterH>n.t+n.h&&(r.t=o-this.tipOuterH-this.opts.offsetY,"top"==r.arrow&&(r.arrow="bottom"));break;case"center":r.t=a-Math.floor(this.tipOuterH/2),r.t+this.tipOuterH>n.t+n.h?r.t=n.t+n.h-this.tipOuterH:r.t<n.t&&(r.t=n.t);break;default:r.t=o-this.tipOuterH-this.opts.offsetY,r.arrow&&"cursor"!=this.opts.alignTo||(r.arrow="bottom"),r.t<n.t&&(r.t=h+this.opts.offsetY,"bottom"==r.arrow&&(r.arrow="top"))}this.pos=r}},t.fn.poshytip=function(i){if("string"==typeof i)return this.each(function(){var s=t(this).data("poshytip");s&&s[i]&&s[i]()});var s=t.extend({},t.fn.poshytip.defaults,i);return t("#poshytip-css-"+s.className)[0]||t(['<style id="poshytip-css-',s.className,'" type="text/css">',"div.",s.className,"{visibility:hidden;position:absolute;top:0;left:0;}","div.",s.className," table, div.",s.className," td{margin:0;font-family:inherit;font-size:inherit;font-weight:inherit;font-style:inherit;font-variant:inherit;}","div.",s.className," td.tip-bg-image span{display:block;font:1px/1px sans-serif;height:",s.bgImageFrameSize,"px;width:",s.bgImageFrameSize,"px;overflow:hidden;}","div.",s.className," td.tip-right{background-position:100% 0;}","div.",s.className," td.tip-bottom{background-position:100% 100%;}","div.",s.className," td.tip-left{background-position:0 100%;}","div.",s.className," div.tip-inner{background-position:-",s.bgImageFrameSize,"px -",s.bgImageFrameSize,"px;}","div.",s.className," div.tip-arrow{visibility:hidden;position:absolute;overflow:hidden;font:1px/1px sans-serif;}","</style>"].join("")).appendTo("head"),this.each(function(){new t.Poshytip(this,s)})},t.fn.poshytip.defaults={content:"[title]",className:"tip-yellow",bgImageFrameSize:10,showTimeout:500,hideTimeout:100,showOn:"hover",alignTo:"cursor",alignX:"right",alignY:"top",offsetX:-22,offsetY:18,allowTipHover:!0,followCursor:!1,fade:!0,slide:!0,slideOffset:8,showAniDuration:300,hideAniDuration:300}}(jQuery);
//# sourceMappingURL=jquery.poshytip.js.map