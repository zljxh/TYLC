package com.qs.erp.services.common.shiro;

import com.qs.erp.services.common.cache.EntityCacheService;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.CachingSessionDAO;
import org.apache.shiro.session.mgt.eis.JavaUuidSessionIdGenerator;
import org.apache.shiro.session.mgt.eis.SessionIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.Serializable;
import java.util.Date;

/**
 * 参考DefaultWebSessionManager的默认实现MemorySessionDAO
 * 实现session的存储
 * Created by xyyz150 on 2016/1/13.
 */
public class MySessionDAO extends CachingSessionDAO {

    private SessionIdGenerator sessionIdGenerator;

    @Autowired
    EntityCacheService entityCatcheService;

    protected static final String LAST_TIME = "lasttime";
    protected static final String LAST_ATTR_COUNT = "lastattrcount";
    protected static final long INTERVAL_TIME = 1000 * 60 * 5;//5分钟

    @Override
    public SessionIdGenerator getSessionIdGenerator() {
        return sessionIdGenerator;
    }

    @Override
    public void setSessionIdGenerator(SessionIdGenerator sessionIdGenerator) {
        this.sessionIdGenerator = sessionIdGenerator;
    }

    public MySessionDAO() {
        sessionIdGenerator = new JavaUuidSessionIdGenerator();
    }

    @Override
    protected void doUpdate(Session session) {
        //根据上一次访问时间和现在时间的比较，attr的数量的比较判断是否更新缓存
        int count = (Integer) session.getAttribute(LAST_ATTR_COUNT);
        if (count == session.getAttributeKeys().size()) {
            Date lasttime = (Date) session.getAttribute(LAST_TIME);
            if (session.getLastAccessTime().getTime() - lasttime.getTime() < INTERVAL_TIME) {
                return;
            }
        }
        //更新这两个标示
        session.setAttribute(LAST_TIME, session.getLastAccessTime());
        session.setAttribute(LAST_ATTR_COUNT, session.getAttributeKeys().size());
        storeSession(session.getId(), session);
    }

    @Override
    protected void doDelete(Session session) {
        if (session == null) {
            throw new NullPointerException("session argument cannot be null.");
        }
        Serializable id = session.getId();
        if (id != null) {
            entityCatcheService.delete(id.toString());
        }
    }

    @Override
    protected Serializable doCreate(Session session) {
        Serializable sessionId = sessionIdGenerator.generateId(session);
        assignSessionId(session, sessionId);
        session.setAttribute(LAST_TIME, session.getLastAccessTime());
        session.setAttribute(LAST_ATTR_COUNT, session.getAttributeKeys().size() + 1);
        storeSession(sessionId, session);
        return sessionId;
    }

    @Override
    protected Session doReadSession(Serializable sessionId) {
        return entityCatcheService.get(sessionId.toString());
    }

    protected Session storeSession(Serializable id, Session session) {
        if (id == null) {
            throw new NullPointerException("id argument cannot be null.");
        }
        entityCatcheService.set(id.toString(), session);
        return session;
    }
}
