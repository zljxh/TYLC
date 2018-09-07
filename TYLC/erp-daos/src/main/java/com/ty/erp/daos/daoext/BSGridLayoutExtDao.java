package com.ty.erp.daos.daoext;

import com.ty.erp.daos.MyBatisRepository;
import com.ty.erp.entitys.entity.BSGridLayout;
import org.apache.ibatis.annotations.Param;

/**
 * Created by xyyz150 on 2015/11/19.
 */
@MyBatisRepository
public interface BSGridLayoutExtDao {
    public BSGridLayout getByOpeaterAndFormName(@Param("TenantRowId") long TenantRowId, @Param("OpeaterRowId") long OpeaterRowId, @Param("FormName") String FormName);
}
