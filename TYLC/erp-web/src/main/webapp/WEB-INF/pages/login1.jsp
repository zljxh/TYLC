<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<body>
    <h1>login</h1>
    <form action="" method="post">
        用户名：<input type="text" name="username" value="<shiro:principal/>"><br/>
        密码：<input type="password" name="password"><br/>

        <input type="submit" value="登录">
    </form>

</body>
</html>