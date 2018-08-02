var viewModel = function () {
    var self = this;
    this.form = {
        usercode: "",
        password: "",
        tenantcode: "",
        ip: null,
        city: null
    };

    this.begin = function () {
        if(timer)
            clearInterval(timer);
        timer= window.setInterval(function () {

            $.get("/Init/GetMessages?i="+i,
                {"timed": new Date().getTime()},
                function (data) {

                    if(data.Result)
                    {
                        clearInterval(timer);
                        $("#message").text("初始化已完成");
                        window.location.href="/";
                    }else {
                        if (data.Message) {
                            $("#logs").append(  data.Message + " <br/>");
                            i = i + 1;
                        }
                    }
                });
        }, 1000);

        $.get("/Init/DataInit",
            {"timed": new Date().getTime()},
            function (data) {

                if (data.Result) {
                    $("#message").text("初始化已完成");
                    clearInterval(timer);
                    window.location.href="/";
                }
            });

        return true;
    };




};
var vm = new viewModel();
var  i=0;
var   timer;
$(document).ready(function () {

    ko.applyBindings(vm);


});