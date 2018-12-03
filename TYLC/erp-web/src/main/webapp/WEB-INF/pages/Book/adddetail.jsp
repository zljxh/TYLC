<%@ page import="com.ty.erp.web.spring.ControllerContext" %>
<div class="easyui-dialog"
     data-options="iconCls:'fa fa-pencil-square-o',resizable:true,collapsible:false,minimizable:false,modal:true,title:'编辑明细'"
     style="width:770px;height:525px;"
     closed="true" buttons="#dlg-buttons">
    <div id="cc" class="easyui-layout" data-options="fit:true,border:false">
        <div data-options="region:'center',border:false,split:true">

                    <form id="fm" class="winedit c8myform mainmodel" method="post" novalidate>
                        <input c8name="RowId" type="hidden">
                        <input c8name="BookRowId" type="hidden">
                        <div class="fitem">
                            <label>标题:</label>
                            <input c8name="Title" id="Title" style="width:160px" class="easyui-textbox" required="true">
                        </div>

                        <div class="fitem">
                            <label>排序:</label>
                            <input c8name="Sort" style="width:100px" data-options="min:0,precision:2" required="true"
                                   class="easyui-textbox">
                        </div>

                        <div class="fitem">
                            <label>单价:</label>
                            <input c8name="Cost" style="width:100px" data-options="min:0,precision:2" required="true"
                                   class="easyui-textbox">
                        </div>


                        <div class="fitem">
                            <label>内容:</label>
                            <input c8name="Content" data-options="multiline:true" class="easyui-textbox" required="true"
                                   style="height: 400px;width: 550px;">
                        </div>

                    </form>
        </div>
    </div>
</div>

<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" c8hide="true" iconcls="fa fa-floppy-o"
       c8data-bind="click:saveDetailModel">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-times" c8data-bind="click:closeDialog">取消</a>
</div>


