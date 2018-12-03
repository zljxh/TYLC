package com.ty.erp.entitys.businessmodel;

import java.util.List;

public class FreeModel {
    private List<Long> RowIdList;
    private int Start;

    //1，全部免费，2 start前几张免费
    private int Type;

    public List<Long> getRowIdList() {
        return RowIdList;
    }

    public void setRowIdList(List<Long> rowIdList) {
        RowIdList = rowIdList;
    }

    public int getStart() {
        return Start;
    }

    public void setStart(int start) {
        Start = start;
    }

    public int getType() {
        return Type;
    }

    public void setType(int type) {
        Type = type;
    }
}
