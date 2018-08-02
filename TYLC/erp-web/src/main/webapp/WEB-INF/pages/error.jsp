<%--
  Created by IntelliJ IDEA.
  User: xyyz150
  Date: 2014/11/11
  Time: 19:07
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*" %>

<%=response.toString()%>

<html>
<head>
    <title></title>
</head>
<body>
<%=pageContext.getException() %><br/><span style="color: #3366ff;"><!-- 这是JSP中的内置对象exception --></span>



<%=request.getAttribute("exceptionMessage") %><br><span style="color: #3366ff;"><!-- 这是SpringMVC放在返回的Model中的异常对象 --></span>



<%=request.getAttribute("javax.servlet.error.status_code") %><span style="color: #3366ff;"><!-- HttpServletResponse返回的错误码信息 --></span>



</body>
</html>
