﻿<html>
<head>
    <script src="/ViewJSModels/Cartoon/vm.Cartoon.search.js?15431232232"></script>
    <script src="/ViewJSModels/Cartoon/vm.Cartoon.edit.js?15412"></script>
    <script src="/ViewJSModels/base/c8Control/vm.Control.AddPic.js?22255"></script>
</head>
<body>
<div id="tb" style="height:auto">
    <div style="margin-bottom:2px">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-plus" plain="true" data-bind="click:addWin">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-pencil-square-o" plain="true" id="btnedit"
           data-bind="click:editWin">修改</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-trash-o" plain="true" id="ChangeEnabled"
           data-bind="click:ChangeEnabled">启用</a>
    </div>
    <div class="c8SearchConditions">

        <a href="#" class="easyui-linkbutton" iconcls="fa fa-search" data-bind="click:searchClick">刷新</a>
    </div>
</div>
<table id="my-datagrid" fit="true" data-bind="cdatagrid:gridPaginationModel"></table>
<div id="win">


</div>
</body>
</html>