package com.qs.erp.utils.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

/**
 * Created by admin on 2014/11/6.
 */
public class MapHelp<K, V> {
    Map<K, V> map;

    public MapHelp(Map<K, V> _map) {
        map = _map;

    }

    public boolean containsKey(Object key) {
        return map.containsKey(key);
    }

    public boolean getBoolean(String key) {
        if (map.get(key) == null)
            return false;
        String value = map.get(key).toString();
        if(value.equalsIgnoreCase("true")){
            return true;
        }else if(value.equals("1")){
            return true;
        }
        return false;
    }

    public String getString(String key) {
        if (map.get(key) == null)
            return "";
        return map.get(key).toString();
    }

    public Date getDate(String key) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        Date d = new Date();
//        String dateNowStr = sdf.format(d);
        // return sdf.parse(dateNowStr);
        try {
            return sdf.parse(map.get(key).toString());
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public int getInt(String key) {
        if (map.get(key) == null)
            return -1;
        return Integer.parseInt(map.get(key).toString());
    }

    public long getLong(String key) {
        if (map.get(key) == null)
            return -1;
        return Long.parseLong(map.get(key).toString());
    }

    public double getDouble(String key) {
        if (map.get(key) == null)
            return -1;
        return Double.parseDouble(map.get(key).toString());
    }

    public String get(String key) {
        if (map.get(key) == null)
            return "";
        return map.get(key).toString();
    }

    public <TObject> TObject getTObject(String key, Class<TObject> tClass) throws Exception {
        String json = this.getString(key);
        return ConvertHelp.ToObjectFromJson(json, tClass);
    }
}
