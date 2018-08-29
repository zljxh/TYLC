/**
 * Created by admin on 2014/11/2.
 */
(function ($) {
    //parameter={callback}
    $.fn.c8MultiSelectProduct = function (parameter, winmodel) {
        $(this).unbind("click");
        //$(this).parents(".easyui-dialog")
        var modeWin = new vm.Control.MultiSelectProductModel();
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        if (!parameter) {
            alert("c8MultiSelectProduct参数不存在");
        }
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.setFormValidate();
            ko.c8BindEnter($(".SearchConditions input"), function () {
                modeWin.searchClick();
            });
        });
    }
    $.fn.c8MultiSelectProductBatchInventory = function (parameter, winmodel) {
        $(this).unbind("click");
        //$(this).parents(".easyui-dialog")
        var modeWin = new vm.Control.MultiSelectProductBatchInventoryModel();
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        if (!parameter) {
            alert("c8MultiSelectProductBatchInventory参数不存在");
        }
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            //var data=parameter.getData();
            //if(!data){
            //    win.c8GetWindowContext().alert("获取参数回调方法getData未设置");
            //    return;
            //}
            //if(data.WarehouseRowId==undefined||data.WarehouseRowId==0)
            //{
            //    win.c8GetWindowContext().alert("请先选择仓库");
            //    return;
            //}
            win.c8OpenWin();
        });
    }
    $.fn.c8MultiSelectProductBatch = function (parameter, winmodel) {
        $(this).unbind("click");
        //$(this).parents(".easyui-dialog")
        var modeWin = new vm.Control.MultiSelectProductBatchModel();
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        if (!parameter) {
            alert("c8MultiSelectProductBatch参数不存在");
        }
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }
    $.fn.c8MultiSelectShop = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.MultiSelectShopModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }
    $.fn.c8MultiSelectExpress = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.MultiSelectExpressModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }
    $.fn.c8MultiSelectWarehousePositionText = function (parameter, winmodel) {
        var modeWin = new vm.Control.MultiSelectWarehousePositionModel();
        modeWin.setParameter(parameter);
        modeWin.searchClick();
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        modeWin.setWinId(win.c8GetWinId());
        var dataoptions = {
            prompt: '请输入采购订单',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                }
            }]
        };
        $(this).textbox(dataoptions);
    }
    $.fn.c8SelectPurchaseOrderText = function (parameter, winmodel) {
        var modeWin = new vm.Control.MultiSelectPurchaseOrderModel();
        modeWin.setParameter(parameter);
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        modeWin.setWinId(win.c8GetWinId());
        var dataoptions = {
            prompt: '请输入采购订单',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                }
            }]
        };
        $(this).textbox(dataoptions);
    }
    $.fn.c8SelectPurchaseOrderTextInstoraged = function (parameter, winmodel) {
        var modeWin = new vm.Control.MultiSelectPurchaseOrderModelInstoraged();
        modeWin.setParameter(parameter);
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        modeWin.setWinId(win.c8GetWinId());
        var dataoptions = {
            prompt: '请输入采购订单',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                }
            }]
        };
        $(this).textbox(dataoptions);
    }

    $.fn.c8SelectPurchaseOrderTextPreIn = function (parameter, winmodel) {
        var modeWin = new vm.Control.MultiSelectPurchaseOrderModelPreIn();
        modeWin.setParameter(parameter);
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        modeWin.setWinId(win.c8GetWinId());
        var dataoptions = {
            prompt: '请输入采购订单',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {

                    //addby banchao
                    if(parameter.searchConditions!=null && typeof parameter.searchConditions != "undefined"){
                        win.c8SetFormModel({model: parameter.searchConditions});
                    }

                    win.c8OpenWin();

                }
            }]
        };
        $(this).textbox(dataoptions);

    }

    $.fn.c8SelectSupplierText = function (parameter, winmodel) {
        var modeWin = new vm.Control.SelectSupplierTextModel();
        modeWin.setParameter(parameter);
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        var dataoptions = {
            prompt: '请输入供应商名称',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                }
            }]
        };
        modeWin.setWinId(win.c8GetWinId());
        $(this).textbox(dataoptions);
    }
    $.fn.c8SelectVopoutWarehouseText = function (parameter, winmodel) {
        var modeWin = new vm.Control.MultiSelectVopOutWarehouseModel();
        modeWin.setParameter(parameter);
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        modeWin.setWinId(win.c8GetWinId());
        var dataoptions = {
            prompt: '请输入出库单',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                }
            }]
        };
        $(this).textbox(dataoptions);
    }

    $.fn.c8SelectVopPickText = function (parameter, winmodel) {
        var modeWin = new vm.Control.SelectVopPick();
        modeWin.setParameter(parameter);
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        modeWin.setWinId(win.c8GetWinId());
        var dataoptions = {
            prompt: '请选择拣货单',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                }
            }]
        };
        $(this).textbox(dataoptions);
    }

    $.fn.c8MultiSelectOrderType = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.MultiSelectOrderTypeModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }
    $.fn.c8SelectPurchaseReturnOrderText = function (parameter) {
        var modeWin = new vm.Control.MultiSelectPurchaseReturnOrderModel();
        modeWin.setParameter(parameter);
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setWinId(win.c8GetWinId());
        var dataoptions = {
            prompt: '请输入采购退货订单',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                }
            }]
        };
        $(this).textbox(dataoptions);

    }
    $.fn.c8MultiSelectEnumInfo = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.MultiSelectOrderTypeModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }
    $.fn.c8MultiSelectWarehouse = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.MultiSelectWarehouseModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }
    $.fn.c8MultiSelectRegion = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.MultiSelectRegionModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }
    $.fn.c8SelectWarehousPosition = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectWarehousePositionModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }
    $.fn.c8SelectActiveLock = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectActiveLockModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }

    $.fn.SelectUnApprovedSellOrderClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectUnApprovedSellOrder();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }

    $.fn.SellOrderClick = function (parameter) {
        var modeWin = new vm.Control.SellOrderModel();
        modeWin.setParameter(parameter);
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setWinId(win.c8GetWinId());

        var dataOptions = {
            prompt: '请选择订单',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                    win.c8GetElementListBySelector('.easyui-textbox').each(function (i, item) {
                        $(item).textbox('textbox').keydown(function (e) {
                            if (e.keyCode == 13) {
                                modeWin.searchClick();
                            }
                        });
                    });
                }
            }]
        };
        $(this).textbox(dataOptions);

    }


    $.fn.SelectExpressClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectExpress();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }
    $.fn.SelectSupplierClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.Supplier();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }
    $.fn.SelectWarehouseClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectWarehouse();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }
    $.fn.SelectFlagClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectFlag();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }
    $.fn.SelectExpectDeliveryDate = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectExpectDeliveryDate();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            //modeWin.searchClick();
        });
    }
    $.fn.SelectEmployeeClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectEmployee();

        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }
    $.fn.SelectAccountModelClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectUnApprovedSellOrder();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }

    $.fn.c8SelectPayTypeModelClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectPayTypeModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }
    $.fn.c8SelectVipText = function (parameter) {
        var modeWin = new vm.Control.SelectVipModel();
        modeWin.setParameter(parameter);
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setWinId(win.c8GetWinId());
        var dataoptions = {
            prompt: '请选择会员',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                    ko.c8BindEnter($(".SearchConditions input"), function () {
                        modeWin.searchClick();
                    });
                }
            }]
        };
        $(this).textbox(dataoptions);

    }

    $.fn.c8SelectPicText=function (parameter) {
        var modeWin = new vm.Control.AddPic();
        modeWin.setParameter(parameter);
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setWinId(win.c8GetWinId());
        modeWin.setWin(win);

        var dataoptions = {
            prompt: '请选择会员',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                    ko.c8BindEnter($(".SearchConditions input"), function () {
                        modeWin.searchClick();
                    });
                }
            }]
        };
        $(this).textbox(dataoptions);
    }

    //add by banchao 供应商选择
    $.fn.c8SelectSupplierText = function (parameter) {
        var modeWin = new vm.Control.Supplier();
        modeWin.setParameter(parameter);
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setWinId(win.c8GetWinId());
        var dataoptions = {
            prompt: '请选择供应商',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                    ko.c8BindEnter($(".SearchConditions input"), function () {
                        modeWin.searchClick();
                    });
                }
            }]
        };
        $(this).textbox(dataoptions);

    };

    $.fn.c8SelectDistributorText = function (parameter) {
        var modeWin = new vm.Control.SelectDistributorModel();
        modeWin.setParameter(parameter);
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setWinId(win.c8GetWinId());
        var dataoptions = {
            prompt: '请选择分销商',
            iconWidth: 18, icons: [{
                iconCls: 'icon-line_edit',
                handler: function (e) {
                    win.c8OpenWin();
                    modeWin.setFormValidate();
                }
            }]
        };
        $(this).textbox(dataoptions);

    }
    $.fn.GridLayoutClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.GridLayout();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.InitData(win.c8GetWinId());
        });

    }
    $.fn.c8SelectSeparateBoxWaveModelClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectSeparateBoxWaveModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }
    $.fn.c8MultiSelectProvince = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.MultiSelectProvinceModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }
    //一单一货波次
    $.fn.c8SelectPostPrintOrderWaveModelClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectPostPrintOrderWaveModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }
    //既有一单一货波次 也有一单多货波次
    $.fn.c8SelectPostPrintOrder2WaveModelClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectPostPrintOrder2WaveModel();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            $('.default-checkbox').threeStateCheckbox();
            ko.c8BindEnter($(".SearchConditions input"), function () {
                modeWin.searchClick();
            });
            modeWin.searchClick();
        });
    }
    //展示后置打单缓存中的剩余商品   波次中剩余的所有的 or  非波次中发货单商品不够的剩余的所有的
    $.fn.c8ShowPostPrintOrder2RemainProductsClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.ShowPostPrintOrder2RemainProducts();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }
    $.fn.SelectOperatorClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectOperator();

        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.searchClick();
        });
    }

    //发票
    $.fn.c8SelectInvoiceOrderClick = function (parameter) {
        $(this).unbind("click");
        var modeWin = new vm.Control.SelectInvoiceOrder();
        var win = new c8.c8Window({url: modeWin.winUrl, isShowParent: true, model: modeWin});
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
        });
    }

    $.fn.c8MultiSelectWarehousePosition = function (parameter, winmodel) {
        $(this).unbind("click");
        //$(this).parents(".easyui-dialog")
        var modeWin = new vm.Control.MultiSelectWarehousePositionModel();
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        if (!parameter) {
            alert("c8MultiSelectProduct参数不存在");
        }
        modeWin.setParameter(parameter);
        $(this).click(function () {
            win.c8OpenWin();
            ko.c8BindEnter($(".SearchConditions input"), function () {
                modeWin.searchClick();
            });
            modeWin.setWinId(win.c8GetWinId());
        });
    }

    //单选商品
    $.fn.c8SelectProduct = function (parameter, winmodel) {
        $(this).unbind("click");
        //$(this).parents(".easyui-dialog")
        var modeWin = new vm.Control.SelectProductModel();
        parameter.windowId = parameter.windowId || winmodel.c8WindowId;
        var win = new c8.c8Window({
            url: modeWin.winUrl,
            windowId: parameter.windowId,
            isShowParent: true,
            model: modeWin
        });
        if (!parameter) {
            alert("c8SelectProduct参数不存在");
        }
        modeWin.setParameter(parameter);
        modeWin.setWinId(win.c8GetWinId());
        $(this).click(function () {
            win.c8OpenWin();
            modeWin.setFormValidate();
            ko.c8BindEnter($(".SearchConditions input"), function () {
                modeWin.searchClick();
            });
        });
    }
})(jQuery);