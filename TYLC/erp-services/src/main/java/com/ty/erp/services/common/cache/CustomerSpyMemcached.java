package com.ty.erp.services.common.cache;

import com.ty.erp.services.common.MyLogger;
import net.spy.memcached.MemcachedClient;
import net.spy.memcached.internal.OperationFuture;
import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

/**
 * Created by admin on 2014/11/27.
 */

public class CustomerSpyMemcached implements DisposableBean, ICustomerCache {
    @Autowired
    protected CustomerMemcachedClientFactoryBean factoryClient;

    MemcachedClient _client;
    Lock lock = new ReentrantLock();// 锁

    MemcachedClient getClient() {
        if (_client == null) {
            lock.lock();// 取得锁
            if (_client == null) {
                _client = getMemcachedClient();
            }
            lock.unlock();// 释放锁
        }

        return _client;
    }

    public boolean isDebug() {
        return _Debug;
    }

    public void setDebug(boolean debug) {
        _Debug = debug;
    }

    boolean _Debug;

    @Override
    public Object get(String key) {

        try {
            if (isDebug()) {
                Object result = getClient().get(key);
                String className = result == null ? "null" : result.getClass().getName();
                log("get:      " + className + ":" + key);
                return result;
            } else {
                return getClient().get(key);
            }
        } catch (Exception ex) {
            error(ex.getMessage());
        }
        return null;
    }

    @Override
    public Object set(String key, Object o) {

        try {
            if (isDebug()) {
                log("set:      " + o.getClass().getName() + ":" + key);
            }
            return getClient().set(key, 0, o);
        } catch (Exception ex) {
            error(ex.getMessage());
        }
        return null;
    }

    @Override
    public Object set(String key, int exp, Object o) {

        try {
            if (isDebug()) {
                log("set:      " + o.getClass().getName() + ":" + key);
            }
            return getClient().set(key, exp, o);
        } catch (Exception ex) {
            error(ex.getMessage());
        }
        return null;
    }

    @Override
    public OperationFuture<Boolean> delete(String key) {
        try {
            if (isDebug()) {
                log("delete:      " + key);
            }
            return getClient().delete(key);
        } catch (Exception ex) {
            error(ex.getMessage());
        }
        return null;
    }

    @Override
    public void replace(String key, Object o) {
        try {
            if (isDebug()) {
                log("replace:  " + o.getClass().getName() + ":" + key);
            }
            getClient().set(key, 0, o);
        } catch (Exception ex) {
            error(ex.getMessage());
        }
    }

    void error(String msg) {
        MyLogger.logger.error(msg);
    }

    void log(String msg) {
        MyLogger.logger.debug(msg);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateNowStr = sdf.format(new Date());
        System.out.println(dateNowStr + ":   " + msg);
    }

    MemcachedClient getMemcachedClient() {
        try {
            return (MemcachedClient) factoryClient.getObject();
        } catch (Exception e) {
            MyLogger.logger.error("getMemcachedClient:" + e.getMessage());
            //e.printStackTrace();
        }
        return null;
    }

    @Override
    public void destroy() {
        if (_client != null) {
            _client.shutdown();
        }
    }
}
