<%@ page import="com.ty.erp.services.common.GlobalParameter" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%request.setAttribute("releaseDate", "20180516");%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <%--<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">--%>
    <%--<link rel="stylesheet" href="/Content/css/bootstrapext.css?v22222">--%>
    <link href="/ViewJSModels/index/index.css?x44" rel="stylesheet"/>
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v1"/>
    <style type="text/css">
        .input-search-index {
            height: 10px;
            padding: 1px 1px;
            font-size: 12px;
            line-height: 1.5;
            border-radius: 3px;
        }
        .qsmenu .sub-qsmenu ul{
            max-height: none !important;
        }
        .hideLi{
            display: none !important;
        }
        .showLi{
            display: block !important;
        }
        @media screen and (max-width:1360px){
            .inp-search{
                margin-top: -12px;
                height: 8px;
                width: 80px;
                margin-right: 60px;
            }
            #dropdownMenu{
                overflow: visible;
                margin-top: -12px;
                max-height: none !important;
            }
        }
        @media screen and (max-width:800px){
            .right{
                margin-top: -17px;
            }
        }
        @media screen and (min-width:1360px){
            .inp-search{
                margin-top: 5px;
                height: 8px;
                width: 80px;
                margin-right: 60px;
            }
            #dropdownMenu{
                margin-top: 5px;
                overflow: visible;
                max-height: none !important;
            }
        }
        .indexPage-child-div{
            display:flex;
        }
        .indexPage-div-span-name{
            width: 120px;
            text-align: right;
        }
        .indexPage-div-span-value{
            width: 75px;
            text-align: right;
        }
    </style>
    <script src="/ViewJSModels/JSProxy/OperatorProxy.js?433432tt5r3"></script>
    <script src="/ViewJSModels/index/main.js?nm20180626bc20180710"></script>
    <script src="/ViewJSModels/index/mainWindow.TabMenuModel.js?v1"></script>
    <script type="application/javascript">
        function showMessage(strtype, msg) {
            var div = $('#divshowsuccess');
            if (strtype == 'success') {
                div.css('background-color', '#dff0d8');
                div.css('border-color', '#d6e9c6');
            } else if (strtype == 'error') {
                div.css('background-color', '#f2dede');
                div.css('border-color', '#ebccd1');

            }
            else if (strtype == 'warn') {
                div.css('background-color', '#fcf8e3');
                div.css('border-color', '#faebcc');
            }
            div.text(msg);
            div.fadeIn("slow", function () {
                setTimeout(function () {
                    div.fadeOut("slow");
                }, 2000);

            })
        }

        function downFile1(rowid) {
            $.ajax({
                url: "/TaskDownFile/DownFileWithErr?RowId=" + rowid + "&random=" + Math.random(),
                success: function () {
                }
            });
        }

        function getIndexPageDataCount(){
            ko.c8Ajax({
                type: "GET",
                url: "/MyApp/getDataCount",
                async: true,
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    if (data) {
                        $(".indexPage-div-span-value").each(function (index, pageItem) {
                            pageItem.innerText = data[pageItem.id];
                        });
                    }
                    setTimeout("getIndexPageDataCount()", 600000);
                },
                error: function (e) {
                    console.log(e.responseText);
                }
            });
        }

        function updateIndexPageValue(){
            $("#updateIndexPageValueSpan").text("刷新中");
            ko.c8Ajax({
                type: "GET",
                url: "/MyApp/getDataCount?refresh=true",
                async: true,
                dataType: "json",
                contentType: "application/json",
                success: function (data) {
                    if (data) {
                        $(".indexPage-div-span-value").each(function (index, pageItem) {
                            pageItem.innerText = data[pageItem.id];
                        });
                    }
                },
                error: function (e) {
                    console.log(e.responseText);
                },
                complete: function () {
                    $("#updateIndexPageValueSpan").text("刷新");
                }
            });
        }

        $(function () {
            $("#dropdown").click(function () {
                $.ajax({
                    url: "/TaskDownFile/get?random=" + Math.random(),
                    dataType: "json",
                    success: function (data) {
                        $("#dropdown-menuId").html("");
                        var str = "<li class=\"list-group\" style=\"margin-bottom:0px;\">";
                        if (data != null && data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                if (data[i].IsFinish) {
                                    if (data[i].ErrorMsg == '') {
                                        if (data[i].TaskType == "0") {
                                            str += "<a href=\"/TaskDownFile/DownFile?name=" + data[i].FileName + "&RowId=" + data[i].RowId + "\" class=\"list-group-item\" >\n" +
                                            "            <div class=\"media\">\n" +
                                            "            <div class=\"media-left\"><span class=\"fa fa-check-circle-o fa-2x\"></span></div>\n" +
                                            "            <div class=\"media-body\">\n" +
                                            "            <div class=\"media-heading\">" + data[i].Name + "</div>\n" +
                                            "            <small>完成时间：" + data[i].FinishDate + "</small>\n" +
                                            "            </div>\n" +
                                            "            </div>\n" +
                                            "            </a>";
                                        } else if (data[i].TaskType == "1") {
                                            str += "<a href=\"javascript:void(0);\" onmousemove=\"$('#bell_remove').css('display','block')\" onMouseOut=\"$('#bell_remove').css('display','none')\"  id=\"TaskType_1\" class=\"list-group-item\" >\n" +
                                            "            <div class=\"media\">\n" +
                                            "            <div class=\"media-left\"><span class=\"fa fa-check-circle-o fa-2x\"></span></div>\n" +
                                            "            <div class=\"media-body\">\n" +
                                            "            <div class=\"media-heading\">" + data[i].Name + "</div>\n" +
                                            "            <small>完成时间：" + data[i].FinishDate + "</small>\n" +
                                            "            </div>\n" +
                                            "            <div class=\"media-right\"style=\"min-width:15px;\"><span id=\"bell_remove\" onclick=\"downFile1('" + data[i].RowId + "')\" class=\"fa fa-trash-o-circle fa-2x\"></span></div>" +
                                            "            </div>\n" +
                                            "            </a>";
                                        }
                                    } else {
                                        str += "<a href=\"#\" class=\"list-group-item\" onclick=\"downFile1('" + data[i].RowId + "')\">\n" +
                                        "            <div class=\"media\">\n" +
                                        "            <div class=\"media-left\"><span class=\"fa fa-times-circle-o fa-2x\"></span></div>\n" +
                                        "            <div class=\"media-body\">\n" +
                                        "            <div class=\"media-heading\">" + data[i].Name + "</div>\n" +
                                        "            <small>" + data[i].ErrorMsg + "</small>\n" +
                                        "            </div>\n" +
                                        "            </div>\n" +
                                        "            </a>";
                                    }
                                } else {
                                    str += "<a href=\"#\" class=\"list-group-item\">\n" +
                                    "                                            <div class=\"media\">\n" +
                                    "                                                <div class=\"media-left\"><span class=\"fa fa-arrow-circle-o-down fa-2x\"></span></div>\n" +
                                    "                                                <div class=\"media-body\">\n" +
                                    "                                                    <div class=\"media-heading\">" + data[i].Name + "</div>\n" +
                                    "                                                    <small>进行中</small>\n" +
                                    "                                                </div>\n" +
                                    "                                            </div>\n" +
                                    "                                        </a>"
                                }
                            }
                        }
                        else {
                            str += "<a href=\"#\" class=\"list-group-item\">\n" +
                            "                                    <div class=\"media\">\n" +
                            "                                        <div class=\"media-left\"><span class=\"fa fa-ban fa-2x\"></span></div>\n" +
                            "                                        <div class=\"media-body\">\n" +
                            "                                            不存在下载任务\n" +
                            "                                        </div>\n" +
                            "                                    </div>\n" +
                            "                                </a>";
                        }
                        str += "</li>";
                        $("#dropdown-menuId").html(str);
                    }
                });
                $("#TaskType_1").mouseover(function () {
                    $("#bell_remove").css('display', 'block');
                }).mouseout(function () {
                    $("#bell_remove").hide();
                });
            });

            setTimeout("getIndexPageDataCount()", 500);
        });

    </script>
