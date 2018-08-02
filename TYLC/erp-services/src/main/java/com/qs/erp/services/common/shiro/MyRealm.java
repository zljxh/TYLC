package com.qs.erp.services.common.shiro;

import com.qs.erp.common.ServiceContext;
import com.qs.erp.entitys.entity.Operator;
import com.qs.erp.services.common.shiro.MyTenantToken;
import com.qs.erp.services.service.OperatorService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;


public class MyRealm extends AuthorizingRealm {
    public MyRealm() {

    }

    @Autowired
    private OperatorService service;
    @Autowired
    org.apache.shiro.web.mgt.DefaultWebSecurityManager securityManager;

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {


        Operator user = (Operator) principals.getPrimaryPrincipal();
        ServiceContext serviceContext = new ServiceContext();
        serviceContext.setTenantRowId(user.getTenantRowId());
        serviceContext.setOperatorRowId(user.getRowId());
        serviceContext.setUserName(user.getAccount());
        Set<String> Permissions = service.findPermissions(serviceContext, user.getRowId());
        Set<String> Roles = service.findRoles(serviceContext, user.getRowId());
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        authorizationInfo.setRoles(Roles);
        authorizationInfo.setStringPermissions(Permissions);
        return authorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

      //  String tenantrowidusername = (String) token.getPrincipal();
        MyTenantToken myTenantToken=(MyTenantToken) token;
        long tenantRowId = myTenantToken.getTenantRowId();
        ServiceContext serviceContext = new ServiceContext();
        serviceContext.setTenantRowId(tenantRowId);
        Operator op = service.findByAccount(serviceContext, myTenantToken.getUsername());
        // User user=new User();

        if (op == null) {
            throw new UnknownAccountException();//没找到帐号
        }

        if (Boolean.FALSE.equals(op.getIsEnabled())) {
            throw new LockedAccountException(); //帐号锁定
        }

        //交给AuthenticatingRealm使用CredentialsMatcher进行密码匹配，如果觉得人家的不好可以自定义实现
        SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(
                op, //用户名
                op.getPassword(), //密码
                ByteSource.Util.bytes(op.getAccount() + op.getSalt()),//"admin8d78869f470951332959580424d4bf4f"),//user.getCredentialsSalt()),//salt=username+salt
                getName()  //realm name
        );
        return authenticationInfo;
    }

    @Override
    public void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
      //以下代码并没有什么作用
        Object principal = principals.getPrimaryPrincipal();
        org.apache.shiro.cache.Cache<Object, AuthorizationInfo> cache = this.getAuthorizationCache();
        if (cache != null) {
            Operator op = (Operator) principal;
            cache.remove(op.getTenantRowId()+":"+op.getAccount());
        }
    }

    @Override
    public void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        super.clearCachedAuthenticationInfo(principals);
        Object principal = principals.getPrimaryPrincipal();
        org.apache.shiro.cache.Cache<Object, AuthenticationInfo> cache = this.getAuthenticationCache();
        if (cache != null) {
            Operator op = (Operator) principal;
            cache.remove(op.getTenantRowId()+":"+op.getAccount());
           // cache.remove(op.getAccount());
        }
    }

    @Override
    public void clearCache(PrincipalCollection principals) {

        super.clearCache(principals);
    }

    public void clearAllCachedAuthorizationInfo() {

        org.apache.shiro.cache.Cache<Object, AuthorizationInfo> cache = getAuthorizationCache();
        if (cache != null) {
            cache.clear();
        }
    }

    public void clearAllCachedAuthenticationInfo() {
        org.apache.shiro.cache.Cache<Object, AuthenticationInfo> cache = getAuthenticationCache();
        if (cache != null) {
            cache.clear();
        }
    }

    public void clearAllCache() {
        clearAllCachedAuthenticationInfo();
        clearAllCachedAuthorizationInfo();
    }

}