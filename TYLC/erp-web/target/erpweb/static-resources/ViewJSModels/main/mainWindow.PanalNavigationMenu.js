mainWindow.PanalNavigationMenu=function() {
    var createMenuChildren = function (itemObject) {
        var itemList = '<div class="menu-panal-item"  >';
        itemList += '<div ><h4>' + itemObject.text + '</h4></div>';
        itemList += '<div ><ul>';
        for (var i in itemObject.children) {
            itemList += createMenuItemChildren(itemObject.children[i]);
        }
        itemList += "</div></ul></div>";
        return itemList;
    }
    var createMenuItemChildren = function (itemObject) {
        var item = '<li> <a href="#"  c8Url="'+itemObject.o.PathName+'"> ' + itemObject.text + '</a></li>';
        return item;
    }
    this.getMenuList = function (dataSource) {
        var MenuChildList = '<div class="menu-panal" >';
        for (var i in dataSource) {
            var ds = dataSource[i];
            MenuChildList += createMenuChildren(ds);
        }
        return MenuChildList+'</div>';
    }
};
