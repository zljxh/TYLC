package com.ty.erp.services.businessmodel;


import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * {"PageIndex":1,"PageRowCount":1000}
 * Created by admin on 2014/8/13.
 */
public class PageQueryParameters implements Serializable {
    private static final long serialVersionUID = -6121501427655885029L;
    private int pageIndex;
    private int pageRowCount;
    private String MinValue;
    private String MaxValue;
    private EnumPaginationType PainationType;
    private String[] QueryColumn;

    public String getParameterValue(String key) {
        if (!containsKey(key)) {
            return null;
        }
        Object o = Parameters.get(key);
        if (o == null) {
            return null;
        }
        return o.toString();
    }

    public long getLong(String key) {
        if (isEmpty(key)) {
            return 0;
        }
        String value = Parameters.get(key).toString();
        if (value == null || value.equals("")) return 0L;
        return Long.parseLong(value);
    }

    public Boolean containsKey(String key) {
        return Parameters.containsKey(key);
    }

    public Boolean isEmpty(String key) {
        if (Parameters.containsKey(key)) {
            String value = getParameterValue(key);
            return value == null || value == "";
        } else {
            return true;
        }
    }

    /// <summary>
    ///参数值  键值对    值为对象的可以序列化为字符串
    /// </summary>
    private HashMap<String, Object> Parameters = new HashMap<String, Object>();

    public HashMap<String, Object> getParameters() {
        return Parameters;
    }

    public void setParameters(HashMap<String, Object> parameters) {
        Parameters = parameters;
    }

    public PageQueryParameters() {

    }


    public int getPageIndex() {
        return this.pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }


    public int getPageRowCount() {
        return this.pageRowCount;
    }

    public void setPageRowCount(int pageRowCount) {
        this.pageRowCount = pageRowCount;
    }

    public String getMinValue() {
        return MinValue;
    }

    public void setMinValue(String minValue) {
        MinValue = minValue;
    }

    public String getmaxValue() {
        return MaxValue;
    }

    public void setmaxValue(String maxValue) {
        MaxValue = maxValue;
    }


    public EnumPaginationType getPainationType() {
        return PainationType;
    }

    public void setPainationType(EnumPaginationType painationType) {
        PainationType = painationType;
    }

    public String[] getQueryColumn() {
        return QueryColumn;
    }

    public void setQueryColumn(String[] queryColumn) {
        QueryColumn = queryColumn;
    }

    public String GetValue(String key) {
        if (ContainsKey(key)) {
            return Parameters.get(key).toString();
        }
        return "";
    }

    public Object GetObject(String key) {
        if (ContainsKey(key)) {
            return Parameters.get(key).toString();
        }
        return null;
    }

    public String[] GetListValue(String key) {
        if (ContainsKey(key)) {
            //string str= Parameters[key];
            //  return str.EDeserializeObject<String[]>();
        }
        return null;
    }

    public Boolean ContainsKey(String Key) {
        return Parameters.containsKey(Key);
    }

    //mybatis
    public Map<String, Object> GetSqlMapParameter() {
        MyPagination myPagination = new MyPagination();
        myPagination.OrderBy = "RowId desc";//默认
        myPagination.setPageRowCount(this.getPageRowCount());
        myPagination.setPageIndex(this.getPageIndex());
        Map<String, Object> mapResult = FilerParameter(this.getParameters());
        mapResult.put("OrderByColumn", myPagination.OrderBy);
        mapResult.put("offset", myPagination.getBeginRowIndex());
        mapResult.put("PageRowCount", myPagination.getEndRowIndex() - myPagination.getBeginRowIndex());
        return mapResult;
    }

    public Map<String, Object> FilerParameter(Map<String, Object> pMap) {
        Map<String, Object> reseltMap = new HashMap<String, Object>();
        for (String key : pMap.keySet()) {
            Object value = pMap.get(key);
            if (value != null && !value.equals("")) {
                reseltMap.put(key, value);
            }
        }
        return reseltMap;
    }
}
