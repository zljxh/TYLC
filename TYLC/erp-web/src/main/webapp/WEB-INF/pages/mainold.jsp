
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
       <script src="/Content/js/main.js?46533"></script>
    <script src="/Content/js/mainWindow.TabMenuModel.js?33543"></script>
    <link href="/Content/css/MainPage/index.css" rel="stylesheet"/>

</head>
<body class="easyui-layout" fit="true" scroll="no">
<!--logo begin-->
<div region="north" class="head-north" style=" height:71px;" split="true" border="false">
    <div class="head head-right" style=" margin-top:25px;">
        <a href="javascript:void(0)" class="easyui-menubutton"
           data-options="menu:'#userMenu',iconCls:'icon-user'">当前用户:${UserName}</a>

        <div id="userMenu" style="width:150px;">
            <!--<div data-options="iconCls:'icon-rainbow'" class="myconfig">个人设置</div>-->
            <div data-options="iconCls:'fa fa-pencil-square-o'" c8data-bind="click:resetPwd" class="changepwd">修改密码</div>
            <div class="menu-sep"></div>
            <div data-options="iconCls:'icon-user_go'" c8data-bind="click:logout">安全退出</div>
        </div>
    </div>
        <span class="head-left">

        </span>
</div>
<!--logo end-->
<!--导航菜单  begin-->
<div  id="mainMenu" region="west" data-options="region:'west',split:true" title="导航菜单" style="width:180px;">
    <ul id="tt">
    </ul>
</div>
<!--导航菜单  end-->
<!--tab panel   begin-->
<div data-options="region:'center'">
    <div class="easyui-tabs" id="mainTabs"  data-options="fit:true,border:false,plain:true">
        <div title="我的应用"   style="overflow:hidden;"></div>
    </div>
    <div id="tabMenu"  class="easyui-menu hide" style="width:150px;">
        <div id="refresh"  data-options="iconCls:'icon-reload'" >重新加载</div>
        <div class="menu-sep" ></div>
        <div id="close" data-options="iconCls:'fa fa-times'">关闭标签页</div>
        <div id="closeOther" data-options="iconCls:'icon-arrow_ew'">关闭其他标签页</div>
        <div id="closeRight" data-options="iconCls:'icon-arrow_right'">关闭右侧标签页</div>
        <div id="closeLeft" data-options="iconCls:'icon-arrow_left'">关闭左侧标签页</div>
        <div class="menu-sep" ></div>
        <div id="setFullScreen" data-options="iconCls:'icon-screen_full'">全屏</div>
        <%--<div id="restoreScreen"  data-options="iconCls:'icon-screen_actual'">还原</div>--%>
    </div>
</div>
<!--tab panel   end-->
<!--begin 状态栏-->
<div  data-options="region:'south',split:true" style="height:10px;"></div>
<!--end-->
<div id="parentWin" style="display: none">
    <div id="showLogin"  class="easyui-window" closed="true" modal="true"  title="登陆" data-options="iconCls:'fa fa-pencil-square-o'" style="width:675px;height:500px;">

    </div>

</div>

</body>

</html>

