<%@ page import="com.ty.erp.web.spring.ControllerContext" %>
<div class="easyui-dialog"
     data-options="iconCls:'fa fa-pencil-square-o',resizable:true,collapsible:false,minimizable:false,modal:true,title:'编辑明细'"
     style="width:1070px;height:525px;"
     closed="true" buttons="#dlg-buttons">
    <div id="cc" class="easyui-layout" data-options="fit:true,border:false">
        <div data-options="region:'center',border:false,split:true">
            <div class="easyui-tabs" data-options="fit:true,border:false,plain:true">
                <div title="基本信息" style="padding: 2px;width: 830px;">
                    <form id="fm" class="winedit c8myform mainmodel" method="post" novalidate>
                        <input c8name="RowId" type="hidden">
                        <div class="fitem">
                            <label>标题:</label>
                            <input c8name="Title" id="Title" style="width:160px" class="easyui-textbox" required="true">
                        </div>

                        <div class="fitem">
                            <label>作者:</label>
                            <input c8name="Author" style="width:160px" data-options="min:0,precision:2" required="true"
                                   class="easyui-textbox">
                        </div>

                        <div class="fitem">
                            <label>类型:</label>
                            <input c8name="TypeRowId" required="true"
                                   c8data-option="multiple:true"
                                   c8ControlName="typeRowIdGrid"
                                   style="width:160px"
                                   data-options="editable:false"/>

                        </div>

                        <div class="fitem">
                            <label>图片:</label>
                            <input c8name="Pic" class="easyui-textbox" style="width:160px"
                                   c8data-bind="c8SelectPicText:c8SelectAddPicTextOption" required="true"
                                   data-options="editable:true">
                        </div>

                        <div class="fitem">
                            <label>访问量:</label>
                            <input c8name="VisitCount" style="width:160px" data-options="min:0,precision:2" required="true"
                                   class="easyui-textbox">
                        </div>

                        <div class="fitem">
                            <label>性别:</label>
                            <select class="c8Select2" c8name="Sex">
                                <option value="1" >男</option>
                                <option value="2">女</option>
                                <option value="3" selected>不限</option>
                            </select>
                        </div>


                        <div class="fitem">
                            <label>描述:</label>
                            <input c8name="Des" data-options="multiline:true" class="easyui-textbox" required="true"
                                   style="height: 100px;width: 450px;">
                        </div>

                    </form>
                </div>
                <div title="明细" style="padding: 2px;">
                    <div class="tbProductDetail" style="padding:5px;height:auto">
                        <div style="margin-bottom:5px" c8hide="true">
                            <span style="color:black;">商品明细</span>
                            <a href="javascript:void(0)" c8hide="true" class="easyui-linkbutton" iconcls="fa fa-plus"
                               plain="true" c8data-bind="click:addDetail">新增</a>
                            <a href="javascript:void(0)" c8hide="true" class="easyui-linkbutton" iconcls="fa fa-trash-o"
                               plain="true" c8data-bind="click:deleteWin">删除明细</a>
                        </div>
                    </div>
                    <div style="height:390px;">
                        <table fit="true" id="productDis" data-options="border:true" c8data-bind="c8Grid:productgridModel" style="height:100px;"></table>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>

<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" c8hide="true" iconcls="fa fa-floppy-o"
       c8data-bind="click:saveDetailModel">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-times" c8data-bind="click:closeDialog">取消</a>
</div>


