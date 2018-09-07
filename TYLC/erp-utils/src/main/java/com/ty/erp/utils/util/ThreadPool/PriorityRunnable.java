package com.ty.erp.utils.util.ThreadPool;

/**
 * Created by xyyz150 on 2016/8/9.
 */
public class PriorityRunnable extends PriorityBase implements Runnable {

    private Runnable runner;

    public PriorityRunnable(PriorityEnum priorityEnum, Runnable runner) {
        this.priorityEnum = priorityEnum;
        this.runner = runner;
    }

    @Override
    public void run() {
        runner.run();
    }
}
