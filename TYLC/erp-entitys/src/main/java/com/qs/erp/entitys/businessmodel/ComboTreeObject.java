package com.qs.erp.entitys.businessmodel;

import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2014/10/21.
 */
public class ComboTreeObject {

    public  int getMaxEM() {
        int em = this.gettext().toString().length();
        int length = 0;
        for (ComboTreeObject o : children) {
            length = o.gettext().toString().length();
            if (length > em) em = length;
        }
        return em;
    }

    public int getColumnCount()
    {
        return (children.size()-1)/5+1;
    }
    public List<ComboTreeObject> getchildren() {
        return children;
    }

    public void setchildren(List<ComboTreeObject> children) {
        this.children = children;
    }

    public Object getid() {
        return id;
    }

    public void setid(Object id) {
        this.id = id;
    }

    public Object gettext() {
        return text;
    }

    public void settext(Object text) {
        this.text = text;
    }

    public Map<String, Object> geto() {
        return o;
    }

    public void seto(Map<String, Object> o) {
        this.o = o;
    }

    Object id;
    Object text;

    public Object getstate() {
        return state;
    }

    public void setstate(Object state) {
        this.state = state;
    }

    Object state;
    Map<String, Object> o;
    List<ComboTreeObject>  children;
}
