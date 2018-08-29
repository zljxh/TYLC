<div class="easyui-dialog" data-options="iconCls:'fa fa-pencil-square-o',resizable:true,modal:true" style="width:425px;height:425px;padding:10px 20px"
     closed="true" buttons="#dlg-buttons">
    <form id="fm" class="winedit c8myform" method="post" novalidate>

                <div class="fitem">
                    <label>年度名称:</label>
                    <input c8name="RowId"  type="hidden" class="cRemoteValue">
                    <input c8name="Name" validtype="cRemote['/CartoonType/NotEXISTSName','Name','.cRemoteValue']" class="easyui-textbox" required="true">
                </div>

    </form>

</div>

<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-floppy-o" c8data-bind="click:saveModel">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-times" c8data-bind="click:closeDialog">取消</a>
</div>

