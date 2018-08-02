<%
    request.setAttribute("theme", "default");
    request.setAttribute("EasyuiVersion", "1.4.1");
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
    <script src="/Content/js/Core/c8help.js?44188743443r"></script>
    <script src="/Content/js/Core/knockoutExt.js?443466764343445673a243434354ww4344367743452a678776656dda455444443443rere5898996658hh443rr4664435499943438844535rd59788787000"></script>
    <script src="/Content/js/Core/JqueryExt.js?668834764334355"></script>
    <script src="/ViewJSModels/base/c8GridPaginationModel.js?334764954434323432434433843654573344889987reer896658hh9oi"></script>
    <script src="/ViewJSModels/base/c8Grid.js?33434395476889987r84343887439rt43reeer434233287434rre34896658hh9oi"></script>
    <script src="/ViewJSModels/base/com.qiansheng.control.js?33554554345594344434345587878778458944derred222w6654443hh8998983434434399444w96699444455888rr4444dd6556ee59971"></script>
    <script src="/ViewJSModels/base/easyuiValidateboxExtend.js?33998dr87ered665244443hhoioooddd5543244885554432w444w96699444455888rr4444dd6556ee59971"></script>
    <script src="/ViewJSModels/main/mainpage.js?4446664499996666954548759996666"></script>
    <link href="/Content/css/MainPage/index.css" rel="stylesheet"/>
    <link href="/Content/css/icon/icon.css" rel="stylesheet"/>


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
<div id="mainMenu" class="easyui-accordion ul_list" data-options="fit:true,border:false">
<div title="系统设置" style="padding:10px;">
    <li>
        <div class="">
            <a ref="9903" href="javascript:void(0)" rel="/Operator">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">操作员</span>
            </a>
        </div>
    </li>

    <li>
        <div class="">
            <a ref="9903" href="javascript:void(0)" rel="/OperatorGroup">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">操作员组</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9903" href="javascript:void(0)" rel="/SystemResource">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">系统菜单</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9903" href="javascript:void(0)" rel="/Station">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">岗位</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9903" href="javascript:void(0)" rel="/Role">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">角色</span>
            </a>
        </div>
    </li>
</div>
<div title="基本信息" data-options="selected:true" style="padding:0px; height:152px;">
<ul>
<li>
    <div class="">
        <a ref="9902" href="javascript:void(0)" rel="/home/griddemo">
            <span class="icon icon-chart_organisation">&nbsp;</span><span class="nav">菜单导航</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9911" href="javascript:void(0)" rel="/Company">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">公司信息</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9911" href="javascript:void(0)" rel="/Department">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">部门信息</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9903" href="javascript:void(0)" rel="/Employee">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">员工</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9903" href="javascript:void(0)" rel="/WarehouseType">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">仓库类型</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9903" href="javascript:void(0)" rel="/SupplierType">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">供应商类型</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9903" href="javascript:void(0)" rel="/Supplier">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">供应商</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9903" href="javascript:void(0)" rel="/Warehouse">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">仓库</span>
        </a>
    </div>
</li>

<li>
    <div class="">
        <a ref="9903" href="javascript:void(0)" rel="/WarehousePosition">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">库位</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9903" href="javascript:void(0)" rel="/Region">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">行政区</span>
        </a>
    </div>
</li>


<li>
    <div class="">
        <a ref="9903" href="javascript:void(0)" rel="/Operator">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">操作员</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9910" href="javascript:void(0)" rel="/home/griddemo">
            <span class="icon icon-lock_key">&nbsp;</span>
            <span class="nav">授权代码</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9904" href="javascript:void(0)" rel="/home/griddemo">
            <span class="icon icon-group">&nbsp;</span>
            <span class="nav">角色管理</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/opuser">
            <span class="icon icon-users">&nbsp;</span><span class="nav">用户管理</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/PurchaseInType">
            <span class="icon icon-users">&nbsp;</span><span class="nav">采购进货类型</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/PurchaseOutType">
            <span class="icon icon-users">&nbsp;</span><span class="nav">采购退货类型</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/InvAllocateType">
            <span class="icon icon-users">&nbsp;</span><span class="nav">库存调拨类型</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/InvAdjustType">
            <span class="icon icon-users">&nbsp;</span><span class="nav">库存调整类型</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/InvTakingType">
            <span class="icon icon-users">&nbsp;</span><span class="nav">库存盘点类型</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/opuser">
            <span class="icon icon-users">&nbsp;</span><span class="nav">退款原因</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/PayType">
            <span class="icon icon-users">&nbsp;</span><span class="nav">支付方式</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/Shop">
            <span class="icon icon-users">&nbsp;</span><span class="nav">店铺</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/ShopType">
            <span class="icon icon-users">&nbsp;</span><span class="nav">店铺类型</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/TagType">
            <span class="icon icon-users">&nbsp;</span><span class="nav">标记类型</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/ProductOwner">
            <span class="icon icon-users">&nbsp;</span><span class="nav">货主</span>
        </a>
    </div>
