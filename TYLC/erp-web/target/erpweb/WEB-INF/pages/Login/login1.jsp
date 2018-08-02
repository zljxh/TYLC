<%@ page language="java" pageEncoding="UTF-8" %>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>登录</title>
        <link href="/Content/css/MainPage/login.css?yyre4355u6688" rel="stylesheet" type="text/css" />
        <script src="/Content/js/Core/jquery-1.11.0.min.js"></script>
        <script src="/Content/js/Core/knockout-3.1.0.js"></script>
        <script src="/Content/js/viewModel/login.js?688640099964446"></script>
         <script  language="JavaScript">vm.form.usercode('${usercode}');</script>
    </head>
    <body>
        <div class="second_body">
            <form method="post" accept-charset="utf-8">
                <div class="logo"><img src="/Content/images/login/logo.png" alt="" /></div>
                <div class="title-zh">千胜电商ERP</div>
                <%--<div class="title-en" style="">千胜ERP</div>--%>
                <div class="message" >${error}</div>
                <table border="0" style="width:300px;">
                    <tr >
                        <td style="padding-bottom: 5px;width:55px;">用户名：</td>
                        <td colspan="2"><input type="text" name="usercode" class="login" data-bind="value:form.usercode" /></td>
                    </tr>
                    <tr>
                        <td class="lable" style="letter-spacing: 0.5em; vertical-align: middle">密码：</td>
                        <td colspan="2"><input type="password" name="password" class="login" data-bind="value:form.password" /></td>
                    </tr>
                    <tr style="display:${jcaptchaEbabled?"":"none"}">
                    <td style="padding-bottom: 5px;width:55px;">验证码：</td><!--/jcaptcha.jpg-->
                        <td colspan="2" class="loginCheckCode"><input type="text" class="login" name="jcaptchaCode" data-bind="value:form.jcaptchaCode" style="width:60px "  />
                            <img src="/jcaptcha.jpg" height="25" title="点击更换验证码" id="img" data-bind="click:resetImgUrl">
                            <a href="javascript:return false;" data-bind="click:resetImgUrl">看不清</a>
                        </td>
                    </tr>
<tr>

                            <td colspan="3" style="text-align:center" class="loginCheckCode">
                                <input type="submit"  value="登录"  onclick="return vm.checkLogin();" class="login_button" />
                                <input type="button" value="重置" class="reset_botton" data-bind="click:resetClick" />
                            </td>

                    </tr>
                </table>
            </form>
        </div>
    </body>
</html>
