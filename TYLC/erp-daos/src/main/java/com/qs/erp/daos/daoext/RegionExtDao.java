package com.qs.erp.daos.daoext;

import com.qs.erp.daos.MyBatisRepository;
import com.qs.erp.entitys.entity.Region;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by xyyz150 on 2015/1/4.
 */
@MyBatisRepository
public interface RegionExtDao {
    public String GetMaxCreateDate();

    public List getProvinceList();

    public List<Region> GetListByParentId(@Param("ParentRowId") long ParentRowId);

    public Region GetRegionByNameTypeParentRowId(@Param("Name") String Name, @Param("ParentRowId") long ParentRowId, @Param("RegionTypeRowId") long RegionTypeRowId);


    public List<Region> getRegionByNameTypeParentRowIdList(@Param("Name") String Name, @Param("ParentRowId") long ParentRowId, @Param("RegionTypeRowId") long RegionTypeRowId);

    public List getCityListByProvinceRowIds(@Param("ProvinceRowIdList") List<Long> list);
}
