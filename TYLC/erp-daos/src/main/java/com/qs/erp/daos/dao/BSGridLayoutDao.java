package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.BSGridLayout;

/**
 * Created by xyyz150 on 2015/11/19.
 */
@MyBatisRepository
public interface BSGridLayoutDao {
    public void create(BSGridLayout entity);
    public void update(BSGridLayout entity);
}
