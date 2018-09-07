package com.ty.erp.services.common.shiro;

import com.ty.erp.entitys.entity.SystemResource;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.mgt.DefaultFilterChainManager;
import org.apache.shiro.web.filter.mgt.PathMatchingFilterChainResolver;
import org.apache.shiro.web.servlet.AbstractShiroFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ShiroFilerChainManager {

    @Autowired
    private ShiroFilterFactoryBean shiroFilterFactory;

    private Map<String, String> FilterChainDefinitionMap;

    @PostConstruct
    public void init() {
        FilterChainDefinitionMap= new HashMap<String,String>( shiroFilterFactory.getFilterChainDefinitionMap());
    }
    public void initFilterChains(List<SystemResource>urlFilters) {
        shiroFilterFactory.getFilterChainDefinitionMap().clear();
        if(FilterChainDefinitionMap != null) {
            shiroFilterFactory.getFilterChainDefinitionMap().putAll(FilterChainDefinitionMap);//注册默认的
        }
        for (SystemResource urlFilter : urlFilters) {
            String url = urlFilter.getPathName();
            if(!StringUtils.isEmpty(url)) {
                if (!StringUtils.isEmpty(urlFilter.getCode())) {
                     String[] urlList=url.split("\\|");
                    for(String urlstr:urlList) {
                        shiroFilterFactory.getFilterChainDefinitionMap().put(urlstr, "perms[" + urlFilter.getCode() + "]");
                    }
                }
            }
        }
        shiroFilterFactory.getFilterChainDefinitionMap().put("/**","authc");
        AddChainToDefaultFilterChainManager();
    }

    private void AddChainToDefaultFilterChainManager() {
        AbstractShiroFilter shiroFilter=null;
        try {
            shiroFilter = (AbstractShiroFilter) shiroFilterFactory.getObject();
        } catch(Exception e) {
            throw new RuntimeException("get ShiroFilter from shiroFilterFactoryBean error!");
        }
        PathMatchingFilterChainResolver filterChainResolver =(PathMatchingFilterChainResolver)shiroFilter.getFilterChainResolver();
        DefaultFilterChainManager manager =(DefaultFilterChainManager)filterChainResolver.getFilterChainManager();
        manager.getFilterChains().clear();
        Map<String, String> chains = shiroFilterFactory.getFilterChainDefinitionMap();
        for(Map.Entry<String, String> entry :chains.entrySet()) {
            String url = entry.getKey();
            String chainDefinition =entry.getValue().trim().replace(" ", "");
            manager.createChain(url,chainDefinition);
        }
    }
}
