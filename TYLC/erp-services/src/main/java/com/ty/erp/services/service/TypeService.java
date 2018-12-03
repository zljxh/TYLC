package com.ty.erp.services.service;

import com.ty.erp.daos.dao.CartoontypesDao;
import com.ty.erp.entitys.entity.Cartoontypes;
import com.ty.erp.utils.util.Snowflake.FactoryIdWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author HP
 * @date yyyy/MM/dd
 */
@Service
public class TypeService {
    @Autowired
    CartoontypesDao cartoontypesDao;

    public void saveTypes(long targetRowId, List<Long> typeRowId) {
        cartoontypesDao.Delete(targetRowId);
        for (Long rowid : typeRowId) {
            Cartoontypes cartoontypes = new Cartoontypes();
            cartoontypes.setRowId(FactoryIdWorker.NextId());
            cartoontypes.setCartoonRowId(targetRowId);
            cartoontypes.setCartoonTypeRowId(rowid);
            cartoontypesDao.Save(cartoontypes);
        }
    }

    public List<Long> getTypes(Long rowid) {
        return cartoontypesDao.getRowList(rowid);
    }

    public String getTypeName(long RowId) {
        StringBuffer buffer = new StringBuffer("");
        List<Cartoontypes> list = cartoontypesDao.getList(RowId);

        for (int i = 0; i < list.size(); i++) {
            Cartoontypes type = list.get(i);
            buffer.append(type.getTypeName());
            if (i != list.size() - 1) {
                buffer.append(",");
            }
        }
        return buffer.toString();
    }
}