</li>

<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/Vip">
            <span class="icon icon-users">&nbsp;</span><span class="nav">会员</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/VipLevel">
            <span class="icon icon-users">&nbsp;</span><span class="nav">会员级别</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/VipAddress">
            <span class="icon icon-users">&nbsp;</span><span class="nav">会员地址</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/Express">
            <span class="icon icon-users">&nbsp;</span><span class="nav">快递公司</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/ExpressPlatform">
            <span class="icon icon-users">&nbsp;</span><span class="nav">快递平台代码</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/SellerRemarkExpress">
            <span class="icon icon-users">&nbsp;</span><span class="nav">卖家备注匹配快递</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/OrderSpeculateRemark">
            <span class="icon icon-users">&nbsp;</span><span class="nav">炒作订单备注</span>
        </a>
    </div>
</li>

<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/VipExpress">
            <span class="icon icon-users">&nbsp;</span><span class="nav">会员默认快递</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9905" href="javascript:void(0)" rel="/OrderType">
            <span class="icon icon-users">&nbsp;</span><span class="nav">订单类型</span>
        </a>
    </div>
</li>
<li>
    <div class="">
        <a ref="9910" href="javascript:void(0)" rel="/OrderFreeAuditRemark">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">订单免审备注</span>
        </a>
    </div>
</li>

<li>
    <div class="">
        <a ref="9910" href="javascript:void(0)" rel="/NoteLanguage">
            <span class="icon icon-org">&nbsp;</span>
            <span class="nav">便签常用语</span>
        </a>
    </div>
</li>

<li>
    <div class="">
        <a ref="9906" href="javascript:void(0)" rel="/home/griddemo">
            <span class="icon icon-book">&nbsp;</span>
            <span class="nav">数据字典</span>
        </a>
    </div>
</li>


<li>
    <div class=""><a ref="9911" href="javascript:void(0)" rel="/home/grdidemo"><span
            class="icon icon-page_white_wrench">&nbsp;</span><span class="nav">系统参数</span></a></div>
</li>
<li>
    <div class=""><a ref="9907" href="javascript:void(0)" rel="/sys/log"><span
            class="icon icon-error">&nbsp;</span><span class="nav">操作日志</span></a></div>
</li>
</ul>
</div>

<div title="商品管理" style="padding:10px">

    <li>
        <div class="">
            <a ref="9910" href="javascript:void(0)" rel="/ProAddType">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">商品附加属性类型 </span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9910" href="javascript:void(0)" rel="/ProAddValue">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">商品附加属性值</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9911" href="javascript:void(0)" rel="/ProductUnit">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">商品单位</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9910" href="javascript:void(0)" rel="/ProductSeason">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">商品季节</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9910" href="javascript:void(0)" rel="/ProductBrand">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">商品品牌</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9910" href="javascript:void(0)" rel="/ProductSeries">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">商品系列</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9910" href="javascript:void(0)" rel="/ProductSize">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">规格尺码</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9910" href="javascript:void(0)" rel="/ProductCategory">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">商品分类</span>
            </a>
        </div>
    </li>

    <li>
        <div class="">
            <a ref="9910" href="javascript:void(0)" rel="/ProductColor">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">规格颜色</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9910" href="javascript:void(0)" rel="/Product">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">商品信息</span>
            </a>
        </div>
    </li>
    <li>
        <div class="">
            <a ref="9910" href="javascript:void(0)" rel="/ProductBarcode">
                <span class="icon icon-org">&nbsp;</span>
                <span class="nav">商品条码</span>
            </a>
        </div>
    </li>

</div>
</div>
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

