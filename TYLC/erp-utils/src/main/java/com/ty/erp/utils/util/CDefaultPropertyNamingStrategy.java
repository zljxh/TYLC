package com.ty.erp.utils.util;

import org.codehaus.jackson.map.MapperConfig;
import org.codehaus.jackson.map.PropertyNamingStrategy;
import org.codehaus.jackson.map.introspect.AnnotatedField;
import org.codehaus.jackson.map.introspect.AnnotatedMethod;
import org.codehaus.jackson.map.introspect.AnnotatedParameter;

/**
 * Created by admin on 2014/8/18.
 */
public class CDefaultPropertyNamingStrategy extends PropertyNamingStrategy.PropertyNamingStrategyBase {
     @Override
    public  String translate(String propertyName)
    {
      // String name = propertyName.replaceAll("^\\w", propertyName.substring(0, 1).toUpperCase());
       //return name;
//        if(Character.isUpperCase(propertyName.charAt(0))){
//            return propertyName;
//        }else {
//            return (new StringBuilder()).append(Character.toUpperCase(propertyName.charAt(0))).append(propertyName.substring(1)).toString();
//        }

        return  propertyName;
    }
    @Override
    public String nameForField(MapperConfig<?> config, AnnotatedField field, String defaultName)
    {
        return translate(defaultName);
    }

    @Override
    public String nameForGetterMethod(MapperConfig<?> config, AnnotatedMethod method, String defaultName)
    {
        String name=method.getName();
        if (name.startsWith("get"))
        {
            return  name.substring(3);
        }
        return name.substring(2);
    }

    @Override
    public String nameForSetterMethod(MapperConfig<?> config, AnnotatedMethod method, String defaultName)
    {
        String name=method.getName();
        return  name.substring(3);
       // return translate(defaultName);
    }

    String translateMethodName( AnnotatedMethod method, String defaultName)
    {
        String name=method.getName();
        if (name.startsWith("get"))
        {
           return  name.substring(3);
        }
        return name.substring(2);
    }
    @Override
    public String nameForConstructorParameter(MapperConfig<?> config, AnnotatedParameter ctorParam,
                                              String defaultName)
    {
        return translate(defaultName);
    }
}
