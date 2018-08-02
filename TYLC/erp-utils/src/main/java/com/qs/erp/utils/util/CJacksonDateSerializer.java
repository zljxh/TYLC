package com.qs.erp.utils.util;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *  java日期对象经过Jackson库转换成JSON日期格式化自定义类
 * @author godfox
 * @date 2010-5-3
 */
public class CJacksonDateSerializer extends JsonSerializer<Date> {

    @Override
    public void serialize(Date value, JsonGenerator jgen, SerializerProvider provider) throws IOException, JsonProcessingException {

        String result=null;
        if(!DateHelp.getDefaultDate().equals(value)) {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
             result = formatter.format(value);
        }
        if(result==null) {
            jgen.writeString("");
        }
        else
        {
            jgen.writeString(result);
        }
    }
}