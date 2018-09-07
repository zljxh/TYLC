package com.ty.erp.utils.util;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.MappingJsonFactory;
import org.codehaus.jackson.map.ObjectMapper;

import java.io.StringWriter;
import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by xyyz150 on 2014/11/17.
 */
public class ConvertHelp {
    public static long ToLong(Object o) {
        if (o == null) return 0L;
        String str = o.toString();
        if (str.equals("")) return 0L;
        return Long.parseLong(o.toString());
    }

    public static double ToDouble(Object o) {
        if (o == null) return 0;
        String str = o.toString();
        if (str.equals("")) return 0;
        return Double.parseDouble(o.toString());
    }

    public static double toDoubleWithScience(Object o) {
        if (o == null) return 0;
        String str = o.toString();
        if (str.equals("")) return 0;
        DecimalFormatSymbols dfs = new DecimalFormatSymbols();
        dfs.setDecimalSeparator('.');
        dfs.setGroupingSeparator(',');
        dfs.setMonetaryDecimalSeparator('.');
        try {
            DecimalFormat df = new DecimalFormat("###,###.##", dfs);
            return df.parse(str).doubleValue();
        } catch (Exception e) {
            throw new ServiceNoCheckException(e);
        }
    }

    public static int ToInt(Object o) {
        if (o == null) return 0;
        String str = o.toString();
        if (str.equals("")) return 0;
        return Integer.parseInt(o.toString());
    }

    public static String ToString(Object o) {
        if (o == null) return "";
        String str = o.toString();
        if (str.isEmpty()) return "";
        return str;
    }

    public static Date ToDate(Object o) {
        Date date = null;
        if (o == null) return date;
        String strdate = o.toString();
        if (StringHelp.IsNullOrEmpty(strdate)) {
            return date;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            date = sdf.parse(strdate);
        } catch (Exception ex) {
            throw new ServiceNoCheckException(ex);
        }
        if (date == null) {
            SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy/MM/dd");
            try {
                date = sdf1.parse(strdate);
            } catch (Exception ex) {
                throw new ServiceNoCheckException(ex);
            }
        }
        return date;
    }

    public static Date ToDateTime(Object o) {
        Date date = null;
        if (o == null) return date;
        String strdate = o.toString();
        if (StringHelp.IsNullOrEmpty(strdate)) {
            return date;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            date = sdf.parse(strdate);
        } catch (Exception ex) {
            try {
                SimpleDateFormat dateFormat = new SimpleDateFormat("EEE MMM d HH:mm:ss 'CST' yyyy", Locale.ENGLISH);
                date = dateFormat.parse(strdate);
                dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                strdate = dateFormat.format(date);
                date = sdf.parse(strdate);
            }catch(Exception e){
                throw new ServiceNoCheckException(ex);
            }
        }
        return date;
    }

    public static String ToJson(Object o) throws Exception {
        StringWriter sw = new StringWriter(); // serialize
        ObjectMapper mapper = new CMappingJacksonObjectMapper();
        MappingJsonFactory jsonFactory = new MappingJsonFactory();
        JsonGenerator jsonGenerator = jsonFactory.createJsonGenerator(sw);
        mapper.writeValue(jsonGenerator, o);
        sw.close();
        return sw.getBuffer().toString();
    }

    public static <T> T ToObjectFromJson(String json, Class<T> c) throws Exception {
        CMappingJacksonObjectMapper objectMapper = new CMappingJacksonObjectMapper();
        T result = objectMapper.readValue(json, c);
        return result;
    }

    public static <TBasicType> List<TBasicType> ToBasicTypeList(List<Map<String, Object>> mapList) {
        List<TBasicType> list = new ArrayList<TBasicType>();
        for (Map<String, Object> map : mapList) {
            for (Object o : map.values()) {
                list.add((TBasicType) o);
                break;
            }
        }
        return list;
    }

    public static Boolean ToBoolean(Object o) {
        if (o == null) return null;
        String str = o.toString();
        if (str.equals("")) return null;
        return Boolean.parseBoolean(o.toString());
    }

    public static BigDecimal ToBigDecimal(Object o) {
        if (o == null) return null;
        String str = o.toString();
        if (str.equals("")) return null;
        BigDecimal a = new BigDecimal(o.toString());
        a = a.setScale(2, BigDecimal.ROUND_HALF_UP);
        return a;
    }

    public static String subString(Object o, int length) {
        if (o == null) return "";
        String str = o.toString();
        if (str.isEmpty()) return "";
        if (str.length() > length) {
            return str.substring(0, length);
        }
        return str;
    }

    public static Map<String, Object> beanToMap(Object object) throws Exception
    {
        Map<String, Object> map = new HashMap<String, Object>();

        Class cls = object.getClass();
        Field[] fields = cls.getDeclaredFields();
        for (Field field : fields) {
            field.setAccessible(true);
            map.put(field.getName(), field.get(object));
        }
        return map;
    }

}

