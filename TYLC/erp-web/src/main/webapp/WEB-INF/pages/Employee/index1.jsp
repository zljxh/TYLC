<html>
<head>
    <meta charset="UTF-8">
    <title>${Title}</title>
    <link rel="stylesheet" type="text/css" href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/${theme}/easyui.css">
    <link rel="stylesheet" type="text/css" href="/Content/js/jquery-easyui-${EasyuiVersion}/themes/icon.css">

    <script type="text/javascript" src="/Content/js/jquery-easyui-${EasyuiVersion}/jquery.min.js"></script>
    <script type="text/javascript" src="/Content/js/jquery-easyui-${EasyuiVersion}/jquery.easyui.min.js?7711"></script>
    <script type="text/javascript" src="/Content/js/jquery-easyui-${EasyuiVersion}/locale/easyui-lang-zh_CN.js"></script>
    <script src="/Content/js/Core/knockout-3.1.0.js"></script>
    <script src="/Content/js/Core/knockout.mapping-latest.js"></script>
    <script src="/Content/js/Core/knockoutExt.js?5466549998844535r66r554343555559000"></script>
    <script src="/ViewJSModels/base/c8GridPaginationModel.js?14343439943436699899555584438899888885943438894556556966559971"></script>
    <script src="/ViewJSModels/Employee/vm.Employee.search.js?44344rr444666955f443dsd98895544543443555f88sd8443fds66559"></script>
    <script type="text/javascript">
        var opModel = new vm.Employee.search({ form: { BeginDate: null, EndDate: null, userName: null, IsleaveOffice: "" } });
        ko.bindingViewModel(opModel);
    </script>
    <style type="text/css">
        .panel-header, .panel-body {
            border-color: #95B8E7;
            border-width: 0px;
        }

        .window .window-body {
            border-width: 1px;
            border-style: solid;
        }

        #fm {
            margin: 0;
            padding: 10px 30px;
        }

        .ftitle {
            font-size: 14px;
            font-weight: bold;
            padding: 5px 0;
            margin-bottom: 10px;
            border-bottom: 1px solid #ccc;
        }

        .fitem {
            margin-bottom: 5px;
        }

        .fitem label {
            display: inline-block;
            width: 80px;
        }
    </style>
</head>
<body scroll="no" style="background:#FFFFFF; height: 100%; display:block; border: none; overflow: hidden; padding: 2px;">
<div id="tb" style="height:auto">
    <div style="margin-bottom:2px">
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-plus" plain="true" data-bind="click:addWin">新增</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-pencil-square-o" plain="true" data-bind="click:editWin">修改</a>
        <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-trash-o" plain="true" onclick="destroyUser()">删除</a>
    </div>
    <div>
        开始日期: <input class="easyui-datebox z-txt" data-bind="dateboxValue:form.BeginDate" style="width:100px">
        截止日期: <input class="easyui-datebox  z-txt" data-bind="dateboxValue:form.EndDate" style="width:100px">
        名称:<input data-bind="value:form.Name" class="easyui-textbox textbox-f" style="width:80px" />
        是否离职：<select class="easyui-combobox" style="width:80px" data-bind="comboboxValue:form.IsleaveOffice">
        <option   value="">请选择...</option>
        <option value="true">是</option>
        <option value="false">否</option>
    </select>
        <a href="#" class="easyui-linkbutton" iconcls="fa fa-search" data-bind="click:searchClick">Search</a>
    </div>
</div>
<table id="my-datagrid" fit="true" data-bind="cdatagrid:gridPaginationModel">
</table>
<div id="win"></div>
</body>
</html>