package com.ty.erp.utils.util.ThreadPool;

import java.util.concurrent.Callable;

/**
 * Created by xyyz150 on 2016/8/9.
 */
public class PriorityCallable extends PriorityBase implements Callable {

    private Callable callable;

    public PriorityCallable(PriorityEnum priorityEnum, Callable callable) {
        this.priorityEnum = priorityEnum;
        this.callable = callable;
    }

    @Override
    public Object call() throws Exception {
        return callable.call();
    }

}