</head>
<body>
<!--logo begin-->
<div region='north' style="overflow: visible" border="false"><%--split="true"--%>
    <div class="${head}" style=" text-align:center;">
        <div id="divshowsuccess" style="z-index: 999999999; display: none; width: 400px; background-color:#dff0d8;border-color:#d6e9c6;padding:5px;border:1px solid transparent;
        line-height:20px;position:absolute;top: 3px; left:50%;margin-left:-200px; border-radius:5px;TEXT-ALIGN: center;">
            操作成功
        </div>
        <div>
            <ul class="nav navbar-nav navbar-right pull-right mr30 fl"><!--dbi fr mr30-->
                <%--<li>
                    <span style="padding: 3px 10px;line-height: 20px;position: relative;color: #fff;display: block;">
                       <input type="text" onkeypress="mainWindow.easySearch()" id="easySearch" class="form-control .input-search-index input-text-customer" style="width:80px;height: 10px;">
                        <ul id="dropdownMenu" class="dropdown-menu dropdown-menu-customer" style="overflow: visible;display:none">
                            <c:forEach var="c1" items="${menuTree}">
                                <c:forEach var="c2" items="${c1.getchildren()}">
                                    <c:forEach var="c3" items="${c2.getchildren()}">
                                        <dd style="width:120px;display:none;text-align: left; padding: 6px 12px">

                                            <a  style="color: black;" onclick="mainWindow.closeEasySearch()" c8Url="${c3.geto().get("PathName")}">${c3.gettext()}</a></dd>
                                    </c:forEach>
                                </c:forEach>
                            </c:forEach>
                        </ul>
                    </span>
                </li>--%>
                <li>
                    <span style="padding: 3px 10px;line-height: 20px;position: relative;color: #fff;display: block;">
                        ${companyCode}
                    </span>
                </li>
                <li class="dropdown" style="margin-top:1px;">
                    <a href="#" class="dropdown-toggle index-hover" data-toggle="dropdown" title="提醒" id="dropdown">
                        <span class="fa fa-bell"></span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right" id="dropdown-menuId">
                    </ul>
                </li>
                <li class="dropdown" style="margin-top:1px;">
                    <a href="#" class="dropdown-toggle index-hover" data-toggle="dropdown" data-hover="dropdown">
                        <span class="fa fa-user-circle-o"></span>${UserName}</a>
                    <ul class="dropdown-menu dropdown-menu-right" role="menu">
                        <li style="line-height:24px;"><a href="#" c8data-bind="click:resetPwd"
                                                         style="padding-left: 25px;padding-right: 5px;display: inline"><span
                                class="fa fa-lock"></span> 修改密码</a> |
                            <a href="javascript:void(0)" c8data-bind="click:logout" class="index-hover"
                               style="padding: 5px 5px;display: inline;">
                                <span class="fa fa-power-off"></span>退出</a>
                        </li>
                        <li role="separator" class="divider"></li>
                        <c:if test="${IsJiFei}">
                        <c:if test="${ErrorMsg!=null and ErrorMsg!=''}">
                        <li class="disabled">
                            <a href="#">
                                <div class="media">
                                    <div class="media-left">
                                        <i class="fa fa-battery-three-quarters" style="font-size:17px;"></i>
                                    </div>
                                    <div class="media-body">
                                        <small>${ErrorMsg}</small>
                                    </div>
                                </div>
                            </a>
                        </li>
                        </c:if>
                        <c:if test="${ErrorMsg==null or ErrorMsg==''}">
                        <li class="disabled">
                            <a href="#">
                                <div class="media">
                                    <div class="media-left">
                                                <span class="fa fa-battery-three-quarters"
                                                      style="font-size:17px;"></span>
                                    </div>
                                    <div class="media-body">
                                        <h6 class="media-heading">剩余单量</h6>
                                        <small>${AdequateNumber}条</small>
                                    </div>
                                </div>
                            </a>
                        </li>
                        </c:if>
                        </c:if>

                        <c:if test="${remainMsgNumber!=null and remainMsgNumber!=''}">
                        <li class="disabled">
                            <a href="#">
                                <div class="media">
                                    <div class="media-left">
                                        <span class="fa fa-envelope-o" style="font-size:20px;"></span>
                                    </div>
                                    <div class="media-body">
                                        <h6 class="media-heading">剩余短信</h6>
                                        <small>${remainMsgNumber}条</small>
                                    </div>
                                </div>
                            </a>
                        </li>
                        </c:if>
                        <li role="separator" class="divider"></li>
                        <li class="disabled"><a href="#">V
                            <%--<small>2.5.4.0-Dev(${releaseDate})</small>--%>
                            <small>${version}</small>
                        </a></li>
                </li>
                <%--<li>
                    <a href="#" class="index-hover">
                        <span class="fa fa-user-circle-o"></span>${UserName}
                    </a>
                </li>
                <li>
                    <c:if test="${IsJiFei}" >
                        <c:if test="${ErrorMsg!=null and ErrorMsg!=''}">
                            <a href="#" class="index-hover">${ErrorMsg}</a>
                        </c:if>
                        <c:if test="${ErrorMsg==null or ErrorMsg==''}">
                            <a href="#" class="index-hover">剩余单量:${AdequateNumber}条</a>
                        </c:if>
                    </c:if>
                </li>
                <li>
                    &lt;%&ndash;<c:if test="${msgErrorMsg!=null and msgErrorMsg!=''}">
                        <a href="#" class="index-hover">${msgErrorMsg}</a>
                    </c:if>
                    <c:if test="${msgErrorMsg==null or msgErrorMsg==''}">&ndash;%&gt;
                        <c:if test="${remainMsgNumber!=null and remainMsgNumber!=''}">
                        <a href="#" class="index-hover">剩余短信:${remainMsgNumber}条</a>
                    </c:if>
                </li>--%>
            </ul>
        </div>
    </div>
    <ul class="qsmenu pl30" style="overflow: visible">
        <li class="sub-qsmenu left" style="background: none;display:none;">
            <a href="javascript:void(0)" onclick="left()" style="margin-left: -50px !important;"><span class="ripple" style="font-size:20px;color:#f2f2f2;background: #5da6ca;border-right: #aaa solid;">&lt</span></a>
        </li>
        　　 <c:forEach var="c1" items="${menuTree}">
        <li class="sub-qsmenu">
            <a onclick="return false;">${c1.gettext()}</a>
            <ul>
                <c:forEach var="c2" items="${c1.getchildren()}">
                    <li style="width:${c2.getColumnCount()*(c2.getMaxEM()+1)+1}em">
                        <dl>
                            <dt>${c2.gettext()}</dt>
                            <c:forEach var="c3" items="${c2.getchildren()}">
                                <dd style="width:${c2.getMaxEM()+1}em"><a
                                        c8Url="${c3.geto().get("PathName")}">${c3.gettext()}</a></dd>
                            </c:forEach>
                        </dl>
                    </li>
                </c:forEach>
            </ul>
        </li>
        　　</c:forEach>
        <li class="sub-qsmenu right" style="float:  right;background: none;display:none;">
            <a href="javascript:void(0)" onclick="right()" style="margin-right: -20px !important;"><span class="ripple" style="font-size:20px;color:#f2f2f2;background: #5da6ca;border-left: #aaa solid;">&gt</span></a>
        </li>
        <li class="sub-qsmenu" style="float:  right;background: none !important;">
            <input type="text" onkeypress="mainWindow.easySearch()" id="easySearch" class="form-control .input-search-index input-text-customer inp-search">
            <ul id="dropdownMenu" class="dropdown-menu dropdown-menu-customer" style="overflow: visible;display:none;margin-top:-5px;">
                <c:forEach var="c1" items="${menuTree}">
                    <c:forEach var="c2" items="${c1.getchildren()}">
                        <c:forEach var="c3" items="${c2.getchildren()}">
                            <dd style="width:120px;display:none;text-align: left; padding: 6px 12px">

                                <a  style="color: black;" onclick="mainWindow.closeEasySearch()" c8Url="${c3.geto().get("PathName")}">${c3.gettext()}</a></dd>
                        </c:forEach>
                    </c:forEach>
                </c:forEach>
            </ul>
        </li>
    </ul>
