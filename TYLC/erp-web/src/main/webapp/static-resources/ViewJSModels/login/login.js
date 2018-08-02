var viewModel = function () {
    var self = this;
    this.form = {
        usercode: "",
        password: "",
        tenantcode: "",
        ip: null,
        city: null
    };

    this.message = ko.observable();
    this.loginClick = function () {
        if (!this.checkLogin()) {
            return false;
        }
        $("#f").submit();
    };

    this.resetClick = function () {
        self.form.usercode = "";
        self.form.password = "";
        self.form.tenantcode = "";
    };
    this.resetImgUrl = function () {
        $('#img').attr("src", '/jcaptcha.jpg?' + new Date().getTime());
    };
    this.checkLogin = function () {
        self.form.usercode = $('input[name=usercode]').val();
        if (this.checknull(self.form.usercode) == false) {
            $('.message').text('用户名不能为空！');
            return false;
        }
        self.form.password = $('input[name=password]').val();
        if (this.checknull(self.form.password) == false) {
            $('.message').text('密码不能为空！');
            return false;
        }
        self.form.tenantcode = $('input[name=tenantcode]').val();
        if (this.checknull(self.form.tenantcode) == false) {
            $('.message').text('公司名称不能为空！');
            return false;
        }
        return true;
    };
    this.init = function () {
        var ILData = ILData || [];
        self.form.ip = ILData[0];
        $.getJSON("http://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974&callback=?", function (d) {
            self.form.city = d.content.address;
        });
    };
    this.enterClick = function () {
        if (window.event.keyCode == 13) {
            this.loginClick();
            return false;
        }
        return true;
    };

    //this.init();
    this.checknull = function (item) {
        if (item != undefined && item != null && item != '') {
            return true;
        }
        return false;
    }
};
var vm = new viewModel();
$(document).ready(function () {
    ko.applyBindings(vm);
    //vm.form.usercode("admin");
    //vm.form.password("12345");
    //alert("su");
    // $("form").submit();

});