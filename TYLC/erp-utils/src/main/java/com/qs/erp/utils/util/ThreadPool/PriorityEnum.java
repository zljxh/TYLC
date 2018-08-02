package com.qs.erp.utils.util.ThreadPool;

/**
 * Created by xyyz150 on 2016/8/9.
 */
public enum PriorityEnum {
    High(10),
    Normal(20),
    Low(30);

    private int level;

    private PriorityEnum(int level) {
        this.level = level;
    }

    public int getLevel() {
        return level;
    }
}
