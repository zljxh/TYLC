package com.ty.erp.services.common.cache;

import com.ty.erp.services.common.CurrentContextFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by xyyz150 on 2015/12/21.
 * key会自动加上租户Code
 * key：租户Code+传递进来的key
 */
@Service
public class SystemCache {
    @Autowired
    EntityCacheService entityCatcheService;

    public void set(String key, int exp, Object o) {
        entityCatcheService.set(CurrentContextFactory.createInstance().getTenantCode() + key, exp, o);
    }

    public void set(String key, Object o) {
        entityCatcheService.set(CurrentContextFactory.createInstance().getTenantCode() + key, o);
    }

    public <T> T get(String key) {
        Object o = entityCatcheService.get(CurrentContextFactory.createInstance().getTenantCode() + key);
        return (T) o;
    }

    public void delete(String key) {
        entityCatcheService.delete(CurrentContextFactory.createInstance().getTenantCode() + key);
    }
}
