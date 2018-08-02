package com.qs.erp.services.common.cache;

import net.spy.memcached.internal.OperationFuture;

/**
 * Created by admin on 2014/11/27.
 */
public interface ICustomerCache {
    Object get(String key);

    Object set(String key, Object o);

    Object set(String key, int exp, Object o);

    OperationFuture<Boolean> delete(String key);

    void replace(String key, Object o);

    void destroy();
}
