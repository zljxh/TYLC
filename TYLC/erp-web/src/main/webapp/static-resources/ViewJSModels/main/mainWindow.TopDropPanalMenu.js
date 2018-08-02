mainWindow.TopDropPanalMenu=function(){
    var panalMenuModel= new mainWindow.PanalMenu();//.getMenuList(dataSource);
    var topMenuModel= new mainWindow.TopMenu();
var createTopMenu=function(itemObject) {
    var menuitem = '<a  href="#" class="easyui-menubutton" data-options="menu:\'#menuChildren'+itemObject.id+'\',iconCls:\'' + itemObject.iconCls + '\'">' + itemObject.text + '</a>';
    return menuitem;
}
var createMenuChildren=function(itemObject) {
    var itemList = '<div id="menuChildren'+itemObject.id+'"  class="menu-content" >';
    itemList+=  panalMenuModel.getMenuList(itemObject.children);
    itemList += "</div>";
    return itemList;
}
this.getMenuList=function(dataSource) {
    var topMenuList = '';
    var MenuChildList = "";
    for (var i in dataSource) {
        var ds = dataSource[i];
        topMenuList += createTopMenu(ds);
        if(ds.o.DropdownType==0)
        {
            MenuChildList +=topMenuModel.getMenuChildren(ds);
        }
        else {
            MenuChildList += createMenuChildren(ds);
        }
    }
    topMenuList = topMenuList + " <div>" + MenuChildList + "</div>";
    return topMenuList;
}
};
