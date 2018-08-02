package com.qs.erp.services.common.shiro.credentials;

import com.qs.erp.services.common.shiro.MyTenantToken;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * <p>User: Zhang Kaitao
 * <p>Date: 14-1-28
 * <p>Version: 1.0
 */
public class RetryLimitHashedCredentialsMatcher extends HashedCredentialsMatcher {

    private Cache<String, AtomicInteger> passwordRetryCache;

    public RetryLimitHashedCredentialsMatcher(CacheManager cacheManager) {
        passwordRetryCache = cacheManager.getCache("passwordRetryCache");
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
       // String username = (String) token.getPrincipal();
        //retry count + 1
        MyTenantToken myUsernamePasswordToken = (MyTenantToken) token;
        String keyId = myUsernamePasswordToken.getPrincipal().toString();
      //  Operator op=(Operator)info;

        AtomicInteger retryCount = passwordRetryCache.get(keyId);


        if (retryCount == null) {
            retryCount = new AtomicInteger(0);
            passwordRetryCache.put(keyId, retryCount);
        }
        if (retryCount.incrementAndGet() > 20) {
            //if retry count > 5 throw
            throw new ExcessiveAttemptsException();
        }

        boolean matches = super.doCredentialsMatch(token, info);
        if (matches) {
            //clear retry count
            passwordRetryCache.remove(keyId);
        }
        return matches;
    }
}
