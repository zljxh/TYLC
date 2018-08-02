<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isErrorPage="true"%>
<html>
<head>
    <title></title>
</head>
<body>
<%
  org.springframework.jdbc.BadSqlGrammarException sqlEx=(org.springframework.jdbc.BadSqlGrammarException)exception;
%>
<p>
  <%= sqlEx.getMessage()%>
</p>
<p style="line-height: 12px; color: #666666; font-family: Tahoma, '宋体'; font-size: 12px; text-align: left;">
 完整语句 <%= sqlEx.getSql()%>
</p>

</body>
</html>
