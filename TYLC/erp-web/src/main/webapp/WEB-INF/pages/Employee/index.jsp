<%@ page import="com.ty.erp.web.spring.ControllerContext" %>
<html>
<head>
    <script src="/ViewJSModels/Employee/vm.Employee.search.js?yo1212uknow"></script>
</head>
<body>
<div id="tb" style="height:auto">
    <div style="margin-bottom:2px">
        <a title="" href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-plus" plain="true"
            c8data-bind="click:addWinFun">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-pencil-square-o" plain="true"
            c8data-bind="click:editWinFun">修改</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-toggle-on" plain="true"
            c8data-bind="click:EnabledWin">启用</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-toggle-off" plain="true"
            c8data-bind="click:NotEnabledWin">停用</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-pencil-square-o" plain="true"
           c8data-bind="click:ResetPwd"
           title="密码重置为12345">重置密码</a>
        <%--<a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-trash-o" plain="true"--%>
           <%--c8disabled='<%= !ControllerContext.isPermitted("1000100002")%>' c8data-bind="click:setOperatorRole">设置角色</a>--%>


        <%--<a href="/Employee/downEmployee" class="easyui-linkbutton" iconcls="fa fa-arrow-circle-o-down" plain="true">导入模板下载</a>--%>

    </div>
    <div class="c8SearchConditions">
        名称:<input c8name="Name" class="easyui-textbox textbox-f " style="width:120px"/>
        离职:<input class="default-checkbox" c8name="IsleaveOffice">&nbsp;
        启用:<input class="default-checkbox" c8name="IsEnabled">&nbsp;
        </select>
        <a href="#" class="easyui-linkbutton" iconcls="fa fa-search" c8data-bind="click:searchClick">搜索</a>
    </div>
</div>
<table id="my-datagrid" fit="true" c8data-bind="c8GridPagination:gridPaginationModel">
</table>
<div id="win">

</div>

</body>
</html>