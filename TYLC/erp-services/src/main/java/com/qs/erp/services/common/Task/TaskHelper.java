package com.qs.erp.services.common.Task;

import com.qs.erp.services.common.MyLogger;
import com.qs.erp.utils.util.ThreadPool.MyThreadPoolExecutor;
import com.qs.erp.utils.util.ThreadPool.PriorityCallable;
import com.qs.erp.utils.util.ThreadPool.PriorityEnum;
import com.qs.erp.utils.util.ThreadPool.PriorityRunnable;

import java.util.concurrent.*;

/**
 * Created by xyyz150 on 2016/2/25.
 */
public class TaskHelper {
    static MyThreadPoolExecutor threadPoolExecutor = new MyThreadPoolExecutor(10, 20, 30L, TimeUnit.SECONDS, new PriorityBlockingQueue<Runnable>(1000), new ThreadPoolExecutor.CallerRunsPolicy());

    static MyThreadPoolExecutor threadPoolExecutorCall = new MyThreadPoolExecutor(2, 20, 30L, TimeUnit.SECONDS, new PriorityBlockingQueue(500), new ThreadPoolExecutor.CallerRunsPolicy());

    //后台下载文件使用
    static MyThreadPoolExecutor threadPoolDownFileCall = new MyThreadPoolExecutor(2, 20, 30L, TimeUnit.SECONDS, new PriorityBlockingQueue<Runnable>(500), new ThreadPoolExecutor.CallerRunsPolicy());

    public static Future<?> submit(Runnable task) {
        try {
            PriorityRunnable priorityRunnable = new PriorityRunnable(PriorityEnum.Normal, task);
            return threadPoolExecutor.submit(priorityRunnable);
        } catch (Exception e) {
            MyLogger.error("线程池执行错误：" + e.toString());
        }
        return null;
    }

    public static Future<?> submit(Callable task) {
        try {
            PriorityCallable priorityCallable = new PriorityCallable(PriorityEnum.Normal, task);
            return threadPoolExecutorCall.submit(priorityCallable);
        } catch (Exception e) {
            MyLogger.error("线程池执行错误：" + e.toString());
        }
        return null;
    }

    public static Future<?> submit(Runnable task, PriorityEnum priorityEnum) {
        try {
            PriorityRunnable priorityRunnable = new PriorityRunnable(priorityEnum, task);
            return threadPoolExecutor.submit(priorityRunnable);
        } catch (Exception e) {
            MyLogger.error("线程池执行错误：" + e.toString());
        }
        return null;
    }

    public static Future<?> submit(Callable task, PriorityEnum priorityEnum) {
        try {
            PriorityCallable priorityCallable = new PriorityCallable(priorityEnum, task);
            return threadPoolExecutorCall.submit(priorityCallable);
        } catch (Exception e) {
            MyLogger.error("线程池执行错误：" + e.toString());
        }
        return null;
    }

    public static Future<?> submitDownFile(Runnable task) {
        try {
            PriorityRunnable priorityRunnable = new PriorityRunnable(PriorityEnum.Normal, task);
            return threadPoolDownFileCall.submit(priorityRunnable);
        } catch (Exception e) {
            MyLogger.error("线程池执行错误：" + e.toString());
        }
        return null;
    }
}
