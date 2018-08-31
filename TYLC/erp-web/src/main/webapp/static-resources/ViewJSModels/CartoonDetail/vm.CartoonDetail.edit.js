vm.CartoonDetail = vm.CartoonDetail || {};
vm.CartoonDetail.edit = function (dataParameter) {
    this.ParentModel = null;
    this.mode = null;
    var base = this;//
    var editurl = "/CartoonDetail/edit";
    var saveDetailModelUrl = "/CartoonDetail/saveajax";
    var getUrl = "/CartoonDetail/get";
    this.modelInfo = {};


    //基本信息
    var addVip = function (data) {
        console.log(data);
        base.modelInfo = win.c8GetFormModel({model: base.modelInfo});
        base.modelInfo.Pic = data.Message;
        win.c8SetFormModel({model: base.modelInfo});

    }


    function onclickcell(index, field, value) {
        if (editIndex != index || (editIndex == 0 && index == 0)) {
            if (endEditing()) {
                if (base.productgridModel.datagrid('getData').rows[index].IsStop == true) {
                    if (base.mode != 'copy') {
                        ko.c8showMessage('warn', '已终结商品不能操作');
                        return;
                    }
                }
                base.productgridModel.datagrid('selectRow', index)
                    .datagrid('beginEdit', index);
                editIndex = index;
                editEvent(index);
                //base.productgridModel.c8BindGridEditorEvent(index, "StandardAmount=Quantity*StandardPrice");
                //base.productgridModel.c8BindGridEditorEvent(index, "SaleAmount=Quantity*SalePrice");
                //base.productgridModel.c8BindGridEditorEvent(index, "SalePrice=StandardPrice*Discount");
            } else {
                base.productgridModel.datagrid('selectRow', editIndex);
            }

        }
        var edit = base.productgridModel.datagrid('getEditor', {index: index, field: field});
        if (edit) {
            win.c8GetWindowContext().$(edit.target).numberbox("textbox").select();
            win.c8GetWindowContext().$(edit.target).numberbox("textbox").focus();
        }
    }

    //商品明细
    var editIndex = undefined;

    function endEditing() {
        if (editIndex == undefined) {
            return true
        }
        if (base.productgridModel.datagrid('validateRow', editIndex)) {
            base.productgridModel.datagrid('endEdit', editIndex);
            editIndex = undefined;
            base.updateFooter();
            return true;
        } else {
            return false;
        }
    }

    function editEvent(index) {
        var QuantityEdit = base.productgridModel.datagrid('getEditor', {index: index, field: 'Quantity'});
        //var DiscountEdit = base.productgridModel.datagrid('getEditor', {index: index, field: 'Discount'});
        var SalePriceEdit = base.productgridModel.datagrid('getEditor', {index: index, field: 'SalePrice'});
        //var SaleAmountEdit = base.productgridModel.datagrid('getEditor', {index: index, field: 'SaleAmount'});
        //
        win.c8GetWindowContext().$(QuantityEdit.target).numberbox("textbox").bind("keyup", function () {
            var row = base.productgridModel.c8GetSelected();
            var StandardPrice = 0;
            if (row) {
                StandardPrice = row['SalePrice'];
            }
            var Quantity = win.c8GetWindowContext().$(QuantityEdit.target).numberbox("textbox").val();
            var SalePrice = win.c8GetWindowContext().$(SalePriceEdit.target).numberbox("textbox").val();
            row['SaleAmount'] = $.c8help.toFloat(SalePrice * Quantity);
            // win.c8GetWindowContext().$(SaleAmountEdit.target).numberbox("setValue", parseFloat((SalePrice * Quantity).toFixed(2)));
        });
    }


    this.griddataParameter = {};
    this.griddataParameter.pageUrl = "/CartoonDetail/getCartoonDetailListByParentId";
    this.griddataParameter.FormName = "SellOrderProductEdit";
    this.griddataParameter.dataoptions = {
        remoteSort: false, onClickCell: onclickcell, idField: "RowId", showFooter: true, columns: [[

            {title: '排序', field: 'Sort', width: 100, align: 'left', editor: {type: 'textbox'}},
            {
                title: '图片', field: 'Pic', width: 200, align: 'left',
                editor: {
                    type: 'textbox'
                    , options: {
                        editable: false,
                        iconWidth: 16,
                        icons: [{
                            iconCls: 'icon-line_edit',
                            handler: function (e) {
                                addPic({
                                    callback: function (data, parameter) {
                                        win.c8GetWindowContext().$(e.data.target).textbox('setValue', data.Message);
                                        var row = base.productgridModel.datagrid("getSelected");
                                        row.Pic = data.Message;
                                    }
                                });
                            }
                        }]
                    }
                }
            },


        ]],
        onLoadSuccess: function (index, field, value) {
            base.updateFooter();
        }
    };
    this.updateFooter = function () {
        var rows = base.productgridModel.datagrid('getRows');
        var SaleAmount = 0;
        var BenefitAmount = 0;
        var Quantity = 0;
        for (var i = 0; i < rows.length; i++) {
            SaleAmount += parseFloat(rows[i].SaleAmount);
            BenefitAmount += parseInt(rows[i].BenefitAmount);
            Quantity += parseInt(rows[i].Quantity);
        }
        base.productgridModel.datagrid('reloadFooter', [
            {Quantity: Quantity, BenefitAmount: BenefitAmount, SaleAmount: SaleAmount},
        ])
    }

    function getPageCallBack(callBack) {
        endEditing();
        var result = base.gridModel.datagrid("getChanges");
        if (result.length == 0) {
            if (callBack) {
                callBack();
            }
            return;
        }

        $.customerConfirm('是否保存当前页的修改？', function () {
            base.saveDetailModel(function () {
                if (callBack) {
                    callBack();
                }
            });
        });
    }

    this.getCombineSkuList = function (RowId) {
        var resultList = null;
        ko.c8Ajax({
            type: "GET",
            url: "/ProductSku/GetCombinSkuListByParentId" + '?ParentRowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                resultList = data;
            },
            error: function (e) {
                $.customerAlert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        if (resultList != null) {
            for (var i = 0; i < resultList.length; i++) {
                resultList[i].ProductSkuRowId = resultList[i].RowId;
            }
        }
        return resultList;
    }
    this.griddataParameter.toolbar = ".tbProductDetail";
    this.productgridModel = new c8Grid(this.griddataParameter);
    this.productgridModel.getPageCallBack = getPageCallBack;
    var addProduct = function (data) {
        endEditing();
        var dataList = new Array();
        dataList.push(data);
        base.insertRowList(dataList);
        endEditing();
    }



    var fieldes = null;
    this.getFields = function () {
        if (!fieldes) {
            var fieldes = this.productgridModel.c8GetFieldArray();
            fieldes.push("ProductRowId");
            fieldes.push("ProductCode");
            fieldes.push("ProductSkuRowId");
            fieldes.push("ProductSkuCode");
        }
        return fieldes;
    }
    this.insertRowList = function (list) {
        if (list) {
            var Fields = this.getFields();
            var rows = $.c8help.c8GetArrayByKeyList(list, Fields, function (o, s) {
                o["RowId"] = s["RowId"];
                o["Title"] = s["Title"];
                o["Sort"] = s["Sort"];
                o["Cost"] = s["Cost"];
                o["Pic"] = s["Pic"];
            });
            base.productgridModel.insertRowList(rows, true);
        }
        base.updateFooter();
    }
    this.deleteWin = function () {
        if (editIndex != undefined) {
            base.productgridModel.datagrid('cancelEdit', editIndex)
            var row = base.productgridModel.c8GetSelected();
            if (row.Online) {
                $.customerAlert("平台订单明细不允许删除!");
                return;
            }
            if (row) {
                row.deleted = 1;
                base.productgridModel.datagrid('deleteRow', editIndex);
            }
        }
        base.updateFooter();
    };

    var ProductSkumodeWin = null;
    var winProductSku = null;


    function addPic(parameter) {
        if (!ProductSkumodeWin) {
            ProductSkumodeWin = new vm.Control.AddPic();
        }
        ProductSkumodeWin.setParameter(parameter);
        if (!winProductSku) {
            parameter.windowId = "ProductSku";
            parameter.singleSelect = true;
            winProductSku = new c8.c8Window({
                url: ProductSkumodeWin.winUrl,
                windowId: ProductSkumodeWin.windowId,
                isShowParent: true,
                model: ProductSkumodeWin
            });
        }
        winProductSku.c8OpenWin();
        ProductSkumodeWin.setWin(winProductSku);
        ProductSkumodeWin.setFormValidate();
    }

    function OpenWinProductSku(parameter) {
        if (!ProductSkumodeWin) {
            ProductSkumodeWin = new vm.Control.AddPic();
        }
        ProductSkumodeWin.setParameter(parameter);
        if (!winProductSku) {
            parameter.windowId = "ProductSku";
            parameter.singleSelect = true;
            winProductSku = new c8.c8Window({
                url: ProductSkumodeWin.winUrl,
                windowId: ProductSkumodeWin.windowId,
                isShowParent: true,
                model: ProductSkumodeWin
            });
        }
        winProductSku.c8OpenWin();
        ProductSkumodeWin.setFormValidate();
        var row = base.productgridModel.datagrid("getSelected");
        ProductSkumodeWin.ProductRowId = row.ProductRowId;
        ProductSkumodeWin.searchClick();
    }




//初始化
    var win = null;
    this.openWin = function () {
        loadWin();
        base.modelInfo = {};
        base.modelInfo.RowId = 0;
        base.modelInfo.ExpressFee = 0;
        base.modelInfo.BenefitAmount = 0;
        //base.modelInfo.OrderTypeRowId = -111;
        base.modelInfo.ShopRowId = null;
        base.modelInfo.OrderMakerTypeName = "手工新增";
        win.c8SetFormModel({model: base.modelInfo});
        win.openWin();
        $('#Tid').textbox('textbox').attr('readonly', false);
        base.clear();
    }

    this.clear = function () {
        base.productgridModel.pLoadData([]);
        editIndex = undefined;
    }

    this.editWin = function (rowId) {
        loadWin();
        base.modelInfo = base.getModel(rowId);
        if (base.modelInfo.InvoiceTypeRowId == "0") {
            base.modelInfo.InvoiceTypeRowId = null;
        }
        if (base.modelInfo.SpecifiedExpressRowId == "0") {
            base.modelInfo.SpecifiedExpressRowId = null;
        }

        var context = win.c8GetElementListBySelector(".mainmodel");
        win.c8SetFormModel({model: base.modelInfo, context: context});
        win.openWin();

        base.clear();


        base.productgridModel.pCustomerGetPage({SellOrderRowId: base.modelInfo.RowId});
        base.updateFooter();
    }


    var loadWin = function () {
        if (!win) {
            win = new c8.c8Window({url: editurl, isShowParent: true});
            win.c8OnComplete = function () {
            };
            win.c8BindingWin(base);
        }
    }

    this.getModel = function (RowId) {
        var result = null;
        ko.c8Ajax({
            type: "GET",
            url: getUrl + '?RowId=' + RowId + "&randomid=" + Math.random(),
            async: false,
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                result = data;
            },
            error: function (e) {
                $.customerAlert(e.responseText);
            },
            beforeSend: function () {
            },
            complete: function () {

            }
        });
        return result;
    }

    this.addDetail = function () {
        addProduct(base.getDetail());

    };

    this.getDetail = function () {
        var detail = {};
        detail.RowId = 0;
        detail.Title = "";
        detail.Sort = "";
        detail.Cost = 0;
        detail.Pic = "";
        return detail;
    };

    //保存
    this.getSaveModel = function () {
        endEditing();
        var result = base.productgridModel.datagrid("getRows");
        var DetailList = [];
        var DeleteRowIdList = [];
        for (var i = 0; i < result.length; i++) {
            var entity = result[i];
            if (entity.deleted) {
                if (entity.RowId && entity.RowId != "0") {
                    DeleteRowIdList.push(entity.RowId)
                }
            }
            else {
                DetailList.push(entity);
            }
        }
        result = base.productgridModel.datagrid("getChanges");
        for (var i = 0; i < result.length; i++) {
            var entity = result[i];
            if (entity.IsGift == 1) {
                entity.IsGift = true;
            } else {
                entity.IsGift = false;
            }
            if (entity.deleted) {
                if (entity.RowId && entity.RowId != "0") {
                    DeleteRowIdList.push(entity.RowId)
                }
            }
        }

        return {
            SellOrderDetailSet: DetailList,
            DeleteDetailIdSet: DeleteRowIdList
        };
    }


    this.saveDetailModel = function (callBack) {
        win.c8formvalidateBySelector("#fm");

        var modelResult = this.getSaveModel();
        var context = win.c8GetElementListBySelector(".mainmodel");
        modelResult.SellOrder = win.c8GetFormModel({
            model: base.modelInfo,
            context: context,
            isreturnnull: true
        });



        ko.c8Ajax({
            type: "POST",
            url: saveDetailModelUrl,
            async: true,
            data: ko.toJSON(modelResult),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                base.c8win.closeProgress();//关闭进度条
                if (!data.Result) {
                    $.customerAlert(data.Message);
                    // $.messager.alert(data.Message);
                    return;
                } else if (data.Result) {
                    ko.c8showMessage('sucess', '保存成功');
                }
                if (!base.modelInfo.RowId || base.modelInfo.RowId == 0) {
                    base.ParentModel.insertRow(data.o);
                    if (base.ParentModel.FileName == "NewSellOrder_search") base.ParentModel.searchClick();
                    else base.ParentModel.gridPaginationModel.pSearch();
                }
                else {
                    base.ParentModel.updateRow(data.o, undefined, true);
                }
                if (callBack && $.isFunction(callBack)) {
                    callBack()
                }
                else {
                    base.c8win.closeWin();
                }
            },
            error: function (e) {
                base.c8win.closeProgress();	// 如果提交成功则隐藏进度条
                $.customerAlert(e.responseText);
            },
            beforeSend: function () {
                base.c8win.openProgress();
                var isValid = base.c8win.validate(); //contextWin.$("#fm").form('validate');
                if (!isValid) {
                    base.c8win.closeProgress();	// 如果表单是无效的则隐藏进度条
                }
                return isValid;
            },
            complete: function () {

            }
        });
    }

    this.automaticBenefit = function () {
        endEditing();
        var result = base.productgridModel.datagrid("getRows");
        var productAmount = 0;
        for (var i = 0; i < result.length; i++) {
            var entity = result[i];
            if (!entity.deleted) {
                productAmount = productAmount + parseFloat(entity.SaleAmount);
                if (entity.BenefitAmount != "")
                    productAmount = productAmount - parseFloat(entity.BenefitAmount);
            }
        }
        var payAmount = 0;
        var payResult = base.paygridModel.datagrid("getRows");
        for (var i = 0; i < payResult.length; i++) {
            var entity = payResult[i];
            if (!entity.deleted) {
                payAmount = payAmount + parseFloat(entity.Amount);
            }
        }
        var sellOrder = win.c8GetFormModel({
            model: base.modelInfo,
            context: win.c8GetElementListBySelector(".mainmodel")
        });
        var ExpressFee = 0;
        if (sellOrder.ExpressFee != "")
            ExpressFee = parseFloat(sellOrder.ExpressFee);

        var BenefitAmount = parseFloat((parseFloat(productAmount.toFixed(2)) - payAmount + ExpressFee).toFixed(2));
        sellOrder.BenefitAmount = BenefitAmount;
        win.c8SetFormModel({model: sellOrder});

    }

    this.c8SelectAddPicTextOption = {callback: addVip};



};

