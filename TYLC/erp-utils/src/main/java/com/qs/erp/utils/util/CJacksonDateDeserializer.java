package com.qs.erp.utils.util;

import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *  java日期对象经过Jackson库转换成JSON日期格式化自定义类
 * @author godfox
 * @date 2010-5-3
 */
public class CJacksonDateDeserializer extends JsonDeserializer<Date> {

    @Override
    public Date deserialize(JsonParser parser, DeserializationContext context)
            throws IOException, JsonProcessingException {
        String dateFormat = "yyyy-MM-dd HH:mm:ss";
        SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
        try {
            String fieldData = parser.getText();

            if(fieldData==null ||fieldData.equals("")) {return DateHelp.getDefaultDate();}
            if(fieldData.length()==10){fieldData=fieldData+" 00:00:00";}
            return sdf.parse(fieldData);
        } catch (Exception e) {
           //return DateHelp.getDefaultDate();
            e.printStackTrace();
            throw  new IOException(e.getMessage());
        }
    }
}