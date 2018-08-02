mainWindow.tabMenuModel={};
mainWindow.tabMenuModel.getCurrentTabInfo=function()
{
    var pTab = $('#mainTabs');
    var currentTab = pTab.tabs('getSelected');
    var src = $(currentTab.panel('options').content).attr('src');
    var currtab_title = currentTab.panel('options').title;
    return {pTab:pTab,currentTab:currentTab,src:src,title:currtab_title};
}
mainWindow.tabMenuModel.getTabTitles = function ($tab) {
    var titles = [];
    var pTab = $('#mainTabs');
    var tabs = pTab.tabs('tabs');
    $.each(tabs, function () { titles.push($(this).panel('options').title); });
    return titles;
};
mainWindow.tabMenuModel.refresh=function(){
    var tabInfo=this.getCurrentTabInfo();
    tabInfo.pTab.tabs('update',{tab:tabInfo.currentTab, options: { content: mainWindow.createFrame(tabInfo.src) } });
};
mainWindow.tabMenuModel.close=function(){
    var tabInfo=this.getCurrentTabInfo();
    tabInfo.pTab.tabs('close', tabInfo.title);
}
mainWindow.tabMenuModel.closeOther=function(){
    var tabInfo=this.getCurrentTabInfo();
    var titles=this.getTabTitles();
    var currtab_title = tabInfo.title;
    $.each(titles, function () {
        if (this != currtab_title && this != mainWindow.globalSettings.homeTabTitle)
            tabInfo.pTab.tabs('close', this);
    });
}
mainWindow.tabMenuModel.closeRight=function() {
    var tabInfo = this.getCurrentTabInfo();
    var titles = this.getTabTitles();
    var pTab = tabInfo.pTab;
    var tabIndex = pTab.tabs('getTabIndex', tabInfo.currentTab);
    if (tabIndex == titles.length - 1) {
        return false;
    }
    $.each(titles, function (i) {
        if (i > tabIndex && this != mainWindow.globalSettings.homeTabTitle)
            pTab.tabs('close', this);
    });
}
mainWindow.tabMenuModel.closeLeft=function() {
    var tabInfo = this.getCurrentTabInfo();
    var titles = this.getTabTitles();
    var pTab = tabInfo.pTab;
    var tabIndex = pTab.tabs('getTabIndex', tabInfo.currentTab);
    if (tabIndex == 1) {
        return false;
    }
    $.each(titles, function (i) {
        if (i < tabIndex && this != mainWindow.globalSettings.homeTabTitle)
            pTab.tabs('close', this);
    });
}
mainWindow.tabMenuModel.restoreScreen=function(item){
    $('#tabMenu').menu('setText', {
        target: item.target,
        text: '全屏'
    });
    $('#tabMenu').menu('setIcon', {
        target: item.target,
        iconCls: 'icon-screen_full'
    });
    $('[region=north],[region=west]').panel('open');
    var panels = $('#mainBody').data().layout.panels;
    panels.north.length = 1;
    if(panels.west.length>0) {
        panels.west.length = 1;
        if ($(panels.west[0]).panel('options').collapsed) {
            panels.expandWest.length = 1;
            $(panels.expandWest[0]).panel('open');
        }
    }
    $('#mainBody').layout('resize');
    mainWindow.globalSettings.IsFullScreen=false;
};
mainWindow.tabMenuModel.setFullScreen = function (item) {
    if(!item)
    {
        var item = $('#tabMenu').menu('findItem', '全屏');
        if(!item){ item=$('#tabMenu').menu('findItem', '还原');}
    }
    if(!item){  alert("tabMenu全屏菜单不存在请联系qq:631783964"); return;}
    if(item.text=="还原")
    {
        this.restoreScreen(item);
        return true;
    }
    $('#tabMenu').menu('setText', {
        target: item.target,
        text: '还原'
    });
    $('#tabMenu').menu('setIcon', {
        target: item.target,
        iconCls: 'icon-screen_actual'
    });
    $('[region=north],[region=west]').panel('close')
    var panels = $('#mainBody').data().layout.panels;
    panels.north.length = 0;
    if(panels.west.length>0) {
        panels.west.length = 0;
        if (panels.expandWest) {
            panels.expandWest.length = 0;
            $(panels.expandWest[0]).panel('close');
        }
    }
    $('#mainBody').layout('resize');
    mainWindow.globalSettings.IsFullScreen=true;
    $("#parentWin").html("");
};
mainWindow.tabMenuModel.addFullScreendblclick=function() {
    var base = this;
    $(".tabs-inner:not([c8text])").each(function () {
        var subtitle = $(this).children("span").text();
        $(this).attr("c8text", subtitle);//已经设置双击事件
        $(this).dblclick(function () {
            base.setFullScreen();
        });
    });
};