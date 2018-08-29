package com.qs.erp.daos.dao;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.Cartoon;

import java.util.List;

@MyBatisRepository
public interface CartoonDao {
    public void Create(Cartoon cartoon);

    public void Update(Cartoon cartoon);

    public List<Cartoon> getList();

    public long getcount();
}
