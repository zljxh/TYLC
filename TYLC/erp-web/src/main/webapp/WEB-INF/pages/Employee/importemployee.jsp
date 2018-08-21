<%--
  Created by IntelliJ IDEA.
  User: xyyz150
  Date: 2015/1/9
  Time: 14:53
  To change this template use File | Settings | File Templates.
--%>
<div class="easyui-dialog" title="导入员工" data-options="iconCls:'fa fa-pencil-square-o',resizable:true,modal:true" style="width:500px;"
     closed="true" buttons="#dlg-buteeetons">
  <form id="fm" class="winedit c8myform"  method="post"  novalidate>
    <div class="fitem">
      员工信息：
      <%--<input class="easyui-filebox" data-options="buttonText:'选择文件',buttonAlign:'left'"  style="width:300px" name="EmployeeFile" id="EmployeeFile">--%>
      <input type="file" style="width:300px" c8name="EmployeeFile" name="EmployeeFile">
      <a href="/Employee/downEmployee" class="easyui-linkbutton" iconcls="fa fa-arrow-circle-o-down" plain="true">导入模板下载</a>
    </div>

  </form>
</div>
<div id="dlg-buteeetons">
  <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-floppy-o" c8data-bind="click:saveimport">保存</a>
  <a href="javascript:void(0)" class="easyui-linkbutton" iconcls="fa fa-times" c8data-bind="click:closeimport">取消</a>
</div>
