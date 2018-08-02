<%@ page language="java" pageEncoding="UTF-8"%>

<%@ taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator"%>
<%
    request.setAttribute("theme", "default");
    request.setAttribute("EasyuiVersion", "1.4");
    request.setAttribute("Title", "webapi测试系统!");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="UTF-8">
    <title>${Title}</title>
    <link href="/Content/css/base.css?hhhhhh" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/${theme}/easyui.css">
    <link rel="stylesheet" type="text/css" href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/color.css">
   <link rel="stylesheet" type="text/css" href="/Content/css/winedit.css?a664344443898989989444884d22444dd444dd469994444466566556659999444376"  />

    <script type="text/javascript" src="/Content/js/jquery-easyui-${EasyuiVersion}/jquery.min.js"></script>


    <script type="text/javascript" src="/Content/js/jquery-easyui-${EasyuiVersion}/jquery.easyui.min.js?7733143431"></script>
    <script type="text/javascript" src="/Content/js/jquery-easyui-${EasyuiVersion}/locale/easyui-lang-zh_CN.js?233392"></script>
    <script src="/Content/js/Core/knockout-3.1.0.js"></script>
    <script src="/Content/js/Core/knockout.mapping-latest.js"></script>
    <script src="/Content/js/Core/c8help.js?44398413144743r"></script>
    <script src="/Content/js/Core/knockoutExt.js?a2ww445433554665458743456432332564352a674374dsdds4553434343436dda445444544444443433443rere582121255598996658hh443r888r4664435499943438844535rd59788787000"></script>
    <script src="/Content/js/Core/JqueryExt.js?46698665654434698832656435544487434434347633243343555"></script>
    <script src="/ViewJSModels/base/c8GridPaginationModel.js?4434434764374328755324235445343265334332343398985945488899455444re443er896658hh9oi"></script>
    <script src="/ViewJSModels/base/com.qiansheng.control.js?3396345878745444444545544545944358944derred222w6654443hh8998983434434399444w96699444455888rr4444dd6556ee59971"></script>
    <script src="/ViewJSModels/base/easyuiValidateboxExtend.js?3354998d4548743435rered665244443hhoioooddd5543244885554432w444w96699444455888rr4444dd6556ee59971"></script>
    <script src="/ViewJSModels/base/c8Grid.js?33989439854898944r76e4348006567er24334443454498348873er896658hh9oi"></script>
    <script src="/ViewJSModels/base/c8Window.js?33998dre235445red66532384389434376324555443344334438438433232766755454843477676455454866654446676778778744687875557634454534454434357887445244443hhoioooddd5543244885554432w444w96699444455888rr4444dd6556ee59971"></script>
    <script src="/ViewJSModels/base/c8Control/vm.Control.MultiSelectProductModel.js?eeew"></script>
    <script src="/ViewJSModels/base/c8ControlExt.js?324434433"></script>
      <decorator:head/>
</head>
<body scroll="no" style="background:#FFFFFF; height: 100%; display:block; border: none; overflow: hidden; padding: 2px;">
<decorator:body/>
<div id="parentWin"  style="display: none">
</div>
</body>
</html>