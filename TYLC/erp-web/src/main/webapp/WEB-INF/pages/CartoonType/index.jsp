<html>
<head>
    <script src="/ViewJSModels/CartoonType/vm.CartoonType.search.js?123"></script>
</head>
<body>
    <div id="tb" style="height:auto">
        <div style="margin-bottom:2px">
            <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-plus" plain="true" c8data-bind="click:addWin">新增</a>
            <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-pencil-square-o" plain="true" id="btnedit" c8data-bind="click:editWin">修改</a>
            <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-trash-o" plain="true" id="ChangeEnabled" c8data-bind="click:ChangeEnabled">启用</a>
        </div>
        <div class="c8SearchConditions">

            <a href="#" class="easyui-linkbutton" iconcls="fa fa-search" c8data-bind="click:searchClick">刷新</a>
        </div>
    </div>
    <table id="my-datagrid" fit="true" c8data-bind="c8GridPagination:gridPaginationModel"></table>
</body>
</html>