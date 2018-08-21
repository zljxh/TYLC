<div class="easyui-dialog" data-options="iconCls:'fa fa-pencil-square-o',resizable:true,modal:true"
     closed="true" buttons="#dlg-buttons">
    <form id="fm" c8columns="1" class="winedit c8myform" method="post" novalidate>
        <%--<div class="fitem">
            <label>角色代码:</label>
            <input c8name="RowId"  type="hidden" class="cRemoteValue">
            <input c8name="Code" validType="cRemote['/Role/NotEXISTSCode','Code','.cRemoteValue']" class="easyui-textbox" required="true">
        </div>--%>
        <div class="fitem">
            <label>角色名称:</label>
            <input c8name="Name" validtype="" class="easyui-textbox easyui-validatebox" data-options="validType:['length[1,20]','cRemote[\'/Role/NotEXISTSName\',\'Name\',\'.cRemoteValue\']']" required="true">
            <input c8name="RowId"  type="hidden" class="cRemoteValue">
        </div>
        <div class="fitem">
            <label>显示顺序:</label>
            <input c8name="DisplayNum" value="0" class="easyui-numberspinner" >
        </div>
        <div class="fitem">
            <label>备注:</label>
            <input c8name="Remark" data-options="multiline:true" style="height:100px" class="easyui-textbox" >
        </div>

    </form>

</div>

<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-floppy-o" c8data-bind="click:saveModel">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-times" c8data-bind="click:closeDialog">取消</a>
</div>

