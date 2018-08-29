com = com || {};
com.select2 = com.select2 || {};
com.select2.control = function () {
    var controlList = {};
    this.c8refreshControl = function (elem) {
        var parameter = controlList[$(elem).attr("c8ControlName")];
        var parameterclone = $().c8help.c8CloneObject(parameter);
        if (parameterclone) {
            $(elem).attr("class", $(elem).attr("class") + " c8" + parameterclone.type);
            var parameterDataStr = $(elem).attr("c8Data");
            var parameterclone = $().c8help.c8CloneObject(parameter);
            if (parameterclone) {
                $(elem).attr("class", $(elem).attr("class") + " c8" + parameterclone.type);
                var parameterDataStr = $(elem).attr("c8Data");
                if (parameterDataStr) {
                    var dataObject = $().c8help.c8ParseAttrStrToObject(parameterDataStr);
                    var urlParameter = $().c8help.c8ToUrlparameter(dataObject)
                    parameterclone.option.ajax.url = parameterclone.option.ajax.url + "?" + urlParameter;
                }
                $.ajax({
                    type: "Get",
                    url: parameterclone.option.ajax.url,
                    async: false,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        var retData = parameterclone.option.ajax.processResults(data);
                        delete parameterclone.option.ajax;
                        parameterclone.option.data = retData;
                        $(elem)[parameterclone.type](parameterclone.option);

                        var $item = $(elem);
                        var selection = $item.next().find('.select2-selection');
                        if ("required" == $item.attr("required")) {
                            $item.on("select2:close", function (e) {
                                if (null == $(this).val()) {
                                    selection.addClass('select2-error');
                                } else {
                                    selection.removeClass('select2-error');
                                }
                            });
                        }
                    }
                })
            }


        }
        ;
    }
    this.loadControl = function (context) {
        var list = null;
        if (context) {
            list = $("select[c8ControlName]", context);
        }
        else {
            list = $("select[c8ControlName]");
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
                if (parameterDataStr) {
                    var dataObject = $().c8help.c8ParseAttrStrToObject(parameterDataStr);
                    var urlParameter = $().c8help.c8ToUrlparameter(dataObject)
                    parameterclone.option.ajax.url = parameterclone.option.ajax.url + "?" + urlParameter;
                }
                $.ajax({
                    type: "Get",
                    url: parameterclone.option.ajax.url,
                    async: false,
                    dataType: "json",
                    contentType: "application/json",
                    success: function (data) {
                        var retData = parameterclone.option.ajax.processResults(data);
                        delete parameterclone.option.ajax;
                        parameterclone.option.data = retData;
                        $(elem)[parameterclone.type](parameterclone.option);
                    }
                })

                //$(elem)[parameterclone.type]("panel").panel("options").comboTarget = elem;//解决combo类型控件回车报错的问题
            }
            else {
                alert($(elem).prop("outerHTML") + "未配置控件");
            }
        }

        var staticList;
        if (context) {
            staticList = $(".c8Select2", context);
        }
        else {
            staticList = $(".c8Select2");
        }
        staticList.select2({minimumResultsForSearch: Infinity});

        //添加验证
        $.each(list, function (i, item) {
            var $item = $(item);
            var selection = $item.next().find('.select2-selection');
            if ("required" == $item.attr("required")) {
                $item.on("select2:close", function (e) {
                    if (null == $(this).val()) {
                        selection.addClass('select2-error');
                    } else {
                        selection.removeClass('select2-error');
                    }
                });
            }
        });
        $.each(staticList, function (i, item) {
            var $item = $(item);
            var selection = $item.next().find('.select2-selection');
            if ("required" == $item.attr("required")) {
                $item.on("select2:close", function (e) {
                    if (null == $(this).val()) {
                        selection.addClass('select2-error');
                    } else {
                        selection.removeClass('select2-error');
                    }
                });
            }
        });
    }

    controlList["companyComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',//提示信息
            allowClear: true,//运行清空
            tags: "true",//多选使用，单选不使用
            // maximumSelectionLength: 3,//多选使用，最多可选择的项数
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridCompany',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };

    controlList["shopComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            // maximumSelectionLength: 3,
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridShop',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };

    controlList["departmentComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridDepartment',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };

    controlList["roleComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridRole',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["supplierComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: 1,//过滤框
            ajax: {
                url: '/BusinessControl/getSupplierList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["warehouseComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridWarehouse',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["TaoBaoFlagComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetTaoBaoFlag',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["expressComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetExpress',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ImportTemplateTypeComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getImportTemplateTypeList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["supplierTypeComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridSupplierType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["MobileMessageTemplateTypeComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridMobileMessageTemplateType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name, FixedVariable: data[i].FixedVariable});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["platTypeComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridPlatType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["shopNatureEnuComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridShopNatureEnu',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["employeeComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getemployeeList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["exceptionTypeComboGrid"] = {
        type: "select2", option: {
            placeholder: '请选择',
            allowClear: true,
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboExceptionTypeForSellOrder',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["enuInfoComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridEnuInfo',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["warehouseTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridWarehouseType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["printTemplateComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridPrintTemplate',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["Select2ApiConfigComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/ApiConfig/getList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ExpressTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getExpressTypeList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        data[i].id = data[i].RowId;
                        data[i].text = data[i].Name;
                        ret.push(data[i]);
                    }
                    return ret;
                }
            }
        }
    };
    controlList["PlaneFeatureNumComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getPlaneFeatureNumList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["bigRegionComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BigRegion/getList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["platTypeByShopComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridPlatTypeByShop',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["orderTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getOrderTypeList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProvinceComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getProvinceList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductOwnerComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridProductOwner',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["select2ApiConfigComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/ApiConfig/getList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["PrintTemplateTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridPrintTemplateType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["UserStdTemplateComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetAllUserStdTemplate',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].UserStdTemplateId, text: data[i].UserStdTemplatenName});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["PlaneFeatureNumComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getPlaneFeatureNumList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ShunFenExpressTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getShunFenExpressTypeList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["payMethodComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getPayMethodList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductCertificatePicGroupTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetProductCertificatePicGroupType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductUnitComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            minimumResultsForSearch: 1,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridProductUnit',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductBrandComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridProductBrand',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductYearComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            minimumResultsForSearch: 1,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridProductYear',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductSeasonComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            minimumResultsForSearch: 1,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridProductSeason',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["SupplierComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridSupplier',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductSeriesComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            minimumResultsForSearch: 1,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridProductSeries',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["purchaseInTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridPurchaseInType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["purchaseOutTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridPurchaseOutType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["purchaseInTypeComboGridJCJM"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridPurchaseInTypeJCJM',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["AfterSellTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getAfterSellTypeList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["shopLazyLoadComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridShop',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["TagTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getTagType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["allWarehouseComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetAllComboGridWarehouse',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["allExpressComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetAllComboGridExpress',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["bigRegionAllComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BigRegion/getComboList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["CityRegionGroupAllComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/CityRegionGroup/getComboList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["RefundReasonTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getRefundReasonTypeList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["LabelStatusComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getLabelStatusList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["CostTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getCostTypeList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["PayTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getPayType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["RefundTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getRefundTypeList',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["invAdjustTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridInvAdjustType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["invAllocateTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridInvAllocateType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["vipLevelComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridVipLevel',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["VipCategoryComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetVipCategory',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductCategoryComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetProductCategoryComboGrid',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductColorComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: 1,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridProductColor',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductSizeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: 1,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridProductSize',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["ProductDepartmentComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: 1,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridProductDepartment',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    //支付方式
    controlList["PayTypeComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: 1,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/getPayType',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };

    controlList["deliveryWarehouseComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGriddeliveryWarehouse',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };

    controlList["pdaWarehouseComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/GetComboGridPdaWarehouse',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };
    controlList["VoiceComboGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/BusinessControl/VoiceComboGrid',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].PathSrc, text: data[i].PathName});
                    }
                    return ret;
                }
            }
        }
    };


    controlList["typeRowIdGrid"] = {
        type: "select2", option: {
            allowClear: true,
            placeholder: '请选择',
            //tags: "true",
            minimumResultsForSearch: Infinity,//隐藏过滤框
            ajax: {
                url: '/CartoonTypeController/TypeRowIdGrid',
                processResults: function (data) {
                    var ret = [];
                    for (var i = 0; i < data.length; i++) {
                        ret.push({id: data[i].RowId, text: data[i].Name});
                    }
                    return ret;
                }
            }
        }
    };

};

