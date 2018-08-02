package com.qs.erp.services.common;

import com.qs.erp.services.businessmodel.DefaultPagination;
import com.qs.erp.services.businessmodel.MyPagination;
import com.qs.erp.utils.util.MapHelp;
import com.qs.erp.utils.util.Snowflake.FactoryIdWorker;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Created by admin on 2014/7/23.
 */
public class DataBase {
    public    JdbcTemplate Db;
    public void setDb(JdbcTemplate db)
    {
        this.Db=db;
    }
    protected  String    sqlPaginationTemplate="%1$s ORDER BY %2$s LIMIT %3$s,%4$s";
    protected  String    sqlPaginationIndexTemplate = "%1$s JOIN  ( %2$s  ORDER BY %3$s LIMIT %4$s,%5$s) AS b on %6$s   ";
    protected String sqlPaginationOrderTemplate = "%1$s JOIN  ( %2$s %3$s ORDER BY %4$s LIMIT %5$s,%6$s) AS b on %7$s  %8$s";

    protected String sqlPaginationDefalutIndexTemplate="select %1$s from %2$s JOIN  (select id from %2$s %6$s  ORDER BY %3$s LIMIT %4$s,%5$s) AS b on b.id=%2$s.id";

    public long NewId()
    {
        return FactoryIdWorker.NextId();
    }
    public List ExecutePageByIndexWhere(MyPagination pagination, String selectViewSql, String IndexWhere)
    {
        return ExecutePageByIndexWhere(selectViewSql,pagination.sql, pagination.OrderBy, pagination.getBeginRowIndex(), pagination.getEndRowIndex(), IndexWhere,(Object[])pagination.getArgs().toArray());
    }
    public List ExecutePageByOrderWhere(MyPagination pagination, String selectViewSql, String IndexWhere)
    {
        return ExecutePageByOrderWhere(selectViewSql, pagination.sql, pagination.GetOrderBy(), pagination.getOrderWhere(), pagination.GetBeginRowIndex(), pagination.GetEndRowIndex(), IndexWhere, pagination.GetOrderByDesc());
    }
    public  void Execute(String sql,Object ... args) {
        //new Object[] { personId }
         Db.update(sql,args);//queryForMap(sql);
    }
    public  long ExecuteForLong(String sql,Object ... args) {
        return Db.queryForLong(sql,args);//queryForMap(sql);
    }
    public Map<String,Object> ExecuteRowSet(String sql,Object ... args)
    {
       List<Map<String,Object>> list= Db.queryForList(sql, args);
        int count =list.size();
        if(count>1) {
            throw new IndexOutOfBoundsException("返回记录超出一行,sql请加limit");
        }
        if(list.size()>0){ return list.get(0);}
        return null;
    }
    public MapHelp<String,Object> queryForMapHelp(String sql, Object ... args) {
        List<Map<String, Object>> list = Db.queryForList(sql, args);
        int count = list.size();
        if (count > 1) {
            throw new IndexOutOfBoundsException("返回记录超出一行,sql请加limit");
        }
        if (list.size() > 0) {
            return new MapHelp<String, Object>(list.get(0));
        }
        return null;
    }

    public Boolean queryForBoolean(String sql,Object ... args) {
      SqlRowSet  srs  =Db.queryForRowSet(sql,args);
        if(srs==null) return  false;
        if(srs.next()) {
            return srs.getBoolean(1);
        }
        return  false;
    }
    public List<Map<String,Object>> ExecuteList(String sql,Object... args){
        return Db.queryForList(sql,args);
    }
    List ExecutePageByIndexWhere(String selectViewSql,String Sql, String OrderBy, int BeginRowIndex, int EndRowIndex, String IndexWhere,Object ... args)
    {
        /*
        if (string.IsNullOrEmpty(pagination.OrderBy))
        {
            throw new ArgumentNullException("OrderBy 排序字段未赋值");
        }
        */
        String selectSql = String.format(sqlPaginationIndexTemplate,selectViewSql,Sql,OrderBy,BeginRowIndex,EndRowIndex-BeginRowIndex,IndexWhere);
        return Db.queryForList(selectSql,args);
    }
    public  List AAA(String selectSql) {
        return Db.queryForList(selectSql);
    }

     List ExecutePage(String Sql, String OrderBy, int BeginRowIndex, int EndRowIndex)
    {
        /*
        if (OrderBy==null)
        {
            throw new ArgumentNullException("OrderBy 排序字段未赋值");
        }*/
        //string sql = string.Format(Row_NumberSql, OrderBy, Sql, BeginRowIndex - 1, EndRowIndex + 1);
        String sql = String.format(sqlPaginationTemplate, Sql, OrderBy, BeginRowIndex - 1, EndRowIndex - BeginRowIndex + 1);
        return Db.queryForList(sql);
    }
     List ExecutePage(MyPagination pagination)
    {
        return ExecutePage(pagination.sql,pagination.OrderBy,pagination.getBeginRowIndex(),pagination.getEndRowIndex());
    }


     List ExecutePageByOrderWhere(String selectViewSql, String Sql, String OrderBy, String OrderWhere, int BeginRowIndex, int EndRowIndex, String IndexWhere,String orderDesc)
    {
         /*
        if (string.IsNullOrEmpty(OrderBy))
        {
            throw new ArgumentNullException("OrderBy 排序字段未赋值");
        }*/

        String selectSql = String.format(sqlPaginationOrderTemplate, selectViewSql, Sql, OrderWhere, OrderBy, BeginRowIndex - 1, EndRowIndex - BeginRowIndex + 1, IndexWhere, orderDesc);

        return Db.queryForList(selectSql);
    }

    public List ExecuteSimplePageByIndexWhere(DefaultPagination pagination)
    {
        String selectSql = String.format(sqlPaginationDefalutIndexTemplate,pagination.get_SelectColumn(),pagination.get_TableName(), pagination.OrderBy,pagination.getBeginRowIndex()-1,pagination.getEndRowIndex()-pagination.getBeginRowIndex()+1,pagination.get_SqlWhere());
        if(pagination.getArgs()==null||pagination.getArgs().size()==0)
        {return Db.queryForList(selectSql);}
        else
        {
            return Db.queryForList(selectSql,pagination.getArgs().toArray());
        }
    }

    public <T> List<T> ExecuteQuery(String sql,RowMapper<T> mapper,Object ... args)  throws SQLException
    {
        if(sql==null||sql.isEmpty()){
            throw new SQLException("sql 参数错误");
        }
        if(mapper==null){
            throw new SQLException("mapper 参数错误");
        }
        return Db.query(sql,mapper,args);
    }

    public <T> T ExecuteQueryForObject(String sql,RowMapper<T> mapper,Object ... args)
    {
//        if(sql==null||sql.isEmpty()){
//            throw new SQLException("sql 参数错误");
//        }
//        if(mapper==null){
//            throw new SQLException("mapper 参数错误");
//        }
        return Db.queryForObject(sql,mapper,args);
    }
    public  boolean ExecuteForBoolean(String sql,Object ... args) {
        return Db.update(sql,args)>0?true:false;
    }
}
