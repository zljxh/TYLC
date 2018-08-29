com = com || {};
com.qiansheng = com.qiansheng || {};
com.qiansheng.control = function () {
    var controlList = {};
    this.addControl = function (name, controlparameter) {
        if (!controlList[name + "combogrid"]) {
            controlList[name + "combogrid"] = controlparameter;
        }
        else {
            alert(name + "控件不能重复添加初始化参数");
            alert(name + "控件不能重复添加初始化参数");
        }
    };
    this.c8refreshControl = function (elem) {
        //$(elem).combogrid('options').url=
        var parameter = controlList[$(elem).attr("c8ControlName")];
        var parameterclone = $().c8help.c8CloneObject(parameter);
        if (parameterclone) {
            $(elem).attr("class", $(elem).attr("class") + " c8" + parameterclone.type);
            var parameterDataStr = $(elem).attr("c8Data");
            var parameterDataNameStr = $(elem).attr("c8DataName");
            if (parameterDataStr||parameterDataNameStr) {
                var dataObject={};
                if(parameterDataNameStr){
                    var inputValue=null;
                    if ($("input[c8name='"+parameterDataNameStr+"']").combogrid("options").multiple) {
                        inputValue = $("input[c8name='"+parameterDataNameStr+"']").combogrid("getValues");
                        if (inputValue.length == 0)inputValue = null;
                    } else {
                        inputValue = $("input[c8name='"+parameterDataNameStr+"']").combogrid("getValue");
                    }
                    dataObject[parameterDataNameStr]=inputValue;
                }else {
                    dataObject = $().c8help.c8ParseAttrStrToObject(parameterDataStr);
                }
                var urlParameter = $().c8help.c8ToUrlparameter(dataObject)
                parameterclone.option.url = parameterclone.option.url + "?" + urlParameter;
                // {url:url}
            }
            ;
            $(elem)[parameterclone.type](parameterclone.option);
        }
        ;
    }

    var c8refreshControl = function (elem) {
        //$(elem).combogrid('options').url=
        var parameter = controlList[$(elem).attr("c8ControlName")];
        var parameterclone = $().c8help.c8CloneObject(parameter);
        if (parameterclone) {
            $(elem).attr("class", $(elem).attr("class") + " c8" + parameterclone.type);
            var parameterDataStr = $(elem).attr("c8Data");
            var parameterDataNameStr = $(elem).attr("c8DataName");
            if (parameterDataStr||parameterDataNameStr) {
                var dataObject={};
                if(parameterDataNameStr){
                    var inputValue=null;
                    if ($("input[c8name='"+parameterDataNameStr+"']").combogrid("options").multiple) {
                        inputValue = $("input[c8name='"+parameterDataNameStr+"']").combogrid("getValues");
                        if (inputValue.length == 0)inputValue = null;
                    } else {
                        inputValue = $("input[c8name='"+parameterDataNameStr+"']").combogrid("getValue");
                    }
                    dataObject[parameterDataNameStr]=inputValue;
                }else {
                    dataObject = $().c8help.c8ParseAttrStrToObject(parameterDataStr);
                }
                var urlParameter = $().c8help.c8ToUrlparameter(dataObject)
                parameterclone.option.url = parameterclone.option.url + "?" + urlParameter;
                // {url:url}
            }
            ;
            $(elem)[parameterclone.type](parameterclone.option);
        }
        ;
    }
    this.loadControl = function (context) {
        var list = null;
        if (context) {
            list = $("input[c8ControlName]", context);
        }
        else {
            list = $("input[c8ControlName]");
        }
        var elem = null;
        var length = list.length;
        for (var i = 0; i < length; i++) {
            elem = list[i];
            var parameter = controlList[$(elem).attr("c8ControlName")];
            var parameterclone = $().c8help.c8CloneObject(parameter);
            if (parameterclone) {
                $(elem).attr("class", $(elem).attr("class") + " c8" + parameterclone.type);
                var parameterDataStr = $(elem).attr("c8Data");
                if (parameterDataStr){
                    var dataObject= $().c8help.c8ParseAttrStrToObject(parameterDataStr);
                    var urlParameter = $().c8help.c8ToUrlparameter(dataObject)
                    parameterclone.option.url = parameterclone.option.url + "?" + urlParameter;
                }
                var dataOptionStr = $(elem).attr("c8data-option");
                if (dataOptionStr) {
                    var dataOption = $.c8help.c8ToObjectFromJsonStr("{" + dataOptionStr + "}");
                    for (var key in dataOption) {
                        parameterclone.option[key] = dataOption[key];
                    }
                    if (parameterclone.option.multiple) {
                        parameterclone.option.columns[0].unshift({field: 'ck', checkbox: true});
                    }
                }
                $(elem)[parameterclone.type](parameterclone.option);
                $(elem)[parameterclone.type]("panel").panel("options").comboTarget = elem;//解决combo类型控件回车报错的问题
            }
            else {
                alert($(elem).prop("outerHTML") + "com.qiansheng.control未配置控件，请联系管理员");
            }
        }
    }

    controlList["companyComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridCompany',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };


    controlList["VopDeliveryExpressComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/BusinessControl/GetVopDeliveryExpress',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["chexiao"] = {
        type: "combogrid", option: {
            panelWidth: 150,
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '条件', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }

        }
    };
    controlList["importTemplateTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/BusinessControl/getImportTemplateTypeList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [{field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Name"]);
                return result;
            }
        }
    };

    controlList["CompanyComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/Company/getList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Name"]);
                return result;
            }
        }
    };
    controlList["wmsComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/BusinessControl/getWmsList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [{field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Name"]);
                return result;
            }
        }
    };
    controlList["bigRegionComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/BigRegion/getList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [{field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Name"]);
                return result;
            }
        }
    };
    controlList["departmentComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridDepartment',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [


                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["stationComboGrid"] = {
        type: "combogrid",
        option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridStation',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    var LoadReturnResult = function (q, row, keyList) {
        for (var i = 0; i < keyList.length; i++) {
            var key = keyList[i];
            if (row[key]) {
                if (row[key].indexOf(q) >= 0) {
                    return true;
                }
            }
        }
        return false;
    }
    controlList["employeeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridEmployee',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["exceptionTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboExceptionTypeForSellOrder',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["employeeNotOperatorComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridEmployeeNotOperator',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["roleComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridRole',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["shopTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridShopType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["warehouseTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridWarehouseType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["orderTypeEnuComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridOrderTypeEnu',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'RowId', title: '键', width: 40, sortable: true},
                    {field: 'Name', title: '值', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };

    controlList["shopNatureEnuComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridShopNatureEnu',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'RowId', title: '键', width: 40, sortable: true},
                    {field: 'Name', title: '值', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };
    controlList["menuComboTree"] = {
        type: "combotree", option: {
            url: '/BusinessControl/GetComboTreeMenu'
        }
    };
    controlList["SystemResourceComboTree"] = {
        type: "combotree", option: {
            url: '/BusinessControl/GetComboTreeSystemResource'
        }
    };
    var GetComboTreeRegionParentAllByRowId = function (RowId, callBack) {
        var url = "/Region/GetComboTreeRegionParentAllByRowId?RowId=" + RowId;
        //var result=null;
        ko.c8PostJSON(url, {}, function (data) {
            if (callBack) {
                //  result = data;
                callBack(data);
            }
        }, true);
        // return result;
    }
    var isLoadingRegionComboTree = false;
    var isGetComboTreeRegionParentAllByRowId = false;
    var RegionRowId = undefined;
    var regionComboTree = undefined;
    controlList["regionComboTree"] = {
        type: "combotree", option: {
            animate: true,
            collapsible: true,
            fitColumns: true,
            url: '/BusinessControl/GetComboTreeRegionChild',
            method: 'get',
            loadFilter: function (data) {
                if (data.Name) {
                    return data.Name;
                } else {
                    return data;
                }
            },
            onShowPanel: function () {

            },
            onBeforeLoad: function (node, param) {
                isLoadingRegionComboTree = true;
                return true;
            }, onLoadSuccess: function (node, data) {
                isLoadingRegionComboTree = false;
                if (isGetComboTreeRegionParentAllByRowId) {
                    isGetComboTreeRegionParentAllByRowId = false;
                    GetComboTreeRegionParentAllByRowId(RegionRowId, function (data) {
                        if (data.length > 0) {
                            regionComboTree.combotree('loadData', data);
                            regionComboTree.combotree('setValue', RegionRowId);
                        }
                    });
                }
            }, eBeforeSetValue: function (jq, value) {
                if (value && value != '') {
                    var t = jq.combotree('tree');	// 获取树对象
                    var n = t.tree('find', value);		// 获取选择的节点
                    if (!n) {
                        if (isLoadingRegionComboTree) {
                            isGetComboTreeRegionParentAllByRowId = true;
                            RegionRowId = value;
                            regionComboTree = jq;
                        }
                        else {
                            GetComboTreeRegionParentAllByRowId(value, function (data) {
                                if (data.length > 0) {
                                    jq.combotree('loadData', data);
                                    regionComboTree.combotree('setValue', value);
                                }
                            });
                        }
                    }
                    else {
                        t.tree('collapseAll');
                        t.tree('expandTo', n.target);
                        t.tree('select', n.target);
                        t.tree('scrollTo', n.target);
                    }
                }
                return;
            }
        }
    };


    controlList["ProductCategoryComboTree"] = {
        type: "combotree", option: {
            url: '/BusinessControl/GetComboTreeProductCategory',
            async: false
        }
    };


    controlList["shopComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridShop',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 80, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["ImportTemplateDataComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getImportTemplateData',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Name"]);
                return result;
            }
        }
    };

    controlList["vipLevelComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridVipLevel',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };


    controlList["sexEnuComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridSexEnu',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    //{field: 'RowId', title: '键', width: 40, sortable: true},
                    {field: 'Name', title: '值', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };


    controlList["supplierTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridSupplierType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["SupplierComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridSupplier',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["SupplierComboGridWithAuth"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridSupplierWithAuth',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["ProductUnitComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridProductUnit',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["ProductOwnerComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridProductOwner',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Code', title: '代码', width: 30, sortable: true},
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["ProductBrandComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridProductBrand',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["ProductYearComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridProductYear',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["ProductSeasonComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridProductSeason',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["ProductSeriesComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridProductSeries',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };


    controlList["expressComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridExpress',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["warehouseComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridWarehouse',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };

    controlList["vopWarehouseComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridVopWarehouse',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["VopVendorComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridVopVendor',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };


    controlList["supplierTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridSupplierType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}


                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["supplierComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridSupplier',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["processSpeculateEnuComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridProcessSpeculateEnu',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'RowId', title: '键', width: 40, sortable: true},
                    {field: 'Name', title: '值', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };

    controlList["ProductSizeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/BusinessControl/GetComboGridProductSize',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["ProductColorComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/BusinessControl/GetComboGridProductColor',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                // var opts = $(this).combogrid('options');
                // return row[opts.textField].indexOf(q) == 0||;
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["invAdjustTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridInvAdjustType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                    //{
                    //    field: 'IsEnabled',
                    //    title: '启用',
                    //    align: 'left',
                    //    width: 40,
                    //    sortable: true,
                    //    formatter: function (value, row, index) {
                    //        if (row.IsEnabled) {
                    //            return "是";
                    //        } else {
                    //            return "否";
                    //        }
                    //    }
                    //},

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["invTakingTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridInvTakingType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                    //{
                    //    field: 'IsEnabled',
                    //    title: '启用',
                    //    align: 'left',
                    //    width: 40,
                    //    sortable: true,
                    //    formatter: function (value, row, index) {
                    //        if (row.IsEnabled) {
                    //            return "是";
                    //        } else {
                    //            return "否";
                    //        }
                    //    }
                    //},

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["invAllocateTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridInvAllocateType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                    //{
                    //    field: 'IsEnabled',
                    //    title: '启用',
                    //    align: 'left',
                    //    width: 40,
                    //    sortable: true,
                    //    formatter: function (value, row, index) {
                    //        if (row.IsEnabled) {
                    //            return "是";
                    //        } else {
                    //            return "否";
                    //        }
                    //    }
                    //},

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["purchaseInTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridPurchaseInType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                    //{
                    //    field: 'IsEnabled',
                    //    title: '启用',
                    //    align: 'left',
                    //    width: 40,
                    //    sortable: true,
                    //    formatter: function (value, row, index) {
                    //        if (row.IsEnabled) {
                    //            return "是";
                    //        } else {
                    //            return "否";
                    //        }
                    //    }
                    //},

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["purchaseInTypeComboGridJCJM"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridPurchaseInTypeJCJM',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                    //{
                    //    field: 'IsEnabled',
                    //    title: '启用',
                    //    align: 'left',
                    //    width: 40,
                    //    sortable: true,
                    //    formatter: function (value, row, index) {
                    //        if (row.IsEnabled) {
                    //            return "是";
                    //        } else {
                    //            return "否";
                    //        }
                    //    }
                    //},

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["purchaseOutTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridPurchaseOutType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                    //{
                    //    field: 'IsEnabled',
                    //    title: '启用',
                    //    align: 'left',
                    //    width: 40,
                    //    sortable: true,
                    //    formatter: function (value, row, index) {
                    //        if (row.IsEnabled) {
                    //            return "是";
                    //        } else {
                    //            return "否";
                    //        }
                    //    }
                    //},

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["enuInfoComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridEnuInfo',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["printTemplateComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridPrintTemplate',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 50, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };
    controlList["mobileMessageTemplateTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridMobileMessageTemplateType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Code", "Name"]);
                return result;
            }
        }
    };
    controlList["ProductSkuComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetSkuInfoByProduct',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Code', title: '代码', width: 40, sortable: true},
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["PayTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getPayType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["TagTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getTagType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                if(row.RowId==0) return true;
                return result;
            }
        }
    };

    controlList["platTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 150,
            url: '/BusinessControl/GetComboGridPlatType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Pinyin", "Name"]);
                return result;
            }
        }
    };
    controlList["platTypeByShopComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 150,
            url: '/BusinessControl/GetComboGridPlatTypeByShop',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Pinyin", "Name"]);
                return result;
            }
        }
    };
    controlList["ApiConfigComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 150,
            url: '/ApiConfig/getList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Pinyin", "Name"]);
                return result;
            }
        }
    };

    controlList["platOtherCostTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 150,
            url: '/BusinessControl/getPlatOtherCostTypeList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Pinyin", "Name"]);
                return result;
            }
        }
    };

    controlList["ExpressCostStandrdComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridExpressCostStandrd',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };
    controlList["CostTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getCostTypeList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };

    controlList["RefundTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getRefundTypeList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };
    controlList["PaySubjectComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getPaySubjectList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };
    controlList["LabelStatusComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getLabelStatusList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };
    controlList["AfterSellTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 140,
            url: '/BusinessControl/getAfterSellTypeList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ]
        }
    };
    controlList["RefundReasonTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getRefundReasonTypeList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ]
        }
    };
    controlList["VipBalanceAdjTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetVipBalanceAdjType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Pinyin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["TaoBaoFlagComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetTaoBaoFlag',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Code', title: '代码', width: 40, sortable: true},
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Code", "Name"]);
                return result;
            }
        }
    };
    controlList["VipCategoryComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetVipCategory',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Code", "Name"]);
                return result;
            }
        }
    };
    controlList["VipComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetVip',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Code', title: '代码', width: 40, sortable: true},
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Pinyin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["ProAddValueComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetProAddValue',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Pinyin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["warehouseMulitComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridWarehouse',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            multiple: true,
            fitColumns: true,
            selectOnCheck: true,
            columns: [
                [
                    {checkbox: true, field: 'ck'},

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ]
            /*filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }*/
        }
    };

    controlList["ShunFenExpressTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getShunFenExpressTypeList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '描述', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                //var result = LoadReturnResult(q, row, ["Code", "Name"]);
                //return result;
            }
        }
    };
    controlList["payMethodComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getPayMethodList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                //var result = LoadReturnResult(q, row, ["Code", "Name"]);
                //return result;
            }
        }
    };

    controlList["taobaoflagComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridTaobaoFlag',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Code", "Name"]);
                return result;
            }
        }
    };

    controlList["ExpressComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetExpress',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Pinyin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["orderTypeComboGrid"] = {
        type: "combogrid",
        option: {
            panelWidth: 160,
            url: '/BusinessControl/getOrderTypeList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["invoiceConfigComboGrid"] = {
        type: "combogrid",
        option: {
            panelWidth: 160,
            url: '/InvoiceConfig/getList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };
    controlList["RegionComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetRegion',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Code', title: '代码', width: 40, sortable: true},
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Pinyin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["InvoiceTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/BusinessControl/GetComboGridInvoiceType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [


                    {field: 'Name', title: '名称', align: 'left', width: 80, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Code", "Name"]);
                return result;
            }
        }
    };

    controlList["BillingTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/BusinessControl/getComboGridBillingType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 80, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Code", "Name"]);
                return result;
            }
        }
    };
    controlList["SelectWarehouseNumGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/BusinessControl/getSelectWarehouseNumList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 80, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Code", "Name"]);
                return result;
            }
        }
    };
    controlList["RegionLazyLoadComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            //url: '/BusinessControl/GetRegion',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Code', title: '代码', width: 90, sortable: true},
                    {field: 'Name', title: '名称', align: 'left', width: 90, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Pinyin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["shopLazyLoadComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            //url: '/BusinessControl/GetComboGridShop',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["PrintLazyLoadComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 220,
            //url: '/BusinessControl/GetRegion',
            idField: 'Name',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 160, sortable: true}
                ]
            ]
        }
    };

    controlList["PrintTemplateTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridPrintTemplateType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 50, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };
    controlList["SortFieldComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetSortFieldComboGrid',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 50, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };

    controlList["ProvinceComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 140,
            url: '/BusinessControl/getProvinceList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 80, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            },
            onSelect:function(){
                var elem= $("input[c8name='CityRowIdList']");
                if(elem)
                    c8refreshControl(elem);
            }
        }
    };
    controlList["ExpressTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 140,
            url: '/BusinessControl/getExpressTypeList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 80, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };

    controlList["TaoBaoRefuseReasonComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getTaoBaoRefuseReasonList',
            idField: 'RowId',
            textField: 'ReasonText',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'ReasonText', title: '名称', align: 'left', width: 80},
                    {field: 'ReasonTips', title: '名称', align: 'left', width: 80}
                ]
            ]
        }
    };

    controlList["SellerAddressComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 400,
            url: '/BusinessControl/getSellerAddressList',
            idField: 'RowId',
            textField: 'Text',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Text', title: '名称', align: 'left', width: 390}
                ]
            ]
        }
    };
    controlList["PlaneFeatureNumComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 155,
            url: '/BusinessControl/getPlaneFeatureNumList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

    controlList["allWarehouseComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetAllComboGridWarehouse',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };

    controlList["allExpressComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetAllComboGridExpress',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };

    controlList["ProductCertificatePicGroupTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetProductCertificatePicGroupType',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };

    controlList["ProductCategoryComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetProductCategoryComboGrid',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };

    
    controlList["bigRegionAllComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/BigRegion/getComboList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [{field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Name"]);
                return result;
            }
        }
    };
    controlList["CityRegionGroupAllComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 180,
            url: '/CityRegionGroup/getComboList',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [{field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["Name"]);
                return result;
            }
        }
    };

    controlList["UserStdTemplateComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 150,
            url: '/BusinessControl/GetAllUserStdTemplate',
            idField: 'UserStdTemplateId',
            textField: 'UserStdTemplatenName',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'UserStdTemplatenName', title: '模板名称', align: 'left', width: 150}
                ]
            ]
        }
    };

    controlList["shopTaobaoTmallComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridShopTaobaoTmall',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 80, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };


    controlList["ProductCertificateCategoryComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/ProductCertificateCategoryComboGrid',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [
                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };
    controlList["logicwarehouseComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridLogicWarehouse',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };

    controlList["cancilogicwarehouseComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridcanciLogicWarehouse',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };


    controlList["deliveryWarehouseComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGriddeliveryWarehouse',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };

    controlList["pdaWarehouseComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridPdaWarehouse',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };

    controlList["kwWarehouseComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridKwWarehouse',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ]
        }
    };

    controlList["CityComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/getCityListByProvinceRowIds',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };

    controlList["OtherInTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/OtherInTypeComboGrid',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };

    controlList["OtherOutTypeComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/OtherOutTypeComboGrid',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };

    controlList["CellNumberGroupComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/CellNumberGroupComboGrid',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["RowId", "Name"]);
                return result;
            }
        }
    };

    controlList["takeGoodRoadComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridTakeGoodRoad',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 40, sortable: true}
                    //{
                    //    field: 'IsEnabled',
                    //    title: '启用',
                    //    align: 'left',
                    //    width: 40,
                    //    sortable: true,
                    //    formatter: function (value, row, index) {
                    //        if (row.IsEnabled) {
                    //            return "是";
                    //        } else {
                    //            return "否";
                    //        }
                    //    }
                    //},

                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };


    controlList["typeRowIdGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/CartoonTypeController/TypeRowIdGrid',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '类型', align: 'left', width: 80, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };

   /* controlList["shopComboGrid"] = {
        type: "combogrid", option: {
            panelWidth: 160,
            url: '/BusinessControl/GetComboGridShop',
            idField: 'RowId',
            textField: 'Name',
            mode: 'local',
            fitColumns: true,
            columns: [
                [

                    {field: 'Name', title: '名称', align: 'left', width: 80, sortable: true}
                ]
            ],
            filter: function (q, row) {
                var result = LoadReturnResult(q, row, ["PinYin", "Code", "Name"]);
                return result;
            }
        }
    };*/
};

