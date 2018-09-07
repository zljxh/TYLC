package com.ty.erp.services.businessmodel;

/**
 * Created by Administrator on 2014/8/24.
 */

/**
 * 默认配置分页帮助类
 */
public class DefaultPagination extends MyPagination {
    private String _TableName;

    public String get_SelectColumn() {
        return _SelectColumn;
    }

    public void set_SelectColumn(String _SelectColumn) {
        if (_SelectColumn != null) {
            this._SelectColumn = _SelectColumn;
        }
        else
        {
            this._SelectColumn ="*";
        }

    }

    public String get_TableName() {
        return _TableName;
    }

    public void set_TableName(String _TableName) {
        this._TableName = _TableName;
    }

    private String _SelectColumn="*";

    private String _SqlWhere;

    public String get_SqlWhere() {
        return _SqlWhere;
    }

    public void set_SqlWhere(String _SqlWhere) {
        this._SqlWhere = _SqlWhere;
    }
}
