package com.qs.erp.utils.util.ThreadPool;

/**
 * Created by xyyz150 on 2016/8/9.
 */
public class PriorityBase implements Comparable<PriorityBase> {

    protected PriorityEnum priorityEnum;

    public PriorityEnum getPriorityEnum() {
        return priorityEnum;
    }

    @Override
    public int compareTo(PriorityBase o) {
//        System.out.print("\n" + this.getPriorityEnum().getLevel() + "---" + o.getPriorityEnum().getLevel());
        if (this.getPriorityEnum().getLevel() < o.getPriorityEnum().getLevel()) {
            return -1;
        }
        if (this.getPriorityEnum().getLevel() > o.getPriorityEnum().getLevel()) {
            return 1;
        }
        return 0;
    }
}
