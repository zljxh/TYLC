package com.qs.erp.services.common;


import com.qs.erp.entitys.businessmodel.ComboTreeObject;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2014/10/23.
 */
public class TreeObjectHelp {
    public static List<ComboTreeObject> GetTreeObject(List<Map<String, Object>> list, String ParentId, String IdKey, String ParentIdKey, String TextKey) {
        ComboTreeObject treeObject = null;
        List<ComboTreeObject> listTree = new ArrayList<ComboTreeObject>();
        for (Map<String, Object> map : list) {
            if (map.get(ParentIdKey).toString().equals(ParentId)) {
                treeObject = new ComboTreeObject();
                treeObject.setid(map.get(IdKey));
                treeObject.settext(map.get(TextKey));

                treeObject.seto(map);
                List<ComboTreeObject> children = GetTreeObject(list, treeObject.getid().toString(), IdKey, ParentIdKey, TextKey);
                if(children.size()>0)
                {
                    treeObject.setstate("closed");
                }
                else {
                    treeObject.setstate("open");
                }
                treeObject.setchildren(children);
                listTree.add(treeObject);
            }
        }
        return listTree;
    }
    public static List<ComboTreeObject> GetTreeObject(List<Map<String, Object>> list, String ParentId, String IdKey, String ParentIdKey, String TextKey,String State) {
        ComboTreeObject treeObject = null;
        List<ComboTreeObject> listTree = new ArrayList<ComboTreeObject>();
        for (Map<String, Object> map : list) {
            if (map.get(ParentIdKey).toString().equals(ParentId)) {
                treeObject = new ComboTreeObject();
                treeObject.setid(map.get(IdKey));
                treeObject.settext(map.get(TextKey));
                //treeObject.seto(map);
                List<ComboTreeObject> children = GetTreeObject(list, treeObject.getid().toString(), IdKey, ParentIdKey, TextKey,State);
                    treeObject.setstate(map.get(State));
                treeObject.setchildren(children);
                listTree.add(treeObject);
            }
        }
        return listTree;
    }
}
