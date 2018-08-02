<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isErrorPage="true"%>
<html>
<head>
  <title>400</title>
</head>
<body>
错误码：<%=request.getAttribute("javax.servlet.error.status_code")%> <br/>
信息：  The request sent by the client was syntactically incorrect<br/>
请查看日志<br/>
</body>
</html>
