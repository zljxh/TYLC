package com.ty.erp.utils.util;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.module.SimpleModule;
import org.codehaus.jackson.type.JavaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by admin on 2014/8/18.
 */
public class CMappingJacksonObjectMapper extends ObjectMapper {

    public Logger logger = LoggerFactory.getLogger(CMappingJacksonObjectMapper.class);

    public CMappingJacksonObjectMapper() {
        super();
        //long 自动按字符串序列化
        this.configure(JsonGenerator.Feature.WRITE_NUMBERS_AS_STRINGS, true);
        //按方法get set 后名字大小写序列化
        this.setPropertyNamingStrategy(new CDefaultPropertyNamingStrategy());
        //自定义显示日期格式
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        // formatter.parse()
        this.setDateFormat(formatter);

        this.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        //UTCDateDeserializer utcDateDeserializer = new UTCDateDeserializer();
        SimpleModule newModule = new SimpleModule("CJacksonDateSerializer", Version.unknownVersion());
        newModule.addSerializer(Date.class, new CJacksonDateSerializer());
        newModule.addDeserializer(Date.class, new CJacksonDateDeserializer());
        //newModule.addDeserializer()
        this.registerModule(newModule);
        // this.setSerializationConfig(new CJacksonDateSerializer());
    }

    @Override
    protected Object _readMapAndClose(JsonParser jp, JavaType valueType)
            throws IOException, JsonParseException, JsonMappingException {
        try {
            return super._readMapAndClose(jp, valueType);
        } catch (IOException ex) {
            // ServletContext

            logger.error("反序列化错误:" + ExceptionHelp.getExceptionMsg(ex));
            throw ex;
        }
    }
}
