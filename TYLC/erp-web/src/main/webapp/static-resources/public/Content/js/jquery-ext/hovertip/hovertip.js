$.fn.extend({hoverTips:function(){var t=$(this),o=t.get(0).switch;if(!o){o=!0;var e=t.attr("tooltips"),s=$("<div class='hovertooltips'>").addClass("yellow").html("<p class='content'></p><p class='triangle-front'></p><p class='triangle-back'></p>");s.find("p.content").html(e)}t.on("mouseover",function(){$("body").append(s);var o=t.offset().left-s.outerWidth()/2+t.outerWidth()/2,e=t.offset().top-s.outerHeight()-parseInt(s.find(".triangle-front").css("border-width"));s.css({left:o,top:e-10,display:"block"}),s.stop().animate({top:e,opacity:1},300)}),t.on("mouseout",function(){var t=parseInt(s.css("top"));s.stop().animate({top:t-10,opacity:0},300,function(){s.remove(),o=!1})})},clickTips:function(){var t=$(this),o=t.get(0).switch;if(!o){o=!0;var e=t.attr("tooltips"),s=$("<div class='hovertooltips'>").addClass("yellow").html("<p class='content'></p><p class='triangle-front'></p><p class='triangle-back'></p>");s.find("p.content").html(e)}t.on("click",function(){$("body").append(s);var e=t.offset().left-s.outerWidth()/2+t.outerWidth()/2,i=t.offset().top-s.outerHeight()-parseInt(s.find(".triangle-front").css("border-width"));s.css({left:e,top:i-10,display:"block"}),s.stop().animate({top:i,opacity:1},300,function(){setTimeout(function(){s.stop().animate({top:i-10,opacity:0},300,function(){s.remove(),o=!1})},2e3)})})}});
//# sourceMappingURL=hovertip.js.map