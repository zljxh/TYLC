<%@ page import="com.qs.erp.services.common.GlobalParameter" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="/Content/css/MainPage/index.css?3232123" rel="stylesheet"/>
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?66" />
    <script src="/ViewJSModels/JSProxy/OperatorProxy.js?42133"></script>
    <script src="/ViewJSModels/main/main.js?434676723246652133"></script>
    <script src="/ViewJSModels/main/mainWindow.TopMenu.js?342321343"></script>
    <script src="/ViewJSModels/main/mainWindow.TopDropPanalMenu.js?434321333"></script>
    <script src="/ViewJSModels/main/mainWindow.PanalMenu.js?3243432134333"></script>
    <%--<script src="/Content/js/mainWindow.PanalNavigationMenu.js?324334333"></script>--%>
    <script src="/ViewJSModels/main/mainWindow.TabMenuModel.js?324332123"></script>
    <script type="text/javascript" src="/MyReport/swfobject.js?943219"></script>
    <script type="text/javascript" src="/MyReport/MyReportOperator.js?443412434393"></script>
    <script type="application/javascript" >
      <%--var IsBatch=<%= GlobalParameter.IsBatch()%>;--%>
        <%--function getIsBatch()--%>
        <%--{--%>
            <%--return IsBatch;--%>
        <%--}--%>
    </script>
</head>
<body >

<!--logo begin-->
<div region="north"    border="false" ><%--split="true"--%>
<div class="head-north"  style=" height:71px;"><span class="head-left">

        </span></div>
    <%--style="background-color:#F4F4F4  E0ECFF"--%>
    <div  class="easyui-panel" style="background-color:#E0ECFF;margin-right:5px; height:30px"   border="false">
    <div class="head head-right" style="float: left;margin-left:5px">
        <a href="javascript:void(0)" class="easyui-menubutton" style="color:#444;"
           data-options="menu:'#userMenu',iconCls:'icon-user'">当前用户:${UserName}</a>

        <div id="userMenu" style="width:150px;">
            <!--<div data-options="iconCls:'icon-rainbow'" class="myconfig">个人设置</div>-->
            <div data-options="iconCls:'fa fa-pencil-square-o'" c8data-bind="click:resetPwd" class="changepwd">修改密码</div>
            <div class="menu-sep"></div>
            <div data-options="iconCls:'icon-user_go'" c8data-bind="click:logout">安全退出</div>
        </div>
    </div>
 <div id="topMenu" style="float: right"   >

 </div>

</div>
</div>
<!--logo end-->
<!--导航菜单  begin-->
<%--<div  id="mainMenu" style="display:none;" region="west" data-options="region:'west',split:true" title="导航菜单" style="width:180px;">--%>
    <%--<ul id="tt">--%>
    <%--</ul>--%>
<%--</div>--%>
<!--导航菜单  end-->
<!--tab panel   begin-->
<div data-options="region:'center'">
    <div class="easyui-tabs" id="mainTabs" style="background-color:#E0ECFF"  data-options="fit:true,border:false,plain:true,tools:'#tab-tools'">
        <div title="我的应用"   style="overflow:hidden;"></div>
    </div>
    <div id="tab-tools">
        <a href="#" id="pMenu"  class="easyui-menubutton" style="display:none"   data-options="menu:'#mm3'">导航菜单</a>
        <div id="mm3"  class="menu-content" >

        </div>
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

<div id="flashPreview" >

</div>
</body>

</html>

