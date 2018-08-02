mainWindow.TopMenu=function(){
var createTopMenu=function(itemObject) {
    var menuitem = '<a id="btn-edit" href="#" class="easyui-menubutton" data-options="menu:\'#menuChildren'+itemObject.id+'\',iconCls:\'' + itemObject.iconCls + '\'">' + itemObject.text + '</a>';
    return menuitem;
}
var createMenuChildren=function(itemObject) {
    var itemList = '<div id="menuChildren'+itemObject.id+'"  style="width:150px;">';
    for (var i in itemObject.children) {
        itemList += createMenuItemChildren(itemObject.children[i]);
    }
    itemList += "</div>";
    return itemList;
}
var createMenuItemChildren=function(itemObject) {
    var item = '<div data-options="iconCls:\'' + itemObject.iconCls + '\'">';
    if (!itemObject.children || itemObject.children.length == 0) {
        return '<div c8Url="'+itemObject.o.PathName+'" data-options="iconCls:\'' + itemObject.iconCls + '\'">' + itemObject.text + '</div>'
    }
    var item = item + '<span>' + itemObject.text + '</span><div>';

    for (var i in itemObject.children) {
        item += createMenuItemChildren(itemObject.children[i]);
    }
    item += '</div></div>';
    return item;
}
    this.getMenuChildren=function(item)
    {
        return createMenuChildren(item);
    }
this.getMenuList=function(dataSource) {
    var topMenuList = '';
    var MenuChildList = "";
    for (var i in dataSource) {
        var ds = dataSource[i];
        topMenuList += createTopMenu(ds);
        MenuChildList += createMenuChildren(ds);
    }
    topMenuList = topMenuList + " <div>" + MenuChildList + "</div>";
    return topMenuList;
}
};
