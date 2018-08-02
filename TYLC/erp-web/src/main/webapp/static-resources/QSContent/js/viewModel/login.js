var viewModel = function () {
    var self = this;
    this.form = {
        usercode: ko.observable(),
        password: ko.observable(),
        jcaptchaCode:ko.observable(),
        ip: null,
        city: null
    };

    this.message = ko.observable();
    this.loginClick = function (form) {
        if (!self.form.password())
            self.form.password($('[type=password]').val());
        $.ajax({
            type: "POST",
            url: "/login/check",
            data: ko.toJSON(self.form),
            dataType: "json",
            contentType: "application/json",
            success: function (d) {
                if (d.Result == true) {
                    
                    self.message("登陆成功正在跳转，请稍候...");
                    window.location.href = '/';
                } else {
                    self.message(d.message);
                }
            },
            error: function (e) {
                self.message(e.responseText);
            },
            beforeSend: function () {
                $(form).find("input").attr("disabled", true);
                self.message("正在登陆处理，请稍候...");
            },
            complete: function () {
                $(form).find("input").attr("disabled", false);
            }
        });
    };

    this.resetClick = function () {
        self.form.usercode("");
        self.form.password("");       
    };
    this.resetImgUrl=function(){
        $('#img').attr("src", '/jcaptcha.jpg?'+new Date().getTime());
    };
    this.checkLogin=function(){
        if(!self.form.usercode()) {
            $('.message').text('用户名不能为空！');
            return false;
        }
        if(!self.form.password()) {
            $('.message').text('密码不能为空！');
            return false;
        }

        /*
        if(!self.form.jcaptchaCode()) {
            $('.message').text('验证码不能为空！');
            return false;
        }*/
        return true;
    };
    this.init = function () {
        var ILData = ILData || [];
        self.form.ip = ILData[0];
        $.getJSON("http://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974&callback=?", function (d) {
            self.form.city = d.content.address;
        });
    };

    this.init();
};
var vm=new viewModel();
$(document).ready(function () {
    ko.applyBindings(vm);
    //vm.form.usercode("admin");
   //vm.form.password("12345");
    //alert("su");
 // $("form").submit();
});