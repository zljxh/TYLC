<div class="easyui-dialog" data-options="iconCls:'fa fa-pencil-square-o',resizable:true,modal:true"
     closed="true" buttons="#dlg-buttons">
    <form id="fm" c8columns="2" class=" c8myform winedit" method="post" novalidate>
        <div class="fitem">
            <label>员工编号:</label>
            <input c8name="RowId" type="hidden" value='0' class="cRemoteValue">
            <input c8name="Code" id="f_Code" required="true"
                   class="easyui-textbox easyui-validatebox" data-options="validType:['length[1,50]','cRemote[\'/Employee/NotEXISTSCode\',\'Code\',\'.cRemoteValue\']']" validType="" />
        </div>
        <div class="fitem">
            <label>员工名称:</label>
            <input c8name="Name" required="true" id="f_Name" class="easyui-textbox easyui-validatebox" data-options="validType:['length[1,20]']" validType="">
        </div>
        <div class="fitem">
            <label>性别:</label>
            <select class="c8Select2" c8name="Sex" editable="false">
                <option value="1" selected>男</option>
                <option value="0">女</option>
            </select>
        </div>

        <div class="fitem">
            <label>部门名称:</label>
            <select c8name="DepartmentRowId" id="DepartmentRowId"
            c8ControlName="departmentComboGrid" required="required"></select>
            <%--<input class="easyui-combogrid" id="DepartmentRowId" c8ControlName="departmentComboGrid"--%>
                   <%--c8name="DepartmentRowId" data-options="required:true"  editable="false">--%>
        </div>

        <div class="fitem">
            <label>上级主管:</label>
            <input c8name="Leader" class="easyui-textbox easyui-validatebox" data-options="validType:['length[0,20]']"/>
        </div>

        <div class="fitem">
            <label>角色:</label>
            <select c8name="RoleRowId" c8ControlName="roleComboGrid" required="required"></select>
            <%--<input c8name="RoleRowId" c8ControlName="roleComboGrid"   required="true" editable="false">--%>
        </div>

        <div class="fitem">
            <label>供应商权限:</label>
            <input id="SupplierName" c8name="SupplierName" class="easyui-textbox" style="width:180px"
                   c8data-bind="c8SelectSupplierText:c8SelectVipTextOption" >
            <input c8name="SupplierRowId" type="hidden">
        </div>

        <div class="fitem">
            <label>入职时间:</label>
            <input c8name="EmployeDate" class="easyui-datetimebox" data-options="required:true"
                   data-options="editable:false">
        </div>
        <div class="fitem">
            <label>是否离职:</label>
            <select class="c8Select2" c8name="IsleaveOffice">
                <option value=true>是</option>
                <option value=false selected>否</option>
            </select>
        </div>

        <div class="fitem">
            <label>手机:</label>
            <input c8name="Mobile" class="easyui-textbox c8form easyui-validatebox" data-options="validType:['length[0,15]']">
        </div>

        <div class="fitem">
            <label>座机:</label>
            <input c8name="Phone" class="easyui-textbox c8form easyui-validatebox" data-options="validType:['length[0,15]']">
        </div>
        <div class="fitem">
            <label>备注:</label>
            <input c8name="Remark" data-options="multiline:true" style="height:30px; width:450px;"
                   class="easyui-textbox">
        </div>
    </form>

</div>
<div id="dlg-buttons">
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-floppy-o"
       c8data-bind="click:saveOperatorAddModel">保存</a>
    <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-times"
       c8data-bind="click:closeAddDialog">取消</a>
</div>