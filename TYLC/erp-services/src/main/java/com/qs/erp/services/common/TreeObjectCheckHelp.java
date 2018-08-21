package com.qs.erp.services.common;


import com.qs.erp.entitys.businessmodel.ComboTreeObjectCheck;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2014/10/23.
 */
public class TreeObjectCheckHelp {
    public static List<ComboTreeObjectCheck> GetTreeObject(List<Map<String, Object>> list, String ParentId, String IdKey, String ParentIdKey, String TextKey, String CheckedKey, boolean IsObject) {
        ComboTreeObjectCheck treeObject = null;
        List<ComboTreeObjectCheck> listTree = new ArrayList<ComboTreeObjectCheck>();
        for (Map<String, Object> map : list) {
            if (map.get(ParentIdKey).toString().equals(ParentId)) {
                treeObject = new ComboTreeObjectCheck();
                treeObject.setid(map.get(IdKey));
                treeObject.settext(map.get(TextKey));
                    treeObject.setstate("closed");
                if(map.get(CheckedKey).toString().equals("0")) {
                    treeObject.setchecked(false);
                }
                else
                {
                    treeObject.setchecked(true);
                }
                if(IsObject) {
                    treeObject.setO(map);
                }
                List<ComboTreeObjectCheck> children = GetTreeObject(list, treeObject.getid().toString(), IdKey, ParentIdKey, TextKey,CheckedKey,IsObject);
                treeObject.setchildren(children);
                if(children.size()>0) {
                    treeObject.setchecked(false);
                }
                else
                {
                    treeObject.setstate("");
                }
                listTree.add(treeObject);
            }
        }
        return listTree;
    }
}
