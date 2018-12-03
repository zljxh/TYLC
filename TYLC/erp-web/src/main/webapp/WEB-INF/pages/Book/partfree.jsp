<div class="easyui-dialog" data-options="iconCls:'fa fa-pencil-square-o',resizable:true,modal:true,title:'更改出库发货时间'"
     style="width:400px;height:180px;padding:10px 20px"
     closed="true" buttons="#dlg-buttons">
    <form id="fm" class="winedit c8myform mainmodel" method="post" novalidate>
        <div class="fitem">
            <label>前几免费:</label>
            <input c8name="part" id="Title" style="width:160px" class="easyui-textbox" required="true">

        </div>
    </form>
</div>

<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-floppy-o" c8data-bind="click:setpartFree">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-times" c8data-bind="click:closeDialog">取消</a>
</div>

