window.onerror=window_onerror;
function window_onerror(a,b,c,d,e) {
    var  win=ko.c8GetParentWindow();
    if(win.getLoginState()==1){return;}
    if (e) {
        var errorMsg = e.name + e.message + e.stack;
        if(!errorMsg)
        {
            errorMsg= e.statusText+ e.responseText+e.responseText;
        }
        alert(errorMsg);
    }
    else {
        alert(a + b);
    }
}