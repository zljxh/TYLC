package com.ty.erp.utils.util.ThreadPool;

import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

/**
 * Created by xyyz150 on 2016/8/9.
 */
public class ComparableFutureTask<T> extends FutureTask<T> implements Comparable<ComparableFutureTask<T>> {
    Object object;

    public ComparableFutureTask(Callable<T> callable) {
        super(callable);
        object = callable;
    }

    public ComparableFutureTask(Runnable runnable, T result) {
        super(runnable, result);
        object = runnable;
    }

    @Override
    public int compareTo(ComparableFutureTask<T> o) {
        if (this == o) {
            return 0;
        }
        if (o == null) {
            return -1;
        }
        if (object != null && o.object != null) {
            if (object.getClass().equals(o.object.getClass())) {
                if (object instanceof Comparable) {
                    return ((Comparable) object).compareTo(o.object);
                }
            }
        }
        return 0;
    }
}
