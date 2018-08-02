/**
 * Created by admin on 2014/11/2.
 */
vm.Control = vm.Control || {};
vm.Control.SelectExpectDeliveryDate = function (griddataParameter) {
    var base = this;
    this.c8winId=null;
    this.setWinId=function(winid){
        this.c8winId=winid;
        base.gridModel.c8winId=this.c8winId;
    }
    this.winUrl = "/BusinessControl/getControlView?ControlName=SelectExpectDeliveryDate";
    this.baseModel = null;
    this.griddataParameter = griddataParameter || {};
    //this.griddataParameter.pageUrl = "/BusinessControl/getFlagList";
    //this.griddataParameter.countUrl = "/BusinessControl/getFlagCount";
    this.griddataParameter.toolbar = ".tbSelectExpectDeliveryDate";
    this.griddataParameter.IsFormLayout=false;
    this.f_DblClickRow = function (rowIndex, rowData) {
       base.addDataFlagClose();
    }
    this.gridModel = new c8Grid(this.griddataParameter);
    //this.searchClick = function () {
    //    base.gridModel.pSearch();
    //};
    //设置添加商品的回调函数
    this.setParameter = function (parameter) {
        callBackAddFlag = parameter.callback;
        if (parameter.singleSelect != null) {
            base.griddataParameter.dataoptions.singleSelect = parameter.singleSelect;
        }
    };
    var callBackAddFlag = null;
    this.addExpectDeliveryDateClose = function () {
        var result = $("#dd").parent().find("span > input:last").val();
        if (result == null || result == ""){
            return;
        }
        if (callBackAddFlag != null) {
            callBackAddFlag(result);
        }
        if (base.c8win) {
            base.c8win.c8CloseWin();
        }
    };
}
