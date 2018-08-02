<%
    request.setAttribute("theme", "default");
    request.setAttribute("EasyuiVersion", "1.4");
    request.setAttribute("Title", "千胜电商erp系统!");
%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8"/>
    <title> ${Title}</title>
    <!--加载主题CSS-->
    <link href="/Content/css/base.css" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/${theme}/easyui.css">
    <link rel="stylesheet" type="text/css" href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/color.css">
    <link rel="stylesheet" type="text/css"
          href="/Content/css/winedit.css?a6aa6434346653444d22444dd444dd469994444466566556659999444376"/>
    <script type="text/javascript" src="/Content/js/jquery-easyui-${EasyuiVersion}/jquery.min.js"></script>
    <script type="text/javascript"
            src="/Content/js/jquery-easyui-${EasyuiVersion}/jquery.easyui.min.js?77333311"></script>
    <script type="text/javascript"
            src="/Content/js/jquery-easyui-${EasyuiVersion}/locale/easyui-lang-zh_CN.js?27332"></script>
    <script src="/Content/js/Core/knockout-3.1.0.js"></script>
    <script src="/Content/js/Core/knockout.mapping-latest.js"></script>
    <script src="/Content/js/Core/c8help.js?4198487343443r"></script>
    <script src="/Content/js/Core/knockoutExt.js?443466557643445673a24343435434ww4344367743452a678776656dda455444443443rere5898996658hh443rr4664435499943438844535rd59788787000"></script>
    <script src="/Content/js/Core/JqueryExt.js?66883476434543784355"></script>
    <script src="/ViewJSModels/base/c8GridPaginationModel.js?3344344332487235545432233285457465665764954434323432434433843654573344889987reer896658hh9oi"></script>
    <script src="/ViewJSModels/base/c8Grid.js?334343945547688769954587r876584343887439rt43reeer434233287434rre34896658hh9oi"></script>
    <script src="/ViewJSModels/base/c8Window.js?77843444445"></script>
    <script src="/ViewJSModels/base/com.qiansheng.control.js?33557676454554345594344434345587878778458944derred222w6654443hh8998983434434399444w96699444455888rr4444dd6556ee59971"></script>
    <script src="/ViewJSModels/base/easyuiValidateboxExtend.js?33769985dr87ered665244443hhoioooddd5543244885554432w444w96699444455888rr4444dd6556ee59971"></script>
    <script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectProductModel.js?4343455443873323444334"></script>
    <script src="/ViewJSModels/base/c8ControlExt.js?434332"></script>
    <script src="/Content/js/main.js?44466644999966669544376548759996666"></script>
    <link href="/Content/css/MainPage/index.css" rel="stylesheet"/>
    <link href="/Content/css/icon/icon.css" rel="stylesheet"/>
    <script type="text/javascript">

    </script>

</head>
<body class="easyui-layout" fit="true" scroll="no">
<!--logo begin-->
<div region="north" class="head-north" style=" height:71px;" split="true" border="false">
    <div class="head head-right" style=" margin-top:25px;">
        <a href="javascript:void(0)" class="easyui-menubutton"
           data-options="menu:'#userMenu',iconCls:'icon-user'">当前用户:${UserName}</a>

        <div id="userMenu" style="width:150px;">
            <!--<div data-options="iconCls:'icon-rainbow'" class="myconfig">个人设置</div>-->
            <div data-options="iconCls:'fa fa-pencil-square-o'" class="changepwd">修改密码</div>
            <div class="menu-sep"></div>
            <div data-options="iconCls:'icon-user_go'" data-bind="click:logout">安全退出</div>
        </div>
    </div>
        <span class="head-left">
            ${Title}
        </span>
</div>
<!--logo end-->
<!--导航菜单  begin-->
<div data-options="region:'west',split:true" title="导航菜单" style="width:180px;">
    <ul id="tt">
    </ul>
</div>
<!--导航菜单  end-->
<!--tab panel   begin-->
<div data-options="region:'center'">
    <div class="easyui-tabs" id="mainTabs" data-options="fit:true,border:false,plain:true">

    </div>
</div>
<!--tab panel   end-->
<!--begin 状态栏-->
<div data-options="region:'south',split:true" style="height:10px;"></div>
<!--end-->
<div id="parentWin" style="display: none">

</div>
</body>

</html>

