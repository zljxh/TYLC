<%@ page language="java" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>千胜云电子商务管理后台</title>
    <link rel="stylesheet" href="/Content/login/css/login.css">
    <script src="/Content/js/jquery-1.11.3.min.js"></script>
    <script src="/Content/js/Core/knockout-3.1.0.js"></script>
    <script src="/ViewJSModels/login/login.js?bnc"></script>
    <script language="JavaScript">vm.form.usercode('${usercode}');</script>
    <style type="text/css">
        .message {
            padding-left: 20px;
            color: red;
        }
    </style>
</head>
<body class="login-body">
<div class="content main">
    <div class="container" id="main">
        <div class="form-login">
            <span class="photo"></span>

            <form id="f" method="post" accept-charset="utf-8" data-bind="event:{keydown:enterClick}">
                <div class="message">${error}</div>
                <div class="row home-div">
                    <input type="text" name="tenantcode" placeholder="租户代码" data-bind="value:form.tenantcode" >
                    <span></span>
                    <span class="tx"></span>
                </div>
                <div class="row uname-div">
                    <input type="text" name="usercode" placeholder="用户名" data-bind="value:form.usercode">
                    <span></span>
                    <span class="tx"></span>
                </div>
                <div class="row pwd-div">
                    <input type="password" name="password" placeholder="密码" data-bind="value:form.password">
                    <span></span>
                    <span class="tx"></span>
                </div>
                <%--<div class="row yzm-div">--%>
                    <%--<input type="text" name="jcaptchaCode" data-bind="value:form.jcaptchaCode" placeholder="验证码">--%>
                    <%--<a class="yzm"><img src="/jcaptcha.jpg" id="img" data-bind="click:resetImgUrl"></a>--%>
                    <%--<a class="refresh" href="javascript:return false;" data-bind="click:resetImgUrl">看不清，换一张！</a>--%>
                    <%--<span class="tx"></span>--%>
                <%--</div>--%>
                <div class="row btn-div">
                    <a class="login-btn" data-bind="click:loginClick">登录</a>
                    <a class="reset-btn" data-bind="click:resetClick">重置</a>
                </div>
            </form>
        </div>

    </div>
</div>
<script type="text/javascript">
    var sheight = screen.height;
    var main = document.getElementById("main");
    if (800 >= sheight > 768) {
        main.setAttribute("class", "container sh800");
    } else if (900 >= sheight > 800) {
        main.setAttribute("class", "container sh900");
    } else if (1024 >= sheight > 900) {
        main.setAttribute("class", "container sh1024");
    } else if (1080 >= sheight > 1024) {
        main.setAttribute("class", "container sh1080");
    } else if (sheight > 1080) {
        main.setAttribute("class", "container shbig");
    }

</script>
</body>
</html>