;(function ($) {
    function c8help() {
        this.IsBatch = null;
        this.IsRepeatPrintExpressOrder = null;
        this.IsRepeatPrintDeliveryOrder = null;
        this.ChineseDistricts = null;
        this.IsJcjm=null;
        this.HoldUpPlatDelivery=null;
        this.IsInterceptEd=null;
        this.IsLackDelivery =null;
        this.DefaultDefectWreRowId =null;
        this.IsQMDJ=null;
        this.IsPostPrintScan =null;
        this.IsWavePrintRefund =null;
        this.IsBackInStorageAutoPrintBarCode =null;
        this.pdaEnabled=null;
        this.isEditCostPrice=null;//是否可以编辑商品成本价
    };
    /***
     *
     * 获取请求的UUID，指定长度和进制,如
     * getUUID(8, 2)   //"01001010" 8 character (base=2)
     * getUUID(8, 10) // "47473046" 8 character ID (base=10)
     * getUUID(8, 16) // "098F4D35"。 8 character ID (base=16)
     *
     */
    c8help.prototype.getUUID = function (len, radix) {
        var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
        var uuid = [], i;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
        } else {
            var r;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
            uuid[14] = '4';
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join('');
    }
    c8help.prototype.c8ToObjectFromJsonStr = function (str) {
        return (new Function("return " + str + ";"))();
    };
    c8help.prototype.c8ToJsonStr = function (o) {
        return ko.toJSON(o);
    };
    c8help.prototype.c8ToUrlparameter = function (parameterData) {
        var data = "";
        for (var key in parameterData) {
            data = data + key + "=" + parameterData[key] + "&"
        }
        return data;
    };
    c8help.prototype.c8parseJSON = function (m, json) {
        var result = (new Function("mm", "with (mm){return {" + json + "};}"))(m);
        return result;
    };
//"a:b,c:d"
    c8help.prototype.c8ParseAttrStrToObject = function (str) {
        if (!str) return null;
        var elementOption = {};
        var keyvalueList = str.split(",");
        if (!keyvalueList) return null;
        var keyValueLength = keyvalueList.length;
        if (keyValueLength <= 0) return null;
        for (var j = 0; j < keyValueLength; j++) {
            var keyvalueStr = keyvalueList[j];
            var keyvalue = keyvalueStr.split(":");
            if (!keyvalue) continue;
            if (keyvalue.length == 2) {
                elementOption[keyvalue[0]] = keyvalue[1];
            }
        }
        return elementOption
    };
//根据比较器返回在目标数组里的原数组里的元素
    c8help.prototype.c8GetTop1ExistsTargetArray = function (sourceArray, targetArray, equalcallback) {
        if (!sourceArray) return null;
        var newSource = [];
        var count = sourceArray.length;
        if (count <= 0) return null;
        if (!targetArray || targetArray.length <= 0) return null;
        for (var i = 0; i < count; i++) {
            var sa = sourceArray[i];
            if (this.c8ExistsObject(targetArray, sa, equalcallback)) {
                return sa;
            }
        }
        return null;
    };
//根据比较器返回在目标数组里的原数组里的元素
    c8help.prototype.c8GetArrExistsTargetArray = function (sourceArray, targetArray, equalcallback) {
        if (!sourceArray) return [];
        var newSource = [];
        var count = sourceArray.length;
        if (count <= 0) return [];
        if (!targetArray || targetArray.length <= 0) return [];
        for (var i = 0; i < count; i++) {
            var sa = sourceArray[i];
            if (this.c8ExistsObject(targetArray, sa, equalcallback)) {
                newSource.push(sa);
            }
        }
        return newSource;
    };
////根据比较器返回不在目标数组里的原数组里的元素
    c8help.prototype.c8GetArrNotExistsTargetArray = function (sourceArray, targetArray, equalcallback) {
        if (!sourceArray) return [];
        var newSource = [];
        var count = sourceArray.length;
        if (count <= 0) return [];
        if (!targetArray || targetArray.length <= 0) return sourceArray;
        for (var i = 0; i < count; i++) {
            if (!this.c8ExistsObject(targetArray, sourceArray[i], equalcallback)) {
                newSource.push(sourceArray[i]);
            }
        }
        return newSource;
    };
    c8help.prototype.c8ExistsObject = function (dataArray, infoObject, equalcallback) {
        var count = dataArray.length;
        for (var i = 0; i < count; i++) {
            if (equalcallback(infoObject, dataArray[i])) {
                return true;
            }
        }
        return false;
    };
    c8help.prototype.c8getExistsObject = function (dataArray, infoObject, equalcallback) {
        var count = dataArray.length;
        for (var i = 0; i < count; i++) {
            if (equalcallback(infoObject, dataArray[i])) {
                return dataArray[i];
            }
        }
        return null;
    };
    c8help.prototype.c8GetArrayByFnReturn = function (sourceList, fnReturn) {
        var resultList = [];
        var count = sourceList.length;
        for (var i = 0; i < count; i++) {
            resultList.push(fnReturn(sourceList[i]));
        }
        return resultList;
    };
    c8help.prototype.c8GetArrayByKeyList = function (sourceList, keyList, fnLoad, fnEqueal) {
        //fnLoad 初始化器
        //fnEqueal 比较器
        var o = null;
        var resultList = [];
        var count = sourceList.length;
        var keyCount = keyList.length;
        for (var i = 0; i < count; i++) {
            o = {};
            var s = sourceList[i];
            for (var j = 0; j < keyCount; j++) {
                o[keyList[j]] = s[keyList[j]];
            }
            if (fnLoad) {
                fnLoad(o, s)
            }
            if (fnEqueal) {
                if (fnEqueal(o, s)) {
                    resultList.push(o);
                }
            }
            else {
                resultList.push(o);
            }
        }
        return resultList;
    };
    c8help.prototype.c8CloneObject = function (fromObj) {
        if (typeof(fromObj) != 'object') return fromObj;
        if (fromObj == null) return fromObj;
        var toObj = {};
        if (fromObj.constructor == Array) {
            toObj = [];
            for (var i = 0; i < fromObj.length; i++) {
                if (typeof fromObj[i] !== "object") {
                    toObj[i] = fromObj[i];
                } else {
                    toObj[i] = this.c8CloneObject(fromObj[i]);
                }
            }
        }
        else {
            for (var i in fromObj) {
                if (typeof fromObj[i] !== "object") {
                    toObj[i] = fromObj[i];
                } else {
                    toObj[i] = this.c8CloneObject(fromObj[i]);
                }
            }
        }
        return toObj;
    };

    c8help.prototype.exportExcel = function (source, action)//导出excel方法
    {
        var Form = document.createElement("FORM");
        document.body.appendChild(Form);
        Form.method = "POST";
        var newElement = $("<input name='source' type='hidden' />")[0];
        Form.appendChild(newElement);
        newElement.value = source;
        var IsExcelElement = $("<input name='IsExcel' type='hidden' />")[0];
        Form.appendChild(IsExcelElement);
        IsExcelElement.value = 1;
        Form.action = action;
        Form.submit();
    };
    c8help.prototype.toFloat = function (data) {
        var ret = parseFloat(data);
        if (isNaN(ret)) {
            return 0;
        }
        //ret=ret.toFixed(2);
        return ret;
    };
    c8help.prototype.mathRand = function () {
        var Num = "";
        for (var i = 0; i < 6; i++) {
            Num += Math.floor(Math.random() * 10);
        }
        return Num;
    };
    c8help.prototype.toNumber = function (data) {
        var ret = parseInt(data);
        if (isNaN(ret)) {
            return 0;
        }
        return ret;
    };

    c8help.prototype.filterEnter = function (data) {
        if(data==undefined){
            return "";
        }
        if(Object.prototype.toString.call(data) === "[object String]") {
            data = data.replace(/\r\n/g, "");
            data = data.replace(/[\r\n]/g, "");
            data = data.replace(/\n/g, "");
            data = data.replace(/[\n]/g, "");
            data = data.replace(/\"/g, "");
            data = data.replace(/[\"]/g, "");
            data = data.replace(/\\/g, "\\\\");
        }
        return data;
    };

    c8help.prototype.girdFiledNumberSort = function (a, b) {
        var number1 = parseFloat(a);
        var number2 = parseFloat(b);
        return (number1 > number2 ? 1 : -1);
    };
    c8help.prototype.DataFormatYYYYMMDD = function (value, row, index) {
        if (value != "") {
            var unixTimestamp = new Date(value);
            return unixTimestamp.Format("yyyy-MM-dd")
        }
        else {
            return "";
        }
    };

    c8help.prototype.getProductSizeList = function () {
        var result = null;
        $.ajax({
            type: "get",
            url: '/ProductSize/getList',
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };
    c8help.prototype.getProductSize = function (RowId) {
        var result = null;
        $.ajax({
            type: "get",
            url: '/ProductSize/get' + '?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };

    c8help.prototype.getDefaultProductColor = function(){
        var result = null;
        $.ajax({
            type:"get",
            url:'/BusinessControl/GetDefaultProductColor',
            async:false,
            datatype:"json",
            contentType:"application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result;
    }
    c8help.prototype.getDefaultProductSize = function(){
        var result = null;
        $.ajax({
            type:"get",
            url:'/BusinessControl/GetDefaultProductSize',
            async:false,
            datatype:"json",
            contentType:"application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {
            }
        });
        return result;
    }

    c8help.prototype.getProductColor = function (RowId) {
        var result = null;
        $.ajax({
            type: "get",
            url: '/ProductColor/get' + '?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };
    c8help.prototype.getProductColorList = function () {
        var result = null;
        $.ajax({
            type: "get",
            url: '/ProductColor/getList',
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };
    /*
     * 是否关闭扫描
     * */
    c8help.prototype.getIsCloseScan = function () {
        var result = null;
        $.ajax({
            type: "get",
            url: '/SystemConfig/getIsCloseScan',
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
                //  return result;
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        //if (result == null)
        return result;
    };
    /*
     * 是否开启称重必须扫描
     * */
    c8help.prototype.getIsWeighedBeforeScanning = function () {
        var result = null;
        $.ajax({
            type: "get",
            url: '/SystemConfig/getIsWeighedBeforeScanning',
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
                //  return result;
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        //if (result == null)
        return result;
    };

    c8help.prototype.getIsNotSplitCombinedProduct = function () {
        var result = false;
        $.ajax({
            type: "get",
            url: '/SystemConfig/getIsNotSplitCombinedProduct',
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result;
    };

    c8help.prototype.getTagTypeList = function (list) {
        var result = null;
        $.ajax({
            type: "get",
            url: '/TagType/getList',
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        if (list == undefined)
            return result;
        var dataList = new Array();
        for (var i = 0; i < result.length; i++) {
            for (var orderTypeEnuL in list) {
                if (result[i].OrderTypeEnu == list[orderTypeEnuL])
                    dataList.push(result[i]);
            }

        }
        return dataList;
    };

    c8help.prototype.getWarehouse = function (RowId) {
        var result = null;
        $.ajax({
            type: "get",
            url: '/Warehouse/getMap' + '?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };
    c8help.prototype.getWarehouseTypeByCode = function (Code) {
        var result = null;
        $.ajax({
            type: "get",
            url: '/WarehouseType/getMap' + '?Code=' + Code + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };

    c8help.prototype.getPayTypeByCode = function (Code) {
        var result = null;
        $.ajax({
            type: "get",
            url: '/PayType/getByCode' + '?Code=' + Code + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };

    c8help.prototype.getOrderTypeByCode = function (Code) {
        var result = null;
        $.ajax({
            type: "get",
            url: '/OrderType/GetByCode' + '?Code=' + Code + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };

    c8help.prototype.getExpressType = function (RowId) {
        var result = null;
        $.ajax({
            type: "get",
            url: '/ExpressType/get' + '?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };

    c8help.prototype.getPrintTemplate = function (RowId) {
        var result = null;
        $.ajax({
            type: "GET",
            url: '/PrintTemplate/get?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        return result;
    };
    c8help.prototype.getExpress = function (ExpressRowId) {
        var result = null;
        $.ajax({
            type: "get",
            url: "/Express/get?RowId=" + ExpressRowId,
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result;
    };

    c8help.prototype.getCaiNiaoPrintTemplate = function (CaiNiaoPrintTemplateRowId) {
        var result = null;
        $.ajax({
            type: "get",
            url: "/CaiNiaoPrintTemplate/get?RowId=" + CaiNiaoPrintTemplateRowId,
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            }
        });
        return result;
    };

    c8help.prototype.getIsBatch = function () {
        if (this.IsBatch != null) {
            return this.IsBatch;
        }
        var tempIsBatch;
        $.ajax({
            type: "get",
            url: "/SystemConfig/IsBatch",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempIsBatch = data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsBatch = tempIsBatch;
        return this.IsBatch;
    };

    c8help.prototype.getIsRepeatPrintExpressOrder = function () {
        if (this.IsRepeatPrintExpressOrder != null) {
            return this.IsRepeatPrintExpressOrder;
        }
        var tempData;
        $.ajax({
            type: "get",
            url: "/SystemConfig/IsRepeatPrintExpressOrder",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData = data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsRepeatPrintExpressOrder = tempData;
        return this.IsRepeatPrintExpressOrder;
    };

    c8help.prototype.getIsRepeatPrintDeliveryOrder = function () {
        if (this.IsRepeatPrintDeliveryOrder != null) {
            return this.IsRepeatPrintDeliveryOrder;
        }
        var tempData;
        $.ajax({
            type: "get",
            url: "/SystemConfig/IsRepeatPrintDeliveryOrder",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData = data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsRepeatPrintDeliveryOrder = tempData;
        return this.IsRepeatPrintDeliveryOrder;
    };

    c8help.prototype.getChineseDistricts = function (init) {
        if (init != null) {
            this.ChineseDistricts = null;
        }
        if (this.ChineseDistricts != null) {
            return this.ChineseDistricts;
        }
        var tempData;
        $.ajax({
            type: "GET",
            url: "/SystemConfig/getChineseDistricts" + '?randomid=' + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                if (data != undefined && data != null)
                    tempData = $.c8help.c8ToObjectFromJsonStr(data);
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.ChineseDistricts = tempData;
        return this.ChineseDistricts;
    };

    c8help.prototype.getIsJcjm = function () {
        if (this.IsJcjm != null) {
            return this.IsJcjm;
        }
        var tempData;
        $.ajax({
            type: "get",
            url: "/SystemConfig/IsJcjm",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsJcjm = tempData;
        return this.IsJcjm;
    };
    c8help.prototype.getIsPurchaseCodePurchase = function () {
        if (this.IsPurchaseCodePurchase != null) {
            return this.IsPurchaseCodePurchase;
        }
        var tempData;
        $.ajax({
            type: "get",
            url: "/SystemConfig/IsPurchaseCodePurchase",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsPurchaseCodePurchase = tempData;
        return this.IsPurchaseCodePurchase;
    };
    c8help.prototype.getIsRebindPurchaseCode = function () {
        if (this.IsRebindPurchaseCode != null) {
            return this.IsRebindPurchaseCode;
        }
        var tempData;
        $.ajax({
            type: "get",
            url: "/SystemConfig/IsRebindPurchaseCode",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsRebindPurchaseCode = tempData;
        return this.IsRebindPurchaseCode;
    };
    c8help.prototype.getHoldUpPlatDelivery = function (tagTypeRowId) {
        if (this.HoldUpPlatDelivery != null) {
            return this.HoldUpPlatDelivery;
        }
        var tempData;
        $.ajax({
            type: "get",
            url: "/SystemConfig/HoldUpPlatDelivery",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.HoldUpPlatDelivery = tempData;
        return this.HoldUpPlatDelivery;
    };
    c8help.prototype.getIsInterceptEd = function (tagTypeRowId) {
        var tempData;
        $.ajax({
            type: "get",
            url: "/TagType/getInterceptEd?RowId="+tagTypeRowId+"&randomid="+Math.random,
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        tempData==undefined?this.IsInterceptEd=false: this.IsInterceptEd = tempData;
        return this.IsInterceptEd;
    };

    c8help.prototype.getIsLackDelivery = function () {
        if(this.IsLackDelivery!=null){
            return this.IsLackDelivery;
        }
        var tempData;
        ko.c8Ajax({
            type: "get",
            url: "/SystemConfig/IsLackDelivery",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsLackDelivery = tempData;
        return this.IsLackDelivery;
    };

    c8help.prototype.getDefaultDefectWreRowId = function () {
        if(this.DefaultDefectWreRowId!=null){
            return this.DefaultDefectWreRowId;
        }
        var tempData;
        ko.c8Ajax({
            type: "get",
            url: "/SystemConfig/getDefaultDefectWreRowId",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            }
        });
        this.DefaultDefectWreRowId = tempData;
        return this.DefaultDefectWreRowId;
    };

    c8help.prototype.getIsQMDJ=function(){
        if(this.IsQMDJ!=null){
            return this.IsQMDJ;
        }
        var tempData;
        ko.c8Ajax({
            type: "get",
            url: "/SystemConfig/IsQMDJ",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsQMDJ = tempData;
        return this.IsQMDJ;
    };

    c8help.prototype.getIsPostPrintScan=function(){
        if(this.IsPostPrintScan!=null){
            return this.IsPostPrintScan;
        }
        var tempData;
        ko.c8Ajax({
            type: "get",
            url: "/SystemConfig/IsPostPrintScan",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsPostPrintScan = tempData;
        return this.IsPostPrintScan;
    };

    c8help.prototype.getIsWavePrintRefund=function(){
        if(this.IsWavePrintRefund!=null){
            return this.IsWavePrintRefund;
        }
        var tempData;
        ko.c8Ajax({
            type: "get",
            url: "/SystemConfig/IsWavePrintRefund",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsWavePrintRefund = tempData;
        return this.IsWavePrintRefund;
    };

    c8help.prototype.getIsBackInStorageAutoPrintBarCode=function(){
        if(this.IsBackInStorageAutoPrintBarCode!=null){
            return this.IsBackInStorageAutoPrintBarCode;
        }
        var tempData;
        ko.c8Ajax({
            type: "get",
            url: "/SystemConfig/IsBackInStorageAutoPrintBarCode",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.IsBackInStorageAutoPrintBarCode = tempData;
        return this.IsBackInStorageAutoPrintBarCode;
    }


    c8help.prototype.getPdaEnabled=function(){
        if(this.pdaEnabled!=null){
            return this.pdaEnabled;
        }
        var tempData;
        ko.c8Ajax({
            type: "get",
            url: "/SystemConfig/pdaEnabled",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                tempData=data;
            },
            error: function (e) {
                alert(e.responseText);
            }
        });
        this.pdaEnabled = tempData;
        return this.pdaEnabled;
    };


    c8help.prototype.getPrintFieldData=function(templateId){
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: "/PrintTemplatePrintField/GetFieldListByPrintTemplateRowId?PrintTemplateRowId="+templateId+"&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };

    c8help.prototype.getPrintTemplateList=function(PrintTemplateTypeRowId){
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: '/PrintTemplate/getPrintTemplateList?PrintTemplateTypeRowId=' + PrintTemplateTypeRowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };

    c8help.prototype.getPrintTemplateCaiNiao=function(RowId){
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: '/PrintTemplateCaiNiao/get?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };

    c8help.prototype.getPrintTemplateCaiNiaoNew=function(RowId){
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: '/PrintTemplateCaiNiao/getNew?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
                // self.message(e.responseText);
            },
            beforeSend: function () {

                // $(form).find("input").attr("disabled", true);
                // self.message("正在登陆处理，请稍候...");
            },
            complete: function () {

            }
        });
        return result;
    };
    c8help.prototype.getSystemConfig = function (RowId) {
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: "/SystemConfig/GetGridRow" + '?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result;
    }

    c8help.prototype.getCurrentOperatorName = function(){
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: "/Employee/getCurrentOperatorName",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result;
    }
    c8help.prototype.getCurrentOperatorCode = function(){
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: "/Employee/getCurrentOperatorCode",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result;
    }
    c8help.prototype.getEditCostPrice = function(){
        var result = this.isEditCostPrice;
        if(result != null){
            return result;
        }
        ko.c8Ajax({
            type: "GET",
            url: "/Product/getEditCostPrice",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                this.isEditCostPrice = data;
                result = data;
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result;
    }

    c8help.prototype.setLODOPPrint = function (data, statementList) {
        var copyStatementList= JSON.parse(JSON.stringify(statementList));
        var statementStr = "";
        for (var i = 0; i < copyStatementList.length; i++) {
            var name = copyStatementList[i].Name;
            if(data[name]!=null && data[name]!=undefined){
                var value = String(data[name]);
                if (value) {
                    value = this.filterEnter(value);
                    statementStr += copyStatementList[i].Statement.replace('[PLACEHOLDER]', value);
                } else {
                    statementStr += copyStatementList[i].Statement.replace('[PLACEHOLDER]', "");
                }
            }else{
                  statementStr += copyStatementList[i].Statement.replace('[PLACEHOLDER]', "");

            }

        }
        return statementStr;
    };


    $.fn.c8help = new c8help();
    $.c8help = $.fn.c8help;
})(jQuery);



