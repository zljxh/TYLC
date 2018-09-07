package com.ty.erp.utils.util;

/**
 * Created by xyyz150 on 2014/12/31.
 */
public interface ListFilter<T,Target> {
    public boolean Select(T obj, Target tar);
}
