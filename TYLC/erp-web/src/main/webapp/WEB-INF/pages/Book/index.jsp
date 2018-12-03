<html>
<head>
    <script src="/ViewJSModels/Book/vm.Book.search.js?016"></script>
    <script src="/ViewJSModels/Book/vm.Book.edit.js?016"></script>
    <script src="/ViewJSModels/base/c8Control/vm.Control.AddPic.js?22"></script>
</head>
<body>
<div id="tb" style="height:auto">
    <div style="margin-bottom:2px">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-plus" plain="true" data-bind="click:addWin">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-pencil-square-o" plain="true" id="btnedit"
           data-bind="click:editWin">修改</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-trash-o" plain="true" id="ChangeEnabled"
           data-bind="click:ChangeEnabled">启用</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-plus" plain="true" data-bind="click:allFree">设置全免</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-plus" plain="true" data-bind="click:partFreeWin">设置前几免费</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-plus" plain="true" data-bind="click:addBookDetail">增加详情</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-plus" plain="true" data-bind="click:setCost">修改价格</a>

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