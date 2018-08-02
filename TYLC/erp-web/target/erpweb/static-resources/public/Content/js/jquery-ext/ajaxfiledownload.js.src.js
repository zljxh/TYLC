/**
 * Created by xyyz150 on 2015/5/4.
 */
jQuery.extend({
    createDownloadForm:function(url,data,method){
        var formId = "downloadform"+new Date().getTime();
        var form = jQuery('<form  action="'+url+'"  method="'+(method || 'post') + '" name="' + formId + '" id="' + formId + '" ></form>');
        if (data) {
            for (var i in data) {
                jQuery('<input type="hidden" name="' + i + '" value=\'' + data[i].replace(/\'/g,"\"") + '\' />').appendTo(form);
            }
        }
        jQuery(form).css('position', 'absolute');
        jQuery(form).css('top', '-1200px');
        jQuery(form).css('left', '-1200px');
        jQuery(form).appendTo('body');
        return form;
    },
    ajaxFileDownload:function(s){
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var form =jQuery.createDownloadForm(s.url, s.data, s.method);
        jQuery(form).submit().remove();
    }
});
