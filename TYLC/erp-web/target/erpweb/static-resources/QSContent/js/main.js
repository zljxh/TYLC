var mainWindow = {maxTabCount:10};
mainWindow.tabRefresh = function (url) {
    var $tab = $("#mainTabs");
    var currentTab = $tab.tabs('getSelected');
    var src = $(currentTab.panel('options').content).attr('src');
    if (typeof src === 'string') src = url;
    $tab.tabs('update', { tab: currentTab, options: { content: mainWindow.createFrame(src) } })
};
mainWindow.setLocationHash = function () {
    try {
        var $obj = $('#mainTabs');
        var src = '', tabs = $obj.data().tabs.tabs;
        var tab = $obj.tabs('getSelected');

        var fnSrc = function (tab) {
            var iframe = tab.find('iframe');
            return iframe.length ? iframe[0].src.replace(location.host, '').replace('http://', '').replace('.aspx', '') : '';
        };

        if (tab) {
            src = fnSrc(tab);
            if (src) window.location.hash = '!' + src;   //如果src没有，就不设置，case在f5刷新时出现
            if (src == homeUrl) window.location.hash = '';
        }
        else {
            src = fnSrc(tabs[tabs.length - 1]); //关闭tabs时，当前tab为空
            window.location.hash = '!' + src;
        }
    }
    catch (e) { }
}
mainWindow.createFrame = function (url) {
    var html= '<iframe scrolling="auto" frameborder="0"  style="width:100%;height:100%;" src="' + url + '" ></iframe>';
    return html;
}

mainWindow.openTabHandler = function ($tab, hasTab, subtitle, url, icon) {
    if (!hasTab) {
        $tab.tabs('add', { title: subtitle, content: mainWindow.createFrame(url)
            , closable: true, icon: icon,tools:[{
                iconCls:'icon-mini-refresh',
                handler:function(){
                   var $tab = $("#mainTabs");
                   var title= $(this).parents("li").find(".tabs-title").text();
                    if(!title) return;
                    $tab.tabs('select',title);
                    var currentTab = $tab.tabs('getSelected');
                    var src=$(currentTab.panel('options').content).attr('src');
                    //$(currentTab.panel('options').content).attr('src','');
                    //$(currentTab.panel('options').content).attr('src',src);
                    //currentTab.panel('options').content.window.location.reload();
                   //var src = $(currentTab.panel('options').content).attr('src');                    //if (typeof src === 'string') src = url;
                    $tab.tabs('update', { tab: currentTab, options: {content: mainWindow.createFrame(src) } })
                }
            }]  });
        mainWindow.tabMenuModel.addFullScreendblclick();//为新增的tab添加全屏双击事件
    } else {
        $tab.tabs('select', subtitle);
    }
    mainWindow.setLocationHash();
};

mainWindow.getTabTitles = function ($tab) {
    var titles = [];
    var tabs = $tab.tabs('mainTabs');
    $.each(tabs, function () { titles.push($(this).panel('options').title); });
    return titles;
};

