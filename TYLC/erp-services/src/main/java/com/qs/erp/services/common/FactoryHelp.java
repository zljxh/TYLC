package com.qs.erp.services.common;

import com.qs.erp.utils.util.MapHelp;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * Created by admin on 2014/11/6.
 */
@Service
public class FactoryHelp {
    public <K, V> MapHelp<K, V> CreateMapHelp(Map<K, V> map) {
        return new MapHelp(map);
    }
}
