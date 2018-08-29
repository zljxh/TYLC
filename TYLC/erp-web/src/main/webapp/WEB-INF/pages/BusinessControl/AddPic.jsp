<div class="easyui-dialog" data-options="iconCls:'fa fa-pencil-square-o',resizable:true,modal:true,title:'批量导入旗帜'"
     closed="true" style="width:500px;height: 300px;" buttons="#dlg-buttons">
    <form id="fm" class="winedit c8myform" method="post" novalidate>
        <div class="fitem" id="file">
            <label style="width: 110px;">选择导入文件:</label>
            <input type="file" style="width:300px" c8name="ImportExcelFile" name="ImportExcelFile" id="ImportExcelFile">
        </div>
    </form>

</div>

<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-floppy-o" c8data-bind="click:importproductData">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-times" c8data-bind="click:closeDialog">取消</a>
</div>