mainWindow.addTab = function (subtitle, url, icon) {
    if (!url || url == '#') return false;
    var $tab = $('#mainTabs');
    var tabCount = $tab.tabs('tabs').length;
    var hasTab = $tab.tabs('exists', subtitle);
    if ((tabCount <= mainWindow.maxTabCount) || hasTab)
        mainWindow.openTabHandler($tab, hasTab, subtitle, url, icon);
    else
        $.messager.confirm("系统提示", '<b>标签页太多,会造成程序运行缓慢，无法流畅操作,是否继续打开？</b>', function (b) {
            if (b)
                mainWindow.openTabHandler($tab, hasTab, subtitle, url, icon);
        });

};
mainWindow.getWinResetPwd=function()
{
    var resetPwdUrl="/Operator/resetPwd";
  return  new c8.c8Window({url: resetPwdUrl,model:mainWindow,isShowParent: false});
}
mainWindow.resetPwd=function() {
    mainWindow.winResetPwd = this.getWinResetPwd();
    mainWindow.winResetPwd.c8SetFormModel({model:{}});
    mainWindow.winResetPwd.openWin();
}
mainWindow.updatePwd = function () {
    var updatePwdUrl="/Operator/updatePwd";
   var modelInfo= mainWindow.winResetPwd.c8GetFormModel({model:{}});
    ko.c8Ajax({
        type: "post",
        url: updatePwdUrl,
        async: true,
        dataType: "json",
        data: ko.toJSON(modelInfo),
        contentType: "application/json",
        success: function (data) {
            $.messager.progress('close');
            if(data.Result)
            {
                mainWindow.winResetPwd.c8CloseWin()
            }
            else
            {
                mainWindow.winResetPwd.alert(data.Message);
            }
            location.href = '/login/logout';
        },
        error: function (e) {
            $.messager.progress('close');	// 如果提交成功则隐藏进度条
            alert(e.responseText);
            // self.message(e.responseText);
        },
        beforeSend: function () {
            $.messager.progress();
        },
        complete: function () {
           	// 如果提交成功则隐藏进度条
        }
    });
}
mainWindow.logout = function () {
    $.messager.confirm('系统提示', '您确定要退出本次登录吗?', function (r) {
        if (r) location.href = '/login/logout';
    });
};
mainWindow.tabContextMenu = function (e, title) {
    $('#tabMenu').menu('show', {left: e.pageX,top: e.pageY});
   // $('#mainTabs').tabs('select', title);
    e.preventDefault();
};



mainWindow.topMenuClick=function (e){

    var url = $(this).attr("c8Url");
    var title = $(this).text();
    var icon ="";//node.iconCls; //link.children('.icon').attr('class');
    mainWindow.addTab(title, url, icon);

    e.preventDefault();
}

mainWindow.globalSettings={homeTabTitle:"我的应用",IsFullScreen:false,maxTabCount:11};

mainWindow.intitWin=function()
{
    $(document.body).addClass("easyui-layout");
    $(document.body).attr("fit",true);
    $(document.body).attr("style","");
    $(document.body).layout();

   $('#tabMenu').menu({ onClick:function(item){
       mainWindow.tabMenuModel[item.id](item);
   } });
    $('#mainTabs').tabs({
        onContextMenu: mainWindow.tabContextMenu
        ,onClose:function(title,index){
            mainWindow.setLocationHash();
        },onSelect:function(){
            mainWindow.setLocationHash();
        }
    });
    $("a[c8Url]").click(mainWindow.topMenuClick);
    ko.c8BindingViewModel(mainWindow);
}
/*jQuery(window).height()代表了当前可见区域的大小，
而jQuery(document).height()则代表了整个文档的高度，可视具体情况使用
 注意当浏览器窗口大小改变时(如最大化或拉大窗口后) jQuery(window).height() 随之改变，
 但是jQuery(document).height()是不变的。*/
$(document).ready(function () {
    mainWindow.intitWin();
   $(".qsmenu").parent().css("overflow","visible");
   $(".qsmenu").parent().parent().css("overflow","visible");

    $(".sub-qsmenu").hover(
        function () {
            var list = $("ul li", this);
            var width = 0;
            for (var i = 0; i < list.length; i++) {
                width += $(list[i]).outerWidth(true);
            }
            var offset = $(this).offset();
            var x =offset.left;
            var y =offset.top ;
            var docWidth=jQuery(document).width();
            var left=width+x-docWidth;
            if(left>0)
            {
                $("ul", this).css("left",-left+"px");
            }
            $("ul", this).css({display: "block", width: width+"px"});
        },
        function () {
            $("ul",this).css("display","none");
        }
    );
});
function c8ExcuteMethod(methodName) {
    var param=[];
    for(var i = 1; i < arguments.length; i++){
        param[i-1]=arguments[i];
    }
    mainWindow[methodName].apply(mainWindow, param);
}
function getGlobalInfo() {
    return mainWindow.globalSettings;
}
function getLoginState()
{
return LoginState;
}
var LoginState=0;
function openShowLogin() {
    $("#showLogin").html("<iframe scrolling='auto' frameborder='0' style='width:100%;height:100%;' src='/showLogin?Math.random()'></iframe>");
    $('#showLogin').window({onClose:function(){
        LoginState=0;
    } });
    $('#showLogin').window('open')
    LoginState=1;
}
function closeShowLogin() {
    $('#showLogin').window('close');
    var LoginState=0;
}
