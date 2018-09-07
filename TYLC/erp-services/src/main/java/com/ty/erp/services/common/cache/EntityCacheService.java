package com.ty.erp.services.common.cache;
import net.spy.memcached.internal.OperationFuture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by admin on 2014/11/26.
 */
@Service
public class EntityCacheService {
    @Autowired
    protected ICustomerCache customerCatche;
    public <T> T get(String key) {
        return (T)customerCatche.get(key);
    }
    public Object set(String key,Object entity) {
        return customerCatche.set(key, entity);
    }
    public OperationFuture<Boolean> delete(String key) {
        return customerCatche.delete(key);
    }
    public void update(String Key,Object entity) {
        customerCatche.replace(Key,entity);
    }
    public Object set(String key,int exp,Object entity) {
        return customerCatche.set(key,exp, entity);
    }
}
