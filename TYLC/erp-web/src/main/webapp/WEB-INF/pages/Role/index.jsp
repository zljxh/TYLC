<%@page import="com.qs.erp.web.spring.ControllerContext" %>
<html>
<head>
    <script src="/ViewJSModels/Role/vm.Role.search.js?444454"></script>
</head>
<body>
<div id="tb" style="height:auto">
    <div style="margin-bottom:2px">
        <a href="javascript:void(0)" c8disabled='<%= !ControllerContext.isPermitted("1010201")%>' class="easyui-linkbutton"
           iconcls="fa fa-plus" plain="true" c8data-bind="c8click:addWin">新增</a>
        <a href="javascript:void(0)" c8disabled='<%= !ControllerContext.isPermitted("1010202")%>' class="easyui-linkbutton"
           iconcls="fa fa-pencil-square-o" plain="true" id="btnedit" c8data-bind="c8click:editWin">修改</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-toggle-on" plain="true" id="ChangeEnabled"
           c8data-bind="click:ChangeEnabled">启用</a>
        <%--<a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-trash-o" plain="true"--%>
        <%--c8data-bind="c8click:deleteWin">删除</a>--%>
        <a href="javascript:void(0)" class="easyui-linkbutton" id="btnsetrole" iconcls="fa fa-wrench" plain="true"

           c8data-bind="c8click:setRoleSystemResource">设置权限</a>


    </div>
    <div class="c8SearchConditions">
        开始日期: <input class="easyui-datebox z-txt " c8name="BeginDate" style="width:100px">
        截止日期: <input class="easyui-datebox  z-txt " c8name="EndDate" style="width:100px">
        名称:<input c8name="Name" class="easyui-textbox textbox-f " style="width:120px"/>
        状态：<select class="easyui-combobox " style="width:80px" c8name="IsEnabled">
        <option value="">请选择...</option>
        <option value="1">启用</option>
        <option value="0">停用</option>
    </select>
        <a href="#" class="easyui-linkbutton" iconcls="fa fa-search" c8data-bind="c8click:searchClick">搜索</a>
    </div>
</div>
<table id="my-datagrid" fit="true" c8data-bind="c8GridPagination:gridPaginationModel"></table>

</body>
</html>