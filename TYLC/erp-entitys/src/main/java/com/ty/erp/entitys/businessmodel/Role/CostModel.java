package com.ty.erp.entitys.businessmodel.Role;

import java.util.List;

public class CostModel {
    private List<Long> RowIdList;
    private int Cost;


    public List<Long> getRowIdList() {
        return RowIdList;
    }

    public void setRowIdList(List<Long> rowIdList) {
        RowIdList = rowIdList;
    }

    public int getCost() {
        return Cost;
    }

    public void setCost(int cost) {
        Cost = cost;
    }
}
