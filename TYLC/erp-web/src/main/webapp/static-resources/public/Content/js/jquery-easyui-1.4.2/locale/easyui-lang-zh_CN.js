$.fn.pagination&&($.fn.pagination.defaults.beforePageText="第",$.fn.pagination.defaults.afterPageText="共{pages}页",$.fn.pagination.defaults.displayMsg="显示{from}到{to},共{total}记录"),$.fn.datagrid&&($.fn.datagrid.defaults.loadMsg="正在处理，请稍待。。。"),$.fn.treegrid&&$.fn.datagrid&&($.fn.treegrid.defaults.loadMsg=$.fn.datagrid.defaults.loadMsg),$.messager&&($.messager.defaults.ok="确定",$.messager.defaults.cancel="取消"),$.map(["validatebox","textbox","filebox","searchbox","combo","combobox","combogrid","combotree","datebox","datetimebox","numberbox","spinner","numberspinner","timespinner","datetimespinner"],function(e){$.fn[e]&&($.fn[e].defaults.missingMessage="该输入项为必输项")}),$.fn.validatebox&&($.fn.validatebox.defaults.rules.email.message="请输入有效的电子邮件地址",$.fn.validatebox.defaults.rules.url.message="请输入有效的URL地址",$.fn.validatebox.defaults.rules.length.message="输入内容长度必须介于{0}和{1}之间",$.fn.validatebox.defaults.rules.remote.message="请修正该字段"),$.fn.calendar&&($.fn.calendar.defaults.weeks=["日","一","二","三","四","五","六"],$.fn.calendar.defaults.months=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]),$.fn.datebox&&($.fn.datebox.defaults.currentText="今天",$.fn.datebox.defaults.closeText="关闭",$.fn.datebox.defaults.okText="确定",$.fn.datebox.defaults.formatter=function(e){var a=e.getFullYear(),t=e.getMonth()+1,n=e.getDate();return a+"-"+(t<10?"0"+t:t)+"-"+(n<10?"0"+n:n)},$.fn.datebox.defaults.parser=function(e){if(!e)return new Date;var a=e.split("-"),t=parseInt(a[0],10),n=parseInt(a[1],10),s=parseInt(a[2],10);return isNaN(t)||isNaN(n)||isNaN(s)?new Date:new Date(t,n-1,s)}),$.fn.datetimebox&&$.fn.datebox&&$.extend($.fn.datetimebox.defaults,{currentText:$.fn.datebox.defaults.currentText,closeText:$.fn.datebox.defaults.closeText,okText:$.fn.datebox.defaults.okText}),$.fn.datetimespinner&&($.fn.datetimespinner.defaults.selections=[[0,4],[5,7],[8,10],[11,13],[14,16],[17,19]]);
//# sourceMappingURL=easyui-lang-zh_CN.js.map