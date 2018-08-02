
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link href="/Content/css/MainPage/index.css?32323" rel="stylesheet"/>
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?66" />
    <script src="/ViewJSModels/JSProxy/OperatorProxy.js?433"></script>
    <script src="/Content/js/main.js?434343233"></script>
    <script src="/Content/js/mainWindow.TopMenu.js?3423343"></script>
    <script src="/Content/js/mainWindow.TopDropPanalMenu.js?4343333"></script>
    <script src="/Content/js/mainWindow.PanalMenu.js?32434334333"></script>
    <%--<script src="/Content/js/mainWindow.PanalNavigationMenu.js?324334333"></script>--%>
    <script src="/Content/js/mainWindow.TabMenuModel.js?3243323"></script>
    <script type="text/javascript" src="/MyReport/swfobject.js?9439"></script>
    <script type="text/javascript" src="/MyReport/MyReportOperator.js?4434434393"></script>
    <style type="text/css">
        #topMenu{
            float:left !important;
            width:100% !important;
            background: #667f99;
        }
        #topMenu>a{
            height: 36px;
            line-height:36px;
            background: #667f99;
            border-radius:0;
            margin-top:0;
            color: #fff;
        }
        #topMenu>a.m-btn-plain-active{
            height: 36px;
            line-height:36px;
            border-radius:0;
            margin-top:0;
            background: #fdae03;
            color: #fff;
            border: 1px solid #fdae03;
            border-top: 0;
        }
        #topMenu>a span.m-btn-downarrow{
            height:0;
        }
        #topMenu>a span.l-btn-text{
            line-height:36px;
        }
        div.menu-content{
            height: 200px !important;
        }
        div.menu-content .menu-panal-item{
            border-right: 1px solid #dcdcdc;
            margin-right: 20px;
            padding-right: 20px;
        }
        div.menu-content .menu-panal-item h4{
            background: #ddd;
            color: #333;
            text-indent: 20px;
            height: 24px;
            line-height: 24px;
            margin-bottom: 10px;
            text-indent: 10px;
        }
        div.menu-content .menu-panal-item li{
            padding-top:0;
        }
        div.menu-content .menu-panal-item li a{
            display: block;
            color: #666;
            height: 26px;
            line-height: 26px;
            text-indent: 20px;
        }
        div.menu-content .menu-panal-item li a:hover{
            color: #fc7a06;
        }
        div.menu-content{
            height: 200px !important;
        }
        div.menu-content .menu-panal-item{
            border-right: 1px solid #dcdcdc;
            margin-right: 20px;
            padding-right: 20px;
        }
        div.menu-content .menu-panal-item h4{
            background: #ddd;
            color: #333;
            text-indent: 20px;
            height: 24px;
            line-height: 24px;
            margin-bottom: 10px;
            text-indent: 10px;
            font-weight: normal;
        }
        div.menu-content .menu-panal-item li{
            padding-top:0;
        }
        div.menu-content .menu-panal-item li a{
            display: block;
            color: #666;
            height: 26px;
            line-height: 26px;
            text-indent: 20px;
        }
        div.menu-content .menu-panal-item li a:hover{
            color: #fc7a06;
            text-decoration: underline;
        }
    </style>
</head>
<body >

<!--logo begin-->
<div region="north"    border="false" ><%--split="true"--%>
<div class="head-north"  style=" height:71px;">
    <span class="head-left">

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

