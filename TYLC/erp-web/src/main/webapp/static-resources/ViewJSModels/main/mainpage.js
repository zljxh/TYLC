
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
    return '<iframe scrolling="auto" frameborder="0"  style="width:100%;height:100%;" src="' + url + '" ></iframe>';
}

mainWindow.openTabHandler = function ($tab, hasTab, subtitle, url, icon) {
    if (!hasTab) {
        $tab.tabs('add', { title: subtitle, content: mainWindow.createFrame(url), closable: true, icon: icon });
    } else {
        $tab.tabs('select', subtitle);
        mainWindow.tabRefresh(url);   //选择TAB时刷新页面
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
        $.messager.confirm("系统提示", '<b>您当前打开了太多的页面，如果继续打开，会造成程序运行缓慢，无法流畅操作！</b>', function (b) {
            if (b)
                mainWindow.openTabHandler($tab, hasTab, subtitle, url, icon);
        });
};
mainWindow.binderMenuClick = function () {
   
    var obj = $("#mainMenu");
    $(obj).find('li').click(function () {
        $(obj).find('li div').removeClass("selected");
        $(this).children('div').addClass("selected");

        var link = $(this).find('a');
        var title = link.children('.nav').text();
        var url = link.attr("rel");
        var code = link.attr("ref");
        var icon = link.children('.icon').attr('class');

        mainWindow.addTab(title, url, icon);
    }).hover(function () {
        $(this).children('div').addClass("hover");
    }, function () {
        $(this).children('div').removeClass("hover");
    });
};
mainWindow.logout = function () {
    $.messager.confirm('系统提示', '您确定要退出本次登录吗?', function (r) {
        if (r) location.href = '/login/logout';
    });
};
$(document).ready(function () {
    ko.applyBindings(mainWindow);
    mainWindow.binderMenuClick();
});