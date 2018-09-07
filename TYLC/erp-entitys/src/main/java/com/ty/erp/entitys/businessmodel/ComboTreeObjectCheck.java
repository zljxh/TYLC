package com.ty.erp.entitys.businessmodel;

import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2014/10/21.
 */
public class ComboTreeObjectCheck {
    public List<ComboTreeObjectCheck> getchildren() {
        return children;
    }

    public void setchildren(List<ComboTreeObjectCheck> children) {
        this.children = children;
    }

    public Object getid() {
        return id;
    }

    public void setid(Object id) {
        this.id = id;
    }

    public Object getchecked() {
        return checked;
    }

    public void setchecked(Object checked) {
        this.checked = checked;
    }
    public Object getOldChecked() {
        return oldChecked;
    }

    public void setOldChecked(Object oldChecked) {
        this.oldChecked = oldChecked;
    }

    public Object gettext() {
        return text;
    }

    public void settext(Object text) {
        this.text = text;
    }
    public Map<String, Object> getO() {
        return o;
    }

    public void setO(Map<String, Object> o) {
        this.o = o;
    }
    public Object getstate() {
        return state;
    }

    public void setstate(Object state) {
        this.state = state;
    }

    Object state;
    Object id;
    Object text;
    Object checked;
    Object oldChecked;
    Map<String, Object> o;
    List<ComboTreeObjectCheck>  children;
}
