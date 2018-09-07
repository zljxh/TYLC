package com.ty.erp.services.service;

import com.ty.erp.common.ServiceContext;
import com.ty.erp.daos.dao.SystemResourceDao;
import com.ty.erp.entitys.entity.SystemResource;
import com.ty.erp.services.common.BaseService;
import com.ty.erp.services.common.shiro.ShiroFilerChainManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Created by admin on 2014/8/13.
 */
@Service
public class SystemResourceService extends BaseService {
    @Autowired
    private SystemResourceDao dao;
    @Autowired
    private ShiroFilerChainManager shiroFilerChainManager;

    //@PostConstruct
    public void initFilterChain(ServiceContext serviceContext) {
//       TenantLogin  tl= daoExtTenantLogin.GetTenantLogin();
//        if(tl!=null) {
//            CurrentContextFactory.createInstance().setTenantId(Long.parseLong(tl.getTenantIdentity()));
//            CurrentContextFactory.createInstance().setTenantCode(tl.getTenantCode());
//        }
        shiroFilerChainManager.initFilterChains(findAll(serviceContext));
    }


    public List<SystemResource> findAll(ServiceContext serviceContext) {
        return dao.GetList();
    }

}