</div>
<div data-options="region:'center',split:false">
    <div class="easyui-tabs" id="mainTabs" style="height:40px;"
         data-options="fit:true,border:false,plain:true,tools:'#tab-tools'">
        <div title="我的应用" style="overflow:hidden;">
            <div style="margin-top:10px;margin-left:10px;width:200px;height:300px;display: flex;flex-direction:column;border: 1px solid #AAAAAA;">
                <div style="display:flex;justify-content: space-between;margin-bottom: 5px;">
                    <span style="color: red;font-size: 16px;">今日情况：</span>
                    <a style="padding-top:5px;padding-right: 5px;text-decoration: none;" onclick="updateIndexPageValue();">
                        <span style="font-size:12px;cursor:pointer;" id="updateIndexPageValueSpan">刷新</span>
                    </a>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">已客审：</span><span class="indexPage-div-span-value" id="IndexPageIsAudit"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">已财审：</span><span class="indexPage-div-span-value" id="IndexPageIsFinanceAudit"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">已打印：</span><span class="indexPage-div-span-value" id="IndexPageIsPrint"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">已复核：</span><span class="indexPage-div-span-value" id="IndexPageSecondAudit"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">已称重：</span><span class="indexPage-div-span-value" id="IndexPageIsWeight"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">已发货：</span><span class="indexPage-div-span-value" id="IndexPageIsPlatDelivery"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">采购入库通知单：</span><span class="indexPage-div-span-value" id="IndexPagePurchaseOrder"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">采购入库单：</span><span class="indexPage-div-span-value" id="IndexPagePurchaseInOrder"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">退换货单：</span><span class="indexPage-div-span-value" id="IndexPageReturnChangedOrder"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">退换货入库单：</span><span class="indexPage-div-span-value" id="IndexPageReturnChangedInStorage"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">退款单：</span><span class="indexPage-div-span-value" id="IndexPageRefundOrder"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">库存盘点单：</span><span class="indexPage-div-span-value" id="IndexPageInvTakingOrder"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">库存调拨单：</span><span class="indexPage-div-span-value" id="IndexPageInvAllocateOrder"></span>
                </div>
                <div class="indexPage-child-div">
                    <span class="indexPage-div-span-name">库存调整单：</span><span class="indexPage-div-span-value" id="IndexPageInvAdjustOrder"></span>
                </div>
            </div>
        </div>
    </div>
    <div id="tab-tools">
        <a href="#" id="pMenu" class="easyui-menubutton" style="display:none" data-options="menu:'#mm3'">导航菜单</a>

        <div id="mm3" class="menu-content">

        </div>
    </div>
    <div id="tabMenu" class="easyui-menu hide" style="width:150px;">
        <div id="refresh" data-options="iconCls:'icon-reload'">重新加载</div>
        <div class="menu-sep"></div>
        <div id="close" data-options="iconCls:'fa fa-times'">关闭标签页</div>
        <div id="closeOther" data-options="iconCls:'icon-arrow_ew'">关闭其他标签页</div>
        <div id="closeRight" data-options="iconCls:'icon-arrow_right'">关闭右侧标签页</div>
        <div id="closeLeft" data-options="iconCls:'icon-arrow_left'">关闭左侧标签页</div>
        <div class="menu-sep"></div>
        <div id="setFullScreen" data-options="iconCls:'icon-screen_full'">全屏</div>
        <%--<div id="restoreScreen"  data-options="iconCls:'icon-screen_actual'">还原</div>--%>
    </div>
</div>
<!--begin 状态栏-->
<%--<div data-options="region:'south',split:false" style="border: 0px;"></div>--%>
<!--end-->
<div id="parentWin" style="display: none">
    <div id="showLogin" class="easyui-window" closed="true" modal="true" title="登陆"
         data-options="iconCls:'fa fa-pencil-square-o'"
         style="width:675px;height:500px;">
    </div>
</div>

<div id="flashPreview">

</div>
</body>

</html>

