<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%
    request.setAttribute("theme", "bootstrap");
    request.setAttribute("EasyuiVersion", "1.4.1");
    request.setAttribute("mode", "debug");//debug,release
    request.setAttribute("releaseDate", "v6");
%>
<%--<!DOCTYPE>--%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="zh-CN" xml:lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="pragma" content="pragma"/>
    <meta http-equiv="Cache-Control" content="public,max-age=315360000000"/>
    <%--<meta http-equiv="Expires" content="Mon, 20 Jul 2023 23:00:00 GMT" />--%>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>${Title}</title>

    <% if (request.getAttribute("mode").toString().equalsIgnoreCase("release")) {%>
    <link rel="stylesheet" type="text/css" href="/public/core.css?${releaseDate}"/>
    <script src="/public/core.js?${releaseDate}"></script>
    <%} else {%>
    <%--easyui基础类库--%>
    <link rel="stylesheet" type="text/css"
          href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/${theme}/easyui.css?x6">
    <link rel="stylesheet" type="text/css" href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/icon.css?43">
    <link rel="stylesheet" type="text/css" href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/color.css">
    <link href="/Content/css/base.min.css?v5" rel="stylesheet"/>
    <link rel="stylesheet" type="text/css" href="/Content/css/icon/icon.css?asd12e24el"/>
    <script src="http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <script>typeof jQuery == 'undefined' && document.write(decodeURI('%3Cscript src="/Content/js/jquery-1.11.3.min.js"%3E%3C/script%3E'))</script>
    <script type="text/javascript" src="/Content/js/jquery-easyui-${EasyuiVersion}/jquery.easyui.min.js?vbn1"></script>
    <script type="text/javascript"
            src="/Content/js/jquery-easyui-${EasyuiVersion}/locale/easyui-lang-zh_CN.js?q324345437"></script>
    <script src="/Content/js/Core/knockout-3.1.0.js"></script>
    <script src="/Content/js/Core/knockout.mapping-latest.js"></script>
    <link rel="stylesheet" href="/Content/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="/Content/css/bootstrapext.css?v213123">
    <script src="/Content/bootstrap/3.3.5/js/bootstrap.min.js?v2"></script>
    <script src="/Content/js/jquery-easyui-${EasyuiVersion}/plugins/datagrid-detailview.js"></script>
    <%--easyui基础类库--%>

    <%--自定义帮助类--%>
    <script src="/Content/js/Core/String.js?1"></script>
    <script src="/Content/js/Core/Array.js"></script>
    <script src="/Content/js/Core/Date.js"></script>
    <script src="/Content/js/Core/c8formatter.js?1xf12g"></script>
    <script src="/Content/js/Core/c8help.js?cvv234"></script>
    <script src="/Content/js/Core/reconnecting-websocket.min.js"></script>
    <script src="/Content/js/Core/knockoutExt.js?vfr"></script>
    <%--自定义帮助类--%>

    <%--bootstrap插件--%>
    <script src="/Content/js/bootstrap-ext/hover-dropdown/bootstrap-hover-dropdown.min.js"></script>
    <%--bootstrap插件--%>

    <%--jquery插件--%>
    <script src="/Content/js/jquery-ext/uploadPreview.min.js?x2"></script>
    <script src="/Content/js/jquery-ext/filesaver/FileSaver.min.js?1"></script>
    <script type="text/javascript" src="/Content/js/jquery-ext/ajaxfileUpAndDown.min.js?v2"></script>
    <script src="/Content/js/jquery-ext/confirm/jquery-confirm.min.js"></script>
    <link href="/Content/js/jquery-ext/confirm/jquery-confirm.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/Content/js/jquery-ext/poshytip/tip-yellowsimple/tip-yellowsimple.css?v2"/>
    <script src="/Content/js/jquery-ext/poshytip/jquery.poshytip.min.js?123"></script>
    <link rel="stylesheet" href="/Content/js/jquery-ext/city-picker/city-picker.min.css?22gg3r2"/>
    <script src="/Content/js/jquery-ext/city-picker/city-picker.min.js?avcqggrffd1"></script>
    <script src="/Content/js/jquery-ext/select2/4.0.2/select2.full.min.js?vc12"></script>
    <script src="/Content/js/jquery-ext/select2/4.0.2/i18n/zh-CN.js?vt1"></script>
    <link href="/Content/js/jquery-ext/select2/4.0.2/css/select2.css?v123" rel="stylesheet">
    <script src="/Content/js/jquery-ext/jquery.slimscroll-1.3.7.min.js"></script>
    <%--<link href="/Content/js/jquery-ext/jqGrid/css/ui.jqgrid.css" rel="stylesheet">
    <link href="/Content/js/jquery-ext/jqGrid/css/jquery-ui-1.8.16.custom.css" rel="stylesheet">
    <script src="/Content/js/jquery-ext/jqGrid/js/jquery.jqGrid.min.js?q2"></script>
    <script src="/Content/js/jquery-ext/jqGrid/js/i18n/grid.locale-cn.js"></script>--%>
    <script src="/Content/js/jquery-ext/hotkeys/hotkeys.min.js"></script>
    <script src="/Content/js/jquery-ext/JqueryExt.js?ghj214"></script>
    <script src="/Content/js/easyui-ext/EasyuiExt.js?as111"></script>
    <%--jquery插件--%>

    <%--自定义js控件--%>
    <script src="/ViewJSModels/base/c8GridPaginationModel.js?fgty5333322"></script>
    <script src="/ViewJSModels/base/c8Grid.js?v34657"></script>
    <script src="/ViewJSModels/base/c8TreeGrid.js?6v1"></script>
    <script src="/ViewJSModels/base/c8Window.js?bgt422"></script>
    <script src="/ViewJSModels/base/com.qiansheng.control.js?4xa8184xbc0510bc2018720"></script>
    <script src="/ViewJSModels/base/c8Control/vm.Control.GridLayout.js?v2"></script>
    <script src="/ViewJSModels/base/select2.control.js?tyu29363333bc2018720"></script>
    <%--自定义js控件--%>
    <%}%>
    <decorator:head/>
