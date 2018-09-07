package com.ty.erp.daos.dao;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.BSGridLayout;

/**
 * Created by xyyz150 on 2015/11/19.
 */
@MyBatisRepository
public interface BSGridLayoutDao {
    public void create(BSGridLayout entity);
    public void update(BSGridLayout entity);
}
