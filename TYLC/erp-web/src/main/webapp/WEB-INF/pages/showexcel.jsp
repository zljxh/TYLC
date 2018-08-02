<%--
  Created by IntelliJ IDEA.
  User: xyyz150
  Date: 2015/1/8
  Time: 14:44
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    request.setAttribute("EasyuiVersion", "1.4.1");
%>
<html>
<head>
    <script type="text/javascript" src="/Content/js/jquery-easyui-${EasyuiVersion}/jquery.min.js"></script>
    <script src="/ViewJSModels/base/ShowExcel.js?t4"></script>
    <script type="text/javascript">
        var a = $.parseJSON(${result});
    </script>
</head>
<body>
<input type="hidden" id="msg" value=${result}/>
</body>
</html>
