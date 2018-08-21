<div class="easyui-dialog" data-options="iconCls:'fa fa-pencil-square-o',resizable:true"
     style="width:425px;height:425px;padding:10px 20px"
     closed="true" buttons="#dlg-buttons">
    <form id="fm" class="winedit c8myform" method="post" novalidate>
        <div class="fitem">
            <label>部门代码:</label>
            <input c8name="Code" class="easyui-textbox">
        </div>
        <div class="fitem">
            <label>部门名称:</label>
            <input c8name="RowId" type="hidden" class="cRemoteValue">
            <input c8name="Name" validtype=""
                   class="easyui-textbox easyui-validatebox"
                   data-options="validType:['cRemote[\'/Department/NotEXISTSName\',\'Name\',\'.cRemoteValue\']','length[1,20]']"
                   required="true">
        </div>
        <div class="fitem">
            <label>公司名称:</label>
            <%--<input c8name="CompanyRowId" c8ControlName="companyComboGrid" required="true" data-options="editable:false">--%>
            <select c8name="CompanyRowId" c8ControlName="companyComboGrid" required="required"></select>
        </div>
        <div class="fitem">
            <label>部门负责人:</label>
            <input c8name="Leader" class="easyui-textbox easyui-validatebox" data-options="validType:['length[0,20]']"
                   validtype="">
        </div>
        <div class="fitem">
            <label>显示顺序:</label>
            <input c8name="DisplayNum" class="easyui-numberspinner">
        </div>
        <div class="fitem">
            <label>备注:</label>
            <input c8name="Remark" data-options="multiline:true" style="height:100px" class="easyui-textbox">
        </div>
    </form>

</div>
<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-floppy-o" c8data-bind="click:saveModel">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-times" c8data-bind="click:closeDialog">取消</a>
</div>