</head>
<body scroll="no"
      style="background:#FFFFFF; height: 100%; display:block; border: none; overflow: hidden; padding: 2px;">
<div id="mainBody" class="easyui-layout" fit="true">
    <input id="tempdata" type="hidden"/>
    <decorator:body/>
</div>
<div id="parentWin">
</div>
<%--<script src="/ViewJSModels/MyReport/vm.MyReport.MyReportPrint.js"></script>
<script src="/ViewJSModels/MyReport/vm.MyReport.MyReportManager.js"></script>--%>
<% if (request.getAttribute("mode").toString().equalsIgnoreCase("release")) {%>
<script src="/public/control.js?${releaseDate}"></script>
<%} else {%>
<%--自定义js控件--%>
<script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectProductModel.js?ww411411we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectDistributorModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectSupplierModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectSupplierTextModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectProductBatchModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectProductBatchInventoryModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectShopModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectPurchaseOrderModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectPurchaseOrderModelInstoraged.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectPurchaseReturnOrderModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectWarehousePositionModel.js?vfgrt2"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectWarehouseModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectVopOutWarehouseModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectRegionModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectOrderTypeModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectWarehousePositionModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectActiveLockModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectBuySentShareModel.js?vfr2w22e"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectUnApprovedSellOrderModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectAccountModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectVipModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectExpressModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectReturnChangedOrder.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectWarehouseModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectPositionModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectFlagModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectEmployeeModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectPayTypeModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SellOrderModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectCostTypeModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectProductSkuModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectVopPickModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectSeparateBoxWaveModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectProvinceModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectPostPrintOrderWaveModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectPostPrintOrder2WaveModel.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectExpectDeliveryDate.js?vfr2we"></script>
<script src="/ViewJSModels/PostPrintOrder2/vm.PostPrintOrder2.PickProductsPrint.js?vfr2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.ShowPostPrintOrder2RemainProducts.js?vf35678453333r2we"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectInvoiceOrder.js?vf333333"></script>
<script src="/ViewJSModels/base/c8Control/vm.Control.SelectOperatorModel.js?1x"></script>
<script src="/ViewJSModels/base/c8ControlExt.js?v12345123123"></script>
<script src="/Content/js/CaiNiaoPrintFuncs.js"></script>
<%--自定义js控件--%>
<%}%>
</body>
</html>