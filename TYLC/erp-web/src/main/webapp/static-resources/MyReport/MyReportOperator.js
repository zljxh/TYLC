
//var PrintTemplateTypeRowId=${PrintTemplateTypeRowId};
//一下脚本用于动态创建swf节点
var MyReportPrintAppUrl= "/MyReport/MyReportPrintApp.swf?43232443643";

var swfVersionStr = "11.1.0";
var xiSwfUrlStr = "/MyReport/playerProductInstall.swf?43434";
var flashvars = {};
var params = {};
params.quality = "high";
//params.bgcolor = "#ffffff";//去掉背景色
params.allowscriptaccess = "sameDomain";
params.allowScriptAccess = "always";
params.allowfullscreen = "true";
var attributes = {};
attributes.id = "MyReportPrintApp";
attributes.name = "MyReportPrintApp";
attributes.align = "middle";
swfobject.embedSWF(MyReportPrintAppUrl, "flashPreview", "0px", "0px", swfVersionStr, xiSwfUrlStr, flashvars, params, attributes);

$(document).ready(function () {
    onPageLoad();
});

////////////////////////////////////////////////////////////////////////////////
//
//  MyReport打印控件接口 v1.0
//  Copyright 蔡小汉(Hunk Cai)
//  All Rights Reserved.
//
////////////////////////////////////////////////////////////////////////////////

var myReportAPI; //定义MyReport接口对象
var myReportInit = false; //定义MyReport初始化变量

//页面加载完成时调用
function onPageLoad() {
    myReportAPI = document.getElementById("MyReportPrintApp");
   // alert("MyRepot开始。");
}
/**
 * 加载完成时调用，通知外部初始化加载已完成
 * (flash to js：主动调用)
 */
function onMyReportInitialized() {
    myReportInit = true;
    myReportAPI = document.getElementById("MyReportPrintApp");
    //以下是自定义代码
   // alert("MyReport初始化。");
}

/**
 * 打印时调用，通知外部执行了打印功能
 * (flash to js：主动调用)
 */
function onMyReportPrinted() {
    //以下是自定义代码
   // alert("MyReport打印完成。");
}

/**
 * 加载报表和数据并且打印
 * (js to flash：被动调用，必须在onMyReportInitialized执行后调用)
 * @param url: 报表格式路径
 * @param paramList: 报表参数数据（多份数据），Array或者null
 * @param tableList: 报表表格数据（多份数据），Array或者null
 */
function myReportLoadAndPrint(url, paramList, tableList) {
    if(!myReportAPI)
    {
        myReportAPI = document.getElementById("MyReportPrintApp");
    }
    if (!myReportAPI || !myReportInit) {
        alert("打印控件未就绪！")
        return;
    }
    var count=tableList.length;
    var tableT = new Array();
    for (var i = 0; i<count; i++) {
        tableT.push(tableList[i]);
    }
    myReportAPI.loadAndPrint(url, paramList, tableT);
}
function myReportLoadAndPreview(url, paramList, tableList) {
    if (!myReportAPI || !myReportInit) {
        alert("打印控件未就绪！")
        return;
    }
    var count=tableList.length;
    var tableT = new Array();
    for (var i = 0; i<count; i++) {
        tableT.push(tableList[i]);
    }
    myReportAPI.loadAndPreview(url, paramList, tableT);
}
function myReportLoadAndPrintAsync2(url,dataSource) {
    if (!myReportAPI) {
        myReportAPI = document.getElementById("MyReportPrintApp");
    }
    if (!myReportAPI || !myReportInit) {
        alert("打印控件未就绪！")
        return;
    }
    if(dataSource==null) return;
    var paramList = dataSource[0]||[];
    var tableList = dataSource[1]||[];
    var urlT = new Array();
    var count = tableList.length;
    var tableT = new Array();
    for (var i = 0; i < count; i++) {
        tableT.push(getArray(tableList[i]));
        urlT.push(url);
    }
    var paramListT = new Array();
    for (var j = 0; j < paramList.length; j++) {
        paramListT.push(paramList[j]);
    }
    myReportAPI.loadAndPrintAsync2(urlT, tableT, paramListT);
}

function getArray(source)
{
    if(!source) return source;
    var array=new Array();
    for(var j=0;j<source.length;j++)
    {
        array.push(source[j]);
    }
    return array;
}